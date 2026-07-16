"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={onSubmit} className="group relative">
      <label
        htmlFor="ok-email"
        className="mb-3 block text-[0.6rem] uppercase tracking-luxe text-ash"
      >
        Join the Unbound
      </label>
      <div className="flex items-center border-b border-white/15 transition-colors duration-500 focus-within:border-gold/60">
        <input
          id="ok-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent py-3 text-sm text-ivory placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="shrink-0 pl-4 text-gold-soft transition-transform duration-500 hover:translate-x-1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p
        className="mt-3 text-xs italic text-gold-soft transition-opacity duration-500"
        style={{ opacity: sent ? 1 : 0 }}
        aria-live="polite"
      >
        Welcome. Your journey begins.
      </p>
    </form>
  );
}
