import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./Styles.module.css";

interface CheckboxProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > {}

export function Checkbox({ className = "", ...props }: CheckboxProps) {
  return (
    <input
      className={`${styles.checkbox} ${className}`}
      type="checkbox"
      {...props}
    />
  );
}
