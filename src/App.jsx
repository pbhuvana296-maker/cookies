import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

import cookie from "./assets/cookie.png";
import cookie1 from "./assets/cookie1.png";
import cookie2 from "./assets/cookie2.png";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const sectionRef = useRef(null);
  const movingCookieRef = useRef(null);
  const centerRef = useRef(null);
  const oRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const movingCookie = movingCookieRef.current;
    const center = centerRef.current;
    const oLetter = oRef.current;

    if (!section || !movingCookie || !center || !oLetter) {
      return;
    }

    const ctx = gsap.context(() => {
      const getPositions = () => {
        const sectionRect = section.getBoundingClientRect();
        const movingRect = movingCookie.getBoundingClientRect();
        const oRect = oLetter.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();

        const startX =
          oRect.left +
          oRect.width / 2 -
          sectionRect.left -
          movingRect.width / 2;

        const startY =
          oRect.top +
          oRect.height / 2 -
          sectionRect.top -
          movingRect.height / 2;

        const endX =
          centerRect.left +
          centerRect.width / 2 -
          sectionRect.left -
          movingRect.width / 2;

        const endY =
          centerRect.top +
          centerRect.height / 2 -
          sectionRect.top -
          movingRect.height / 2;

        return {
          startX,
          startY,
          endX,
          endY,
        };
      };

      let positions = getPositions();

      gsap.set(movingCookie, {
        x: positions.startX,
        y: positions.startY,
        scale: 0.65,
        rotation: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1600",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(movingCookie, {
        x: () => {
          positions = getPositions();
          return positions.endX;
        },

        y: () => {
          positions = getPositions();
          return positions.endY;
        },

        scale: 1,

        rotation: 1080,

        ease: "none",
      });

      const handleResize = () => {
        positions = getPositions();

        gsap.set(movingCookie, {
          x: positions.startX,
          y: positions.startY,
          scale: 0.65,
          rotation: 0,
        });

        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="cookie-page">

      {/* =================================
          HERO
      ================================= */}

      <section
        className="cookie-hero"
        ref={sectionRef}
      >

        {/* BACKGROUND IMAGE */}

        <div className="hero-background"></div>

        {/* LIGHT OVERLAY */}

        <div className="hero-overlay"></div>


        {/* =================================
            TOP LABEL
        ================================= */}

        <div className="top-label">

          <span></span>

          <p>FRESHLY BAKED</p>

          <span></span>

        </div>


        {/* =================================
            MAIN TITLE
        ================================= */}

        <h1 className="cookie-title">

          C

          <span
            ref={oRef}
            className="o-letter"
          >
            O
          </span>

          OKIES

        </h1>


        {/* =================================
            SUB TITLE
        ================================= */}

        <div className="under-title">

          <span>HANDCRAFTED</span>

          <b>•</b>

          <span>EVERY DAY</span>

        </div>


        {/* =================================
            LEFT CONTENT
        ================================= */}

        <div className="intro">

          <p className="collection">
            OUR SPECIAL COLLECTION
          </p>

          <h2>
            Taste the
            <br />
            Difference.
          </h2>

          <p className="description">
            Freshly baked cookies made with
            rich ingredients, delicious
            chocolate and a whole lot of love.
          </p>

          <div className="small-line"></div>

        </div>


        {/* =================================
            THREE COOKIES
        ================================= */}

        <div className="cookie-row">


          {/* FIRST COOKIE */}

          <div className="cookie-card">

            <span className="number">
              01
            </span>

            <div className="cookie-space">

              <img
                src={cookie}
                alt="Classic Cookie"
              />

            </div>

            <div className="cookie-info">

              <h3>CLASSIC</h3>

              <p>
                Chocolate Chip
              </p>

            </div>

          </div>


          {/* SECOND / CENTER COOKIE */}

          <div className="cookie-card">

            <span className="number">
              02
            </span>

            <div
              className="cookie-space center-space"
              ref={centerRef}
            >

              <div className="empty-space"></div>

            </div>

            <div className="cookie-info">

              <h3>YOUR PICK</h3>

              <p>
                Freshly Baked
              </p>

            </div>

          </div>


          {/* THIRD COOKIE */}

          <div className="cookie-card">

            <span className="number">
              03
            </span>

            <div className="cookie-space">

              <img
                src={cookie2}
                alt="Signature Cookie"
              />

            </div>

            <div className="cookie-info">

              <h3>SIGNATURE</h3>

              <p>
                Double Chocolate
              </p>

            </div>

          </div>

        </div>


        {/* =================================
            MOVING COOKIE
            cookie1.png
        ================================= */}

        <img
          ref={movingCookieRef}
          src={cookie1}
          alt="Moving Cookie"
          className="moving-cookie"
        />


        {/* =================================
            SCROLL INDICATOR
        ================================= */}

        <div className="scroll">

          <div className="scroll-line"></div>

          <span>01</span>

          <p>
            SCROLL TO EXPLORE
          </p>

        </div>


        {/* =================================
            BOTTOM
        ================================= */}

        <div className="bottom">

          <div>

            <span>
              BAKED WITH CARE
            </span>

            <strong>
              EST. 2026
            </strong>

          </div>

          <div className="bottom-right">

            CHOCOLATE

            <b>×</b>

            LOVE

          </div>

        </div>

      </section>


      {/* =================================
          NEXT SECTION
      ================================= */}

      <section className="next-section">

        <p>
          FRESH • WARM • DELICIOUS
        </p>

        <h2>
          Every bite tells a story.
        </h2>

      </section>

    </div>
  );
}

export default App;