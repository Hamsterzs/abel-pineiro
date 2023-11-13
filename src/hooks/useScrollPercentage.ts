import { useEffect, useRef, useState } from "react";

function useScrollPercentage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const scrollListener = () => {
      if (!scrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

      if (scrollHeight === clientHeight) return setScrollPercentage(100);

      const scrollPosition = (scrollTop / (scrollHeight - clientHeight)) * 100;

      setScrollPercentage(Math.ceil(scrollPosition));
    };

    scrollListener();

    scrollContainer.addEventListener("scroll", scrollListener);

    return () => {
      scrollContainer.removeEventListener("scroll", scrollListener);
    };
  }, [scrollRef, setScrollPercentage]);

  return { scrollPercentage, scrollRef };
}

export default useScrollPercentage;
