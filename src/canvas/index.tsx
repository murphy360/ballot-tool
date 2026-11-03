// Drop-in replacements for the "grok/canvas" components the original Cursor
// canvases were written against, so their content renders unchanged here.
import React, { createContext, useContext } from "react";
export { useState } from "react";

const Depth = createContext(0);

export function Page(props: { title: string; summary?: string; width?: string; children?: React.ReactNode }) {
  return (
    <article className="canvas-page">
      <h1>{props.title}</h1>
      {props.summary && <p className="summary">{props.summary}</p>}
      {props.children}
    </article>
  );
}

export function Section(props: { heading: React.ReactNode; id?: string; caption?: string; children?: React.ReactNode }) {
  const depth = useContext(Depth);
  const H = (depth === 0 ? "h2" : depth === 1 ? "h3" : "h4") as any;
  return (
    <section id={props.id} className={"canvas-section depth-" + depth}>
      <H>{props.heading}</H>
      {props.caption && <p className="caption">{props.caption}</p>}
      <Depth.Provider value={depth + 1}>{props.children}</Depth.Provider>
    </section>
  );
}

export function Text(props: { children?: React.ReactNode }) {
  return <p className="canvas-text">{linkify(props.children)}</p>;
}

type Row = { lead?: string; title: string; meta?: string; detail?: string };
export function Rows({ rows }: { rows: Row[] }) {
  return (
    <div className="rows">
      {rows.map((r, i) => (
        <div className="row" key={i}>
          {r.lead && <div className="lead"><span className={"lead-chip " + leadClass(r.lead)}>{r.lead}</span></div>}
          <div className="body">
            <div className="title">
              {r.title}
              {r.meta && <span className="meta">{r.meta}</span>}
            </div>
            {r.detail && <div className="detail">{linkify(r.detail)}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Properties({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="props">
      {items.map((it, i) => (
        <div key={i} className="prop">
          <dt>{it.label}</dt>
          <dd>{linkify(it.value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Callout(props: { tone?: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className={"callout tone-" + (props.tone || "info")}>
      {props.lead && <strong>{props.lead}. </strong>}
      {linkify(props.children)}
    </div>
  );
}

export function TableOfContents({ items }: { items: { label: string; id: string }[] }) {
  return (
    <nav className="toc">
      {items.map((it) => (
        <button key={it.id} className="link-btn" onClick={() => document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth" })}>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

export function LinkCards({ links }: { links: { title: string; site?: string; href: string }[] }) {
  return (
    <div className="link-cards">
      {links.map((l, i) => (
        <a key={i} className="link-card" href={l.href} target="_blank" rel="noopener noreferrer">
          <span className="lc-title">{l.title}</span>
          {l.site && <span className="lc-site">{l.site}</span>}
        </a>
      ))}
    </div>
  );
}

function leadClass(lead: string) {
  const l = lead.trim();
  if (l === "R" || l.startsWith("R ")) return "party-r";
  if (l === "D" || l.startsWith("D ")) return "party-d";
  if (l === "L") return "party-l";
  return "";
}

// Turn bare domains/paths (e.g. "boe.ohio.gov/summit/...") inside plain strings into links.
const URLISH = /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:gov|org|com|net|vote|live|report|us)(?:\/[^\s,;)]*)?)/gi;
function linkify(node: React.ReactNode): React.ReactNode {
  if (typeof node !== "string") return node;
  const out: React.ReactNode[] = [];
  let last = 0;
  node.replace(URLISH, (m, _g, offset: number) => {
    const trimmed = m.replace(/[.]+$/, "");
    out.push(node.slice(last, offset));
    const href = trimmed.startsWith("http") ? trimmed : "https://" + trimmed;
    out.push(<a key={offset} href={href} target="_blank" rel="noopener noreferrer">{trimmed}</a>);
    last = offset + trimmed.length;
    return m;
  });
  out.push(node.slice(last));
  return out;
}
