import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./Slider.module.css";

export function Slider({
  className = "",
  ...props
}: Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>) {
  return (
    <input
      className={`${styles.slider} ${className}`}
      type={"range"}
      {...props}
    />
  );
}
