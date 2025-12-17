"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current || !textRef.current) return;

    const img = imageRef.current;
    const section = sectionRef.current;
    const textDiv = textRef.current;

    let rect: DOMRect;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const clippedHeightPortion = 0.53;
    const clippedWidthPortion = 0.67;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        anticipatePin: 1,

        onEnter: () => {
          rect = img.getBoundingClientRect();

          const scaleValueY = vh / (rect.height * clippedHeightPortion);
          const scaleValueX = vw / (rect.width * clippedWidthPortion);

          gsap.set(img, {
            position: "fixed",
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            margin: 0,
            zIndex: -1,
          });

          tl.clear();

          tl.to(img, {
            x: vw / 2 - (rect.left + rect.width / 2),
            y: vh / 2 - (rect.top + rect.height / 2),
            clipPath: "polygon(0 23%, 100% 23%, 100% 76%, 0 76%)",
            ease: "none",
            duration: 1,
          });

          tl.to(img, {
            scaleX: scaleValueX - 7,
            scaleY: scaleValueY,
            transformOrigin: "50% 50%",
            ease: "none",
            duration: 2,
          });

          tl.to(
            textDiv,
            {
              color: "#fff",
              duration: 0.5,
              ease: "none",
            },
            "<"
          );
        },

        onLeaveBack: () => {
          gsap.set(textDiv, { color: "#171717" });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-blue-100 overflow-hidden"
    >
      <div
        ref={textRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center text-black font-gro"
      >
        <h1 className="text-[8vw] font-extrabold leading-none">FROM VISION</h1>

        <h1 className="flex items-center gap-[1.2vw] text-[8vw] font-extrabold leading-none whitespace-nowrap">
          <span>TO &nbsp;</span>

          <img
            ref={imageRef}
            src="/images/about-bg.webp"
            alt=""
            className="w-[7vw] h-[7vw] object-cover"
            style={{
              clipPath: "polygon(25% 0, 92% 0, 75% 100%, 5% 100%)",
            }}
            draggable={false}
          />

          <span>&nbsp; GLOBAL</span>
        </h1>

        <h1 className="text-[8vw] font-extrabold leading-none">IMPACT</h1>
      </div>
    </section>
  );
};

export default About;
