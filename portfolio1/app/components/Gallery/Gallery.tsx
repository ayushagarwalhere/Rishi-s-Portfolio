"use client";

import React, { useEffect, useRef, useState } from "react";

interface GridItem {
  row: number;
  col: number;
  baseX: number;
  baseY: number;
  imageUrl: string;
  index: number;
}

interface ZoomState {
  isActive: boolean;
  selectedItem: GridItem | null;
}

const FashionGallery = () => {
  // Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const splitScreenRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const controlsContainerRef = useRef<HTMLDivElement>(null);
  const imageTitleOverlayRef = useRef<HTMLDivElement>(null);
  const scalingOverlayRef = useRef<HTMLDivElement>(null);

  // State
  const [config] = useState({
    itemSize: 320,
    baseGap: 16,
    rows: 8,
    cols: 12,
    currentZoom: 0.6,
    currentGap: 32,
  });

  const [zoomState, setZoomState] = useState<ZoomState>({
    isActive: false,
    selectedItem: null,
  });

  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [currentZoom, setCurrentZoom] = useState(0.6);
  const [currentGap, setCurrentGap] = useState(32);
  const [percentage, setPercentage] = useState(60);
  const [activeButton, setActiveButton] = useState("normal");
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Fashion images data
  const fashionImages = [
    "https://assets.codepen.io/7558/orange-portrait_01.jpg",
    "https://assets.codepen.io/7558/orange-portrait_02.jpg",
    "https://assets.codepen.io/7558/orange-portrait_03.jpg",
    "https://assets.codepen.io/7558/orange-portrait_04.jpg",
    "https://assets.codepen.io/7558/orange-portrait_05.jpg",
    "https://assets.codepen.io/7558/orange-portrait_06.jpg",
    "https://assets.codepen.io/7558/orange-portrait_07.jpg",
    "https://assets.codepen.io/7558/orange-portrait_08.jpg",
    "https://assets.codepen.io/7558/orange-portrait_09.jpg",
    "https://assets.codepen.io/7558/orange-portrait_10.jpg",
    "https://assets.codepen.io/7558/orange-portrait_01.jpg",
    "https://assets.codepen.io/7558/orange-portrait_02.jpg",
    "https://assets.codepen.io/7558/orange-portrait_15.jpg",
    "https://assets.codepen.io/7558/orange-portrait_14.jpg",
    "https://assets.codepen.io/7558/orange-portrait_13.jpg",
    "https://assets.codepen.io/7558/orange-portrait_12.jpg",
    "https://assets.codepen.io/7558/orange-portrait_11.jpg",
  ];

  // Image data for detail view
  const imageData = [
    {
      number: "01 / 96",
      title: "AUTUMN ESSENCE",
      description:
        "Capturing the warmth of golden hour. A contemporary take on classic silhouettes with modern detailing.",
    },
    {
      number: "02 / 96",
      title: "URBAN MINIMALIST",
      description:
        "Clean lines meet street style. Exploring the intersection of comfort and sophistication in everyday wear.",
    },
    {
      number: "03 / 96",
      title: "TIMELESS ELEGANCE",
      description:
        "Refined textures and muted tones. A collection that speaks to understated luxury and enduring style.",
    },
  ];

  // Calculate gap based on zoom level
  const calculateGapForZoom = (zoomLevel: number) => {
    if (zoomLevel >= 1.0) return 16;
    else if (zoomLevel >= 0.6) return 32;
    else return 64;
  };

  // Generate grid items
  const generateGridItems = () => {
    const items: GridItem[] = [];
    let imageIndex = 0;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        const x = col * (config.itemSize + currentGap);
        const y = row * (config.itemSize + currentGap);

        const imageUrl = fashionImages[imageIndex % fashionImages.length];
        imageIndex++;

        items.push({
          row,
          col,
          baseX: x,
          baseY: y,
          imageUrl,
          index: items.length,
        });
      }
    }

    setGridItems(items);
  };

  // Enter zoom mode
  const enterZoomMode = (itemData: GridItem) => {
    if (zoomState.isActive) return;
    setZoomState({ isActive: true, selectedItem: itemData });
    document.body.style.cursor = "default";
  };

  // Exit zoom mode
  const exitZoomMode = () => {
    setZoomState({ isActive: false, selectedItem: null });
    document.body.style.cursor = "grab";
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomState.isActive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    document.body.style.cursor = "grabbing";
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || zoomState.isActive) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  // Handle mouse up for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    if (!zoomState.isActive) {
      document.body.style.cursor = "grab";
    }
  };

  // Set zoom level
  const setZoom = (zoomLevel: number, buttonType: string) => {
    if (zoomState.isActive) {
      exitZoomMode();
      return;
    }

    const newGap = calculateGapForZoom(zoomLevel);
    setCurrentZoom(zoomLevel);
    setCurrentGap(newGap);
    setActiveButton(buttonType);
    setPercentage(Math.round(zoomLevel * 100));

    // Center the canvas
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const totalWidth = config.cols * (config.itemSize + newGap) - newGap;
    const totalHeight = config.rows * (config.itemSize + newGap) - newGap;
    const scaledWidth = totalWidth * zoomLevel;
    const scaledHeight = totalHeight * zoomLevel;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;
    setPosition({ x: centerX, y: centerY });
  };

  // Auto fit zoom
  const autoFitZoom = () => {
    if (zoomState.isActive) {
      exitZoomMode();
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight - 80;
    const currentGapCalc = calculateGapForZoom(1.0);

    const gridWidth =
      config.cols * (config.itemSize + currentGapCalc) - currentGapCalc;
    const gridHeight =
      config.rows * (config.itemSize + currentGapCalc) - currentGapCalc;

    const margin = 40;
    const availableWidth = vw - margin * 2;
    const availableHeight = vh - margin * 2;

    const zoomToFitWidth = availableWidth / gridWidth;
    const zoomToFitHeight = availableHeight / gridHeight;
    const fitZoom = Math.min(zoomToFitWidth, zoomToFitHeight);
    const finalFitZoom = Math.max(0.1, Math.min(2.0, fitZoom));

    setZoom(finalFitZoom, "fit");
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomState.isActive && e.key === "Escape") {
        exitZoomMode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [zoomState.isActive, isDragging, dragStart]);

  // Initialize on mount
  useEffect(() => {
    generateGridItems();

    // Center the canvas initially
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const totalWidth =
      config.cols * (config.itemSize + currentGap) - currentGap;
    const totalHeight =
      config.rows * (config.itemSize + currentGap) - currentGap;
    const scaledWidth = totalWidth * currentZoom;
    const scaledHeight = totalHeight * currentZoom;
    const centerX = (vw - scaledWidth) / 2;
    const centerY = (vh - scaledHeight) / 2;
    setPosition({ x: centerX, y: centerY });
  }, [currentGap, currentZoom]);

  const totalWidth = config.cols * (config.itemSize + currentGap) - currentGap;
  const totalHeight = config.rows * (config.itemSize + currentGap) - currentGap;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden"
      style={{
        cursor: zoomState.isActive
          ? "default"
          : isDragging
          ? "grabbing"
          : "grab",
      }}
    >
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          user-select: none;
        }

        .grid-item {
          position: absolute;
          width: 320px;
          height: 320px;
          overflow: hidden;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .grid-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .description-line {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 16px;
          font-weight: 300;
          line-height: 1.4;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 900px) {
          .description-line {
            font-size: 14px;
          }
        }

        .switch-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-family: monospace;
          font-size: 0.75em;
          font-weight: 400;
          text-transform: uppercase;
          padding: 5px 10px;
          position: relative;
          transition: all 0.3s ease-in-out;
          white-space: nowrap;
        }

        .switch-button-current {
          color: #f0f0f0;
        }

        .indicator-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: #f0f0f0;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          top: 50%;
          transform: translateY(-50%);
          left: -8px;
        }

        .switch-button:hover .indicator-dot {
          opacity: 1;
        }
      `}</style>

      {/* Viewport */}
      <div ref={viewportRef} className="fixed top-0 left-0 w-full h-full">
        {/* Canvas Wrapper */}
        <div
          ref={canvasWrapperRef}
          className="absolute"
          style={{
            transformOrigin: "0 0",
            transform: `translate(${position.x}px, ${position.y}px) scale(${currentZoom})`,
            width: `${totalWidth}px`,
            height: `${totalHeight}px`,
            transition: isDragging ? "none" : "transform 0.6s ease-out",
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Grid Container */}
          <div ref={gridContainerRef} className="relative w-full h-full">
            {gridItems.map((item, idx) => (
              <div
                key={idx}
                data-index={idx}
                className="grid-item"
                style={{
                  left: `${item.baseX}px`,
                  top: `${item.baseY}px`,
                }}
                onClick={() => enterZoomMode(item)}
              >
                <img src={item.imageUrl} alt={`Fashion ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      {zoomState.isActive && (
        <div
          ref={splitScreenRef}
          className="fixed top-0 left-0 w-screen h-screen flex z-2 animate-fadeIn"
        >
          <div
            className="relative w-1/2 h-screen flex justify-center items-center z-1 cursor-pointer"
            style={{ background: "rgba(0, 0, 0, 0.6)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) exitZoomMode();
            }}
          >
            <div className="w-full h-full relative flex items-center justify-center z-1 p-8">
              {zoomState.selectedItem && (
                <img
                  src={zoomState.selectedItem.imageUrl}
                  alt="Selected"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>

          <div
            className="relative w-1/2 h-screen flex justify-center items-center z-1 cursor-pointer"
            style={{ background: "rgba(0, 0, 0, 0.6)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) exitZoomMode();
            }}
          />
        </div>
      )}

      {/* Image Title Overlay */}
      {zoomState.isActive && zoomState.selectedItem && (
        <div
          ref={imageTitleOverlayRef}
          className="fixed bottom-10 left-10 z-4 animate-fadeIn"
        >
          <div className="relative w-100 mb-2 overflow-hidden">
            <span className="text-white font-mono text-xs font-normal uppercase tracking-wider">
              {
                imageData[zoomState.selectedItem.index % imageData.length]
                  .number
              }
            </span>
          </div>

          <div className="relative w-100 mb-4 overflow-hidden">
            <h1 className="text-white text-5xl font-medium tracking-tight leading-tight">
              {imageData[zoomState.selectedItem.index % imageData.length].title}
            </h1>
          </div>

          <div className="relative w-100 min-h-20 overflow-hidden">
            <span className="description-line">
              {
                imageData[zoomState.selectedItem.index % imageData.length]
                  .description
              }
            </span>
          </div>
        </div>
      )}

      {/* Close Button */}
      {zoomState.isActive && (
        <button
          ref={closeButtonRef}
          onClick={exitZoomMode}
          className="fixed top-1/2 right-5 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-5 cursor-pointer hover:opacity-70 transition-opacity animate-fadeIn"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M20 32H44M44 32L36 24M44 32L36 40"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Controls Container */}
      <div
        ref={controlsContainerRef}
        className={`fixed bottom-5 z-6 flex gap-0 transition-all duration-1000 ${
          zoomState.isActive ? "left-3/4" : "left-1/2"
        } -translate-x-1/2`}
      >
        {/* Percentage Indicator */}
        <div
          className="percentage-indicator px-5 py-2.5 rounded flex items-center justify-center font-mono text-xs font-normal uppercase min-w-[5em] whitespace-nowrap"
          style={{
            backgroundColor: "#f0f0f0",
            backgroundImage:
              "radial-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 0)",
            backgroundSize: "0.44em 0.44em",
            backgroundPosition: "-0.06em -0.06em",
            color: "#333",
          }}
        >
          {percentage}%
        </div>

        {/* Zoom Controls */}
        <div
          className="switch flex gap-5 px-5 py-2.5 rounded transition-all"
          style={{
            backgroundColor: "#222",
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 0)",
            backgroundSize: "0.44em 0.44em",
            backgroundPosition: "-0.06em -0.06em",
          }}
        >
          <button
            className={`switch-button ${
              activeButton === "zoom-out" ? "switch-button-current" : ""
            }`}
            onClick={() => setZoom(0.3, "zoom-out")}
          >
            <span className="indicator-dot"></span>
            ZOOM OUT
          </button>
          <button
            className={`switch-button ${
              activeButton === "normal" ? "switch-button-current" : ""
            }`}
            onClick={() => setZoom(0.6, "normal")}
          >
            <span className="indicator-dot"></span>
            NORMAL
          </button>
          <button
            className={`switch-button ${
              activeButton === "zoom-in" ? "switch-button-current" : ""
            }`}
            onClick={() => setZoom(1.0, "zoom-in")}
          >
            <span className="indicator-dot"></span>
            ZOOM IN
          </button>
          <button
            className={`switch-button ${
              activeButton === "fit" ? "switch-button-current" : ""
            }`}
            onClick={autoFitZoom}
          >
            <span className="indicator-dot"></span>
            FIT
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FashionGallery;
