 
import { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";


export default function Home() {
  // const [count, setCount] = useState(0)

  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };

  useEffect(() => {
    console.log("cols", cols);
    console.log("rows", rows);
  }, [cols, rows]);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://expedition-storage-s3.s3.eu-central-1.amazonaws.com/public/app-images/company-logos/background2.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <div>
              <div className="flex flex-col items-center gap-6 xl:flex-row">
                <div data-tip="copy" className="tooltip tooltip-accent"></div>{" "}
                <div className="flex gap-2 font-mono text-xs"></div>
              </div>{" "}
              <div className="h-4" />{" "}
              <h1 className="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] [word-break:auto-phrase] xl:w-[115%] xl:text-start [:root[dir=rtl]_&]:leading-[1.35]">
                <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20">
                  Tap into the
                </span>{" "}
                <br />{" "}
                <span className="inline-grid">
                  <span
                    className="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text blur-xl [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
                    aria-hidden="true"
                    data-text="component library"
                  />{" "}
                  <span
                    className="[&::selection]:text-base-content relative col-start-1 row-start-1 "
                    style={{ color: "#dd5c35" }}
                  >
                    power of <br />
                    user reviews
                  </span>
                </span>{" "}
                <br />{" "}
                <span className="[&::selection]:text-base-content brightness-150 contrast-150 [&::selection]:bg-blue-700/20"></span>
              </h1>{" "}
              <div>
                <div className="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0">
                  <button
                    className="btn glass"
                    style={{
                      marginTop: "20px",
                      color: "#fff",
                      backgroundColor: "#dd5c35",
                    }}
                  >
                    {"    "}
                    Get Started{"    "}
                  </button>
                </div>
              </div>
            </div>

            {/* 
            <input
            style={{
              color: "#fff",
              backgroundColor: "#dd5c35",
            }}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={fileHandler.bind(this)}
            /> */}

           
          </div>
        </div>
      </div>
    </>
  );
}
  