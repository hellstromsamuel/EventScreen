import { useState, useEffect, useRef } from "react";
import { useVideosByTitle } from "@/hooks/sanity/useVideosByTitle";
import { getValidPlaybackRate } from "@/lib/videos/playbackRate";

export type VideoCateogoryTitle = "Sponsors";

interface Props {
  categoryTitle: VideoCateogoryTitle;
}

export default function VideoCarousel({ categoryTitle }: Props) {
  const { data: videoSources = [], isLoading } =
    useVideosByTitle(categoryTitle);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && videoDuration) {
      const video = videoRef.current;
      const customDuration = videoSources[currentIndex]?.duration;
      const playbackRate = getValidPlaybackRate(
        customDuration ? videoDuration / customDuration : 1
      );
      video.playbackRate = getValidPlaybackRate(playbackRate);
    }
  }, [videoSources, currentIndex, videoDuration]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) =>
      videoSources.length > 0 ? (prev + 1) % videoSources.length : 0
    );
  };

  if (isLoading) return <p>Loading videos...</p>;

  return (
    <video
      ref={videoRef}
      key={currentIndex}
      src={videoSources[currentIndex]?.url}
      title={videoSources[currentIndex]?.title}
      onLoadedMetadata={() => {
        setVideoDuration(videoRef.current?.duration || 0);
      }}
      autoPlay
      muted
      onEnded={handleVideoEnd}
      className="w-full h-full object-contain"
    />
  );
}
