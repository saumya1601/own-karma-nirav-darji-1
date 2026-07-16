import Loader from "./components/Loader";
import SmoothScroll from "./components/SmoothScroll";
import CursorGlow from "./components/CursorGlow";
import Nav from "./components/Nav";
import ChapterVoid from "./components/ChapterVoid";
import ChapterOrigin from "./components/ChapterOrigin";
import ChapterUniverse from "./components/ChapterUniverse";
import ChapterJourney from "./components/ChapterJourney";
import ChapterWearable from "./components/ChapterWearable";
import ChapterCollection from "./components/ChapterCollection";
import ChapterManifesto from "./components/ChapterManifesto";
import ChapterFinale from "./components/ChapterFinale";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <CursorGlow />
      <Nav />
      <main className="relative flex-1">
        {/* Chapter 01 — The Void */}
        <ChapterVoid />
        {/* Chapter 02 — The Origin of Meaning */}
        <ChapterOrigin />
        {/* Chapter 03 — The Universe of Inspiration */}
        <ChapterUniverse />
        {/* Chapter 04 — The Human Journey */}
        <ChapterJourney />
        {/* Chapter 05 — Wearable Philosophy */}
        <ChapterWearable />
        {/* Chapter 06 — Collection Reveal */}
        <ChapterCollection />
        {/* Chapter 07 — The Manifesto */}
        <ChapterManifesto />
        {/* Chapter 08 — Final Immersive CTA */}
        <ChapterFinale />
      </main>
      <Footer />
    </>
  );
}
