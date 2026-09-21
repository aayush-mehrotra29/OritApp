"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useDemoActivation } from "@/components/interactive/useDemoActivation";

function DemoCursor({ className = "" }: { className?: string }) {
  return (
    <svg className={`demo-cursor ${className}`} viewBox="0 0 28 34" aria-hidden="true">
      <path d="M3 2.5v24.8l6.7-6.2 4.5 10.1 4.4-2-4.5-9.9h9.6L3 2.5Z" fill="#26251e" stroke="#f7f7f4" strokeWidth="1.5" />
    </svg>
  );
}

function DemoRoot({
  label,
  className,
  rootRef,
  active,
  children,
}: {
  label: string;
  className: string;
  rootRef: React.RefObject<HTMLDivElement>;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={rootRef}
      className={`interactive-demo ${className}`}
      data-active={active ? "true" : "false"}
      tabIndex={0}
      role="img"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function MobileAgentDemo() {
  const { ref, active } = useDemoActivation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".mobile-cursor", { x: -34, y: 60, opacity: 0 });
      gsap.set(".mobile-tap", { scale: 0.2, opacity: 0, transformOrigin: "center" });
      gsap.set(".mobile-issue", { y: 12, opacity: 0 });
      gsap.set(".mobile-status", { opacity: 0 });
      if (!active) return;

      const tl = gsap.timeline();
      tl.to(".mobile-cursor", { opacity: 1, duration: 0.2 })
        .to(".mobile-cursor", { x: 94, y: 162, duration: 0.75, ease: "power2.inOut" })
        .to(".mobile-tap--ride", { scale: 1.8, opacity: 0.45, duration: 0.2 })
        .to(".mobile-tap--ride", { scale: 2.5, opacity: 0, duration: 0.3 })
        .to(".mobile-choice", { backgroundColor: "rgba(77,24,34,.1)", duration: 0.25 }, "<")
        .to(".mobile-cursor", { x: 118, y: 238, duration: 0.6, ease: "power2.inOut" })
        .to(".mobile-tap--confirm", { scale: 1.8, opacity: 0.45, duration: 0.2 })
        .to(".mobile-tap--confirm", { scale: 2.5, opacity: 0, duration: 0.3 })
        .to(".mobile-status", { opacity: 1, duration: 0.35 })
        .to(".mobile-cursor", { x: 72, y: 112, duration: 0.7, ease: "power2.inOut" })
        .to(".mobile-issue", { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="An Orit agent tests a ride booking flow and flags a blocking permission issue" className="mobile-demo" rootRef={ref} active={active}>
      <div className="mobile-device">
        <div className="mobile-notch" />
        <div className="mobile-bar"><b>Your trip</b><span>Amsterdam</span></div>
        <svg className="mobile-map" viewBox="0 0 240 105" aria-hidden="true">
          <path d="M18 81C53 64 65 30 102 44s54 34 119-20" fill="none" stroke="#d7d6d0" strokeWidth="18" />
          <path d="M18 81C53 64 65 30 102 44s54 34 119-20" fill="none" stroke="#26251e" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="18" cy="81" r="5" fill="#f7f7f4" stroke="#26251e" strokeWidth="2" />
          <rect x="201" y="15" width="20" height="14" fill="#f7f7f4" />
        </svg>
        <div className="mobile-title">Choose your ride</div>
        <div className="mobile-choice"><span>UberX<small>3 min · 4 seats</small></span><b>€15.90</b></div>
        <div className="mobile-choice mobile-choice--quiet"><span>Black<small>6 min · premium</small></span><b>€29.90</b></div>
        <button className="mobile-confirm" type="button" tabIndex={-1}>Confirm UberX</button>
        <span className="mobile-tap mobile-tap--ride" /><span className="mobile-tap mobile-tap--confirm" />
        <div className="mobile-status">Checking permission flow…</div>
      </div>
      <div className="mobile-issue"><span>Review issue</span><b>Location permission appears without context</b></div>
      <DemoCursor className="mobile-cursor" />
    </DemoRoot>
  );
}

export function CustomAgentBuilderDemo() {
  const { ref, active } = useDemoActivation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".builder-chip", { backgroundColor: "rgba(247,247,244,.72)", color: "#26251e" });
      gsap.set(".builder-preview", { opacity: 0.45, y: 8 });
      gsap.set(".builder-ready", { opacity: 0, y: 6 });
      if (!active) return;
      gsap.timeline()
        .to(".builder-chip", { backgroundColor: "#4d1822", color: "#f7f7f4", stagger: 0.32, duration: 0.22 })
        .to(".builder-preview", { opacity: 1, y: 0, duration: 0.45 }, "<.3")
        .to(".builder-copy-line", { scaleX: 1.12, stagger: 0.12, duration: 0.24, transformOrigin: "left" })
        .to(".builder-ready", { opacity: 1, y: 0, duration: 0.35 });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="Orit builds a custom testing agent from user conditions" className="builder-demo" rootRef={ref} active={active}>
      <div className="builder-panel">
        <span className="demo-kicker">Agent brief</span>
        <strong>Book a ride and update the payment card.</strong>
        <div className="builder-chips">
          <span className="builder-chip">First-time user</span><span className="builder-chip">German</span>
          <span className="builder-chip">Larger text</span><span className="builder-chip">Low bandwidth</span>
        </div>
        <div className="builder-ready"><i />Custom agent ready</div>
      </div>
      <div className="builder-preview" aria-hidden="true">
        <div className="builder-phone-head" />
        <span className="builder-copy-line" /><span className="builder-copy-line is-short" />
        <div className="builder-preview-button">Fahrt bestätigen</div>
      </div>
    </DemoRoot>
  );
}

export function RunReplayDemo() {
  const { ref, active } = useDemoActivation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".replay-screen:not(:first-child)", { opacity: 0 });
      gsap.set(".replay-playhead", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".replay-event", { color: "#85847d" });
      gsap.set(".replay-flag", { opacity: 0, y: 8 });
      if (!active) return;
      gsap.timeline()
        .to(".replay-playhead", { scaleX: 0.35, duration: 0.9, ease: "none" })
        .to(".replay-screen--two", { opacity: 1, duration: 0.25 }, "<.55")
        .to(".replay-event--two", { color: "#26251e", duration: 0.2 }, "<")
        .to(".replay-playhead", { scaleX: 0.7, duration: 0.9, ease: "none" })
        .to(".replay-screen--three", { opacity: 1, duration: 0.25 }, "<.55")
        .to(".replay-event--three", { color: "#4d1822", duration: 0.2 }, "<")
        .to(".replay-playhead", { scaleX: 1, duration: 0.65, ease: "none" })
        .to(".replay-flag", { opacity: 1, y: 0, duration: 0.35 });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="A recorded agent run replays its screens and identifies a payment failure" className="replay-demo" rootRef={ref} active={active}>
      <div className="replay-phone" aria-hidden="true">
        <div className="replay-screen replay-screen--one"><b>Checkout</b><span /><span /><button type="button" tabIndex={-1}>Continue</button></div>
        <div className="replay-screen replay-screen--two"><b>Payment</b><span /><span className="is-short" /><button type="button" tabIndex={-1}>Use card</button></div>
        <div className="replay-screen replay-screen--three"><b>Payment</b><em>Sheet cannot be dismissed</em><button type="button" tabIndex={-1}>Done</button></div>
      </div>
      <div className="replay-events">
        <span className="replay-event">Opened checkout</span>
        <span className="replay-event replay-event--two">Changed card</span>
        <span className="replay-event replay-event--three">Could not continue</span>
        <i><b className="replay-playhead" /></i>
      </div>
      <div className="replay-flag">Related file · PaymentSheet.swift</div>
    </DemoRoot>
  );
}

export function MacAgentDemo() {
  const { ref, active } = useDemoActivation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".mac-row", { backgroundColor: "transparent" });
      gsap.set(".mac-log span", { opacity: 0, y: 5 });
      gsap.set(".mac-scan", { scaleY: 0, transformOrigin: "top" });
      gsap.set(".mac-result", { opacity: 0, y: 8 });
      if (!active) return;
      gsap.timeline()
        .to(".mac-row--active", { backgroundColor: "rgba(77,24,34,.09)", duration: 0.25 })
        .to(".mac-scan", { scaleY: 1, duration: 1.4, ease: "power1.inOut" })
        .to(".mac-log span", { opacity: 1, y: 0, stagger: 0.28, duration: 0.25 }, "<.15")
        .to(".mac-result", { opacity: 1, y: 0, duration: 0.4 });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="Orit runs an iOS test from a Mac application and returns an issue for review" className="mac-demo" rootRef={ref} active={active}>
      <div className="mac-window">
        <div className="mac-titlebar"><span /><span /><span /><b>Orit</b></div>
        <aside className="mac-sidebar"><small>PROJECT</small><b>Ride</b><small>TESTS</small><span className="mac-row mac-row--active">App Review</span><span className="mac-row">Accessibility</span><span className="mac-row">German</span></aside>
        <div className="mac-stage">
          <div className="mac-simulator"><div className="mac-scan" /><b>Checkout</b><i /><i /><button type="button" tabIndex={-1}>Continue</button></div>
          <div className="mac-log"><span>Opened simulator</span><span>Followed checkout</span><span>Checked payment sheet</span></div>
          <div className="mac-result"><i />1 issue ready to review</div>
        </div>
      </div>
    </DemoRoot>
  );
}

const AGENTS = ["App Review", "Accessibility", "German", "Security", "Onboarding", "Payments"];

export function MultiAgentMissionControlDemo() {
  const { ref, active } = useDemoActivation();
  const [selected, setSelected] = useState("App Review");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".multi-tile", { y: 16, opacity: 0.55 });
      gsap.set(".multi-progress b", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".multi-summary", { opacity: 0, y: 8 });
      if (!active) return;
      gsap.timeline()
        .to(".multi-tile", { y: 0, opacity: 1, stagger: 0.1, duration: 0.35, ease: "power2.out" })
        .to(".multi-progress b", { scaleX: (index) => [1, 0.76, 0.92, 0.58, 1, 0.68][index] ?? 0.8, stagger: 0.09, duration: 0.8, ease: "power2.out" }, "<.15")
        .to(".multi-summary", { opacity: 1, y: 0, duration: 0.35 });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="Six Orit agents run different iOS tests in parallel" className="multi-demo" rootRef={ref} active={active}>
      <div className="multi-head"><span><i />6 agents running</span><b>{selected}</b></div>
      <div className="multi-grid">
        {AGENTS.map((agent, index) => (
          <button className={`multi-tile ${index === 3 ? "is-blocked" : ""}`} type="button" tabIndex={-1} key={agent} onMouseEnter={() => setSelected(agent)}>
            <span>{agent}</span><small>{index === 3 ? "Needs review" : index === 0 || index === 4 ? "Complete" : "Running"}</small>
            <i className="multi-progress"><b /></i>
          </button>
        ))}
      </div>
      <div className="multi-summary"><b>2 complete</b><span>3 running</span><span>1 needs review</span></div>
    </DemoRoot>
  );
}

export function ChatbotHandoffDemo() {
  const { ref, active } = useDemoActivation();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(".chat-user, .chat-answer, .chat-tool, .chat-attachment", { opacity: 0, y: 8 });
      gsap.set(".chat-typed", { width: 0 });
      if (!active) return;
      gsap.timeline()
        .to(".chat-user", { opacity: 1, y: 0, duration: 0.3 })
        .to(".chat-typed", { width: "100%", duration: 0.9, ease: "steps(20)" }, "<")
        .to(".chat-tool", { opacity: 1, y: 0, stagger: 0.18, duration: 0.25 })
        .to(".chat-answer", { opacity: 1, y: 0, duration: 0.35 })
        .to(".chat-attachment", { opacity: 1, y: 0, duration: 0.4 });
    }, root);
    return () => ctx.revert();
  }, [active, ref]);

  return (
    <DemoRoot label="A developer asks Orit to run a test and receives an issue ready for a coding agent" className="chat-demo" rootRef={ref} active={active}>
      <div className="chat-window">
        <div className="chat-title"><b>Orit</b><span>Testing assistant</span></div>
        <div className="chat-user"><span className="chat-typed">Run checkout as a new German user with larger text.</span></div>
        <div className="chat-tools"><span className="chat-tool">Project · Ride</span><span className="chat-tool">Simulator</span><span className="chat-tool">3 agents</span></div>
        <div className="chat-answer">I found one issue that blocks the payment flow.</div>
        <div className="chat-attachment"><span>Run result</span><b>Payment sheet cannot be dismissed</b><small>Recording · Steps · 2 files</small><button type="button" tabIndex={-1}>Send to coding agent</button></div>
      </div>
    </DemoRoot>
  );
}
