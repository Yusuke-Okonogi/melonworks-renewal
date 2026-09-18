import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "@/components/HeroVisual.module.css";

type Building = { name: string; label: string; src: string; width: number; height: number; className: string; style: CSSProperties; priority?: boolean };

const buildings: Building[] = [
  { name: "cafe", label: "カフェ", src: "/cafe.png", width: 1254, height: 1254, className: styles.cafe, style: { "--float-duration": "8.6s", "--float-delay": "-5.1s" } as CSSProperties },
  { name: "logistics", label: "物流センター", src: "/logistics.png", width: 1254, height: 1254, className: styles.logistics, style: { "--float-duration": "9.2s", "--float-delay": "-1.4s" } as CSSProperties },
  { name: "yoga", label: "ヨガスタジオ", src: "/yoga.png", width: 1254, height: 1254, className: styles.yoga, style: { "--float-duration": "8.1s", "--float-delay": "-3.7s" } as CSSProperties },
  { name: "shop", label: "ローカルショップ", src: "/shop.png", width: 1254, height: 1254, className: styles.shop, style: { "--float-duration": "9.6s", "--float-delay": "-6.2s" } as CSSProperties },
  { name: "melonworks", label: "MELON WORKS本社", src: "/melonworks.png", width: 1376, height: 1143, className: styles.melonworks, style: { "--float-duration": "7.2s", "--float-delay": "-0.8s" } as CSSProperties, priority: true },
];

export default function HeroVisual() {
  return (
    <div className={styles.scene} role="img" aria-label="MELON WORKS本社と、地域の事業を表す4つの建物">
      <div className={styles.glow} aria-hidden="true" />
      {buildings.map(({ name, label, src, width, height, className, style, priority }) => (
        <figure key={name} className={`${styles.building} ${className}`} style={style}>
          <span className={styles.platform} aria-hidden="true" />
          <Image src={src} alt={label} width={width} height={height} sizes={name === "melonworks" ? "(max-width: 1023px) 60vw, 36vw" : "(max-width: 1023px) 34vw, 18vw"} priority={priority} className={styles.image} />
        </figure>
      ))}
    </div>
  );
}
