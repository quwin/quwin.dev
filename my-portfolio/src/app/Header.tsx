"use client";
import { TypeAnimation } from 'react-type-animation';
export default function Header() {
    return (
      <div className="absolute font-playfair text-5xl font-bold">
        <TypeAnimation sequence={[500, "hello,", 500, "hello, i'm ethan tran"]} speed={30}></TypeAnimation>

      </div>
    );
  }
  