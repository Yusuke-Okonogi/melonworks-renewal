import styles from "./HeroHubAnimation.module.css";

const hubLayers = [
  { src: "/images/fv/hub_base.png", motionClass: "", zIndex: 0, fetchPriority: "high" as const },
  { src: "/images/fv/presenter_arm.png", motionClass: styles.presenterArm, zIndex: 1 },
  { src: "/images/fv/robot_arm.png", motionClass: styles.robotArm, zIndex: 2 },
  { src: "/images/fv/cube_green_back.png", motionClass: styles.cubeBack, zIndex: 3 },
  { src: "/images/fv/cube_blue.png", motionClass: styles.cubeBlue, zIndex: 4 },
  { src: "/images/fv/cube_green_front.png", motionClass: styles.cubeFront, zIndex: 5 },
  { src: "/images/fv/light_bulb.png", motionClass: styles.lightBulb, zIndex: 6 },
];

export default function HeroHubAnimation() {
  return (
    <div className={styles.hub} aria-hidden="true">
      {hubLayers.map(({ src, motionClass, zIndex, fetchPriority }) => (
        <div
          key={src}
          className={`${styles.layerWrapper} ${motionClass}`}
          style={{ zIndex }}
        >
          <img
            src={src}
            alt=""
            width={1347}
            height={1167}
            draggable={false}
            decoding="async"
            fetchPriority={fetchPriority}
            className={styles.layerImage}
          />
        </div>
      ))}
    </div>
  );
}
