// Home page behavior, ported from the approved concept (2026-10-14). Plain DOM code run once on mount.
/* eslint-disable */
export function initHomeHero() {

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  body.classList.add("home-intro");
  const h1 = document.getElementById("h1");
  h1.innerHTML = h1.textContent.split(" ").map((w, i) => `<span class="w" style="transition-delay:${(0.06 * i).toFixed(2)}s">${w}</span>`).join(" ");

  // method line draws when seen
  const steps = document.getElementById("steps");
  new IntersectionObserver(([e]) => { if (e.isIntersecting) steps.classList.add("seen"); }, { threshold: 0.35 }).observe(steps);
  // manifesto words resolve with scroll
  const mani = document.getElementById("mani");
  if (mani) mani.innerHTML = mani.textContent.split(" ").map(w => `<span class="mw">${w}</span>`).join(" ");
  const mws = mani ? [...mani.querySelectorAll(".mw")] : [];
  function resolveWords() {
    if (!mani) return;
    const r = mani.getBoundingClientRect(), vh = innerHeight;
    const f = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const k = Math.round(f * mws.length * 1.08);
    mws.forEach((w, i) => w.classList.toggle("on", i < k));
  }

  // ----- WebGL particles -----
  const canvas = document.getElementById("c");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: true, premultipliedAlpha: false });
  if (!gl) { body.classList.add("nogl", "ready", "landed"); addEventListener("scroll", resolveWords, { passive: true }); resolveWords(); return; }
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const prog = (v, f) => { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, v)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, f)); gl.linkProgram(p); return p; };
  const P = prog(`attribute vec2 a_pos; attribute float a_size; attribute vec4 a_col; uniform vec2 u_res; uniform float u_sm; uniform float u_am; varying vec4 v_col;
    void main(){ vec2 c = (a_pos / u_res) * 2.0 - 1.0; gl_Position = vec4(c.x, -c.y, 0.0, 1.0); gl_PointSize = a_size * u_sm; v_col = vec4(a_col.rgb, a_col.a * u_am); }`,
    `precision mediump float; varying vec4 v_col; void main(){ vec2 p = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(p)); a *= a; gl_FragColor = vec4(v_col.rgb * v_col.a * a, 1.0); }`);
  const F = prog(`attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`, `precision mediump float; uniform vec4 u_c; void main(){ gl_FragColor = u_c; }`);
  const quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const uRes = gl.getUniformLocation(P, "u_res"), uSm = gl.getUniformLocation(P, "u_sm"), uAm = gl.getUniformLocation(P, "u_am"), uC = gl.getUniformLocation(F, "u_c");
  const aPos = gl.getAttribLocation(P, "a_pos"), aSize = gl.getAttribLocation(P, "a_size"), aCol = gl.getAttribLocation(P, "a_col"), aQ = gl.getAttribLocation(F, "p");

  const small = innerWidth < 760;
  const NM = small ? 3000 : 6600, NA = small ? 700 : 1700, N = NM + NA, ST = 7;
  const data = new Float32Array(N * ST);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
  const A = () => new Float32Array(N);
  const mx = A(), my = A(), uu = A(), sx = A(), sy = A(), jit = A(), dl = A(), sz = A(), ph = A(), lu = A(), lv = A(), sd = A();
  const dx = A(), dy = A(), vx = A(), vy = A(), ax = A(), ay = A();
  const kind = new Uint8Array(N), ch = new Uint8Array(N), rb = new Uint8Array(N);
  const R = Math.random;
  const hex = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16) / 255);
  const G = hex("#00b36e"), B = hex("#3b6fe0"), W = hex("#e6ece6");
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const gauss = () => { let s = 0; for (let k = 0; k < 3; k++) s += R(); return (s / 3 - 0.5) * 2; };

  function seed() {
    for (let i = 0; i < N; i++) {
      if (i < NM) {
        const r = R();
        if (r < 0.42) {
          kind[i] = 1; let u = R(), v = R(); if (R() < 0.3) v = R() < 0.5 ? 0 : 1;
          uu[i] = u; mx[i] = 18 + 8 * v + 20 * u; my[i] = 15 + 34 * u;
          dl[i] = 0.55 + u * 0.55 + R() * 0.35; sz[i] = 1.5 + R() * 1.6;
        } else {
          kind[i] = 0; const x0 = r < 0.71 ? 16 : 40;
          if (R() < 0.32) { const e = R() * 84, t = e % 42; if (e < 42) { if (t < 8) { mx[i] = x0 + t; my[i] = 15; } else { mx[i] = x0 + 8; my[i] = 15 + t - 8; } } else { if (t < 8) { mx[i] = x0 + 8 - t; my[i] = 49; } else { mx[i] = x0; my[i] = 49 - (t - 8); } } }
          else { mx[i] = x0 + R() * 8; my[i] = 15 + R() * 34; }
          uu[i] = (my[i] - 15) / 34; dl[i] = R() * 0.75; sz[i] = 1.1 + R() * 1.3;
        }
        rb[i] = (R() * 7) | 0; lu[i] = R(); lv[i] = gauss(); sd[i] = R();
      } else { kind[i] = 2; sz[i] = 0.9 + R() * 1.4; ax[i] = R(); ay[i] = R(); }
      sx[i] = R(); sy[i] = R(); ch[i] = (R() * 5) | 0; jit[i] = R() - 0.5; ph[i] = R() * Math.PI * 2;
      dx[i] = dy[i] = vx[i] = vy[i] = 0;
    }
  }
  let Wd, Ht, dpr, mobile;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); Wd = innerWidth; Ht = innerHeight; mobile = Wd < 760;
    canvas.width = Math.round(Wd * dpr); canvas.height = Math.round(Ht * dpr); gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.02, 0.05, 0.094, 1); gl.clear(gl.COLOR_BUFFER_BIT);
  }
  let px = -9999, py = -9999;
  addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; }, { passive: true });
  document.addEventListener("mouseleave", () => { px = py = -9999; });

  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const heroEl = document.querySelector(".hero"), hzEl = document.getElementById("horizon");
  let t0 = 0, ready = false, parX = 0, parY = 0, idle = false;

  function frame(now) {
    if (!canvas.isConnected) { body.classList.remove("home-intro", "ready", "landed"); return; }
    const t = reduce ? 9 : (now - t0) / 1000;
    if (!ready && (t > (mobile ? 1.6 : 3.15) || scrollY > 4)) { ready = true; body.classList.add("ready"); }
    resolveWords();

    const hero = heroEl.getBoundingClientRect(), hz = hzEl.getBoundingClientRect();
    let S, cx, cy;
    if (mobile) { S = Math.min(Wd * 0.72, hero.height * 0.4); cx = Wd * 0.5; cy = hero.top + hero.height * 0.29; }
    else { S = Math.min(hero.height * 0.8, Wd * 0.46); cx = Wd * 0.7; cy = hero.top + hero.height * 0.5; }
    // scroll: N -> horizon line, paced like the inner-page headlines (NvMotion): the fall runs
    // across most of the hero's height, so it plays out as you read
    const s0 = 0, s1 = Math.max(420, hero.height * 0.85);
    let p = clamp((scrollY - s0) / Math.max(1, s1 - s0), 0, 1);
    if (reduce) p = p > 0.5 ? 1 : 0;
    body.classList.toggle("landed", p > 0.97);
    // everything fades once the horizon passes the upper part of the screen
    const q = clamp((hz.top - Ht * 0.12) / (Ht * 0.32), 0, 1);
    if (q <= 0.001) {
      if (!idle) { gl.clearColor(0.02, 0.05, 0.094, 1); gl.clear(gl.COLOR_BUFFER_BIT); idle = true; }
      if (!reduce) requestAnimationFrame(frame);
      return;
    }
    idle = false;
    const moving = p > 0.002 && p < 0.998;

    gl.useProgram(F); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.enableVertexAttribArray(aQ); gl.vertexAttribPointer(aQ, 2, gl.FLOAT, false, 0, 0);
    gl.uniform4f(uC, 0.02, 0.05, 0.094, reduce ? 1 : (t < 3.3 ? 0.16 : moving ? 0.24 : 0.55));
    gl.drawArrays(gl.TRIANGLES, 0, 3); gl.disableVertexAttribArray(aQ);

    const intro = clamp(t / 0.6, 0, 1), k = S / 64, breathe = clamp(t - 3, 0, 1);
    const sweep = (t - 2.75) / 1.05 * 1.35 - 0.18;
    const tpx = px < -9000 ? 0 : px / Wd - 0.5, tpy = py < -9000 ? 0 : py / Ht - 0.5;
    parX += (tpx * 26 * breathe * (1 - p) - parX) * 0.05; parY += (tpy * 18 * breathe * (1 - p) - parY) * 0.05;

    for (let i = 0; i < N; i++) {
      const o = i * ST; let x, y, a, s, c;
      if (kind[i] === 2) {
        ax[i] = (ax[i] + Math.sin(ay[i] * 6.1 + t * 0.21 + ph[i]) * 0.00022 + 0.00006 + 1) % 1;
        ay[i] = (ay[i] + Math.cos(ax[i] * 5.3 + t * 0.17 + ph[i]) * 0.00018 + 1) % 1;
        x = ax[i] * Wd; y = ay[i] * Ht; a = 0.15 * intro * q * (1 - 0.6 * p); s = sz[i];
        c = ph[i] > 5.2 ? G : ph[i] > 4.6 ? B : W;
      } else {
        const depth = kind[i] === 1 ? 1.6 : 1;
        const tx = cx + parX * depth + (mx[i] - 32) * k, ty = cy + parY * depth + (my[i] - 32) * k;
        const lo = clamp((t - 0.35 - dl[i]) / 1.4, 0, 1), e = ease(lo);
        const x0 = sx[i] * Wd + Math.sin(t * 0.5 + ph[i]) * 18, y0 = sy[i] * Ht + Math.cos(t * 0.4 + ph[i]) * 18;
        let nx, ny;
        if (e <= 0) { nx = x0; ny = y0; }
        else {
          const th = 2.2 + ch[i] * 0.42 + (mobile ? -1.6 : 0);
          const qx = cx + Math.cos(th) * S * 1.05 + jit[i] * S * 0.12, qy = cy + Math.sin(th) * S * 0.85 + jit[i] * S * 0.12, w = 1 - e;
          nx = w * w * x0 + 2 * w * e * qx + e * e * tx; ny = w * w * y0 + 2 * w * e * qy + e * e * ty;
        }
        if (lo >= 1) { nx += Math.sin(t * 0.7 + ph[i]) * 0.9 * breathe; ny += Math.cos(t * 0.6 + ph[i] * 1.3) * 0.9 * breathe; }
        let nc, na, ns;
        if (kind[i] === 1) {
          nc = mix(G, B, uu[i]);
          const lit = clamp((t - 2.6) / 0.6, 0, 1), band = t < 4.2 ? Math.exp(-Math.pow(uu[i] - sweep, 2) / 0.012) : 0;
          na = (0.22 + 0.55 * e + 0.25 * lit + 0.9 * band) * intro; ns = sz[i] * (1 + band * 0.9);
        } else { nc = W; na = (0.2 + 0.42 * e) * intro; ns = sz[i]; }

        // the horizon: a fine luminous line across the page, slowly flowing
        const f = (lu[i] + t * 0.012 * (0.6 + sd[i])) % 1;
        const hx = hz.left + f * hz.width, hy = hz.top + lv[i] * 1.6 + Math.sin(f * 14 + t * 0.8 + ph[i]) * 0.6;
        const edge = Math.sin(Math.PI * f);
        const hc = mix(G, B, f), ha = (0.25 + 0.35 * sd[i]) * edge, hs = sz[i] * 0.7;

        // the fall: burst out of the N, seven fine ribbons peel off in turn and settle on the horizon
        const cc = rb[i];
        const pp = ease(clamp((p - (cc * 0.05 + sd[i] * 0.1)) / 0.6, 0, 1));
        if (pp <= 0) { x = nx; y = ny; c = nc; a = na; s = ns; }
        else if (pp >= 1) { x = hx; y = hy; c = hc; a = ha; s = hs; }
        else {
          const bx = nx - cx, by = ny - cy, bl = Math.hypot(bx, by) + 1;
          const burst = Math.sin(Math.min(1, pp * 3) * Math.PI) * S * (0.3 + sd[i] * 0.3);
          const side = mobile ? (cc % 2 ? 1 : -1) * 0.2 : (cc - 3) * 0.045 + 0.06;
          const c1x = cx + side * Wd + jit[i] * 14, c1y = cy + S * 0.75 + jit[i] * 18;
          const c2x = mobile ? Wd * (0.2 + cc * 0.1) : hz.left + hz.width * (0.55 + cc * 0.06), c2y = hz.top - Ht * 0.3 + jit[i] * 18;
          const w = 1 - pp, b0 = w * w * w, b1 = 3 * w * w * pp, b2 = 3 * w * pp * pp, b3 = pp * pp * pp;
          x = b0 * nx + b1 * c1x + b2 * c2x + b3 * hx + bx / bl * burst;
          y = b0 * ny + b1 * c1y + b2 * c2y + b3 * hy + by / bl * burst;
          const glow = Math.sin(pp * Math.PI);
          c = mix(mix(nc, mix(G, B, cc / 6), glow * 0.8), hc, pp * pp);
          a = na + (ha - na) * pp + 0.4 * glow;
          s = (ns + (hs - ns) * pp) * (1 - 0.3 * glow);   // finer, not bigger, while falling
        }
        a *= q;
      }
      const ddx = x + dx[i] - px, ddy = y + dy[i] - py, d2 = ddx * ddx + ddy * ddy, rad = mobile ? 60 : 110;
      if (d2 < rad * rad) { const d = Math.sqrt(d2) + 0.001, ff = (1 - d / rad) * 2.2; vx[i] += ddx / d * ff; vy[i] += ddy / d * ff; }
      vx[i] = (vx[i] - dx[i] * 0.045) * 0.86; vy[i] = (vy[i] - dy[i] * 0.045) * 0.86; dx[i] += vx[i]; dy[i] += vy[i];
      data[o] = (x + dx[i]) * dpr; data[o + 1] = (y + dy[i]) * dpr; data[o + 2] = s * dpr * 1.6;
      data[o + 3] = c[0]; data[o + 4] = c[1]; data[o + 5] = c[2]; data[o + 6] = Math.min(a, 1.4);
    }

    gl.useProgram(P); gl.blendFunc(gl.ONE, gl.ONE);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, ST * 4, 0);
    gl.enableVertexAttribArray(aSize); gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, ST * 4, 8);
    gl.enableVertexAttribArray(aCol); gl.vertexAttribPointer(aCol, 4, gl.FLOAT, false, ST * 4, 12);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    // bloom only while the N stands; the fall stays fine
    const bloom = (1 - Math.min(1, p * 4));
    if (bloom > 0.01) { gl.uniform1f(uSm, mobile ? 3.2 : 4.6); gl.uniform1f(uAm, 0.045 * bloom); gl.drawArrays(gl.POINTS, 0, NM); }
    gl.uniform1f(uSm, 1); gl.uniform1f(uAm, 1); gl.drawArrays(gl.POINTS, 0, N);
    gl.disableVertexAttribArray(aPos); gl.disableVertexAttribArray(aSize); gl.disableVertexAttribArray(aCol);
    if (!reduce) requestAnimationFrame(frame);
  }
  let running = false, replaying = false;
  function start() {
    seed(); resize(); t0 = performance.now(); ready = false; body.classList.remove("ready");
    replaying = false;
    if (reduce) { ready = true; body.classList.add("ready"); }
    if (!running || reduce) { running = true; requestAnimationFrame(frame); }
  }
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
  if (reduce) addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
  start();
})();

}

export function initHomeSections() {

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = id => document.getElementById(id);
  // run fn once when el is sufficiently on screen (IntersectionObserver plus a scroll check as backup)
  const onView = (el, fn, th = 0.35) => {
    let done = false;
    const fire = () => { if (done) return; done = true; fn(); };
    const check = () => { if (done) return; const r = el.getBoundingClientRect(), h = innerHeight; const vis = Math.min(r.bottom, h) - Math.max(r.top, 0); if (vis > Math.min(r.height, h) * th) { fire(); removeEventListener("scroll", check); } };
    if ("IntersectionObserver" in window) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { fire(); o.disconnect(); } }, { threshold: th }).observe(el);
    addEventListener("scroll", check, { passive: true }); check();
  };

  // ---------- 2. the gap chart ----------
  const gap = $("gapchart");
  if (reduce) gap.classList.add("in"); else onView(gap, () => gap.classList.add("in"), 0.4);

  // ---------- 4. what discovery hands you ----------
  const DOCS = [
    { t: "Workflow map", h: () => `<div class="paper-h"><b>Workflow map: quote to invoice</b><span>Client example</span></div>
      <table class="ptable"><thead><tr><th>Step today</th><th>Who</th><th>Time</th><th>Where AI fits</th></tr></thead><tbody>
      <tr><td>Request arrives by email</td><td>Sales</td><td>10 min</td><td class="v keep">Agent reads it</td></tr>
      <tr><td>Quote built in a spreadsheet</td><td>Estimator</td><td>45 min</td><td class="v keep">Agent drafts</td></tr>
      <tr><td>Quote approved</td><td>Manager</td><td>1 day wait</td><td class="v">Stays with a person</td></tr>
      <tr><td>Job created in the system</td><td>Ops</td><td>15 min</td><td class="v swap">Connect the tools</td></tr>
      <tr><td>Invoice typed into accounting</td><td>Admin</td><td>15 min, typed twice</td><td class="v cut">Cut the double entry</td></tr></tbody></table>
      <p class="fine" style="margin-top:18px">Built in interviews with the people who do the work, before anything is automated.</p>` },
    { t: "Tool and cost report", h: () => `<div class="paper-h"><b>Tool and cost report</b><span>Example</span></div>
      <table class="ptable"><thead><tr><th>Tool</th><th>Users</th><th>Per year</th><th>Call</th></tr></thead><tbody>
      <tr><td>Project management</td><td>104</td><td>$46,800</td><td class="v keep">Keep, connect</td></tr>
      <tr><td>CRM</td><td>38</td><td>$31,200</td><td class="v keep">Keep, connect</td></tr>
      <tr><td>Accounting</td><td>12</td><td>$24,000</td><td class="v keep">Keep, connect</td></tr>
      <tr><td>Field scheduling platform</td><td>62</td><td>$38,000</td><td class="v swap">Replace</td></tr>
      <tr><td>Document tool</td><td>104</td><td>$18,720</td><td class="v cut">Cut, overlaps</td></tr>
      <tr><td>E-signature add-on</td><td>11</td><td>$17,000</td><td class="v cut">Cut, overlaps</td></tr>
      <tr><td>Reporting plugin</td><td>2</td><td>$11,280</td><td class="v cut">Cut, unused</td></tr>
      <tr><td>Other tools (7)</td><td>Varies</td><td>$23,000</td><td class="v keep">Keep</td></tr></tbody></table>
      <div class="ptotal"><span>Flagged to cut or replace, of $210,000 total</span><span>$85,000 a year</span></div>` },
    { t: "AI usage policy", h: () => `<div class="paper-h"><b>AI usage policy</b><span>Example</span></div>
      <div class="pol"><div class="ok"><h4>Fine to use AI for</h4><ul><li>Drafting emails from your own notes</li><li>Summarizing internal documents</li><li>Company questions in your own assistant</li></ul></div>
      <div class="no"><h4>Never</h4><ul><li>Client financials in public chatbots</li><li>Passwords or account numbers</li><li>Anything sent out before a person reviews it</li></ul></div></div>` },
    { t: "What we built", h: () => `<div class="paper-h"><b>Launch note: what went live</b><span>Example</span></div>
      <div class="launch">
        <div><span>Custom software</span><b>Project system live, 6 years of data migrated from the old platform</b></div>
        <div><span>Connected tools</span><b>CRM and accounting in two-way sync; quotes become jobs without retyping</b></div>
        <div><span>Automation</span><b>Invoice intake agent: 98.3% on 120 of your past invoices; the controller approves every batch</b></div>
        <div><span>Ownership</span><b>Code, data and accounts in your company's name</b></div></div>` },
    { t: "Training library", h: () => `<div class="paper-h"><b>Training library</b><span>Example</span></div>
      <table class="ptable"><thead><tr><th>Session</th><th>Team</th><th>Length</th></tr></thead><tbody>
      <tr><td>Working with the invoice intake agent</td><td>Accounting</td><td>42 min</td></tr>
      <tr><td>Quoting with the assistant</td><td>Sales</td><td>35 min</td></tr>
      <tr><td>Your AI usage policy, in practice</td><td>Everyone</td><td>20 min</td></tr>
      <tr><td>Finding anything in the new project system</td><td>Operations</td><td>30 min</td></tr></tbody></table>
      <p class="fine" style="margin-top:18px">Recorded on your own tools, with written guides. Your company keeps it for good.</p>` },
    { t: "Monthly report", h: () => `<div class="paper-h"><b>Monthly report: October</b><span>Example</span></div>
      <div class="launch">
        <div><span>Hours saved</span><b>410 this month: finance 170, operations 150, admin 90</b></div>
        <div><span>Adoption</span><b>86 of 104 desk staff used AI weekly, up from 71 last month</b></div>
        <div><span>Cost</span><b>Agent run costs $2,340 for the month across 6 agents</b></div>
        <div><span>Agents live</span><b>6, each with an owner on your team</b></div>
        <div><span>Accuracy</span><b>98.6% across all agents; 3 misses, each added as a new test</b></div>
        <div><span>Model update</span><b>New model tested on 240 of your cases: +1.2 points, switched</b></div>
        <div><span>Tool audit</span><b>1 overlapping tool cut, about $1,800 a month</b></div>
        <div><span>Next up</span><b>Renewal reminders agent, starting the 14th</b></div></div>` }
  ];
  const dt = $("docsTabs"), paper = $("paper");
  dt.innerHTML = DOCS.map((d, i) => `<button type="button" role="tab" aria-selected="false" data-i="${i}"><span>0${i + 1}</span>${d.t}</button>`).join("");
  const dtBtns = [...dt.children];
  let di = 0, dtimer = 0, held = false;
  function doc(i) {
    di = i; paper.innerHTML = DOCS[i].h(); paper.style.animation = "none"; void paper.offsetWidth; paper.style.animation = "";
    dtBtns.forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
    clearTimeout(dtimer);
  }
  dtBtns.forEach(b => b.addEventListener("click", () => { held = true; dt.classList.add("held"); doc(+b.dataset.i); }));
  doc(0);

})();

// Agents at work: ported from the live site's ExampleBuilds (six examples, same stories and timing).
// Each demo is built once; every tick updates which parts are shown (data-s="from-to"),
// which classes apply (data-c="cls:from-to;..."), counters (data-n) and typing (data-type).
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TICK = 550;
  const S = (a, b = "") => `data-s="${a}-${b}"`;
  const C = spec => `data-c="${spec}"`;
  const done = (items) => `<div class="x-done">${items.map(([at, txt]) => `<div ${S(at)}><em>✓</em>${txt}</div>`).join("")}</div>`;
  const review = (at, q, p, opts, selAt) => `<div class="x-review" ${S(at)}><div class="x-q">${q}</div><p>${p}</p><div class="x-btns">${opts.map((o, i) => `<span class="x-btn" ${i === 0 ? C("sel:" + selAt + "-") : ""}>${o}</span>`).join("")}</div></div>`;
  const head = (l, r) => `<div class="x-cardhead">${l}<small>${r}</small></div>`;
  const live = txt => `<span class="x-live"><i></i>${txt}</span>`;
  const tr = (cols, cells, attrs = "") => `<div class="x-tr" style="--cols:${cols}" ${attrs}>${cells.join("")}</div>`;
  const pill = (cls, txt, show) => `<span class="x-pill ${cls}" ${show ? S(...show) : ""}>${txt}</span>`;

  // ---- 1. order entry (four-step flow) ----
  const LINES = [70, 45, 88, 60, 92, 76, 84, 52, 66];
  const ROWS = [["120", "PXA-050-100", "They wrote: “1/2 PEX-A pipe 100ft”", "$38.40"], ["60", "SB-U008", "They wrote: “SharkBite 1/2 coupling”", "$5.12"], ["40", "BV-075-F", "They wrote: “3/4 ball valve FIP”", "$14.85"], ["200", "EL-PX-075", "They wrote: “3/4 elbow”", "$1.36", true], ["24", "TT-050", "They wrote: “Teflon tape 1/2in”", "$0.89"]];
  const order = () => `<div class="x-flow">
    <div class="x-col" ${C("on:0-1")}><div class="x-colhead"><span>1</span>Lands in the inbox</div><div class="x-inbox">
      ${[["Harbor Plumbing Supply", "PO 88213, need by Oct 14", "PO_88213.pdf", "7:42 AM"], ["Cascade Mechanical", "Re: Order 4471, add 2 cases", "", "7:38 AM"], ["Northline Builders", "Price on 40 ball valves, 2\"?", "", "7:31 AM"], ["Fax · Ridgeway Contractors", "PO scan, 2 pages", "Fax_0712.pdf", "7:20 AM"]].map((m, i) =>
        `<div class="x-mail${i === 0 ? " x-first" : ""}" ${i === 0 ? C("read:1-") : ""}><div class="x-mail-top"><b>${m[0]}</b><small>${m[3]}</small></div><p>${m[1]}</p>${m[2] ? `<span class="x-att"><span class="x-file">PDF</span>${m[2]}</span>` : ""}</div>`).join("")}</div></div>
    <div class="x-col" ${C("on:1-7")}><div class="x-colhead"><span>2</span>Agent reads it</div>
      <div class="x-doc"><div class="x-doc-head"><span class="x-tag">PDF</span>PO_88213.pdf</div><div class="x-doc-body">${LINES.map(w => `<i style="width:${w}%"></i>`).join("")}<div class="x-scan" ${S(1, 7)}></div></div></div>
      <div class="x-fields">${[["Customer", "Harbor Plumbing Supply · HPS-118"], ["PO number", "88213"], ["Ship to", "Yard 2 · Tacoma, WA"], ["Need by", "Oct 14"]].map((f, i) => `<div class="x-field" ${S(2 + i)}><small>${f[0]}</small><b>${f[1]}</b><em>✓</em></div>`).join("")}</div></div>
    <div class="x-col" ${C("on:7-13")}><div class="x-colhead"><span>3</span>Drafts the sales order</div>
      <div class="x-lines"><div class="x-wait" ${S(0, 7)}>Waiting on step 2…</div>
      ${ROWS.map((r, i) => `<div class="x-line" ${S(7 + i)} ${r[4] ? C("flag:13-16;fixed:16-") : ""}><span class="x-qty">${r[0]}</span><span class="x-desc">${r[4] ? `<b ${S(0, 16)}>2 possible SKUs</b><b ${S(16)}>${r[1]}</b>` : `<b>${r[1]}</b>`}<small>${r[2]}</small></span><span class="x-price">${r[4] ? `<span ${S(0, 16)}>?</span><span ${S(16)}>${r[3]}</span>` : r[3]}</span><span class="x-dot" ${r[4] ? C("warn:0-16") : ""}></span></div>`).join("")}</div>
      <div class="x-total" ${S(18)}><span>Order total</span><b>$5,802.56</b></div></div>
    <div class="x-col" ${C("on:13-")}><div class="x-colhead"><span>4</span>A rep approves</div>
      <div class="x-wait x-wait-box" ${S(0, 13)}>Nothing goes out until a person approves it.</div>
      <div class="x-review" ${S(13)}><div class="x-q">1 line needs a rep</div><p>“3/4 elbow” matches two items.</p>
        <div class="x-opt" ${C("sel:16-")}><b>EL-PX-075 · PEX elbow</b><small>On their last 6 orders</small></div><div class="x-opt"><b>EL-CU-075 · Copper elbow</b><small>Never ordered</small></div></div>
      ${done([[18, "Approved by K. Ortiz in 1m 40s"], [20, "SO-20417 created in NetSuite"], [21, "Confirmation drafted to Harbor Plumbing"]])}</div>
  </div>`;

  // ---- 2. phone agent ----
  const CALL = [["Caller", "Our furnace stopped and it's 50 degrees in here."], ["Agent", "I can help. Is anyone in the home elderly or unwell?"], ["Caller", "No, just us. It's blowing cold air."], ["Agent", "I have 7:30 tomorrow morning with Marco. Does that work?"], ["Caller", "Yes, please."]];
  const pos = (s, d) => `left:${((s - 7) / 6) * 100}%;width:${(d / 6) * 100}%`;
  const job = (txt, p, extra = "") => `<i class="x-job" style="${p}" ${extra}>${txt}</i>`;
  const phone = () => `<div class="x-2col">
    <div class="x-card">${head(live("Incoming call · 9:14 PM"), "After hours")}<div class="x-call">${CALL.map((s, i) => `<div class="x-said${s[0] === "Agent" ? " agent" : ""}" ${S(i)}><small>${s[0]}</small>${s[1]}</div>`).join("")}</div></div>
    <div class="x-stack"><div class="x-card">${head("<b>Tomorrow's board</b>", "Thu, Oct 8")}<div class="x-board">
      <div class="x-hours"><span></span>${["7", "8", "9", "10", "11", "12"].map(h => `<span>${h}</span>`).join("")}</div>
      <div class="x-lane"><b>Marco</b><div class="x-track">${job("Tune-up · Patel", pos(7, 1), S(0, 10) + " " + C("warn:6-10"))}${job("Tune-up · Patel", pos(9.5, 1), S(10))}${job("No heat · Whitfield", pos(7.5, 1), S(6) + ' ' + C("new:6-;warn:6-11;ok:11-"))}${job("Install · Greene", pos(11, 2))}</div></div>
      <div class="x-lane"><b>Jen</b><div class="x-track">${job("Repair · Ortiz", pos(8, 2))}${job("Tune-up · Lam", pos(11, 1))}</div></div>
      <div class="x-lane"><b>Luis</b><div class="x-track">${job("Install · Brooks", pos(7, 4.5))}</div></div></div></div>
      ${review(7, "Dispatch: 1 conflict", "Marco has a 7:00 tune-up. Mr. Patel said any time works.", ["Move the tune-up to 9:30", "Send Jen instead"], 9)}
      ${done([[11, "Job 44812 confirmed on Marco's board"], [12, "Text to Dana: Marco arrives at 7:30"], [13, "Mr. Patel asked to confirm 9:30"]])}</div>
  </div>`;

  // ---- 3. shipment agent ----
  const shipment = () => { const cols = "64px 1.4fr 1fr 1fr";
    const L = [["7728", "Reno to Boise", "1:10 PM", "On time"], ["7731", "Tacoma to Spokane", "2:00 PM", "On time", "5:05 PM"], ["7735", "Portland to Salem", "11:30 AM", "Delivered"], ["7740", "Eugene to Medford", "8:00 AM +1", "On time"]];
    return `<div class="x-2col wide-left"><div class="x-card">${head(live("Watching 38 loads"), "Carrier feeds, weather, check calls")}
      ${tr(cols, ["<span>Load</span>", "<span>Lane</span>", "<span>ETA</span>", "<span>Status</span>"], 'data-head="1"')}
      ${L.map((l, i) => l[4]
        ? tr(cols, [`<b>${l[0]}</b>`, `<span>${l[1]}</span>`, `<span><span ${S(0, 5)}>${l[2]}</span><span ${S(5)}>${l[4]}</span></span>`, `<span>${pill("ok", "On time", [0, 5])}${pill("warn", "Late 3 hrs", [5, 11])}${pill("ok", "Dock moved", [11, ""])}</span>`], S(i) + " " + C("warn:5-11;resolved:11-"))
        : tr(cols, [`<b>${l[0]}</b>`, `<span>${l[1]}</span>`, `<span>${l[2]}</span>`, `<span>${pill(l[3] === "Delivered" ? "soft" : "ok", l[3])}</span>`], S(i))).join("")}
      <div class="x-draft" ${S(8)}><small>Draft to Northline Builders</small><p>Load 7731 is running about 3 hours behind because of a lane closure on I-90. New arrival is 5:05 PM. We've asked for a 5:15 PM dock slot.</p></div></div>
      <div class="x-stack">${review(7, "Load 7731 will miss its 2:00 PM dock slot", "Receiving closes at 5:30 PM, so the new ETA still fits.", ["Move dock to 5:15 PM and notify", "Rebook with backup carrier"], 10)}
      ${done([[11, "Approved by M. Reyes in 2 minutes"], [12, "Dock appointment moved in the TMS"], [13, "Update sent to Northline Builders"]])}</div></div>`; };

  // ---- 4. research agent ----
  const ANSWER = "The signed MSA caps indemnity at 12 months of fees (section 9.2). On March 14, J. Park emailed Halvorsen agreeing to 24 months for data breaches only, but the signed redline (v4) still says 12. The email and the contract disagree.";
  const research = () => `<div class="x-2col wide-left"><div class="x-card x-chat">
      <div class="x-ask"><small>Associate</small>What did we agree on the indemnity cap in the Halvorsen MSA, and has our position changed since?</div>
      <div class="x-ans" ${S(3)}><small>Assistant</small><p data-type="3"></p><div class="x-cites">${["Halvorsen MSA §9.2", "Email · J. Park · Mar 14", "Redline v4"].map((c, i) => `<span ${S(12 + i)}>${c}</span>`).join("")}</div></div></div>
    <div class="x-stack"><div class="x-card x-pad"><div class="x-label">Searched, limited to what this person may see</div>
      <div class="x-chips">${["Document system · 214 files", "Email · 1,380 messages", "Billing notes · 62 entries"].map((x, i) => `<span ${S(1 + i)}>✓ ${x}</span>`).join("")}</div>
      <div class="x-lock" ${S(4)}>2 files hidden: restricted matter</div></div>
      ${review(15, "Agent note for the attorney", "The email and the contract disagree. Confirm which governs before this goes to the client.", ["Flag for partner review", "Add to matter notes"], 17)}
      ${done([[18, "Answer saved to the matter with its sources"], [19, "Partner review requested"]])}</div></div>`;

  // ---- 5. invoice agent ----
  const invoice = () => { const cols = "1.3fr 80px 70px 1fr";
    const B = [["Ridge Supply", "INV-4410", "PO-2231", "$6,210", 1], ["Cascade Electric", "INV-0982", "PO-2240", "$7,480", 1], ["Northwest Lumber", "INV-7713", "PO-2252", "$4,320", 0], ["Summit Freight", "INV-3301", "PO-2258", "$4,950", 1]];
    return `<div class="x-2col wide-left"><div class="x-card">${head("<b>AP inbox · 4 vendor bills</b>", "Matched to purchase order and receiving")}
      ${tr(cols, ["<span>Vendor</span>", "<span>Invoice</span>", "<span>Amount</span>", "<span>Match</span>"], 'data-head="1"')}
      ${B.map((b, i) => tr(cols, [`<span><b>${b[0]}</b><small>${b[2]} + receiving</small></span>`, `<span>${b[1]}</span>`, `<span>${b[3]}</span>`,
        `<span>${b[4] ? pill("ok", "Matched", [3 + i, ""]) : pill("warn", "Billed 120, got 100", [3 + i, 11]) + pill("ok", "Fixed", [11, ""])}</span>`],
        S(i) + (b[4] ? "" : " " + C(`warn:${3 + i}-11;resolved:11-`)))).join("")}
      <div class="x-sum" ${S(7)}><span>Ready to pay <b>$18,640</b></span><span>Held for review <b>$4,320</b></span></div></div>
      <div class="x-stack">${review(8, "1 bill held", "Northwest Lumber billed 120 units. Receiving logged 100.", ["Pay 100, request credit for 20", "Pay as billed"], 10)}
      ${done([[11, "Approved by S. Patel in 3 minutes"], [12, "4 bills posted to QuickBooks for payment"], [13, "Credit request drafted to Northwest Lumber"]])}</div></div>`; };

  // ---- 6. renewal agent ----
  const renewal = () => { const cols = "1.4fr 1fr 1fr";
    const RN = [["Alder Dental Group", "Commercial package"], ["Brennan Roofing", "Workers comp"], ["Coastal Cafe", "Property", 1], ["Dunmore Logistics", "Auto fleet"]];
    return `<div class="x-2col wide-left"><div class="x-stack">
      <div class="x-kpis"><div><small>Renewals due in 60 days</small><b>23</b></div><div><small>Packets drafted</small><b data-n="packets">0</b></div><div><small>Need a producer</small><b data-n="producer">0</b></div></div>
      <div class="x-card">${tr(cols, ["<span>Client</span>", "<span>Line</span>", "<span>Status</span>"], 'data-head="1"')}
      ${RN.map((r, i) => tr(cols, [`<b>${r[0]}</b>`, `<span>${r[1]}</span>`, `<span>${r[2] ? pill("warn", "Claim in June", [4 + i, 11]) + pill("ok", "Remarketing", [11, ""]) : pill("ok", "Packet ready", [4 + i, ""])}</span>`], S(i) + (r[2] ? " " + C(`warn:${4 + i}-11;resolved:11-`) : ""))).join("")}</div></div>
      <div class="x-stack">${review(8, "2 renewals need a producer", "Coastal Cafe filed a property claim in June. Quoting it as is could misprice the account.", ["Remarket before quoting", "Quote as is"], 10)}
      ${done([[11, "21 renewal packets held for producer sign-off"], [12, "Coastal Cafe flagged for remarketing"], [13, "Nothing sent to a client yet"]])}</div></div>`; };

  const TABS = [
    { tab: "Order entry agent", small: "Wholesale distribution", title: "Order entry agent", sub: "Email and fax in · draft sales order out · a rep approves", ex: "Wholesale distributor", end: 27, html: order, note: "The agent drafts. A person approves before anything is released.", link: "See wholesale distribution", href: "/use-cases/wholesale-distribution" },
    { tab: "Phone agent", small: "Field services", title: "After-hours phone agent", sub: "Answers the call · books the job on your board · dispatch confirms", ex: "HVAC company", end: 19, html: phone, note: "Connected to the dispatch board you already use. Emergencies go straight to a person.", link: "See field services", href: "/use-cases/field-services" },
    { tab: "Late-load agent", small: "Logistics", title: "Late-load agent", sub: "Watches every load · catches a delay · drafts the update · a dispatcher approves", ex: "Freight brokerage", end: 20, html: shipment, note: "The agent catches the delay before the customer calls. A dispatcher approves every message and every change.", link: "See wholesale distribution", href: "/use-cases/wholesale-distribution" },
    { tab: "Research agent", small: "Law firm", title: "Matter research assistant", sub: "Ask in plain English · answers from the firm's own files · cites every source", ex: "Law firm", end: 24, html: research, note: "Searches only what the person asking is allowed to see, and shows where every answer came from.", link: "See legal", href: "/use-cases/legal" },
    { tab: "Invoice agent", small: "Accounting", title: "Vendor bill matching agent", sub: "Bills in · matched to the PO and receiving · exceptions held for a person", ex: "Accounting team", end: 21, html: invoice, note: "Clean bills move on their own. Anything that doesn't match waits for a person.", link: "See accounting", href: "/use-cases/accounting" },
    { tab: "Renewal agent", small: "Insurance", title: "Renewal packet agent", sub: "Finds renewals · assembles each packet · flags the risky ones for a producer", ex: "Insurance agency", end: 21, html: renewal, note: "Drafts a month of renewals in minutes. Producers review before anything reaches a client.", link: "See insurance", href: "/use-cases/insurance" }
  ];

  const root = document.getElementById("xdemo");
  if (!root) return;
  const tabsEl = root.querySelector(".x-tabs"), stage = root.querySelector(".x-stage");
  tabsEl.innerHTML = TABS.map((x, i) => `<button type="button" role="tab" aria-selected="false" class="x-tab"><b>${x.tab}</b><small>${x.small}</small><span class="x-prog"></span></button>`).join("");
  const tabBtns = [...tabsEl.children];
  let idx = 0, t = 0, running = false, timer = 0, words = ANSWER.split(" ");

  const inRange = (spec, tt) => { const [a, b] = spec.split("-"); return tt >= +a && (b === "" || b === undefined || tt < +b); };
  function update() {
    stage.querySelectorAll("[data-s]").forEach(el => el.classList.toggle("in", inRange(el.dataset.s, t)));
    stage.querySelectorAll("[data-c]").forEach(el => el.dataset.c.split(";").forEach(p => { const [cls, r] = p.split(":"); el.classList.toggle(cls, inRange(r, t)); }));
    const pk = stage.querySelector('[data-n="packets"]'); if (pk) pk.textContent = Math.min(23, Math.max(0, (t - 1) * 4));
    const pr = stage.querySelector('[data-n="producer"]'); if (pr) { const v = Math.min(23, Math.max(0, (t - 1) * 4)) >= 23; pr.textContent = v ? 2 : 0; pr.classList.toggle("warnnum", v); }
    const ty = stage.querySelector("[data-type]"); if (ty) { const n = Math.max(0, Math.min(words.length, (t - 3) * 6)); ty.innerHTML = words.slice(0, n).join(" ") + (t >= 3 && n < words.length ? '<i class="x-caret"></i>' : ""); }
    const prog = tabBtns[idx].querySelector(".x-prog"); if (prog) prog.style.width = running ? Math.min(100, t / TABS[idx].end * 100) + "%" : "0";
  }
  function show(i) {
    idx = i; const x = TABS[i];
    tabBtns.forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); b.querySelector(".x-prog").style.width = "0"; });
    root.querySelector(".x-title").textContent = x.title; root.querySelector(".x-sub").textContent = x.sub; root.querySelector(".x-ex").textContent = "Example: " + x.ex;
    root.querySelector(".x-note").textContent = x.note; root.querySelector(".x-link").firstChild.textContent = x.link + " "; root.querySelector(".x-link").setAttribute("href", x.href || "/use-cases");
    stage.innerHTML = x.html(); stage.classList.remove("swap"); void stage.offsetWidth; stage.classList.add("swap");
    update();
  }
  function tick() { if (!root.isConnected) { clearInterval(timer); return; } if (t < TABS[idx].end) { t++; update(); } else { t = 0; show((idx + 1) % TABS.length); } }
  function setRunning(v) { if (v === running) return; running = v; clearInterval(timer); if (running && !reduce) timer = setInterval(tick, TICK); update(); }
  tabBtns.forEach((b, i) => b.addEventListener("click", () => { t = running && !reduce ? 0 : 99; show(i); }));
  t = reduce ? 99 : 0; show(0);
  // play while on screen (IntersectionObserver, with a scroll check as backup)
  const vis = () => { const r = root.getBoundingClientRect(), h = innerHeight; return Math.min(r.bottom, h) - Math.max(r.top, 0) > Math.min(r.height, h) * 0.3; };
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.3 }).observe(root);
  addEventListener("scroll", () => setRunning(vis()), { passive: true });
  setRunning(vis());
})();


}

export function initFlip() {

// hover invert on cards and grid cells across the page
document.querySelectorAll(".caps4 .cap, .gov > div, .cad, .pace > div, .finds > div, .closes > div, .pst, .mlist li").forEach(el => el.classList.add("flip"));

}

export function initLayers() {

// 01: a 60-person company gains training, connections, agents, its own system and an AI Officer as the steps scroll past
(() => {
  const svg = document.getElementById("dg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const DEPTS = ["Accounting", "Operations", "Sales", "Front office", "HR", "Leadership"];
  const SYS = ["QuickBooks", "Project platform", "CRM", "Phones", "Microsoft 365"];
  const WIRES = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 4]];
  const AGENTS = [{ w: 0, l: "Invoices", c: "600" }, { w: 3, l: "Calls", c: "150" }, { w: 1, l: "POs matched", c: "250" }, { w: 2, l: "Follow-ups", c: "80" }, { w: 4, l: "HR drafts", c: "3 waiting", wait: 1 }];
  const LINKS = [[0, 1], [1, 2], [2, 3], [3, 4]];
  const CHIPS = [["Chat seat", 2, .42], ["AI add-on", 0, .58], ["AI tier", 1, .36], ["Free tool", 3, .62]];
  const CAPS = ["Four AI subscriptions. None connected, nobody trained, nobody in charge.", "Accounting class, recorded: coding invoices with AI on your own vendors.", "Address changed in the CRM. QuickBooks and Microsoft 365 updated.", "INV-20431 keyed and matched to PO-7781. Three HR drafts wait for a person.", "Project history moved to your own system. Code and accounts in your name.", "New model tested on 200 of your past invoices before anything switched."];
  const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); (p || svg).appendChild(e); return e; };
  const steps = [...document.querySelectorAll("#layers .st")], col = document.querySelector("#layers .steps-col");
  const lyr = document.getElementById("lyr"), capt = document.getElementById("capt"), capF = document.querySelector("#layers .cap-f"), rail = document.getElementById("railp");
  let cur = -1, counted = false;
  // wide: teams in a row over the systems; narrow: teams in a column beside them
  function build() {
    svg.innerHTML = "";
    const wide = svg.parentNode.clientWidth > 560;
    let W, H, dp, sp, sw, sh;
    if (wide) { W = 660; H = 520; dp = DEPTS.map((_, i) => [60 + i * 108, 84]); sp = SYS.map((_, i) => [66 + i * 132, 438]); sw = 116; sh = 40; }
    else { W = 360; H = 470; dp = DEPTS.map((_, i) => [100, 44 + i * 74]); sp = SYS.map((_, i) => [290, 58 + i * 88]); sw = 104; sh = 38; }
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const gW = el("g", {}), gL = el("g", {}), gC = el("g", {}), gS = el("g", {}), gA = el("g", {}), gD = el("g", {});
    const paths = WIRES.map(([d, s]) => {
      const [dx, dy] = dp[d], [sx, sy] = sp[s]; let p;
      if (wide) { const a = dy + 26, b = sy - sh / 2, m = (a + b) / 2; p = `M${dx},${a} C${dx},${m} ${sx},${m} ${sx},${b}`; }
      else { const a = dx + 22, b = sx - sw / 2, m = (a + b) / 2; p = `M${a},${dy} C${m},${dy} ${m},${sy} ${b},${sy}`; }
      return el("path", { d: p, class: "wire" }, gW);
    });
    LINKS.forEach(([a, b], i) => {
      const [ax, ay] = sp[a], [bx, by] = sp[b]; let d;
      if (wide) { const y = ay + sh / 2; d = `M${ax},${y} C${ax},${y + 40} ${bx},${y + 40} ${bx},${y}`; }
      else { const x = ax + sw / 2; d = `M${x},${ay} C${x + 14},${ay} ${x + 14},${by} ${x},${by}`; }
      el("path", { d, class: "link", pathLength: 1 }, gL).style.transitionDelay = (i * .25) + "s";
      el("animateMotion", { dur: (2.2 + i * .3) + "s", begin: (-i * .4 - .01) + "s", repeatCount: "indefinite", path: d }, el("circle", { r: 2.6, class: "pulse" }, gL));
    });
    CHIPS.forEach(([t, x, y], i) => {
      const g = el("g", { class: "chip" }, gC); g.style.transitionDelay = (i * .08) + "s";
      const pp = paths[x], pt = pp.getPointAtLength(pp.getTotalLength() * (wide ? y : .5)), w = t.length * (wide ? 6.6 : 5.8) + 22;
      el("rect", { x: pt.x - w / 2, y: pt.y - 12, width: w, height: 24, rx: 12 }, g);
      el("text", { x: pt.x, y: pt.y + 4, "text-anchor": "middle" }, g).textContent = t;
    });
    SYS.forEach((t, i) => {
      const [x, y] = sp[i], isOld = i === 1, g = el("g", { class: "sys" + (isOld ? " old" : "") }, gS);
      el("rect", { x: x - sw / 2, y: y - sh / 2, width: sw, height: sh, rx: 9 }, g);
      el("text", { x, y: y + 4.5, "text-anchor": "middle" }, g).textContent = t;
      if (!isOld) return;
      el("line", { x1: x - sw / 2 + 10, y1: y, x2: x + sw / 2 - 10, y2: y, pathLength: 1 }, g);
      const n = el("g", { class: "new" }, gS);
      el("rect", { x: x - sw / 2 - 4, y: y - sh / 2 - 6, width: sw + 8, height: sh + 12, rx: 11 }, n);
      el("text", { x, y: y - 1, "text-anchor": "middle" }, n).textContent = "Your own system";
      el("text", { x, y: y + 13, "text-anchor": "middle", class: "sm" }, n).textContent = "IN YOUR NAME";
    });
    // ten people per team
    DEPTS.forEach((t, i) => {
      const [x, y] = dp[i];
      if (wide) el("text", { x, y: y - 34, "text-anchor": "middle", class: "dl" }, gD).textContent = t;
      else el("text", { x: x - 30, y: y + 4.5, "text-anchor": "end", class: "dl" }, gD).textContent = t;
      for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) el("circle", { cx: x - 20 + c * 10, cy: y - 5 + r * 10, r: 3, class: "dot" }, gD).style.setProperty("--d", (i * .12 + (r * 5 + c) * .015) + "s");
      el("circle", { cx: x, cy: y, r: 26, class: "ring" }, gD).style.setProperty("--d", (i * .12) + "s");
    });
    AGENTS.forEach((a, i) => {
      const p = paths[a.w], pt = p.getPointAtLength(p.getTotalLength() * .5);
      if (!a.wait) for (let k = 0; k < 2; k++) el("animateMotion", { dur: (2.4 + i * .3) + "s", begin: (-k * 1.2 - i * .2 - .01) + "s", repeatCount: "indefinite", path: p.getAttribute("d") }, el("circle", { r: 3.4, class: "spark" }, gA));
      const g = el("g", { class: "agt" + (a.wait ? " wait" : "") }, gA); g.style.setProperty("--d", (i * .15) + "s");
      const w = (a.l.length + a.c.length) * (wide ? 6.4 : 6.1) + (wide ? 34 : 28);
      el("rect", { x: pt.x - w / 2, y: pt.y - 13, width: w, height: 26, rx: 13 }, g);
      el("text", { x: pt.x - w / 2 + (wide ? 13 : 10), y: pt.y + 4 }, g).textContent = a.l;
      el("text", { x: pt.x + w / 2 - (wide ? 13 : 10), y: pt.y + 4, "text-anchor": "end", class: "ct" }, g).textContent = a.c;
    });
    // the AI Officer frame wraps everything drawn, so long team names stay inside it
    const bb = svg.getBBox(), fx = Math.min(6, bb.x - 10), fw = Math.max(W - 6, bb.x + bb.width + 10) - fx;
    svg.setAttribute("viewBox", `${fx - 4} 0 ${fw + 8} ${H}`);
    el("rect", { x: fx, y: 6, width: fw, height: H - 12, rx: 16, class: "frame", pathLength: 1 });
    const ft = el("g", { class: "ftag" });
    el("rect", { x: fx + 14, y: -1, width: 96, height: 16, rx: 8 }, ft);
    el("text", { x: fx + 62, y: 11, "text-anchor": "middle" }, ft).textContent = "AI OFFICER";
    apply(cur);
  }
  function count() {
    if (counted) return; counted = true;
    document.querySelectorAll("#layers b[data-to]").forEach(b => {
      const to = +b.dataset.to, t0 = performance.now();
      (function f(t) { const k = Math.min(1, (t - t0) / 1400); b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
    });
  }
  function apply(n) {
    svg.setAttribute("class", "dg " + [1, 2, 3, 4, 5].filter(k => k <= n).map(k => "s" + k).join(" "));
    steps.forEach(s => s.classList.toggle("on", +s.dataset.s === n));
    capt.textContent = CAPS[Math.max(n, 0)];
    capF.classList.toggle("on", n >= 3);
    lyr.innerHTML = `Layer <b>${Math.max(n, 0)}</b> of 5`;
    if (n >= 3) count();
  }
  // the active step is the last headline above the reading line
  function onScroll() {
    const line = innerHeight * (innerWidth > 900 ? .5 : .78);
    let n = 0;
    steps.forEach(s => { if (s.querySelector("h3").getBoundingClientRect().top < line) n = +s.dataset.s; });
    if (n !== cur) { cur = n; apply(n); }
    const r = col.getBoundingClientRect();
    rail.style.setProperty("--p", Math.max(0, Math.min(100, (line - r.top) / r.height * 100)) + "%");
  }
  build();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cur = 5; apply(5); document.querySelectorAll("#layers b[data-to]").forEach(b => b.textContent = b.dataset.to); counted = true; }
  else { addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true }); onScroll(); }
  let rw = innerWidth;
  addEventListener("resize", () => { if (Math.abs(innerWidth - rw) > 40) { rw = innerWidth; build(); } });
})();

}
