"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WaveText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const srcTxtRef = useRef<HTMLDivElement>(null);
  const topTxtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const srcTxt = srcTxtRef.current;
    const topTxt = topTxtRef.current;
    const wrapper = wrapperRef.current;

    if (!srcTxt || !topTxt || !wrapper) return;

    const txtContent = srcTxt.textContent || "";
    const bb = srcTxt.getBoundingClientRect();

    topTxt.innerHTML = "";

    for (let i = 0; i <= bb.width * 0.55; i++) {
      const div = document.createElement("div");
      topTxt.appendChild(div);

      gsap.set(div, {
        position: "absolute",
        width: 4,
        height: bb.height,
        x: i * 2,
        y: -bb.height,
        textIndent: -i * 2,
        overflow: "hidden",
        color: "#fff",
        whiteSpace: "nowrap",
        textContent: txtContent,
      });
    }

    gsap.set(wrapper, {
      rotate: -50,
      skewY: 22,
      scaleX: 0.75,
    });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.25, ease: "power3.inOut" },
    }).to(".top-txt > div", {
      y: "-=33",
      stagger: {
        amount: 1,
        yoyo: true,
        repeat: 1,
        ease: "none",
      },
    });

    gsap.timeline()
      .fromTo(tl, { progress: 0.9 }, { progress: 0.1, duration: 1.5 })
      .to(tl, { progress: 0.4, duration: 4, ease: "elastic.out(0.8)" });

    const move = (e: PointerEvent) => {
      const xp = e.clientX / window.innerWidth;
      gsap.to(tl, { progress: xp, overwrite: true });
      gsap.to(wrapper, {
        x: gsap.utils.mapRange(0, 1, 30, -30, xp),
        y: gsap.utils.mapRange(0, 1, -30, 30, xp),
      });
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-[#0e100f]">
      <div
        ref={wrapperRef}
        className="wrapper whitespace-nowrap text-black/20"
      >
        <div
          ref={srcTxtRef}
          className="src-txt relative text-xl font-bold"
        >
          PORTFOLIO
        </div>
        <div
          ref={topTxtRef}
          className="top-txt relative select-none pointer-events-none"
        />
      </div>
    </div>
  );
}

