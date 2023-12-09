// sample reviews of app store for food delivery app with random usernames, ratings and time between last 3 months
const user_reviews = [
  {
    rating: 5,
    username: "John Doe",
    time: "2023-07-01T12:00:00Z",
    review: "This is the best app ever!",
    reviewId: "123",
  },
  {
    rating: 4,
    username: "Jane Doe",
    time: "2023-06-01T12:00:00Z",
    review: "my food was delivered on time",
    reviewId: "124",
  },
  {
    rating: 3,
    username: "John Smith",
    time: "2023-05-01T12:00:00Z",
    review: "I like the app but the delivery was late",
    reviewId: "125",
  },
  {
    rating: 2,
    username: "Jane Smith",
    time: "2023-04-01T12:00:00Z",
    review: "I like the app but the delivery was late",
    reviewId: "126",
  },
];

import { ExcelRenderer } from "react-excel-renderer";
import { useState, useEffect } from "react";

function generateRandomDate() {
  // Get the current date
  const now = new Date();

  // Calculate the date three months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  // Generate a random date within the last three months
  return new Date(
    threeMonthsAgo.getTime() +
      Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  );
}

export default function Reviews() {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [fileName, setFileName] = useState("");

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setFileName(fileObj.name);
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };
  useEffect(() => {
    // console.log("cols", cols);
    // console.log("rows", rows);

    if (rows.length > 0) {
      const reviews = rows.map((row) => {
        return {
          rating: row[2],
          username: row[1],
          time: generateRandomDate().toISOString(),
          review: row[3],
          reviewId: row[0] || Math.random().toString(36).substr(2, 9),
        };
      });

      // remove the first row which is the header
      reviews.shift();

      setReviews(reviews);
    }
  }, [cols, rows]);

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div>
            <h1 className="text-5xl font-bold">Upload your reviews!</h1>
            <p className="py-6">
              {" "}
              we do excel format as of now, the api support comming soon!{" "}
            </p>
            <div className="flex gap-2">
              <select className="select select-bordered w-full max-w-xs ml-3">
                <option>App Store</option>
                <option>Google Play</option>
                <option>Faceboob Reviews/commands</option>
                <option>Twitter Reviews/commands</option>
                <option>Instagram Reviews/commands</option>
                <option>Youtube Reviews/commands</option>
                <option>Reddit Reviews/commands</option>
              </select>
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-xs"
                onChange={fileHandler}
              />
            </div>

            {fileName && (
              <div className=" ">
                Processing {rows.length - 1} records from {fileName} 
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="min-h-screen bg-base-200  w-full flex justify-center ">
        <div className="max-w-6xl px-4">
            {/* Uploading 23 records from fileName */}
            
            

          {/* <div className="overflow-x-auto">
            <table className="table">
             
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.username}</td>
                    <td>{review.rating}</td>
                    <td>{review.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </>
  );
}
