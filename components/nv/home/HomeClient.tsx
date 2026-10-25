"use client";
// Runs the home page's particle intro, demos and interactions once the markup is on the page.
import { useEffect } from "react";
import { initHomeHero, initHomeSections, initFlip, initLayers } from "./homeEngine";

export function HomeClient() {
  useEffect(() => {
    const canvas = document.getElementById("c");
    if (!canvas || canvas.dataset.init) return; // guard against double mounting
    canvas.dataset.init = "1";
    initHomeHero();
    initHomeSections();
    initFlip();
    initLayers();
    return () => { document.body.classList.remove("home-intro", "ready", "landed"); };
  }, []);
  return null;
}
