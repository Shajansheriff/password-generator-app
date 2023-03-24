"use client";

import { Inter } from "next/font/google";
import { FormEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [length, setLength] = useState(8);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <main>
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
        <input type="checkbox" name="uppercase" id="uppercase" />
        <label htmlFor="uppercase">Include Uppercase Letters</label>
        <input type="checkbox" name="lowercase" id="lowercase" />
        <label htmlFor="lowercase">Include Lowercase Letters</label>
        <input type="checkbox" name="number" id="number" />
        <label htmlFor="number">Include Numbers</label>
        <input type="checkbox" name="symbol" id="symbol" />
        <label htmlFor="symbol">Include Symbols</label>
        <button type="submit">Generate</button>
      </form>
    </main>
  );
}
