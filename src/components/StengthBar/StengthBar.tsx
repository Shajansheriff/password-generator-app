import { FunctionComponent } from "react";
import styles from "./StrengthBar.module.css";

type Status = "poor" | "weak" | "medium" | "success";

const Rectangle = ({ status }: { status?: Status }) => {
  return (
    <span
      className={`${styles.rectangle} ${
        status ? `${styles[status]} ${styles.filled}` : ""
      }`}
    />
  );
};

interface StrengthBarProps {
  strength: number;
}

function calculateStatus(strength: StrengthBarProps["strength"]): Status {
  switch (strength) {
    case 1:
      return "poor";
    case 2:
      return "weak";
    case 3:
      return "medium";
    case 4:
      return "success";
    default:
      throw Error("Unknown strength");
  }
}

export const StrengthBar: FunctionComponent<StrengthBarProps> = ({
  strength,
}) => {
  return (
    <div className={styles.strengthBar}>
      {Array.from({ length: 4 }, (_, index) => {
        return (
          <Rectangle
            key={index}
            status={index < strength ? calculateStatus(strength) : undefined}
          />
        );
      })}
    </div>
  );
};
