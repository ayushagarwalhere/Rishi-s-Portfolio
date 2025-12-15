'use client';

import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import 'gsap/CSSPlugin';
import Background from './components/background';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

const page = () => {

  const heartRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    gsap.from("#navbar",
    {
      duration: 1,
      opacity: 0,
      y: -50,
    });
  }, []);


  useEffect(() => {
  if (!heartRef.current) return;

  gsap.set(heartRef.current, {
    strokeWidth: 2.5,
    drawSVG: "0%",
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
  });

  gsap.to(heartRef.current, {
    drawSVG: "100%",
    duration: 2,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true,
  });
  }, []);




  return (
    <div>
    <div>
      <Background />
      <div className='relative z-10 flex justify-center gap-9 pt-10 overflow-hidden'>

        <h1 id="navbar" className='text-black text-3xl font-general '>ABOUT</h1>
        <h1 id="navbar" className='text-black text-3xl font-general'>PORTFOLIO</h1>

        <div id="heart" className="flex justify-center bg-transparent">
          <svg viewBox="0 0 32 29.6" width="40" height="40">
          <path
            ref={heartRef}
            d="M23.6,0 c-3.4,0-6.4,2.1-7.6,5.1 C14.8,2.1,11.8,0,8.4,0 C3.8,0,0,3.8,0,8.4 c0,9.4,16,21.2,16,21.2 s16-11.8,16-21.2 C32,3.8,28.2,0,23.6,0 Z "
            fill="none"
            stroke="#ff4d6d"
            strokeWidth="1.8"
          />
          </svg>
        </div>

        <h1 id="navbar" className='text-black text-3xl font-general'>CONTACT</h1>
        <h1 id="navbar" className='text-black text-3xl font-general'>SERVICES</h1>
      </div>


      <div className='relative mt-20 flex justify-center '>
        <h1 className='text-center font-pop text-black/80 text-2xl'>Visual Stories By Rishi.</h1>
      </div>


    </div>
    </div>
  )
}

export default page
