"use client";
import { SVG_COLOR_MAPPER } from "@/constants/constant";
import {
  getPlatformSelections,
  getTextColorBasedOnPlatform,
  svgArrowVariant,
  svgIconVariant,
  svgRectVariant,
} from "@/utils/home.utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { UseFormWatch } from "react-hook-form";

type LinkViewPanelProps = {
  watch: UseFormWatch<{
    linksList: {
      platform: string;
      url: string;
    }[];
  }>;
};

const LINKS_ARRAY = Array(5).fill(0);

const LinkViewPanel = ({ watch }: LinkViewPanelProps) => {
  const formValues = watch()?.linksList;
  const indexForSelectedPlatform = getPlatformSelections({ formValues });
  const iconMapperBasedOnPlatform = getPlatformSelections({
    formValues,
    isIndexRequired: false,
  });

  let initialY = 214;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="308"
      height="500"
      fill="none"
      viewBox="0 0 308 632"
    >
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />
      <circle cx="153.5" cy="112" r="48" fill="#EEE" />
      <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
      <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
      {LINKS_ARRAY?.map((item, index) => {
        initialY += 64;
        const iconName = iconMapperBasedOnPlatform?.[index];
        const color = SVG_COLOR_MAPPER?.[iconName];
        const textColor = getTextColorBasedOnPlatform(iconName as string);
        return (
          <motion.g key={item}>
            <motion.rect
              width="237"
              height="44"
              x="35"
              y={initialY}
              variants={svgRectVariant(color)}
              initial="initial"
              animate="animate"
              rx="8"
            />
            <AnimatePresence>
              {indexForSelectedPlatform.includes(index) && (
                <Fragment>
                  <motion.image
                    width="16"
                    height="16"
                    x="50"
                    variants={svgIconVariant(initialY)}
                    initial="initial"
                    animate="animate"
                    exit={{
                      y: initialY - 15,
                      opacity: 0,
                    }}
                    xlinkHref={`/images/icon-${iconName}.svg`}
                  />
                  <motion.image
                    width="16"
                    height="16"
                    variants={svgArrowVariant(230)}
                    y={initialY + 15}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    xlinkHref={`/images/icon-arrow-right.svg`}
                  />
                  <text
                    x="80"
                    y={initialY + 28}
                    fill={textColor}
                    fontSize="16"
                    className="capitalize flex justify-center items-center"
                  >
                    {iconMapperBasedOnPlatform[index]}
                  </text>
                </Fragment>
              )}
            </AnimatePresence>
          </motion.g>
        );
      })}
    </svg>
  );
};

export default LinkViewPanel;
