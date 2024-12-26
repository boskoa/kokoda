import { useEffect, useState } from "react";

function useIntersectionObserver(ref) {
  const [intersecting, setIntersecting] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((targets) => {
        const [target] = targets;
        if (target.isIntersecting) {
          setIntersecting(true);
        } else {
          setIntersecting(false);
        }
      }, options);

      observer.observe(ref.current);
    }
  }, [ref]);

  return intersecting;
}

export default useIntersectionObserver;
