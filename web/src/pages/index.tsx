import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import ControlButtons from "@/components/controls/ControlButtons";
import { useScreenCurrentView } from "@/hooks/firebase/screen/useScreenCurrentView";
import { getDoc } from "firebase/firestore";
import { screenDocRef } from "@/lib/firebase/screenDocRef ";
import { ScreenView } from "./screen";

export default function Home({
  currentView: currentViewFromServer,
}: {
  currentView: ScreenView;
}) {
  const { currentView: currentViewFromListener } = useScreenCurrentView();
  const currentView = currentViewFromListener || currentViewFromServer;

  const sections: { title: string; content: ReactElement }[] = [
    {
      title: "Skjerm",
      content: (
        <Link
          href="/screen"
          target="_blank"
          className="underline p-4 w-full text-lg border-2 rounded-2xl bg-white flex gap-4 items-center justify-center"
        >
          Åpne skjerm i ny fane
          <ExternalLinkIcon />
        </Link>
      ),
    },
    {
      title: "Kontroller",
      content: <ControlButtons currentView={currentView} />,
    },
  ];
  return (
    <div>
      <header className="bg-white top-0 sticky h-16 border-b-2 flex justify-center items-center">
        <h1 className="text-3xl font-bold">EventScreen</h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 flex flex-col gap-8 pt-8">
        <div className="space-y-2">
          <p className="md:text-lg">
            EventScreen er et program som lar deg enkelt styre innholdet på en
            nettside som du kan vise på en skjerm eller en prosjektor.
          </p>
        </div>

        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const currentView = await getDoc(screenDocRef);

  return {
    props: {
      currentView: currentView.data()?.currentView || null,
    },
  };
}
