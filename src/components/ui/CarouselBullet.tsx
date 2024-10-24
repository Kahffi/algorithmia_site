import { LayoutGroup, motion } from "framer-motion";

type Props = {
  size: number;
  activeIdx: number;
};

export default function CarouselBullet({ size, activeIdx }: Props) {
  return (
    <LayoutGroup>
      <ul className="flex gap-3">
        {Array.from({ length: size }).map((_, idx) => {
          return (
            <li
              key={idx}
              className={`rounded-full w-3 h-3 md:w-4 md:h-4 border border-white`}
            >
              {activeIdx === idx && (
                <motion.div
                  layoutId="carouselBullet"
                  className="w-full h-full rounded-full bg-blue-300"
                ></motion.div>
              )}
            </li>
          );
        })}
      </ul>
    </LayoutGroup>
  );
}
