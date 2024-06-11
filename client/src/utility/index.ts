import { BoardBackgroundColors } from "@/components/Modal/boardBackgroundColors";

// find the board background color helper
// return the color hex if found
// return the fallback color if not found
const findBoardBackground = (colorName: string | undefined): string => {
  const fallbackColor = "#bdc3c7";
  const color = BoardBackgroundColors.find(background => background.colorName === colorName);
  
  return color?.hex ?? fallbackColor;
};

export { findBoardBackground };