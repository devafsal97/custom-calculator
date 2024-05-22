import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (setCurrentStep) => {
  const sectionsRef = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = sectionsRef.current.indexOf(entry.target);
            setCurrentStep(step);
          }
        });
      },
      { threshold: 0.5 } // Adjust this value as needed
    );

    sectionsRef.current.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setCurrentStep]);

  return sectionsRef;
};
