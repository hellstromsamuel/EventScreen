import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity/client";
import { VideoCateogoryTitle } from "@/components/screen/VideoCarousel";

interface VideoFile {
  title: string;
  url: string;
  duration: number | null;
}

const fetchVideos = async (
  categoryTitle: VideoCateogoryTitle = "Sponsors"
): Promise<VideoFile[]> => {
  const query = `*[_type == "videos" && title == $categoryTitle] {
    title,
    videoFiles[] {
      videoTitle,
      videoFile { asset -> { url } },
      duration
    }
  }`;
  const data = await client.fetch(query, { categoryTitle });
  const videoFiles: VideoFile[] =
    data[0]?.videoFiles?.map(
      (item: {
        videoTitle: string;
        videoFile: { asset: { url: string } };
        duration: number | null;
      }) => ({
        title: item?.videoTitle,
        url: item?.videoFile?.asset?.url,
        duration: item?.duration || null,
      })
    ) || [];
  return videoFiles;
};

export const useVideosByTitle = (categoryTitle: VideoCateogoryTitle) => {
  return useQuery<VideoFile[]>({
    queryKey: ["videos", categoryTitle],
    queryFn: () => fetchVideos(categoryTitle),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};
