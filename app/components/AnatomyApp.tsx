"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BrainCircuit,
  ChevronDown,
  CircleHelp,
  Compass,
  FileText,
  Heart,
  LibraryBig,
  Microscope,
  NotebookPen,
  Play,
  Search,
  Share2,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { OrganViewer } from "./OrganViewer";
import { organById, organs, type Organ, type OrganId } from "../lib/anatomy-data";

type Modal = "lesson" | "quiz" | "animation" | "system" | null;

/**
 * Renders an organ illustration, or its accent glyph for organs that ship as a
 * 3D model without the painted asset set. Keeps every image slot filled instead
 * of leaving a broken `<img>` behind.
 */
function OrganArt({
  organ,
  asset,
  alt,
  size,
}: {
  organ: Organ;
  asset: "thumb" | "organ" | "microscopic" | "compare" | "location";
  alt: string;
  size?: number;
}) {
  if (!organ.illustrated) {
    // An empty alt means a surrounding control already names this, so the
    // glyph should be skipped rather than announced with no label.
    const labelling = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true };
    return (
      <span className="art-fallback" style={{ "--art-accent": organ.accent } as React.CSSProperties} {...labelling}>
        {organ.icon}
      </span>
    );
  }
  return (
    <img
      key={`${organ.id}-${asset}`}
      src={`/anatomy/${organ.id}/${asset}.webp`}
      alt={alt}
      width={size}
      height={size}
      loading={asset === "thumb" ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function AnatomyApp() {
  const [organId, setOrganId] = useState<OrganId>("heart");
  const [autoRotate, setAutoRotate] = useState(true);
  const [compare, setCompare] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [query, setQuery] = useState("");
  const [mobileLibrary, setMobileLibrary] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefetched = useRef(new Set<OrganId>());
  const organ = organById[organId];
  const reference = organById[organId === "heart" ? "brain" : "heart"];
  const filteredOrgans = useMemo(
    () => organs.filter((item) => `${item.name} ${item.system}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.querySelectorAll("[data-reveal]"),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.48, stagger: 0.035, ease: "power2.out", overwrite: true },
    );
  }, [organId]);

  const selectOrgan = (id: OrganId) => {
    if (organById[id].illustrated) {
      ["organ", "microscopic", "compare", "location"].forEach((asset) => {
        const image = new Image();
        image.src = `/anatomy/${id}/${asset}.webp`;
      });
    }
    setOrganId(id);
    setMobileLibrary(false);
    setCompare(false);
  };

  // Warms the model in the HTTP cache while the pointer is still travelling,
  // so the switch usually renders without a visible loading pass.
  const prefetchOrgan = (id: OrganId) => {
    if (id === organId || prefetched.current.has(id)) return;
    prefetched.current.add(id);
    void fetch(organById[id].model, { priority: "low" } as RequestInit).catch(() => {});
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => selectOrgan("heart")} aria-label="解剖学工作室首页">
          <strong>解剖学工作室<sup>✦</sup></strong>
          <em>像艺术家一样学习解剖学</em>
        </button>
        <nav className="main-nav" aria-label="主导航">
          <button className="active"><Compass size={17} /> 探索</button>
          <button><BrainCircuit size={17} /> 系统</button>
          <button onClick={() => setModal("lesson")}><BookOpen size={17} /> 课程</button>
          <button><LibraryBig size={17} /> 资料库</button>
          <button><NotebookPen size={17} /> 笔记</button>
        </nav>
        <label className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索器官、主题…" />
        </label>
        <button className="profile" aria-label="打开学习者档案"><span>MA</span><ChevronDown size={15} /></button>
        <button className="mobile-library-trigger" onClick={() => setMobileLibrary(true)} aria-label="打开器官库"><LibraryBig size={20} /></button>
      </header>

      <div className="workspace">
        <aside className={`organ-library ${mobileLibrary ? "open" : ""}`}>
          <div className="panel-heading">
            <span>器官库</span>
            <button aria-label="关闭库" className="mobile-close" onClick={() => setMobileLibrary(false)}><X size={17} /></button>
            <button aria-label="已保存器官"><Bookmark size={17} /></button>
          </div>
          <div className="organ-list">
            {filteredOrgans.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`organ-item ${organId === item.id ? "active" : ""}`}
                onClick={() => selectOrgan(item.id)}
                onPointerEnter={() => prefetchOrgan(item.id)}
                onFocus={() => prefetchOrgan(item.id)}
                style={{ "--item-accent": item.accent } as React.CSSProperties}
              >
                <span className="organ-glyph">
                  <OrganArt organ={item} asset="thumb" alt={`${item.name}缩略图`} size={47} />
                </span>
                <span><b>{item.name}</b><small>{item.system}</small></span>
                {organId === item.id && <Heart className="favorite" size={14} fill="currentColor" />}
              </button>
            ))}
          </div>
          <button className="view-all" onClick={() => setQuery("")}>查看所有器官 <ArrowRight size={14} /></button>
          <blockquote>
            <Sparkles size={18} />
            <p>学习是<br />好奇心的体现。</p>
            <em>继续探索！</em>
          </blockquote>
        </aside>

        <OrganViewer
          organ={organ}
          autoRotate={autoRotate}
          onAutoRotate={setAutoRotate}
          compare={compare}
          onCompare={() => setCompare(!compare)}
        />

        <aside className="info-panel" ref={contentRef}>
          <div className="info-kicker" data-reveal><Heart size={13} fill="currentColor" /> {organ.name}</div>
          <div className="info-title-row" data-reveal>
            <div><h1>{organ.name}</h1><em>{organ.poetic}</em></div>
            <span className="specimen-stamp">
              <OrganArt organ={organ} asset="organ" alt={`${organ.name}解剖图`} size={92} />
            </span>
          </div>
          <p className="description" data-reveal>{organ.description}</p>
          <div className="rule" />
          <h2 data-reveal>基本信息</h2>
          <dl className="key-facts">
            <div data-reveal><dt><span>◇</span> 大小</dt><dd>{organ.size}</dd></div>
            <div data-reveal><dt><span>♙</span> 重量</dt><dd>{organ.weight}</dd></div>
            <div data-reveal><dt><span>⌁</span> 每日</dt><dd>{organ.dailyFact}</dd></div>
            <div data-reveal><dt><span>⌖</span> 位置</dt><dd>{organ.location}</dd></div>
            <div data-reveal><dt><span>❋</span> 血液供应</dt><dd>{organ.bloodSupply}</dd></div>
            <div data-reveal><dt><span>◈</span> 功能</dt><dd>{organ.function}</dd></div>
          </dl>
          <div className="medical-note" data-reveal><Stethoscope size={16} /><p><b>医学重要性</b>{organ.medical}</p></div>
          <div className="fun-note" data-reveal><Sparkles size={15} /><p><b>你知道吗</b>{organ.funFact}</p></div>
          <button className="lesson-button" data-reveal onClick={() => setModal("lesson")}>查看课程 <ArrowRight size={16} /></button>
          <div className="action-grid" data-reveal>
            <button onClick={() => setModal("animation")}><Play size={15} /> 动画</button>
            <button onClick={() => setModal("quiz")}><CircleHelp size={15} /> 测验</button>
            <button onClick={() => setCompare(!compare)} className={compare ? "active" : ""}><Share2 size={15} /> 对比</button>
          </div>
        </aside>
      </div>

      {compare && (
        <section className="compare-strip" aria-label="器官对比">
          <div className="compare-organ"><OrganArt organ={organ} asset="thumb" alt="" /><span>对比</span><strong>{organ.name}</strong><small>{organ.system}</small></div>
          <b>vs.</b>
          <div className="compare-organ"><OrganArt organ={reference} asset="thumb" alt="" /><span>参考</span><strong>{reference.name}</strong><small>{reference.system}</small></div>
          <dl><div><dt>主要功能</dt><dd>{organ.function}</dd></div><div><dt>大小</dt><dd>{organ.size}</dd></div></dl>
          <button onClick={() => setCompare(false)} aria-label="关闭对比"><X size={16} /></button>
        </section>
      )}

      <section className="learning-cards" aria-label={`${organ.name}学习资源`}>
        <article className="curiosity-card">
          <span>✿</span><p>学习是<br />好奇心的体现。</p><em>继续探索！</em>
        </article>
        <article>
          <header><div><em>显微镜视图</em><h3>{organ.tissue}</h3></div><Microscope size={17} /></header>
          <div className="microscope-visual organ-card-image"><OrganArt organ={organ} asset="microscopic" alt={`${organ.name}显微组织视图`} /></div>
          <button onClick={() => setModal("lesson")}>探索组织 <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>器官对比</em><h3>{organ.comparison}</h3></div><Share2 size={17} /></header>
          <div className="comparison-visual organ-card-image"><OrganArt organ={organ} asset="compare" alt={`${organ.comparison}解剖对比`} /></div>
          <button onClick={() => setCompare(true)}>打开对比 <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>功能动画</em><h3>{organ.function}</h3></div><Play size={17} /></header>
          {/* The artwork itself is the control, so the play badge inside it is
              decorative rather than a nested button. */}
          <button
            type="button"
            className="function-visual organ-card-image"
            onClick={() => setModal("animation")}
            aria-label={`播放${organ.name.toLowerCase()}功能动画`}
          >
            <OrganArt organ={organ} asset="organ" alt="" />
            <i className="function-pulse" />
            <span className="play-badge"><Play size={18} fill="currentColor" /></span>
          </button>
          <button onClick={() => setModal("animation")}>播放动画 <ArrowRight size={14} /></button>
        </article>
        <article>
          <header><div><em>临床笔记</em><h3>常见病症</h3></div><FileText size={17} /></header>
          <ul>{organ.conditions.map((condition) => <li key={condition}>{condition}</li>)}</ul>
          <button onClick={() => setModal("lesson")}>查看全部 <ArrowRight size={14} /></button>
        </article>
        <article className="system-card">
          <header><div><em>工作系统</em><h3>{organ.system}</h3></div><BrainCircuit size={17} /></header>
          <button
            type="button"
            className="system-visual organ-card-image"
            onClick={() => setModal("system")}
            aria-label={`查看${organ.name.toLowerCase()}在身体中的位置`}
          >
            <OrganArt organ={organ} asset="location" alt="" />
          </button>
          <button onClick={() => setModal("system")}>查看系统 <ArrowRight size={14} /></button>
        </article>
      </section>

      {modal && <LearningModal type={modal} organ={organ} onClose={() => setModal(null)} />}
      {mobileLibrary && <button className="drawer-backdrop" aria-label="关闭库" onClick={() => setMobileLibrary(false)} />}
    </main>
  );
}

const MODAL_ICON: Record<Exclude<Modal, null>, string> = {
  quiz: "?",
  animation: "▶",
  system: "⌖",
  lesson: "✦",
};

function LearningModal({ type, organ, onClose }: { type: Exclude<Modal, null>; organ: Organ; onClose: () => void }) {
  const organName = organ.name;
  const title =
    type === "quiz" ? `${organName}快速测验`
    : type === "animation" ? `${organName}动态展示`
    // Avoids gluing onto `system`, whose wording varies per organ
    // ("Cardiovascular" vs "Nervous System"), and stays grammatical for the
    // plural organs too.
    : type === "system" ? `${organName}在体内`
    : `${organName}内部`;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className={`learning-modal ${type === "system" ? "wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="关闭"><X size={18} /></button>
        <span className="modal-icon">{MODAL_ICON[type]}</span>
        <em>引导式探索</em>
        <h2 id="modal-title">{title}</h2>
        {type === "quiz" ? (
          <div className="quiz-options">
            <p>哪句话最能描述{organName.toLowerCase()}？</p>
            <button onClick={onClose}>它在维持身体功能中发挥专门作用</button>
            <button onClick={onClose}>它完全独立运作</button>
            <button onClick={onClose}>它只在睡眠期间活跃</button>
          </div>
        ) : type === "system" ? (
          <>
            <p>{organ.location}。追踪{organName.toLowerCase()}如何与身体其他部分连接。</p>
            {/* Shown whole rather than cropped into the circular demo — the
                point of this view is the figure and its vessels. */}
            <figure className="modal-figure">
              <OrganArt organ={organ} asset="location" alt={`${organName}在${organ.system.toLowerCase()}中的位置`} />
            </figure>
            <dl className="modal-facts">
              <div><dt>系统</dt><dd>{organ.system}</dd></div>
              <div><dt>主要功能</dt><dd>{organ.function}</dd></div>
              <div><dt>血液供应</dt><dd>{organ.bloodSupply}</dd></div>
            </dl>
            <button className="lesson-button" onClick={onClose}>继续探索 <ArrowRight size={16} /></button>
          </>
        ) : (
          <>
            <p>跟随高亮结构，旋转标本，将形态与功能联系起来。这个简短的学习时刻旨在建立持久的心理模型。</p>
            <div className={`modal-demo ${type === "animation" ? "moving" : ""}`}><OrganArt organ={organ} asset="organ" alt={`${organName}插图`} /></div>
            <button className="lesson-button" onClick={onClose}>继续探索 <ArrowRight size={16} /></button>
          </>
        )}
      </section>
    </div>
  );
}
