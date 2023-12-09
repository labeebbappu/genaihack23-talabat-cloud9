import { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:3000/reviews/all";

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

export default function ReviewTable() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("App Store");
  const [sentiment, setSentiment] = useState("Positive");

  // get reviews by axios
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(URL);
        const responseData = response?.data;
        setReviews(responseData);
        setFilteredReviews(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  useEffect(() => {
    const filtered = reviews.filter((review) => {
      return review.source === source && review.sentimentText === sentiment;
    });

    // search contains in review.reviewText
    const filtered2 = filtered.filter((review) => {
      return review.reviewText.includes(search);
    });

    setFilteredReviews(filtered2);
  }, [source, sentiment, search, reviews]);

  return (
    <>
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          onChange={(e) => setSource(e.target.value)}
        >
          <option>App Store</option>
          <option>Google Play</option>
          <option>Faceboob</option>
          <option>Twitter</option>
          <option>Instagram</option>
          <option>Youtube</option>
          <option>Reddit</option>
        </select>

        <select
          className="select select-bordered join-item"
          onChange={(e) => setSentiment(e.target.value)}
        >
          <option>Positive</option>
          <option>Very positive</option>
          <option>Neutral</option>
          <option>Negative</option>
          <option>Very negative</option>
        </select>

        <div className="indicator">
          <span className="indicator-item badge badge-secondary">new</span>
          <button className="btn join-item">Search</button>
        </div>
      </div>

    <div>

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
