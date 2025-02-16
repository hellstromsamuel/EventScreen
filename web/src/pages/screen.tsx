import VideoCarousel from "@/components/screen/VideoCarousel";
import { useScreenCurrentView } from "@/hooks/firebase/screen/useScreenCurrentView";

export type ScreenView = "no-content" | "sponsors";

function ScreenPage() {
  const { currentView } = useScreenCurrentView();

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      {currentView === "sponsors" && <VideoCarousel categoryTitle="Sponsors" />}
    </div>
  );
}

export default ScreenPage;
