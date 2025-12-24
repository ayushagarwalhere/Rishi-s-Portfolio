"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Wind from "../components/windplane";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function scrambleText(el: HTMLElement, finalText: string, duration = 3000) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  let frame = 0;
  const totalFrames = Math.floor(duration / 8);
  const original = finalText.split("");

  const interval = setInterval(() => {
    const progress = frame / totalFrames;

    el.innerText = original
      .map((char, i) => {
        if (i < progress * original.length) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    frame++;

    if (frame >= totalFrames) {
      clearInterval(interval);
      el.innerText = finalText;
    }
  }, 16);
}

const PortfolioPage = () => {
  useEffect(() => {
    const title = document.querySelector(
      ".scramble-title"
    ) as HTMLElement | null;

    if (title) {
      scrambleText(title, "PORTFOLIO", 900);
    }

    const proxy = { skew: 0 };
    const clamp = gsap.utils.clamp(-20, 20);
    const skewSetter = gsap.quickSetter(".skewCard", "skewY", "deg");

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    gsap.set(".skewCard", {
      transformOrigin: "right center",
      force3D: true,
    });
  }, []);

  const projects = [
    { title: "PROJECT 1", link: "/project-1", image: "/images/about.jpg" },
    { title: "PROJECT 2", link: "/project-2", image: "/images/about.jpg" },
    { title: "PROJECT 3", link: "/project-3", image: "/images/about.jpg" },
    { title: "PROJECT 4", link: "/project-4", image: "/images/about.jpg" },
    { title: "PROJECT 5", link: "/project-5", image: "/images/about.jpg" },
    { title: "PROJECT 6", link: "/project-6", image: "/images/about.jpg" },
    { title: "PROJECT 7", link: "/project-7", image: "/images/about.jpg" },
    { title: "PROJECT 8", link: "/project-8", image: "/images/about.jpg" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden z-10 bg-[#0e100f]">
      <div className="flex justify-center align-middle items-center z-20">
        <h1 className="scramble-title text-7xl font-gro tracking-widest text-white select-none">
          PORTFOLIO
        </h1>
      </div>

      <Wind />

      <div className="pt-28 relative left-20 flex flex-col items-center justify-center min-h-screen">
        <div className="relative max-w-screen min-h-screen grid grid-cols-1 md:grid-cols-4 gap-y-16 gap-x-24 items-center">
          {projects.map((project, i) => (
            <React.Fragment key={i}>
              <div className="relative h-[50vh] w-80 bg-white/10 border-2 border-white/20 backdrop-blur-md rounded-lg shadow-lg shadow-white/20 p-4 skewCard">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-center gap-3">
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h2>
                <Link href={project.link}>
                  <button className="w-fit px-4 py-1.5 bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-md hover:bg-white hover:text-black transition-all text-sm">
                    SEE MORE
                  </button>
                </Link>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
