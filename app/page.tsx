import type { CSSProperties } from "react";
import Link from "next/link";
import { AnatomyApp } from "./components/AnatomyApp";
import { organs } from "./lib/anatomy-data";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <AnatomyApp />
      <section className={styles.directory} aria-labelledby="organ-pages-title">
        <header className={styles.heading}>
          <div>
            <p>可分享的学习页面</p>
            <h2 id="organ-pages-title">按器官深入探索</h2>
          </div>
          <span>打开独立页面，查看完整的 3D 标本、关键结构、基础信息和临床词汇，也可以直接复制网址分享。</span>
        </header>
        <nav className={styles.links} aria-label="器官详情页">
          {organs.map((organ) => (
            <Link
              key={organ.id}
              href={`/organs/${organ.id}`}
              style={{ "--link-accent": organ.accent } as CSSProperties}
            >
              <span aria-hidden="true">{organ.icon}</span>
              <strong>{organ.name}</strong>
              <small>{organ.system}</small>
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
