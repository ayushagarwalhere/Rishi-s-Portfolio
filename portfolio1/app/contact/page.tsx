"use client";
import Link from "next/link";

import React from "react";

const BlobImage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-radial from-[#F4C6A5] via-[#F9D9C2] to-[#FFF3E9]">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");

        .blob-svg {
          max-width: 40vw;
          max-height: 70vh;
          aspect-ratio: 1/1;
        }

        .blob-svg #blobClip {
          transform-origin: center;
          transition: transform 0.3s ease;
        }

        .blob-svg:hover #blobClip {
          transform: scale(1.15) translate(0%, 0%);
        }

        .text-content {
          font: 700 10px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial,
            sans-serif;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          fill: black;
          transition: fill 0.3s ease;
        }

        .blob-svg:hover .text-content {
          fill: #f94449;
        }

        .bg-gradient-radial {
          background: radial-gradient(
            circle at 50% 50%,
            #f4c6a5 0%,
            #f9d9c2 10%,
            #fff3e9 30%
          );
        }
      `}</style>

      {/* Left Column - Contact & Social Information */}
      <div className="w-1/2 flex items-center justify-center p-12 font-montserrat">
        <div className="">
          <h3 className="text-4xl sm:text-2xl md:text-3xl font-bold font-gro mb-8 text-[#333]">
            Thanks for your interest in my work
          </h3>
          <h2 className="text-xl sm:text-sm md:text-lg font-sans text-black">
            For general or work inquiries, collaborating, or if you wanna just
            say hi, don’t hesitate to contact.
          </h2>
          <br></br>

          {/* Email */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">✉️</span>
            <a
              href="mailto:photographer@email.com"
              className="text-base text-[#333] hover:text-[#ef5350] transition-colors duration-300 hover:underline font-medium"
            >
              photographer@email.com
            </a>
          </div>

          {/* Phone */}
          <div className="mb-8 flex items-center gap-3">
            <span className="text-2xl">📱</span>
            <a
              href="tel:+1234567890"
              className="text-base text-[#333] hover:text-[#ef5350] transition-colors duration-300 hover:underline font-medium"
            >
              +1 (234) 567-890
            </a>
          </div>

          {/* Social Media Links */}
          <div className="mt-8 pt-8 border-t-2 border-[#333]/10">
            <h4 className="text-xl font-semibold mb-6 text-[#333]">
              Follow Me
            </h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden"
                title="Instagram"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden"
                title="Twitter"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
                  alt="Twitter"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden"
                title="LinkedIn"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                  alt="LinkedIn"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden"
                title="Facebook"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                  alt="Facebook"
                  className="w-full h-full object-cover"
                />
              </a>

              {/* Website/Portfolio */}
              <a
                href="https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 shadow-md overflow-hidden"
                title="Website"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Globe_icon_2.svg/240px-Globe_icon_2.svg.png"
                  alt="Website"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Blob Image */}
      <div className="w-1/2 flex items-center justify-center">
        <svg
          className="blob-svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="t"
        >
          <image
            href="/images/about.webp"
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#blobClip)"
          />

          <clipPath id="blobClip">
            <path
              d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
              transform="translate(100 100)"
            />
          </clipPath>

          <path
            className="blob"
            d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
            transform="translate(100 100)"
            fill="url(#imgFill)"
          />

          <path
            id="text"
            d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
            transform="translate(100 100)"
            fill="none"
            stroke="none"
            pathLength="100"
          />

          <text className="text-content">
            <textPath href="#text" startOffset="0%">
              ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH
              LOVE
              <animate
                attributeName="startOffset"
                from="0%"
                to="100%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
            <textPath href="#text" startOffset="100%">
              ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH
              LOVE
              <animate
                attributeName="startOffset"
                from="-100%"
                to="0%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");

        .font-montserrat {
          font-family: "Montserrat", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default BlobImage;
