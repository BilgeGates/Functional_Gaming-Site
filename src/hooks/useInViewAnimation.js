import { useEffect, useRef, useState } from "react";

const useInViewAnimation = (items = [], batchSize = 4) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    if (!items.length || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const gameId = entry.target.dataset.id;
            if (gameId) {
              setVisibleItems((prev) => new Set(prev).add(gameId));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const children = containerRef.current.querySelectorAll("[data-id]");
    children.forEach((child, index) => {
      const gameId = child.dataset.id;
      if (!gameId) return;

      if (index < batchSize) {
        setVisibleItems((prev) => new Set(prev).add(gameId));
      } else {
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  }, [items, batchSize]);

  return { containerRef, visibleItems };
};

export default useInViewAnimation;
