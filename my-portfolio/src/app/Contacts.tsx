"use client";

import { useState } from "react";

export default function Contacts() {
  const [copied, setCopied] = useState(false);
  const email = "ethantran@quwin.dev"

  async function handleCopyEmail() {
  try {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    alert("Email: " + email);
  }
}

  return (
    <div className="flex my-4 justify-center space-x-10 relative">
      {/* LinkedIn Icon */}
      <div className="group flex flex-col items-center">
        <a
          href="https://www.linkedin.com/in/kien-ethan-tran/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/linkedin.svg"
            alt="LinkedIn"
            className="transform transition-transform duration-300 hover:scale-125"
          />
        </a>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-playfair my-1">
          linkedin
        </span>
      </div>

      {/* GitHub Icon */}
      <div className="group flex flex-col items-center">
        <a
          href="https://github.com/quwin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/github.svg"
            alt="Github"
            className="transform transition-transform duration-300 hover:scale-125"
          />
        </a>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-playfair my-1">
          github
        </span>
      </div>

      {/* Email Icon */}
      <div className="group flex flex-col items-center relative">
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label="Copy email address"
          className="cursor-pointer"
        >
          <img
            src="/mail.svg"
            alt="Email"
            className="transform transition-transform duration-300 hover:scale-125"
          />
        </button>

        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-playfair my-1">
          email
        </span>

        {copied && (
          <div className="absolute -top-10 rounded-lg bg-limed-oak px-3 py-1 text-sm text-white shadow-md">
            copied!
          </div>
        )}
      </div>
    </div>
  );
}
  