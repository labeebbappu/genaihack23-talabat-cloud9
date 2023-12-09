// sample reviews of app store for food delivery app with random usernames, ratings and time between last 3 months
 

import { ExcelRenderer } from "react-excel-renderer";
import { useState, useEffect } from "react";
import axios from "axios";

const httpServer = import.meta.env.VITE_SERVER_HTTP;
const URL = httpServer + "/reviews/bulkadd";

function generateRandomDate() {
  // Get the current date
  const now = new Date();

  // user ref for file input

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
  const [reviewSource, setReviewSource] = useState("App Store");
  const [uploading, setUploading] = useState(false);
  const [uploadSucces, setUploadSucces] = useState(false);

  const uploadReviews = async ({ newReviews }) => {
    try {
      setUploading(true);
      const response = await axios.post(URL,
        {
          newReviews,
          reviewSource,
        }
      );
      setUploading(false);
      const responseData = response?.data;

      if (responseData.status === "OK") {
        setUploadSucces(true);

        setTimeout(() => {
          setUploadSucces(false);
        }, 7000);
      }

      console.log(responseData);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setFileName(fileObj.name);
        setCols(resp.cols);
        setRows(resp.rows);
        // clear
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

      if (reviews.length > 0) {
        uploadReviews({ newReviews: reviews });
        setTimeout(() => {
          setFileName("");
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, rows]);

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse" style={{ maxWidth: '800px', width: '800px' }} >
          <div className="w-full">
            <h1 className="text-5xl font-bold">Upload your reviews!</h1>
            <p className="py-6">
              {" "}
              we do excel format as of now, the api support comming soon!{" "}
            </p>
            <div className="flex gap-2">
              <select
                className="select select-bordered w-full max-w-xs ml-3"
                onChange={(e) => setReviewSource(e.target.value)}
              >
                <option>App Store</option>
                <option>Google Play</option>
                <option>Fecebook</option>
                <option>Twitter</option>
                <option>Instagram</option>
                <option>Youtube</option>
                <option>Reddit</option>
              </select>
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-xs"
                onChange={fileHandler}
              />
            </div>

            <div style={{ minHeight: '100px'}} className="w-full" > 
            {fileName || uploading  ? (
              <>
              <div className=" ">
                Processing {rows.length - 1} records from {fileName} and{" "}
                {reviews.length} records to the server
              </div>
              <progress className="progress w-full"></progress>
              </>
            ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-base-200  w-full flex justify-center ">
        <div className="max-w-6xl px-4">
          {/* Uploading 23 records from fileName */}

          <div className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0">
            <a
              data-sveltekit-preload-data=""
              href="/"
              className="btn md:btn-lg md:btn-wide group px-12"
            >
              <span className="hidden sm:inline">Intro</span>{" "}
             
            </a>{" "}
            <a
              data-sveltekit-preload-data=""
              href="/dashboard"
              className="btn btn-neutral md:btn-lg md:btn-wide group px-12"
            >
              Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 md:inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>

          <div className="min-h-screen">
            {uploadSucces ? (
              <>
                <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35]">
                  <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20">
                    Yummy, review are ready
                  </span>{" "}
                  <br />{" "}
                  <span className="inline-grid">
                    <span
                      className="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
                      aria-hidden="true"
                      data-text="component library"
                    />{" "}
                    <span className="[&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]">
                      experience the magic
                    </span>
                  </span>{" "}
                  <br />{" "}
                  <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20">
                    in our dashboard
                  </span>
                </h1>
              </>
            ) : null}
          </div>

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
