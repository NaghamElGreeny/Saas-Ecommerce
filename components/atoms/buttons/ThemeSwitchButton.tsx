import React, { Children, ReactNode } from "react";

type ThemeSwitchButton_TP = {
  action?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};
const ThemeSwitchButton = ({ action, children }: ThemeSwitchButton_TP) => {
  return (
    <button
      onClick={action}
      className="bg-white-light/40 dark:bg-dark/40 hover:text-text-website-font hover:bg-white-light/90 dark:hover:bg-dark/60 flex items-center rounded-full p-2"
    >
      {children}
    </button>
  );
};

export default ThemeSwitchButton;
