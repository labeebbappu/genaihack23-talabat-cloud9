import { useState, useEffect } from "react";
import axios from "axios";

const httpServer = import.meta.env.VITE_SERVER_HTTP;
const URL = httpServer + "/reviews/all";

/*
source: { type: DataTypes.STRING, allowNull: false }, // google, apple, facebook, etc
    username: { type: DataTypes.STRING, allowNull: false },
    reviewText: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.DOUBLE, allowNull: false },
    reviewTime: { type: DataTypes.DATE, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    sentimentsNegative: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsPositive: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsNeutral: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentsCompound: { type: DataTypes.DOUBLE, allowNull: true },
    sentimentText: { type: DataTypes.STRING, allowNull: true },
    keywords: { type: DataTypes.STRING, allowNull: false },
 */

// calculate average sentiment by sentimentsCompound column
const calculateAverageSentiment = (reviews) => {
  const sentimentsCompound = reviews.map((review) => {
    return review.sentimentsCompound;
  });

  const sum = sentimentsCompound.reduce((a, b) => a + b, 0);
  const avg = sum / sentimentsCompound.length || 0;

  return avg;
};

// persantage of negative and very negative reviews
const calculateNegativeReviews = (reviews) => {
  const sentimentsCompound = reviews.map((review) => {
    return review.sentimentsCompound;
  });

  const negativeReviews = sentimentsCompound.filter((compound) => {
    return compound <= -0.05;
  });

  // round to 2 decimal places

  return (
    Math.round((negativeReviews.length / sentimentsCompound.length) * 100) / 100
  );
};

// find 10 most used keywords in reviews by keywords column
const findMostUsedKeywords = (reviews) => {
  const keywords = reviews.map((review) => {
    return review.keywords;
  });

  const keywordsArray = keywords.join(",").split(",");
  const keywordsCount = {};

  keywordsArray.forEach((keyword) => {
    if (keywordsCount[keyword]) {
      keywordsCount[keyword] += 1;
    } else {
      keywordsCount[keyword] = 1;
    }
  });

  const keywordsCountArray = Object.entries(keywordsCount);
  const sortedKeywordsCountArray = keywordsCountArray.sort(
    (a, b) => b[1] - a[1]
  );
  const top10Keywords = sortedKeywordsCountArray.slice(0, 10);

  return top10Keywords;
};

const getSentimentText = (compound) => {
  if (compound >= 0.05) {
    return "Very positive";
  } else if (compound > 0 && compound < 0.05) {
    return "Positive";
  } else if (compound > -0.05 && compound < 0) {
    return "Negative";
  } else if (compound <= -0.05) {
    return "Very negative";
  } else {
    return "Neutral";
  }
};

const sources = [
  "App Store",
  "Google Play",
  "Faceboob",
  "Twitter",
  "Instagram",
  "Youtube",
  "Reddit",
];

const sentiments = [
  "Positive",
  "Very positive",
  "Neutral",
  "Negative",
  "Very negative",
];

export default function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");

  const [averageSentiment, setAverageSentiment] = useState(0);
  const [negativeReviews, setNegativeReviews] = useState(0);
  const [mostUsedKeywords, setMostUsedKeywords] = useState([]);

  const getReviews = async () => {
    try {
      const response = await axios.get(URL);
      const responseData = response?.data;

      return responseData || [];
    } catch (error) {
      console.log(error);
    }
  };

  // get reviews by axios
  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    let mounted = true;
    getReviews().then((items) => {
      if (mounted) {
        const responseData = items;

        setReviews(responseData);
        setFilteredReviews(responseData);
        setAverageSentiment(calculateAverageSentiment(responseData));
        setNegativeReviews(calculateNegativeReviews(responseData));
        setMostUsedKeywords(findMostUsedKeywords(responseData));
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // search contains in review.reviewText
    const filtered2 = reviews.filter((review) => {
      return review.reviewText.includes(search);
    });

    setFilteredReviews(filtered2);
  }, [search, reviews]);

  const filterBySource = (source) => {
    const filtered = reviews.filter((review) => {
      return review.source === source;
    });

    setFilteredReviews(filtered);
  };

  const filterBySentiment = (sentiment) => {
    const filtered = reviews.filter((review) => {
      return review.sentimentText === sentiment;
    });

    setFilteredReviews(filtered);
  };

  // filter by keyword
  const filterByKeyword = (keyword) => {
    const filtered = reviews.filter((review) => {
      return review.keywords.includes(keyword);
    });

    setFilteredReviews(filtered);
  };

  return (
    <>
      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Reviews</div>
            <div className="stat-value">{reviews.length}</div>
            <div className="stat-desc">Till Nov 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title"> Overall Sentiment</div>
            <div className="stat-value">
              {getSentimentText(averageSentiment)}
            </div>
            <div className="stat-desc">↗︎ 400 (11%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Negative reviews </div>
            <div className="stat-value">{negativeReviews * 100}%</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="w-full ">
          <button
            className="btn btn-secondary btn-outline btn-sm mr-2 mb-2"
            onClick={() => {
              setFilteredReviews(reviews);
              setSearch("");
            }}
          >
            All
          </button>

          {sources.map((source) => {
            return (
              <button
                className="btn btn-secondary btn-outline btn-sm mr-2 mb-2"
                key={source}
                onClick={() => {
                  filterBySource(source);
                }}
              >
                {source}
              </button>
            );
          })}
            <br />
          {sentiments.map((sentiment) => {
            return (
              <button
                className="btn btn-accent btn-outline btn-sm mr-2 mb-2"
                key={sentiment}
                onClick={() => {
                  filterBySentiment(sentiment);
                }}
              >
                {sentiment}
              </button>
            );
          })}
 <br />
          {mostUsedKeywords.map((keyword) => {
            return (
              <button
                className="btn btn-outline btn-sm mr-2"
                key={keyword[0]}
                onClick={() => {
                  filterByKeyword(keyword[0]);
                }}
              >
                {keyword[0]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        Showing {filteredReviews.length} records from {reviews.length} records
      </div>

      <table className="min-w-full">
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Source
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Sentiment
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Review Text
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Rating
          </th>
          <th className="px-6 py-3 bg-gray-50"></th>
        </tr>

        {filteredReviews.map((review) => {
          return (
            <tr key={review.id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {review.source}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {review.sentimentText}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {review.reviewText}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {review.rating}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Show
                </a>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
