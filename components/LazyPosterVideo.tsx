"use client";

import { useEffect, useRef, useState } from "react";

interface LazyPosterVideoProps
  extends Omit<React.ComponentProps<"video">, "poster" | "preload" | "ref"> {
  poster: string;
}

/**
 * A video whose poster and metadata are only requested once it is close to the viewport, so
 * below-the-fold media does not compete with the content visitors see first.
 */
export default function LazyPosterVideo({
  poster,
  children,
  ...videoProps
}: Readonly<LazyPosterVideoProps>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      poster={isNear ? poster : undefined}
      preload={isNear ? "metadata" : "none"}
      {...videoProps}
    >
      {children}
    </video>
  );
}
