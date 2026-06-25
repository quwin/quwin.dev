"use client";
import { TypeAnimation } from 'react-type-animation';
export default function Header() {
    return (
      <div className="absolute px-4 text-center font-playfair text-4xl font-bold sm:text-5xl">
        <TypeAnimation sequence={[500, "hello,", 500, "hello, i'm ethan tran"]} speed={30}></TypeAnimation>

      </div>
    );
  }
  