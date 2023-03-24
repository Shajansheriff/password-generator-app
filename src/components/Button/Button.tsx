import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./Button.module.css";

export function Button({
  className = "",
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <button className={`${styles.btn} ${className}`} {...props} />;
}
