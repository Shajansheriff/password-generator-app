"use client";

import { Inter } from "next/font/google";
import { FormEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

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
    const char = (() => {
      const type = getRandomType(rules);
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
  const [password, setPassword] = useState(
    generate({ length, rules: ["lowercase"] })
  );
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
        Length: {length}
        <input
          type="range"
          name="length"
          min={1}
          max={99}
          step={1}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
        />
        <input
          type="checkbox"
          name="rules"
          id="uppercase"
          value={"uppercase"}
        />
        <label htmlFor="uppercase">Include Uppercase Letters</label>
        <input
          type="checkbox"
          name="rules"
          id="lowercase"
          value="lowercase"
          defaultChecked={true}
        />
        <label htmlFor="lowercase">Include Lowercase Letters</label>
        <input type="checkbox" name="rules" id="numbers" value="numbers" />
        <label htmlFor="numbers">Include Numbers</label>
        <input type="checkbox" name="rules" id="symbols" value="symbols" />
        <label htmlFor="symbols">Include Symbols</label>
        <button type="submit">Generate</button>
      </form>
    </main>
  );
}
