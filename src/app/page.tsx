"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { Slider } from "@/components/Slider";
import { FormEventHandler, useEffect, useState } from "react";

const alphabets_lowercase = "abcdefghijklmnopqrstuvwxyz";
const alphabets_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*";

type Type = "lowercase" | "uppercase" | "numbers" | "symbols";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomType = (types: Type[]) => {
  const index = randomInteger(0, types.length);

  const result = types[index];
  return result;
};

const getRandomChar = (str: string) => {
  const index = randomInteger(0, str.length);
  return str.charAt(index);
};
interface Config {
  length: number;
  rules: Type[];
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

export default function Home() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!password) {
      setPassword(generate({ length, rules: ["lowercase"] }));
    }
  }, [length, password]);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rules = (formData.getAll("rules") ?? []) as Type[];
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
          <Checkbox name="rules" value={"uppercase"} />
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
          <Checkbox name="rules" value="numbers" />
          Include Numbers
        </Label>
        <Label>
          <Checkbox name="rules" value="symbols" />
          Include Symbols
        </Label>
        <Button type="submit">Generate</Button>
      </form>
    </main>
  );
}
