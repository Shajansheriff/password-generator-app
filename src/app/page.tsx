"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Slider } from "@/components/Slider";
import { StrengthBar } from "@/components/StengthBar";
import { FormEventHandler, useEffect, useState } from "react";

const alphabets_lowercase = "abcdefghijklmnopqrstuvwxyz";
const alphabets_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*";

type Type = "lowercase" | "uppercase" | "numbers" | "symbols";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomType = (types: Set<Type>) => {
  const index = randomInteger(0, types.size);

  const result = [...types][index];
  return result;
};

const getRandomChar = (str: string) => {
  const index = randomInteger(0, str.length);
  return str.charAt(index);
};
interface Config {
  length: number;
  rules: Set<Type>;
}

const generate = ({ length, rules }: Config) => {
  let string = "";
  for (let i = 0; i < length; i++) {
    const type = getRandomType(rules);
    const char = (() => {
      switch (type) {
        case "symbols":
          return getRandomChar(symbols);
        case "numbers":
          return getRandomChar(numbers);
        case "uppercase":
          return getRandomChar(alphabets_uppercase);
        case "lowercase":
        default:
          return getRandomChar(alphabets_lowercase);
      }
    })();

    string += char;
  }
  return string;
};

const POOR = 1;
const WEAK = 2;
const MEDIUM = 3;
const STRONG = 4;

const calculatePasswordStrength = ({
  length,
  rules,
}: Config): 1 | 2 | 3 | 4 => {
  if (length < 5 || rules.size < 2) {
    return POOR;
  }

  if (length > 4 && length < 8) {
    switch (rules.size) {
      case 0:
      case 1:
        return POOR;
      case 2:
        return WEAK;
      default:
      case 3:
        return MEDIUM;
    }
  }

  switch (rules.size) {
    case 0:
    case 1:
      return POOR;
    case 2:
      return WEAK;
    case 3:
      return MEDIUM;
    default:
    case 4:
      return STRONG;
  }
};

export default function Home() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(4);
  useEffect(() => {
    if (!password) {
      setPassword(
        generate({
          length,
          rules: new Set(["lowercase", "uppercase", "numbers", "symbols"]),
        })
      );
    }
  }, [length, password]);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rulesFormValues = (formData.getAll("rules") ?? []) as Type[];
    const rules = new Set(rulesFormValues);
    setStrength(calculatePasswordStrength({ length, rules }));
    setPassword(generate({ length, rules }));
  };

  return (
    <main>
      {password}
      <form onSubmit={onSubmit}>
        <div>Length: {length}</div>
        <br />
        <Slider
          name="length"
          min={1}
          max={99}
          step={1}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
        />
        <Label>
          <Checkbox name="rules" value={"uppercase"} defaultChecked={true} />
          Include Uppercase Letters
        </Label>
        <Label>
          <Checkbox
            name="rules"
            id="lowercase"
            value="lowercase"
            defaultChecked={true}
          />
          Include Lowercase Letters
        </Label>
        <Label>
          <Checkbox name="rules" value="numbers" defaultChecked={true} />
          Include Numbers
        </Label>
        <Label>
          <Checkbox name="rules" value="symbols" defaultChecked={true} />
          Include Symbols
        </Label>
        <StrengthBar strength={strength} />
        <Button type="submit">Generate</Button>
      </form>
    </main>
  );
}
