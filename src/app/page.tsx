"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [typedPrompt, setTypedPrompt] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [bvTypedPrompt, setBvTypedPrompt] = useState("");
  const [donateCounter, setDonateCounter] = useState(1247);
  const [rfTotal, setRfTotal] = useState(12400);
  const [adIndex, setAdIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);

  const ads = [
    "Try Stellar Pay — earn 2 WLD",
    "New Mini App: Vox · verified chat",
    "Swap USDC at 0% fee",
    "Boost your post for 5 WLD",
    "Sponsored: Verified human poll",
  ];

  useEffect(() => {
    // Hero typewriter
    const prompts = [
      "Create a one-person-one-vote app with World ID.",
      "Build a USDC donation Mini App for creators.",
      "Make a quiz app where users can claim rewards.",
      "Ship a verified-human-only group chat.",
    ];
    let pi = 0,
      ci = 0,
      deleting = false,
      timeoutId: NodeJS.Timeout;

    const type = () => {
      const cur = prompts[pi];
      if (!deleting) {
        setTypedPrompt(cur.slice(0, ++ci));
        if (ci === cur.length) {
          deleting = true;
          timeoutId = setTimeout(type, 1800);
          return;
        }
      } else {
        setTypedPrompt(cur.slice(0, --ci));
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % prompts.length;
          setPromptIndex(pi);
        }
      }
      timeoutId = setTimeout(type, deleting ? 22 : 42);
    };
    timeoutId = setTimeout(type, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Build viz typewriter
    const bvPrompts = [
      "Create a one-person-one-vote app...",
      "Build a USDC donation Mini App...",
      "Make a quiz app with rewards...",
      "Ship a verified-human group chat...",
    ];
    let bvPi = 0,
      bvCi = 0,
      bvDel = false,
      timeoutId: NodeJS.Timeout;

    const bvType = () => {
      const cur = bvPrompts[bvPi];
      if (!bvDel) {
        setBvTypedPrompt(cur.slice(0, ++bvCi));
        if (bvCi === cur.length) {
          bvDel = true;
          timeoutId = setTimeout(bvType, 2400);
          return;
        }
      } else {
        setBvTypedPrompt(cur.slice(0, --bvCi));
        if (bvCi === 0) {
          bvDel = false;
          bvPi = (bvPi + 1) % bvPrompts.length;
        }
      }
      timeoutId = setTimeout(bvType, bvDel ? 22 : 48);
    };
    timeoutId = setTimeout(bvType, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const dInt = setInterval(() => {
      setDonateCounter((prev) => prev + Math.floor(Math.random() * 7) + 1);
    }, 1800);
    const rInt = setInterval(() => {
      setRfTotal((prev) => prev + Math.floor(Math.random() * 20) + 5);
    }, 1500);
    const aInt = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 2400);

    return () => {
      clearInterval(dInt);
      clearInterval(rInt);
      clearInterval(aInt);
    };
  }, [ads.length]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setModalSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleFooterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFooterSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) setFooterSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setFooterSubmitting(false);
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      {/* NAV */}
      <nav className="top">
        <div className="wrap nav-inner">
          <div className="logo">
            <img src="/worldable-logo.png" alt="Worldable Logo" />
            <span>Worldable</span>
          </div>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#examples">Examples</a>
            <a href="#why">Why Worldable</a>
            <a href="#earn">Earn</a>
          </div>
          <button onClick={openModal} className="nav-cta">
            Join waitlist
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="pill">
            <span className="dot"></span> Built for World App · MiniKit native
          </div>
          <h1 className="headline">
            Build a World Mini App<br />
            from a{" "}
            <em>
              sentence<img src="/worldable-logo.png" alt="Worldable" className="orb-inline" style={{ background: 'transparent', boxShadow: 'none' }} />
            </em>
          </h1>
          <p className="sub">
            Worldable turns plain English into a production-ready World Mini App
            — with World ID, Wallet Auth, and Pay wired in. No SDK setup. No
            templates. Just describe the app.
          </p>
          <div className="cta-row">
            <button onClick={openModal} className="btn-primary">
              Join the waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7H13M13 7L7 1M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a href="#how" className="btn-secondary">
              See how it works
            </a>
          </div>

          <div className="builder">
            <div className="builder-bar">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="url">worldable.app/new</div>
              <div style={{ width: 50 }}></div>
            </div>
            <div className="builder-body">
              <div className="prompt-side">
                <div className="label">Prompt</div>
                <div className="prompt-box">
                  <span>{typedPrompt}</span>
                  <span className="caret"></span>
                </div>
                <button className="gen-btn">
                  <img src="/worldable-logo.png" alt="" style={{ width: 14, height: 14, objectFit: 'contain' }} />
                  Generate Mini App
                </button>
                <div className="chips">
                  <span className="chip">World ID</span>
                  <span className="chip">Wallet Auth</span>
                  <span className="chip">Pay (USDC)</span>
                  <span className="chip">MiniKit</span>
                </div>
              </div>
              <div className="preview-side">
                <div className="phone">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="phone-status">
                      <span>9:41</span>
                      <span>●●● ◐ 100%</span>
                    </div>
                    <div className="phone-content" key={promptIndex} style={{ animation: "rfIn 0.4s forwards" }}>
                      {promptIndex === 0 && (
                        <>
                          <div className="app-title">One-person-one-vote</div>
                          <div className="vote-card">
                            <strong>Should we open-source MiniKit?</strong>
                            <span style={{ color: "var(--muted)", fontSize: 11 }}>
                              Yes — 1,284 votes
                            </span>
                            <div className="bar">
                              <div style={{ width: "72%" }}></div>
                            </div>
                          </div>
                          <div className="vote-card">
                            <strong>Add fiat ramps to World App?</strong>
                            <span style={{ color: "var(--muted)", fontSize: 11 }}>
                              Yes — 891 votes
                            </span>
                            <div className="bar">
                              <div style={{ width: "54%" }}></div>
                            </div>
                          </div>
                          <div className="verify-btn" style={{ marginTop: 'auto' }}>
                            <img src="/worldable-logo.png" alt="" className="mini-orb" style={{ background: 'transparent', objectFit: 'contain' }} />
                            Verify with World ID
                          </div>
                        </>
                      )}
                      
                      {promptIndex === 1 && (
                        <>
                          <div className="app-title">Creator Donation</div>
                          <div className="donate-header" style={{ marginBottom: 12 }}>
                            <div className="donate-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>K</div>
                            <div>
                              <div className="donate-name" style={{ fontSize: 11 }}>Support @kim</div>
                              <div className="donate-handle" style={{ fontSize: 9 }}>Independent journalist</div>
                            </div>
                          </div>
                          <div className="donate-amount" style={{ padding: "12px 10px", marginTop: 0 }}>
                            <div className="da-label" style={{ fontSize: 8 }}>Total raised</div>
                            <div className="da-value" style={{ fontSize: 18 }}>
                              <span className="currency" style={{ fontSize: 12 }}>$</span>
                              <span className="ticker">{donateCounter.toLocaleString()}</span>
                            </div>
                            <div className="da-meta" style={{ fontSize: 8 }}>USDC · 84 supporters</div>
                          </div>
                          <div className="donate-btn" style={{ marginTop: 'auto', padding: "10px" }}>Donate USDC</div>
                        </>
                      )}

                      {promptIndex === 2 && (
                        <>
                          <div className="app-title">Daily Quiz</div>
                          <div className="quiz-q" style={{ fontSize: 11, padding: "8px 10px" }}>Q: What does WLD power?</div>
                          <div className="quiz-options" style={{ marginTop: 8 }}>
                            <div className="quiz-opt" style={{ fontSize: 9, padding: 6 }}>Streaming</div>
                            <div className="quiz-opt correct" style={{ fontSize: 9, padding: 6 }}>World network</div>
                            <div className="quiz-opt" style={{ fontSize: 9, padding: 6 }}>Stablecoins</div>
                            <div className="quiz-opt" style={{ fontSize: 9, padding: 6 }}>L2 fees</div>
                          </div>
                          <div className="quiz-reward" style={{ position: 'relative', marginTop: 'auto', alignSelf: 'center', right: 'auto', top: 'auto' }}>
                            <span className="star"></span> +5 WLD claimed
                          </div>
                        </>
                      )}

                      {promptIndex === 3 && (
                        <>
                          <div className="app-title">Verified Chat</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 10, marginTop: 4 }}>
                            <div style={{ background: '#f0f0f0', padding: '8px 10px', borderRadius: '12px 12px 12px 2px', alignSelf: 'flex-start' }}>Hello everyone!</div>
                            <div style={{ background: 'var(--ink)', color: '#fff', padding: '8px 10px', borderRadius: '12px 12px 2px 12px', alignSelf: 'flex-end' }}>Hey! Are you a real human?</div>
                            <div style={{ background: '#f0f0f0', padding: '8px 10px', borderRadius: '12px 12px 12px 2px', alignSelf: 'flex-start' }}>Yes, World ID verified ✅</div>
                          </div>
                          <div className="verify-btn" style={{ marginTop: 'auto', background: '#fff', color: 'var(--ink)', border: '1px solid var(--line)' }}>
                            <img src="/worldable-logo.png" alt="" className="mini-orb" style={{ background: 'transparent', objectFit: 'contain' }} />
                            Human Only
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section id="problem">
        <div className="wrap">
          <div className="eyebrow reveal">The gap</div>
          <h2 className="section-title reveal">
            Anyone can build apps now.<br />
            But not for World.
          </h2>

          <div className="problem-grid">
            <div className="prob-card reveal">
              <div className="prob-tag">The rest of the web</div>
              <h3>AI builders made web apps trivial.</h3>
              <p>
                Lovable, Bolt, Replit, Base44 — describe an idea, ship a working
                app. The bar to build dropped overnight, and creators flooded
                in.
              </p>
              <div className="prob-viz prob-viz-light">
                <span className="v-chip">prompt</span>
                <span className="v-arrow">→</span>
                <span className="v-chip">code</span>
                <span className="v-arrow">→</span>
                <span className="v-chip">deploy</span>
                <span className="v-arrow">→</span>
                <span className="v-result">✓ shipped</span>
              </div>
            </div>
            <div className="prob-card dark reveal">
              <div className="prob-tag">World today</div>
              <h3>World Mini Apps still demand the full stack.</h3>
              <p>
                MiniKit, World ID, Wallet Auth, Pay, deployment, submission. Too
                much for ordinary creators — even though World is where the most
                engaged crypto-native users live.
              </p>
              <div className="stack-stack">
                <div className="stack-row-x">
                  <span className="marker">1</span> install MiniKit{" "}
                  <span className="err">! config required</span>
                </div>
                <div className="stack-row-x">
                  <span className="marker">2</span> wire World ID{" "}
                  <span className="err">! verify cloud</span>
                </div>
                <div className="stack-row-x">
                  <span className="marker">3</span> setup Wallet Auth{" "}
                  <span className="err">! sig schema</span>
                </div>
                <div className="stack-row-x">
                  <span className="marker">4</span> integrate Pay{" "}
                  <span className="err">! USDC contract</span>
                </div>
                <div className="stack-row-x">
                  <span className="marker">5</span> submission flow{" "}
                  <span className="err">! review queue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="wrap">
          <div className="eyebrow reveal">How it works</div>
          <h2 className="section-title reveal">
            Type an idea.<br />
            Get a World Mini App.
          </h2>
          <p className="section-sub reveal">
            Watch what happens between the prompt and the app. Worldable wires
            up auth, identity, payments, and submission — automatically.
          </p>

          {/* BIG ANIMATED BUILD VISUALIZATION */}
          <div className="build-viz reveal">
            <div className="bv-stage">
              <div className="bv-tag">01 · Prompt</div>
              <div className="bv-prompt-box">
                <span>{bvTypedPrompt}</span>
                <span className="caret"></span>
              </div>
            </div>

            <div className="bv-connector">
              <div className="bv-connector-line"></div>
              <span className="bv-dot d1"></span>
              <span className="bv-dot d2"></span>
              <span className="bv-dot d3"></span>
            </div>

            <div className="bv-stage">
              <div className="bv-tag">02 · Worldable engine</div>
              <div className="bv-engine-canvas">
                <svg
                  className="bv-lines"
                  viewBox="0 0 240 240"
                  preserveAspectRatio="none"
                >
                  <line className="l1" x1="120" y1="120" x2="36" y2="48" />
                  <line className="l2" x1="120" y1="120" x2="204" y2="48" />
                  <line className="l3" x1="120" y1="120" x2="36" y2="192" />
                  <line className="l4" x1="120" y1="120" x2="204" y2="192" />
                </svg>
                <div className="bv-core">
                  <img src="/worldable-logo.png" alt="" className="bv-core-orb" style={{ background: 'transparent', objectFit: 'contain', boxShadow: 'none' }} />
                </div>
                <div className="bv-core-ring"></div>
                <div className="bv-core-ring r2"></div>
                <div className="bv-node n-worldid">
                  <span className="n-dot"></span>World ID
                </div>
                <div className="bv-node n-wallet">
                  <span className="n-dot"></span>Wallet
                </div>
                <div className="bv-node n-pay">
                  <span className="n-dot"></span>Pay
                </div>
                <div className="bv-node n-minikit">
                  <span className="n-dot"></span>MiniKit
                </div>
                <div className="bv-code-stream">
                  <span className="cl">import {"{ MiniKit }"}</span>
                  <span className="cl">await WorldID.verify()</span>
                  <span className="cl">Pay.send(usdc)</span>
                  <span className="cl">WalletAuth.signIn()</span>
                  <span className="cl">deploy()</span>
                </div>
              </div>
            </div>

            <div className="bv-connector">
              <div className="bv-connector-line"></div>
              <span className="bv-dot d1"></span>
              <span className="bv-dot d2"></span>
              <span className="bv-dot d3"></span>
            </div>

            <div className="bv-stage">
              <div className="bv-tag">03 · Mini App</div>
              <div className="bv-result-wrap">
                <div className="bv-result-phone">
                  <div className="bv-result-screen">
                    <div className="bv-result-app-title">Vote</div>
                    <div className="bv-result-card">
                      <strong>Open-source MiniKit?</strong>
                      <div className="pct">Yes — 72%</div>
                      <div className="bv-result-bar">
                        <div></div>
                      </div>
                    </div>
                    <div className="bv-result-card">
                      <strong>Add fiat ramps?</strong>
                      <div className="pct">Yes — 54%</div>
                      <div className="bv-result-bar">
                        <div></div>
                      </div>
                    </div>
                    <div className="bv-result-verify">
                      <img src="/worldable-logo.png" alt="" className="mini-orb" style={{ background: 'transparent', objectFit: 'contain' }} /> Verify
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flow">
            <div className="flow-step reveal">
              <div className="flow-num">01</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 4H13M3 8H13M3 12H9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h4>Prompt</h4>
              <p>Describe the app you want.</p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-num">02</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <h4>Generate</h4>
              <p>MiniKit, World ID, Wallet, Pay.</p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-num">03</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="4"
                    y="2"
                    width="8"
                    height="12"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M7 12H9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h4>Preview</h4>
              <p>Live inside a simulated World App.</p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-num">04</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11 3L13 5L5 13L2 14L3 11L11 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4>Edit</h4>
              <p>Iterate by prompting or jump to code.</p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-num">05</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L10 6L14 6.5L11 9.5L12 14L8 11.5L4 14L5 9.5L2 6.5L6 6L8 2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4>Launch</h4>
              <p>One-click submit to the Mini App store.</p>
            </div>
            <div className="flow-step reveal">
              <div className="flow-num">06</div>
              <div className="flow-icon">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 11L6 7L9 10L14 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 4H14V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4>Monetize</h4>
              <p>Built-in ad and promo revenue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples">
        <div className="wrap">
          <div className="eyebrow reveal">What people build</div>
          <h2 className="section-title reveal">A sentence is enough.</h2>

          <div className="examples">
            {/* Voting */}
            <div className="ex-card reveal">
              <div className="ex-preview">
                <div className="ex-title">Open vote</div>
                <div className="vote-row r1">
                  <div className="vr-q">Support proposal #12?</div>
                  <div className="vr-meta">1,284 verified votes</div>
                  <div className="vr-bar">
                    <div></div>
                  </div>
                </div>
                <div className="vote-row r2">
                  <div className="vr-q">Allow forks?</div>
                  <div className="vr-meta">891 verified votes</div>
                  <div className="vr-bar">
                    <div></div>
                  </div>
                </div>
                <div className="vote-verify-pill">
                  <img src="/worldable-logo.png" alt="" className="mini-orb" style={{ background: 'transparent', objectFit: 'contain' }} /> Verified human · World ID
                </div>
              </div>
              <div className="ex-body">
                <div className="ex-quote">Prompt</div>
                <div className="ex-prompt">
                  &quot;Create a one-person-one-vote app with World ID.&quot;
                </div>
                <div className="ex-tags">
                  <span className="ex-tag">World ID</span>
                  <span className="ex-tag">Sybil-proof</span>
                  <span className="ex-tag">Governance</span>
                </div>
              </div>
            </div>

            {/* Donation */}
            <div className="ex-card reveal">
              <div className="ex-preview donate-preview">
                <div className="donate-header">
                  <div className="donate-avatar">K</div>
                  <div>
                    <div className="donate-name">Support @kim</div>
                    <div className="donate-handle">Independent journalist</div>
                  </div>
                </div>
                <div className="donate-amount">
                  <div className="da-label">Total raised</div>
                  <div className="da-value">
                    <span className="currency">$</span>
                    <span className="ticker">
                      {donateCounter.toLocaleString()}
                    </span>
                  </div>
                  <div className="da-meta">USDC · 84 supporters</div>
                </div>
                <div className="donate-coin-flow">
                  <span className="coin c1"></span>
                  <span className="coin c2"></span>
                  <span className="coin c3"></span>
                </div>
                <div className="donate-btn">Donate USDC</div>
              </div>
              <div className="ex-body">
                <div className="ex-quote">Prompt</div>
                <div className="ex-prompt">
                  &quot;Build a USDC donation Mini App for creators.&quot;
                </div>
                <div className="ex-tags">
                  <span className="ex-tag">Wallet Auth</span>
                  <span className="ex-tag">Pay</span>
                  <span className="ex-tag">USDC</span>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="ex-card reveal">
              <div className="ex-preview">
                <div className="ex-title">Daily quiz</div>
                <div className="quiz-q">Q: What does WLD power?</div>
                <div className="quiz-options">
                  <div className="quiz-opt">Streaming</div>
                  <div className="quiz-opt correct">World network</div>
                  <div className="quiz-opt">Stablecoins</div>
                  <div className="quiz-opt">L2 fees</div>
                </div>
                <div className="quiz-reward">
                  <span className="star"></span> +5 WLD claimed
                </div>
              </div>
              <div className="ex-body">
                <div className="ex-quote">Prompt</div>
                <div className="ex-prompt">
                  &quot;Make a quiz app where users can claim rewards.&quot;
                </div>
                <div className="ex-tags">
                  <span className="ex-tag">World ID</span>
                  <span className="ex-tag">Rewards</span>
                  <span className="ex-tag">Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WORLDABLE */}
      <section id="why" style={{ borderTop: "none" }}>
        <div className="wrap">
          <div className="eyebrow reveal">Why Worldable</div>
          <h2 className="section-title reveal">
            Not a generic app builder.<br />
            A World-native one.
          </h2>

          <div className="why-wrap reveal">
            <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
              <h3
                style={{
                  fontSize: 32,
                  letterSpacing: "-0.03em",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                Every app ships with the World stack — already wired.
              </h3>
              <p
                style={{
                  marginTop: 18,
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                Worldable was built for the World ecosystem from day one. Auth,
                identity, payments, deployment — handled. Creators ship without
                learning the stack.
              </p>
            </div>

            <div className="why-grid">
              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <rect
                      x="18"
                      y="6"
                      width="20"
                      height="44"
                      rx="3"
                      className="wa-stroke"
                    />
                    <rect
                      x="20"
                      y="11"
                      width="16"
                      height="32"
                      className="wa-phone-screen"
                    />
                    <circle cx="28" cy="47" r="1.5" className="wa-stroke" />
                    <circle cx="28" cy="22" r="2" className="wa-phone-dot" />
                  </svg>
                </div>
                <h4>World App</h4>
                <p>
                  Native rendering inside World App from the first preview.
                </p>
              </div>

              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <line
                      x1="18"
                      y1="18"
                      x2="38"
                      y2="18"
                      className="wa-kit-line"
                    />
                    <line
                      x1="38"
                      y1="18"
                      x2="38"
                      y2="38"
                      className="wa-kit-line"
                    />
                    <line
                      x1="38"
                      y1="38"
                      x2="18"
                      y2="38"
                      className="wa-kit-line"
                    />
                    <line
                      x1="18"
                      y1="38"
                      x2="18"
                      y2="18"
                      className="wa-kit-line"
                    />
                    <line
                      x1="18"
                      y1="18"
                      x2="38"
                      y2="38"
                      className="wa-kit-line"
                    />
                    <line
                      x1="38"
                      y1="18"
                      x2="18"
                      y2="38"
                      className="wa-kit-line"
                    />
                    <circle cx="18" cy="18" r="2.5" className="wa-kit-dot kd1" />
                    <circle cx="38" cy="18" r="2.5" className="wa-kit-dot kd2" />
                    <circle cx="38" cy="38" r="2.5" className="wa-kit-dot kd3" />
                    <circle cx="18" cy="38" r="2.5" className="wa-kit-dot kd4" />
                  </svg>
                </div>
                <h4>MiniKit</h4>
                <p>
                  All MiniKit primitives available without a single import.
                </p>
              </div>

              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="6" className="wa-id-ring r1" />
                    <circle cx="28" cy="28" r="6" className="wa-id-ring r2" />
                    <circle cx="28" cy="28" r="6" className="wa-id-ring r3" />
                    <circle cx="28" cy="28" r="5" className="wa-id-core" />
                  </svg>
                </div>
                <h4>World ID</h4>
                <p>
                  Sybil resistance baked in. One real person, one action.
                </p>
              </div>

              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <rect
                      x="8"
                      y="20"
                      width="40"
                      height="22"
                      rx="3"
                      className="wa-stroke"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M 12 32 Q 16 22, 20 32 T 28 32 T 36 32 L 44 32"
                      className="wa-sig"
                    />
                  </svg>
                </div>
                <h4>Wallet Auth</h4>
                <p>
                  Sign-in via World wallet — zero config from you.
                </p>
              </div>

              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <line
                      x1="10"
                      y1="28"
                      x2="20"
                      y2="28"
                      className="wa-pay-arrow"
                    />
                    <line
                      x1="36"
                      y1="28"
                      x2="46"
                      y2="28"
                      className="wa-pay-arrow"
                    />
                    <circle cx="28" cy="28" r="12" className="wa-coin" />
                    <text x="28" y="33" textAnchor="middle" className="wa-pay-text">
                      $
                    </text>
                  </svg>
                </div>
                <h4>Pay</h4>
                <p>
                  USDC, WLD, fiat — accept what your users actually use.
                </p>
              </div>

              <div className="why-item">
                <div className="why-anim">
                  <svg viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="20" className="wa-check-circle" />
                    <path
                      d="M 18 28 L 25 35 L 38 22"
                      className="wa-check-mark"
                    />
                  </svg>
                </div>
                <h4>Submission</h4>
                <p>
                  One-click to the World Mini App store. We handle the paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONETIZATION */}
      <section id="earn">
        <div className="wrap">
          <div className="eyebrow reveal">Monetization</div>
          <h2 className="section-title reveal">
            Creators build.<br />
            Creators earn.
          </h2>
          <p className="section-sub reveal">
            Every Mini App ships with built-in{" "}
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>
              in-app ad slots
            </strong>
            . Creators keep 85% of the ad revenue, paid out automatically.
            Worldable&apos;s fee only applies to revenue we enable.
          </p>

          <div className="rev-flow reveal">
            <div className="rf-grid">
              <div className="rf-node source">
                <div className="rf-live-tag">
                  <span className="rf-live-dot"></span>
                  <span>Live ad slot</span>
                </div>
                <div className="rf-ad-mock">
                  <div className="rf-ad-mock-label">Sponsored</div>
                  <div
                    className="rf-ad-mock-text"
                    key={adIndex}
                    style={{ animation: "rfAdFade 1s forwards" }}
                  >
                    {ads[adIndex]}
                  </div>
                </div>
                <div className="rf-eyebrow">In-app ad revenue</div>
                <div className="rf-value">
                  <span className="currency">$</span>
                  <span>{rfTotal.toLocaleString()}</span>
                </div>
                <div className="rf-label">Monthly · paid in USDC</div>
                <div className="rf-source-mini">
                  <span className="blip"></span>
                  <span className="blip"></span>
                  <span className="blip"></span>
                </div>
              </div>

              <div className="rf-splitter">
                <svg viewBox="0 0 300 200" preserveAspectRatio="none">
                  <path className="rf-path" d="M 0 100 L 150 100 L 280 40" />
                  <path className="rf-path" d="M 150 100 L 280 160" />
                  <path
                    className="rf-flow-line"
                    d="M 0 100 L 150 100 L 280 40"
                  />
                  <path
                    className="rf-flow-line"
                    d="M 150 100 L 280 160"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <circle r="3" cx="150" cy="100" className="rf-coin" />
                </svg>
                <div className="rf-split-label top">85% ad rev → creator</div>
                <div className="rf-split-label bottom">15% → platform fee</div>
              </div>

              <div className="rf-targets">
                <div className="rf-target major">
                  <div className="rf-eyebrow">You</div>
                  <div className="rf-tname">Creator ad earnings</div>
                  <div className="rf-share">$10,540 · 85%</div>
                  <div className="rf-bar">
                    <div></div>
                  </div>
                </div>
                <div className="rf-target minor">
                  <div className="rf-eyebrow">Worldable</div>
                  <div className="rf-tname">Platform fee on ads</div>
                  <div className="rf-share">$1,860 · 15%</div>
                  <div className="rf-bar">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="money">
            <div className="money-card reveal">
              <div className="money-num">For creators</div>
              <h3>Earn from the apps you ship.</h3>
              <p>
                Built-in ad and promotion slots, on by default but always
                optional. You keep the majority of what your app generates.
              </p>
              <ul className="money-list">
                <li>
                  <span>Ad revenue share</span>
                  <span className="val">creator-first</span>
                </li>
                <li>
                  <span>Promotion slots</span>
                  <span className="val">opt-in</span>
                </li>
                <li>
                  <span>In-app payments</span>
                  <span className="val">100% to you</span>
                </li>
              </ul>
            </div>
            <div className="money-card reveal">
              <div className="money-num">For Worldable</div>
              <h3>Pay for what you generate.</h3>
              <p>
                AI generation, edits, debugging, and launch support run on
                credits or a native AI compute token. You only pay for what you
                ship.
              </p>
              <ul className="money-list">
                <li>
                  <span>Generation</span>
                  <span className="val">credits</span>
                </li>
                <li>
                  <span>Edits & debugging</span>
                  <span className="val">credits</span>
                </li>
                <li>
                  <span>Launch support</span>
                  <span className="val">credits / token</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="final"
        id="waitlist"
        style={{ borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <img src="/worldable-logo.png" alt="Worldable" className="big-orb" style={{ background: 'transparent', objectFit: 'contain', boxShadow: 'none' }} />
          <h2>Build your first World Mini App from a sentence.</h2>
          <p>
            Get early access. Be among the first creators to ship on World
            without the stack.
          </p>
          <form className="waitlist" onSubmit={handleFooterSubmit}>
            <input type="hidden" name="apiKey" value="sf_36e736fdf1c34e2322f82564" />
            <input type="hidden" name="subject" value="worldable submission" />
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              disabled={footerSubmitted || footerSubmitting}
            />
            <button type="submit" disabled={footerSubmitted || footerSubmitting}>
              {footerSubmitting ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg className="animate-spin" viewBox="0 0 24 24" fill="none" style={{ width: 14, height: 14 }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" opacity="0.3" />
                    <path d="M12 2A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending...
                </span>
              ) : footerSubmitted ? "✓ On the list" : "Get early access"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot">
          <div className="logo">
            <img src="/worldable-logo.png" alt="Worldable Logo" />
            <span>Worldable</span>
          </div>
          <div className="foot-links">
            <a href="#">Docs</a>
            <a href="#">Examples</a>
            <a href="#">Pricing</a>
            <a href="https://x.com/worldable_app">X / Twitter</a>
          </div>
          <div className="copy">
            © 2026 Worldable. Built for the World ecosystem.
          </div>
        </div>
      </footer>

      {/* WAITLIST MODAL */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
          <h3>Join the Waitlist</h3>
          <p>Be the first to know when Worldable goes live and start building Mini Apps from a single sentence.</p>
          <form className="modal-form" onSubmit={handleModalSubmit}>
            <input type="hidden" name="apiKey" value="sf_36e736fdf1c34e2322f82564" />
            <input type="hidden" name="subject" value="worldable submission" />
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email address" 
              required 
              value={modalEmail}
              onChange={e => setModalEmail(e.target.value)}
              disabled={modalSubmitted || modalSubmitting}
            />
            <button type="submit" disabled={modalSubmitted || modalSubmitting}>
              {modalSubmitting ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  <svg className="animate-spin" viewBox="0 0 24 24" fill="none" style={{ width: 16, height: 16 }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" opacity="0.3" />
                    <path d="M12 2A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending...
                </span>
              ) : modalSubmitted ? '✓ Added to Waitlist' : 'Get early access'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
