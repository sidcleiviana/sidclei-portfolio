"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export function Studio() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          maxWidth: "40rem",
          margin: "4rem auto",
          padding: "0 1.5rem",
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          Sanity Studio não configurado
        </h1>
        <p style={{ color: "#666" }}>
          Defina <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (e o dataset) no
          arquivo <code>.env.local</code> para habilitar o Studio. Consulte o{" "}
          <code>README.md</code> e o <code>.env.example</code>.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
