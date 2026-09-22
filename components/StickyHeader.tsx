"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeaderContent } from "@/components/SiteHeaderContent";

export function StickyHeader() {
  const [visible, setVisible] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    function updateReadingUI() {
      const heroSection = document.querySelector(".hero, .about-page-hero");
      const waitlistSection = document.querySelector(".footer-panel");
      if (heroSection && waitlistSection) {
        const showSticky =
          heroSection.getBoundingClientRect().bottom <= 82 &&
          waitlistSection.getBoundingClientRect().top > 76;
        setVisible(showSticky);
      }
      frameRef.current = 0;
    }

    function requestReadingUpdate() {
      if (!frameRef.current) frameRef.current = requestAnimationFrame(updateReadingUI);
    }

    updateReadingUI();
    window.addEventListener("scroll", requestReadingUpdate, { passive: true });
    window.addEventListener("resize", requestReadingUpdate);

    return () => {
      window.removeEventListener("scroll", requestReadingUpdate);
      window.removeEventListener("resize", requestReadingUpdate);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div className={`scroll-veil${visible ? " is-visible" : ""}`} aria-hidden="true" />
      <div
        className={`sticky-header${visible ? " is-visible" : ""}`}
        aria-label="Pinned navigation"
        aria-hidden={visible ? undefined : "true"}
        inert={visible ? undefined : ("" as unknown as boolean)}
      >
        <SiteHeaderContent />
      </div>
    </>
  );
}
