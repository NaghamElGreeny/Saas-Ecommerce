type SettingItem = { key: string; value: string };

export function convertSettingsArrayToObject(
  array: SettingItem[]
): Record<string, string> {
  if (!Array.isArray(array)) {
    console.warn("Settings data is not an array:", array);
    return {};
  }

  return array.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);
}


export const updateCSSVariables = (colors: { key: string; value: string }[]) => {
  if (typeof document === 'undefined') return;

  colors.forEach((color) => {
    document.documentElement.style.setProperty(`--${color.key}`, color.value);
  });
};
