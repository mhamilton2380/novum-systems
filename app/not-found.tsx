import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found · Novum AI" };

export default function NotFound() {
  return (
    <main>
      <section className="phero">
        <div className="wrap">
          <div className="label">404</div>
          <h1>This page moved or never existed.</h1>
          <p className="lead">The page you were looking for is not here. Everything we do is on the pages below.</p>
          <div className="ctas">
            <Link className="btn" href="/">Home</Link>
            <Link className="btn ghost" href="/ai-implementation">What we do</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
