import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (setCurrentComponent) => {
  const sectionsRef = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = sectionsRef.current.indexOf(entry.target);
            setCurrentComponent(step);
          }
        });
      },
      { threshold: 1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observerRef.current.observe(section);
      }
    });

    return () => {  if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setCurrentComponent]);

  return sectionsRef;
};
export default useIntersectionObserver;