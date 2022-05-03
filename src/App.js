import React, { useState, useEffect } from "react";
import "./styles.scss";
import ReactPageScoller from "react-page-scroller";
import ScrollAnimation from "react-animate-on-scroll";
import {
  disableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";

const contentList = [
  "Home-banner",
  <div>
    <h2>Movie-block</h2>{" "}
  </div>,
  "How-it-works"
];

const NonFullScrollContent = (props) => {
  console.log("render NonFullScrollContent");
  return Array(3)
    .fill(true)
    .map((ele, i) => (
      <div className="block red" key={i}>
        <ScrollAnimation duration={5} animateIn="hinge" initiallyVisible={true}>
          <h1>duration</h1>
        </ScrollAnimation>{" "}
      </div>
    ));
};

export default function App() {
  const [pageNum, setPageNum] = useState(window.pageYOffset === 0 ? 0 : 2);
  const [showAnim, setShowAnim] = useState(true);
  const isTop = window.pageYOffset === 0;

  // useEffect(() => {
  //   window.onload = function() {
  //     setTimeout(function() {
  //       scrollTo(0, 0);
  //     }, 100); //100ms for example
  //   };
  // }, []);

  useEffect(() => {
    console.log({ isTop });
    if (isTop) {
      console.log("unlock");
      clearAllBodyScrollLocks();
    } else {
      console.log("lock");
      disableBodyScroll();
    }
  }, [isTop]);

  console.log("Rendering");
  return (
    <div className="App">
      {showAnim && <NonFullScrollContent />}
      <ReactPageScoller
        containerHeight="calc(100vh - 0px)"
        blockScrollUp={window.pageXOffset !== 0}
        transitionTimingFunction="linear"
        // animationTimer={750}
        pageOnChange={(num) => {
          if (num === 0) {
            setShowAnim(true);
            clearAllBodyScrollLocks();
          } else {
            setPageNum(num);
            setShowAnim(false);
            setTimeout(() => {
              console.log("disableBodyScroll");
              disableBodyScroll();
            }, 1000);
          }

          console.log(num);
        }}
        customPageNumber={pageNum}
      >
        {contentList.map((ele, i) => (
          <div className="block" key={i}>
            {i !== 0 && (
              <>
                <h3> Block{i + 1}</h3>
                {ele}
              </>
            )}
          </div>
        ))}
      </ReactPageScoller>
    </div>
  );
}
