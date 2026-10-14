"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { WeddingIntroVideo } from "@/components/WeddingIntroVideo";
import { CelebrationsSection } from "@/components/CelebrationsSection";
import { RSVPSection } from "@/components/RSVPSection";
import { ClosingSection } from "@/components/ClosingSection";

export default function WeddingPage() {
  const [isMuted, setIsMuted] = useState(true);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#071912] text-[#173b2d]">
      <main className="relative w-full">
        {/* 
          1. Hero Section:
             - PC & Laptops use: public/videos/is_gwr_video_mvp.mp4
             - Mobiles use: public/videos/wedding-intro.mp4
             - Starts with "Your Invitation is Loading..."
             - Then shows "TAP TO ENTER" button directly over the video
             - On click, video plays cleanly from start to finish
             - When video ends, it pauses on its authentic invitation frame without duplicate text
        */}
        <WeddingIntroVideo
          isMuted={isMuted}
          onToggleMute={toggleSound}
        />

        {/* 2. Celebrations Section with Canva-style floral designs */}
        <CelebrationsSection />

        {/* 3. RSVP Section with floral motifs */}
        <RSVPSection data={weddingData.rsvp} />

        {/* 4. Best Compliments & Closing Section */}
        <ClosingSection
          compliments={weddingData.compliments}
          closing={weddingData.closing}
          couple={weddingData.couple}
          onBackToTop={handleBackToTop}
        />
      </main>
    </div>
  );
}
