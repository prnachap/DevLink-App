import { TEXT_COLOR_BASED_ON_PLATFORM } from "@/constants/constant";
import { FormValues } from "@/global";

export function getPlatformSelections({
  formValues,
  isIndexRequired = true,
}: {
  formValues: FormValues["linksList"];
  isIndexRequired?: boolean;
}) {
  return formValues
    ?.filter((item) => item.platform)
    ?.map((item, index) => (isIndexRequired ? index : item?.platform));
}

export function getTextColorBasedOnPlatform(platform: string) {
  return TEXT_COLOR_BASED_ON_PLATFORM?.[platform] ?? "#fff";
}

export function svgRectVariant(color: string) {
  return {
    initial: { fill: "#eee" },
    animate: { fill: color },
    exit: { fill: "#eee" },
  };
}
export function svgIconVariant(initialPosition: number) {
  return {
    initial: { y: initialPosition, opacity: 0 },
    animate: { y: initialPosition + 15, opacity: 1 },
  };
}
export function svgArrowVariant(initialPosition: number) {
  return {
    initial: { x: initialPosition - 15, opacity: 0 },
    animate: { x: initialPosition, opacity: 1 },
    exit: { x: initialPosition + 1000, opacity: 0 },
  };
}
