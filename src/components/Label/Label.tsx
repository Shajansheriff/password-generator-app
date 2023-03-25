import { DetailedHTMLProps, LabelHTMLAttributes } from "react";
import styles from "./Label.module.css";

export function Label({
  className,
  ...props
}: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) {
  return <label className={styles.label} {...props} />;
}
