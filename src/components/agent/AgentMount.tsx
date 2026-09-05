"use client";

import dynamic from "next/dynamic";

/**
 * Loads the Living Agent as its own async chunk after hydration, so it stays
 * out of the shared bundle (it is decorative and never blocks first paint).
 */
const LivingAgent = dynamic(
  () => import("./LivingAgent").then((m) => m.LivingAgent),
  { ssr: false }
);

export function AgentMount() {
  return <LivingAgent />;
}
