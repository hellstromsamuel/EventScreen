import { ScreenView } from "@/pages/screen";
import Button from "../ui/Button/Button";
import { useState } from "react";
import { setDoc } from "firebase/firestore";
import { screenDocRef } from "@/lib/firebase/screenDocRef ";

interface Props {
  currentView: ScreenView;
}

function ControlButtons({ currentView }: Props) {
  const [viewState, setViewState] = useState<ScreenView>(currentView);
  const [loadingId, setLoadingId] = useState("");

  const options: { label: string; value: ScreenView }[] = [
    { label: "Uten innhold", value: "no-content" },
    { label: "Sponsorer", value: "sponsors" },
  ];

  async function handleClick(value: ScreenView) {
    if (value === viewState) return;

    setLoadingId(value);
    try {
      setViewState(value);
      await setDoc(screenDocRef, { currentView: value }, { merge: true });
    } finally {
      setLoadingId("");
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {options.map((option) => (
        <Button
          key={option.value}
          isActive={viewState === option.value}
          onClick={() => handleClick(option.value)}
          isLoading={loadingId === option.value}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default ControlButtons;
