// Purpose: Landing page component with 3D marquee showcasing video library
"use client";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDMarquee } from "./ui/3d-marquee";

export default function LandingPage() {
  const navigate = useNavigate();
  
  // Using your video library thumbnail images
  const images = [
    "https://picsum.photos/seed/video1/300/200",
    "https://picsum.photos/seed/video2/300/200", 
    "https://picsum.photos/seed/video3/300/200",
    "https://picsum.photos/seed/video4/300/200",
    "https://picsum.photos/seed/video5/300/200",
    "https://picsum.photos/seed/video6/300/200",
    "https://picsum.photos/seed/video7/300/200",
    "https://picsum.photos/seed/video8/300/200",
    "https://picsum.photos/seed/video9/300/200",
    "https://picsum.photos/seed/video10/300/200",
    "https://picsum.photos/seed/video11/300/200",
    "https://picsum.photos/seed/video12/300/200",
    "https://picsum.photos/seed/video13/300/200",
    "https://picsum.photos/seed/video14/300/200",
    "https://picsum.photos/seed/video15/300/200",
    "https://picsum.photos/seed/video16/300/200",
    "https://picsum.photos/seed/video17/300/200",
    "https://picsum.photos/seed/video18/300/200",
    "https://picsum.photos/seed/video19/300/200",
    "https://picsum.photos/seed/video20/300/200",
    "https://picsum.photos/seed/video21/300/200",
    "https://picsum.photos/seed/video22/300/200",
    "https://picsum.photos/seed/video23/300/200",
    "https://picsum.photos/seed/video24/300/200",
    "https://picsum.photos/seed/video25/300/200",
    "https://picsum.photos/seed/video26/300/200",
    "https://picsum.photos/seed/video27/300/200",
    "https://picsum.photos/seed/video28/300/200",
    "https://picsum.photos/seed/video29/300/200",
    "https://picsum.photos/seed/video30/300/200",
    "https://picsum.photos/seed/video31/300/200",
    "https://picsum.photos/seed/video32/300/200",
  ];
  
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Enter your{" "}
        <span className="relative z-20 inline-block rounded-xl bg-veed-green/40 px-4 py-1 text-white underline decoration-veed-green decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          video library
        </span>{" "}
        and explore endless creativity!
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        Discover, create, and manage your video content with VEED's powerful dashboard. 
        From tutorials to creative content, your entire video universe awaits.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button 
          onClick={() => navigate('/library')}
          className="rounded-md bg-veed-green px-8 py-3 text-base font-semibold text-veed-dark transition-all hover:bg-veed-green-light hover:scale-105 focus:ring-2 focus:ring-veed-green focus:ring-offset-2 focus:ring-offset-black focus:outline-none shadow-lg"
        >
          View Your Videos
        </button>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/40 dark:bg-black/20" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
