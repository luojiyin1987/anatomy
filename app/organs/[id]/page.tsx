import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { organs, type Organ } from "../../lib/anatomy-data";
import { OrganDetailViewer } from "./OrganDetailViewer";
import styles from "./page.module.css";

const SITE_URL = "https://anatomy.itea.fit";

type PageProps = {
  params: Promise<{ id: string }>;
};

function findOrgan(id: string): Organ | undefined {
  return organs.find((organ) => organ.id === id);
}

export function generateStaticParams() {
  return organs.map((organ) => ({ id: organ.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const organ = findOrgan(id);

  if (!organ) {
    return {
      title: "未找到器官",
      robots: { index: false, follow: false },
    };
  }

  const title = `${organ.name}的结构、位置与功能`;
  const description = `${organ.description} 通过交互式 3D 模型了解${organ.name}的位置、功能、血液供应与关键结构。`;
  const pathname = `/organs/${organ.id}`;
  const image = organ.illustrated ? `/anatomy/${organ.id}/organ.webp` : "/og.jpg";

  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "article",
      url: pathname,
      locale: "zh_CN",
      siteName: "Anatomy Atelier",
      title: `${title}｜Anatomy Atelier`,
      description,
      images: [{ url: image, alt: `${organ.name}解剖学习页面` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜Anatomy Atelier`,
      description,
      images: [image],
    },
  };
}

export default async function OrganPage({ params }: PageProps) {
  const { id } = await params;
  const organ = findOrgan(id);

  if (!organ) notFound();

  const organIndex = organs.findIndex((item) => item.id === organ.id);
  const previous = organs[(organIndex - 1 + organs.length) % organs.length];
  const next = organs[(organIndex + 1) % organs.length];
  const pathname = `/organs/${organ.id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${SITE_URL}${pathname}#resource`,
        name: `${organ.name}的结构、位置与功能`,
        description: organ.description,
        url: `${SITE_URL}${pathname}`,
        inLanguage: "zh-CN",
        educationalUse: "解剖学学习",
        learningResourceType: "交互式 3D 模型",
        isAccessibleForFree: true,
        about: {
          "@type": "AnatomicalStructure",
          name: organ.name,
          alternateName: organ.scientificName,
        },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Anatomy Atelier",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: organ.name,
            item: `${SITE_URL}${pathname}`,
          },
        ],
      },
    ],
  };
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <main className={styles.page} style={{ "--organ-accent": organ.accent } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <strong>解剖学工作室<sup>✦</sup></strong>
          <span>返回完整器官浏览器</span>
        </Link>
        <nav aria-label="面包屑导航" className={styles.breadcrumbs}>
          <Link href="/">首页</Link>
          <span aria-hidden="true">/</span>
          <span>{organ.name}</span>
        </nav>
      </header>

      <section className={styles.hero}>
        <article className={styles.intro}>
          <p className={styles.kicker}>{organ.system}</p>
          <h1>{organ.name}</h1>
          <p className={styles.scientific}>{organ.scientificName}</p>
          <p className={styles.description}>{organ.description}</p>
          <div className={styles.quickFacts}>
            <div><span>位置</span><strong>{organ.location}</strong></div>
            <div><span>主要功能</span><strong>{organ.function}</strong></div>
            <div><span>大小</span><strong>{organ.size}</strong></div>
            <div><span>重量</span><strong>{organ.weight}</strong></div>
          </div>
        </article>

        <div className={styles.viewer}>
          <OrganDetailViewer organ={organ} />
        </div>
      </section>

      <section className={styles.contentGrid}>
        <article className={styles.card}>
          <p className={styles.cardLabel}>医学重要性</p>
          <h2>形态如何支持功能</h2>
          <p>{organ.medical}</p>
          <dl className={styles.definitionList}>
            <div><dt>血液供应</dt><dd>{organ.bloodSupply}</dd></div>
            <div><dt>组织</dt><dd>{organ.tissue}</dd></div>
            <div><dt>每日活动</dt><dd>{organ.dailyFact}</dd></div>
          </dl>
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>关键结构</p>
          <h2>在 3D 模型中寻找这些标记</h2>
          <ul className={styles.hotspots}>
            {organ.hotspots.map((hotspot) => (
              <li key={hotspot.id}>
                <i style={{ backgroundColor: hotspot.color }} />
                <span><strong>{hotspot.label}</strong>{hotspot.detail}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>临床词汇</p>
          <h2>常见相关病症</h2>
          <ul className={styles.conditions}>
            {organ.conditions.map((condition) => <li key={condition}>{condition}</li>)}
          </ul>
          <p className={styles.notice}>仅用于解剖学教育，不构成医疗建议、诊断或治疗方案。</p>
        </article>
      </section>

      <aside className={styles.funFact}>
        <span aria-hidden="true">✦</span>
        <div><strong>你知道吗？</strong><p>{organ.funFact}</p></div>
      </aside>

      <nav className={styles.organDirectory} aria-label="其他器官详情页">
        <h2>继续探索人体器官</h2>
        <div>
          {organs.map((item) => (
            <Link
              key={item.id}
              href={`/organs/${item.id}`}
              aria-current={item.id === organ.id ? "page" : undefined}
              className={item.id === organ.id ? styles.currentOrgan : undefined}
            >
              <span>{item.icon}</span>
              <strong>{item.name}</strong>
              <small>{item.system}</small>
            </Link>
          ))}
        </div>
      </nav>

      <footer className={styles.pagination}>
        <Link href={`/organs/${previous.id}`} rel="prev">
          <span>上一个</span><strong>{previous.name}</strong>
        </Link>
        <Link href="/">返回完整浏览器</Link>
        <Link href={`/organs/${next.id}`} rel="next">
          <span>下一个</span><strong>{next.name}</strong>
        </Link>
      </footer>
    </main>
  );
}
