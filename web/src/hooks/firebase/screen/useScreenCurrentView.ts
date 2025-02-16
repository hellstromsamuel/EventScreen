import { useState, useEffect, useRef } from "react";
import { onSnapshot } from "firebase/firestore";
import { ScreenView } from "@/pages/screen";
import { screenDocRef } from "@/lib/firebase/screenDocRef ";

export const useScreenCurrentView = () => {
  const [currentView, setCurrentView] = useState<ScreenView | null>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(screenDocRef, (snapshot) => {
      const data = snapshot.data();
      setCurrentView(data?.currentView || null);
      hasLoaded.current = true;
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return { currentView, isLoading: !hasLoaded.current };
};
