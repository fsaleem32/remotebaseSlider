import React, { Fragment, useState, useEffect } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);
  const [slideDuration] = useState(3000);

  const backImageHandler = () => {
    if (activeIndex == 0) {
      setActiveIndex(catalogs.length - 1);
    } else {
      setActiveIndex((pre) => pre - 1);
    }
  };
  const nextImageHandler = () => {
    if (activeIndex == catalogs.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((pre) => pre + 1);
    }
  };

  const autoSliderHandler = (e) => {
    console.log("first");
    if (e.target.checked === true) {
      setSlideTimer(
        setInterval(() => {
          setActiveIndex((pre) => (pre === catalogs.length - 1 ? 0 : pre + 1));
        }, slideDuration)
      );
    }

    if (e.target.checked === false) {
      clearInterval(slideTimer);
    }
  };
  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            {console.log("next", activeIndex)}
            <Viewer catalogImage={catalogs?.[activeIndex]?.image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={() => backImageHandler()}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={() => nextImageHandler()}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            onChange={(e) => autoSliderHandler(e)}
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
