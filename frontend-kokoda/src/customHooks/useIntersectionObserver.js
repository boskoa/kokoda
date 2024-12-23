import { useEffect, useState } from "react";

function useIntersectionObserver(ref) {
  const [intersecting, setIntersecting] = useState(false);
  console.log("FOO", ref);
  useEffect(() => {
    if (ref.current) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((targets) => {
        console.log("TARGETS", targets);
        const [target] = targets;
        if (target.isIntersecting) {
          setIntersecting(true);
          console.log("INTERSECTING");
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
