"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const fixedPath = "M 10 100 Q 500 100 990 100";
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    if (!svg || !pathEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const newPath = `M 10 100 Q ${x} ${y} 990 100`;
      gsap.to(pathEl, {
        attr: { d: newPath },
        ease: "power3.out",
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(pathEl, {
        attr: { d: fixedPath },
        ease: "elastic.out(1.5,0.2)",
        duration: 1,
      });
      audioRef.current?.play();
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    <div className="w-screen min-h-screen overflow-hidden">
      <section
        ref={sectionRef}
        id="about"
        className="relative min-h-screen bg-blue-100 overflow-hidden"
      >
        <div
          ref={textRef}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center text-black font-gro overflow-hidden"
        >
          <h1 className="text-[8vw] font-extrabold leading-none">
            FROM VISION
          </h1>

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

      <section className="w-screen min-h-screen bg-white flex justify-center items-center overflow-hidden">
        <div className="flex justify-center items-center w-screen h-screen bg-white">
          <div className="flex gap-0 h-3/4 w-screen bg-zinc-200">
            <img
              src={"/images/about.webp"}
              alt="About Image"
              className="relative right-20 w-8/12 h-full object-contain scale-75"
            />

            <div className="flex flex-col">
              <h1 className="text-black font-gro text-5xl mt-10">MEET RISHI</h1>

              <div className="relative bottom-20 height-80 w-auto">
                <svg ref={svgRef} id="string">
                  <path
                    ref={pathRef}
                    d="M 10 100 Q 500 100 990 100"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <audio ref={audioRef} src="/audios/about.m4a" />
              </div>

              <h1 className="relative bottom-20 text-black font-sans text-xl font-light italic">
                Desalanka Rishi, currently a mechanical engineering student at
                NIT-Hamirpur is a passionate photographer from Vishakhapatnam,
                India. To capture an emotion and story filled with magic and
                dreams is his gift.
                <br></br> <br></br>
                He is recognised for his simplicity and his humble behaviour.
                His work has been featured in various exhibitions and
                publications.
                <br></br>
                Rishi believes in the power of visual storytelling to create a
                lasting impact. He's driven to find the quiet beauty in everyday
                life. His passion lies in freezing fleeting emotions, creating
                images that feel both intimate and grand.
                <br></br>
                He also has one superpower of anticipating genuine moments
                before they happen, ensuring nothing meaningful is missed.
                <br></br> <br></br>
                Rishi is available for public (or virtual) presentations,
                photo-shoot bookings and licensing images.
                <br></br>
                If you’re interested in working together, please get in touch
                via his contact form or email 24bme110@nith.ac.in
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
