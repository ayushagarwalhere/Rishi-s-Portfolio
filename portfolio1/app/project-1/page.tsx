"use client";
import Link from "next/link";
import dynamic from "next/dynamic";

const FashionGallery = dynamic(() => import("../components/Gallery/Gallery"), {
  ssr: false,
});

const project1 = () => {
  return (
    <div>
      <FashionGallery />
    </div>
  );
};
export default project1;
