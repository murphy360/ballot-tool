import { useEffect, useState } from "react";
import Results from "./pages/Results";
import Home from "./pages/Home";
import Guide from "./pages/GuideCanvas";
import Quiz from "./pages/QuizCanvas";

type Route = { path: string; params: URLSearchParams };
const parse = (): Route => {
  const h = window.location.hash.replace(/^#/, "") || "/";
  const [path, qs] = h.split("?");
  return { path: path || "/", params: new URLSearchParams(qs || "") };
};

export default function App() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => setRoute(parse());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  useEffect(() => {
    const s = route.params.get("s");
    if (s) setTimeout(() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" }), 50);
    else window.scrollTo(0, 0);
  }, [route.path, route.params.toString()]);

  const nav = [
    { path: "/", label: "Ballot" },
    { path: "/results", label: "Results" },
    { path: "/guide", label: "Guide" },
    { path: "/quiz", label: "Quiz" },
  ];
  let page;
  switch (route.path) {
    case "/results": page = <Results />; break;
    case "/guide": page = <div className="page"><Guide /></div>; break;
    case "/quiz": page = <div className="page"><Quiz /></div>; break;
    default: page = <Home />;
  }
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#/">Ballot Tool</a>
        <nav>
          {nav.map((n) => (
            <a key={n.path} href={"#" + n.path} className={route.path === n.path ? "active" : ""}>{n.label}</a>
          ))}
        </nav>
      </header>
      <main>{page}</main>
      <footer className="foot">
        Neutral research notes, not endorsements. Results are unofficial until certified by the Board of Elections.
        Check anything important against official sources.
      </footer>
    </>
  );
}
