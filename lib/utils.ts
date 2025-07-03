import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updateCSSVariables(colors: { key: string; value: string }[]) {
  colors.forEach(({ key, value }) => {
    // نحول key زي website_primary_color لـ --website-primary-color
    const cssVarName = `--${key.replace(/_/g, "-")}`;
    document.documentElement.style.setProperty(cssVarName, value);
  });
}
