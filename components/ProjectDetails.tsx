import { useEffect, useRef, useState } from "react";

/** ---------- Styles (scoped) ---------- **/
const styles: Record<string,string> = {
  page: "relative min-h-screen text-[#e6f1ff] bg-[#0b0f14] overflow-hidden",
  inner: "relative z-10 max-w-6xl mx-auto px-5 py-8",
  h1: "text-3xl font-semibold tracking-tight",
  h2: "text-base text-[#9fb3c8] mb-4",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  card: "rounded-xl border border-[#15202b] bg-gradient-to-b from-[#0d141c] to-[#0a1016] p-4",
  btn: "inline-flex items-center gap-2 rounded-lg border border-[#1f2a36] bg-[#0e141b] px-3 py-2 hover:border-[#2c3c4f]",
  chips: "flex flex-wrap gap-2 text-xs text-[#9fb3c8]",
  footer: "mt-4 text-sm text-[#9fb3c8] flex items-center justify-between",
  canvas: "w-full h-[260px] block",
  // animated “manhole covers” in the background
  capWrap: "pointer-events-none absolute inset-0 z-0 overflow-hidden",
  dot: "absolute w-[110px] h-[110px] rounded-full border-[6px] border-[#2a3847] opacity-20",
};

function MovingBackground() {
  const hostRef = useRef<HTMLDivElement|null>(null);
  useEffect(() => {
    const host = hostRef.current!;
    const W = host.clientWidth || window.innerWidth;
    const H = host.clientHeight || window.innerHeight;

    // spawn
    for (let i=0;i<10;i++){
      const el = document.createElement("div");
      el.className = styles.dot;
      el.style.left = Math.floor(Math.random()*W)+"px";
      el.style.top = Math.floor(Math.random()*H)+"px";
      el.style.boxShadow = "inset 0 0 0 2px #0e141a, 0 0 18px rgba(94,200,255,.08)";
      el.style.background = "radial-gradient(closest-side,#1a2633 80%,transparent 81%),conic-gradient(#111923 0 25%,#182433 0 50%,#111923 0 75%,#182433 0 100%)";
      const dx = ((Math.random()*2-1)*W)|0;
      const dy = ((Math.random()*2-1)*H)|0;
      const speed = 18000 + Math.random()*24000;
      let t0 = performance.now();
      function step(now:number){
        const p = ((now - t0) % speed)/speed;
        const x = p*dx, y = p*dy, r = p*360;
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${r}deg)`;
        requestAnimationFrame(step);
      }
      host.appendChild(el);
      requestAnimationFrame(step);
    }
    return () => { host.innerHTML = ""; };
  }, []);
  return <div ref={hostRef} className={styles.capWrap} aria-hidden="true"/>;
}

/** ---------- Canvas helpers ---------- **/
function get2d(canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  return ctx;
}
function sizeCanvas(c: HTMLCanvasElement){
  const dpr = window.devicePixelRatio || 1;
  const rect = c.getBoundingClientRect();
  c.width  = Math.max(1, Math.floor(rect.width * dpr));
  c.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = c.getContext("2d");
  if (ctx) ctx.setTransform(dpr,0,0,dpr,0,0);
}

/** ---------- Charts (called on demand) ---------- **/
function drawBars(c: HTMLCanvasElement, vals:number[], labels:string[], colors:string[]){
  sizeCanvas(c);
  const ctx = get2d(c); if(!ctx) return;
  const w=c.width, h=c.height, pad=40;
  const bw = ((w-2*pad)/vals.length)*0.7;
  const gap= ((w-2*pad)/vals.length)*0.3;
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle = "#203042";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad,10); ctx.lineTo(pad,h-30); ctx.lineTo(w-10,h-30); ctx.stroke();
  vals.forEach((v,i)=>{
    const x = pad + i*(bw+gap) + gap/2;
    const y = h-30;
    const hh = (h-80)*(v/100);
    ctx.fillStyle = colors[i%colors.length];
    ctx.fillRect(x, y-hh, bw, hh);
    ctx.fillStyle="#9fb3c8";
    ctx.font="12px system-ui";
    ctx.fillText(labels[i], x, y+14);
  });
}

/** ---------- Tiny test harness ---------- **/
function useRuntimeTests(ready:boolean){
  const [summary, setSummary] = useState<string>("Not run");
  useEffect(()=>{
    if(!ready) return;
    const tests: Array<[string, () => boolean]> = [
      ["Canvas 2D available", ()=> {
        const c=document.createElement("canvas");
        const ctx=c.getContext("2d");
        return !!ctx && typeof ctx.fillRect === "function";
      }],
      ["Canvas DPR sizing", ()=>{
        const c=document.createElement("canvas");
        c.style.width="200px"; c.style.height="100px";
        document.body.appendChild(c);
        sizeCanvas(c);
        const ok = c.width>0 && c.height>0;
        c.remove();
        return ok;
      }],
    ];
    const pass = tests.reduce((acc,[,fn])=> acc + (fn()?1:0),0);
    setSummary(`${pass}/${tests.length} tests passing`);
  },[ready]);
  return summary;
}

/** ---------- Component ---------- **/
export default function ProjectDetails(){
  const [active, setActive] = useState<0|1|2|3|4>(0);
  const ready = true;

  const barRef1 = useRef<HTMLCanvasElement|null>(null);
  const barRef2 = useRef<HTMLCanvasElement|null>(null);
  const barRef3 = useRef<HTMLCanvasElement|null>(null);

  // draw charts when slide 1 is active
  useEffect(()=>{
    if(active!==1) return;
    if(barRef1.current) drawBars(barRef1.current,[42,56,61,70],["CCTV","LETS","Smoke","Dye"],["#5ec8ff","#13c29a","#f5b64a","#5ec8ff"]);
    if(barRef2.current) drawBars(barRef2.current,[48,52,60,66],["Jet","Vac","Root","Point"],["#13c29a","#5ec8ff","#f5b64a","#13c29a"]);
    if(barRef3.current) drawBars(barRef3.current,[58,64,72,85],["CIPP","Sect.","Manhole","Grout"],["#f5b64a","#5ec8ff","#13c29a","#f5b64a"]);
  },[active]);

  useEffect(()=>{
    const onResize = () => {
      if(barRef1.current && active===1) drawBars(barRef1.current,[42,56,61,70],["CCTV","LETS","Smoke","Dye"],["#5ec8ff","#13c29a","#f5b64a","#5ec8ff"]);
      if(barRef2.current && active===1) drawBars(barRef2.current,[48,52,60,66],["Jet","Vac","Root","Point"],["#13c29a","#5ec8ff","#f5b64a","#13c29a"]);
      if(barRef3.current && active===1) drawBars(barRef3.current,[58,64,72,85],["CIPP","Sect.","Manhole","Grout"],["#f5b64a","#5ec8ff","#13c29a","#f5b64a"]);
    };
    window.addEventListener("resize", onResize);
    return ()=>window.removeEventListener("resize", onResize);
  },[active]);

  const testSummary = useRuntimeTests(ready);

  return (
    <div className={styles.page}>
      <MovingBackground />
      <div className={styles.inner}>

        {/* Slide 0: Overview + Tests */}
        {active===0 && (
          <section className={styles.grid2}>
            <div className={styles.card}>
              <h1 className={styles.h1}>Project Detail</h1>
              <p className={styles.h2}>Strategic Insight & Operational Awareness — deck companion</p>
              <div className={styles.chips}>
                <span className="px-2 py-1 rounded-full border border-[#182636] bg-[#0d1721]">Inspect</span>
                <span className="px-2 py-1 rounded-full border border-[#182636] bg-[#0d1721]">Maintain</span>
                <span className="px-2 py-1 rounded-full border border-[#182636] bg-[#0d1721]">Rehabilitate</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className={styles.btn} onClick={()=>setActive(1)}>Next ▷</button>
                <span className="text-xs text-[#9fb3c8]">Runtime tests: {testSummary}</span>
              </div>
            </div>
            <div className={styles.card}>
              <h2 className="text-sm font-semibold mb-2">What this answers</h2>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#c9d7e6]">
                <li>What each chart shows and why it matters.</li>
                <li>Where numbers/claims are grounded (public pages).</li>
                <li>Fast Q&A for diligence (Agent Lee ready).</li>
              </ul>
              <p className="text-xs text-[#9fb3c8] mt-2">
                Sources: Services / Our Projects / Why Choose pages on visu-sewer.com (public & non-confidential).
              </p>
            </div>
          </section>
        )}

        {/* Slide 1: Services + Bars */}
        {active===1 && (
          <section className={styles.grid2}>
            <div className={styles.card}>
              <h2 className="font-semibold">Service Stack</h2>
              <p className="text-sm text-[#9fb3c8]">Inspect → Maintain → Rehabilitate</p>
              <canvas ref={barRef1} className={styles.canvas} />
              <canvas ref={barRef2} className={styles.canvas} />
              <canvas ref={barRef3} className={styles.canvas} />
              <p className="text-xs text-[#9fb3c8] mt-2">
                Visual mix; exact values sync from ERP after pilot.
              </p>
            </div>
            <div className={styles.card}>
              <h2 className="font-semibold">Why choose VisuSewer</h2>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#c9d7e6]">
                <li>Technical expertise & niche field capabilities</li>
                <li>Vertical integration & cost control</li>
                <li>Strong project management & communication</li>
                <li>Long-term relationships & referrals</li>
              </ul>
              <div className="mt-3">
                <button className={styles.btn} onClick={()=>setActive(2)}>Next ▷</button>
                <button className={styles.btn+" ml-2"} onClick={()=>setActive(0)}>Back ◁</button>
              </div>
            </div>
          </section>
        )}

        {/* Slide 2: Q&A */}
        {active===2 && (
          <section className={styles.grid2}>
            <div className={styles.card}>
              <h2 className="font-semibold">Investor / Leadership Q&A</h2>
              <details className="mb-2"><summary className="cursor-pointer">What exactly do you inspect?</summary><p className="text-sm text-[#c9d7e6] mt-2">CCTV of mains/laterals, manhole inspections, smoke and dye testing, lateral evaluation televising; GIS deliverables as needed.</p></details>
              <details className="mb-2"><summary className="cursor-pointer">Why does lifecycle control improve margin?</summary><p className="text-sm text-[#c9d7e6] mt-2">Owning inspect→rehab reduces handoffs and delays, improves change-order discipline, and stabilizes utilization.</p></details>
              <details className="mb-2"><summary className="cursor-pointer">What differentiates you?</summary><p className="text-sm text-[#c9d7e6] mt-2">Technical expertise, vertical integration, disciplined PM, and trust-based relationships.</p></details>
            </div>
            <div className={styles.card}>
              <h2 className="font-semibold">Evidence Map (public)</h2>
              <ul className="list-disc pl-5 text-sm space-y-1 text-[#c9d7e6]">
                <li>Services / Our Projects (service families & municipal work)</li>
                <li>Why Choose (expertise, cost control, PM, relationships)</li>
              </ul>
              <div className="mt-3">
                <button className={styles.btn} onClick={()=>setActive(3)}>Next ▷</button>
                <button className={styles.btn+" ml-2"} onClick={()=>setActive(1)}>Back ◁</button>
              </div>
            </div>
          </section>
        )}

        {/* Slide 3: Private Letter (modal-less) */}
        {active===3 && (
          <section className={styles.card}>
            <h2 className="font-semibold mb-2">Private Cover Letter (for Greg)</h2>
            <p className="text-sm text-[#c9d7e6]">
              Here’s a refined, professional, and personalized letter to Greg, incorporating your full background and aspirations for the Training and Awareness Manager role. It’s structured to highlight your unique blend of technical, operational, and leadership experience, while making it easy for Greg to explore your work:
            </p>
            <hr className="my-3 border-[#1b2836]"/>
            <article className="prose prose-invert max-w-none text-[#c9d7e6]">
              <p><b>Leonard J. Lee</b><br/>
              Founder, RapidWebDevelop LLC | Creator of Agent Lee<br/>
              <a href="mailto:LeonardLee6@outlook.com">LeonardLee6@outlook.com</a> | (414) 303-8580<br/>
              <a href="https://github.com/4citeB4U" target="_blank" rel="noopener noreferrer">github.com/4citeB4U</a> | <a href="http://rapidwebdevelop.com" target="_blank" rel="noopener noreferrer">rapidwebdevelop.com</a><br/>
              <a href="https://4citeb4u.github.io/Resume-PDF/" target="_blank" rel="noopener noreferrer">View My Resume</a></p>

              <p><b>Dear Greg,</b></p>
              <p>I’m writing to share my vision for how I can contribute in a more focused capacity—as <b>Training and Awareness Manager</b>. My journey as a self-taught developer, business owner, and logistics professional has given me a unique perspective: I understand both the hands-on realities of operations and the transformative power of technology and training.</p>
              <p>Over the past 15+ years, I’ve built and led initiatives that bridge gaps—creating full-stack LMS platforms for logistics training, developing AI-driven tools like Agent Lee, and managing fleets and teams in high-stakes environments. My work reflects a commitment to scalable excellence, safety, and empowerment, and I’m eager to bring that to this role.</p>
              <p><b>Why This Role?</b></p>
              <ul>
                <li><b>Training & Awareness:</b> I’ve designed and deployed training portals that simplify complex processes and improve compliance.</li>
                <li><b>Leadership:</b> I prioritize clear communication, practical skills, and community-building.</li>
                <li><b>Innovation:</b> My technical skills across AI, voice systems, and full-stack development enable engaging, effective training.</li>
              </ul>
              <p>This deck is a snapshot of my approach: practical, people-focused, and rooted in real-world experience. I’d love to discuss how I can help shape training and awareness initiatives, ensuring the team is not just prepared, but inspired.</p>
              <p><b>Looking forward to your thoughts,</b><br/>Leonard J. Lee</p>
            </article>
            <div className="mt-3">
              <button className={styles.btn} onClick={()=>setActive(4)}>Finish ▷</button>
              <button className={styles.btn+" ml-2"} onClick={()=>setActive(2)}>Back ◁</button>
            </div>
          </section>
        )}

        {/* Slide 4: Done */}
        {active===4 && (
          <section className={styles.card}>
            <h2 className="font-semibold">All set</h2>
            <p className="text-sm text-[#9fb3c8]">You can print to PDF from your browser; the background is excluded for clarity.</p>
            <div className="mt-3">
              <button className={styles.btn} onClick={()=>window.print()}>🖨️ Print / Save PDF</button>
              <button className={styles.btn+" ml-2"} onClick={()=>setActive(0)}>Restart ◁</button>
            </div>
          </section>
        )}

        <div className={styles.footer}>
          <span>Slide {active+1}/5</span>
          <div className="flex gap-2">
            <button className={styles.btn} onClick={()=>setActive((active > 0 ? (active - 1) as typeof active : active))}>◀ Back</button>
            <button className={styles.btn} onClick={()=>setActive((active < 4 ? (active + 1) as typeof active : active))}>Next ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}
