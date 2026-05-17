// sections.jsx — page sections

// ── Hero Dashboard mock ──────────────────────────────────────────────
function HeroDashboard() {
  return (
    <div className="mock">
      <div className="mock-chrome">
        <div className="mock-dot"/>
        <div className="mock-dot"/>
        <div className="mock-dot"/>
        <div className="mock-title">cortex.ai / operations</div>
      </div>
      <div className="dash">
        <aside className="dash-side">
          <div className="dash-side-section">Workspace</div>
          <div className="dash-nav-item active">
            <Icon name="cpu" size={15}/> Agent console
            <span className="dash-nav-count">12</span>
          </div>
          <div className="dash-nav-item">
            <Icon name="inbox" size={15}/> Inbox
            <span className="dash-nav-count">3</span>
          </div>
          <div className="dash-nav-item">
            <Icon name="receipt" size={15}/> Invoices
          </div>
          <div className="dash-nav-item">
            <Icon name="wrench" size={15}/> Maintenance
          </div>
          <div className="dash-nav-item">
            <Icon name="truck" size={15}/> Vendors
          </div>
          <div className="dash-nav-item">
            <Icon name="chart" size={15}/> Reports
          </div>
          <div className="dash-side-section" style={{marginTop: 14}}>Properties</div>
          <div className="dash-nav-item">
            <Icon name="home" size={15}/> Riverside Lofts
          </div>
          <div className="dash-nav-item">
            <Icon name="home" size={15}/> Oak & Vine
          </div>
        </aside>
        <div className="dash-main">
          <div className="dash-head">
            <div>
              <h4>Agent activity</h4>
              <div className="dash-head-sub">Live feed · today</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-3)'}}>
              <div className="pulse"/> 12 agents working
            </div>
          </div>
          <div className="dash-stats">
            <div className="dash-stat">
              <div className="dash-stat-label">Resolved</div>
              <div className="dash-stat-value">248</div>
              <div className="dash-stat-delta">↑ 18% vs. yesterday</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">Hours saved</div>
              <div className="dash-stat-value">47.2</div>
              <div className="dash-stat-delta">↑ 4.1h today</div>
            </div>
            <div className="dash-stat">
              <div className="dash-stat-label">Avg. response</div>
              <div className="dash-stat-value">24s</div>
              <div className="dash-stat-delta">↑ 2.4× faster</div>
            </div>
          </div>

          <div className="dash-list-item active-row">
            <div className="dash-list-icon"><Icon name="receipt" size={13}/></div>
            <div>
              <div className="dash-list-title">Invoice #4821 · Peak HVAC</div>
              <div className="dash-list-sub">Matched to PO, routed to AP for approval</div>
            </div>
            <div className="dash-badge blue">Processing</div>
            <div className="dash-list-time">now</div>
          </div>
          <div className="dash-list-item">
            <div className="dash-list-icon"><Icon name="wrench" size={13}/></div>
            <div>
              <div className="dash-list-title">Unit 3B · Leak report</div>
              <div className="dash-list-sub">Dispatched Rodriguez Plumbing · 9:00a Tue</div>
            </div>
            <div className="dash-badge green">Scheduled</div>
            <div className="dash-list-time">2m</div>
          </div>
          <div className="dash-list-item">
            <div className="dash-list-icon"><Icon name="chat" size={13}/></div>
            <div>
              <div className="dash-list-title">Tenant inquiry · lease renewal</div>
              <div className="dash-list-sub">Drafted response, cc'd leasing manager</div>
            </div>
            <div className="dash-badge amber">Needs review</div>
            <div className="dash-list-time">6m</div>
          </div>
          <div className="dash-list-item">
            <div className="dash-list-icon"><Icon name="chart" size={13}/></div>
            <div>
              <div className="dash-list-title">Monthly owner statement</div>
              <div className="dash-list-sub">Generated for 14 properties · ready to send</div>
            </div>
            <div className="dash-badge green">Complete</div>
            <div className="dash-list-time">14m</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────
const HEADLINES = [
  {
    title: <>The AI workforce for <em>property management.</em></>,
    lead: "Acel Cortex Solutions runs your back office — invoices, vendors, tenant comms, owner reports — so your team stops doing busywork and starts doing the work that grows the business."
  },
  {
    title: <>Cut admin hours by <em>80%.</em> Keep the humans.</>,
    lead: "Purpose-built AI agents that handle the repetitive operations behind every property — from invoice processing to vendor scheduling — with no new hires required."
  },
  {
    title: <>Run 3× more doors with the <em>same team.</em></>,
    lead: "Acel Cortex Solutions handles the coordination, paperwork, and follow-ups that weigh your staff down. Free up labor costs or grow your portfolio without growing your headcount."
  }
];

function Hero({ headlineIndex }) {
  const h = HEADLINES[headlineIndex] || HEADLINES[0];
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-bg-grid"/>
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-chip">NEW</span>
              <span>AI agents for mid-sized property managers</span>
            </div>
            <h1 className="h1">{h.title}</h1>
            <p className="lead">{h.lead}</p>
            <div className="hero-ctas">
              <a href="#cta" className="btn btn-primary btn-xl">
                Book a demo <span className="btn-arrow"><Icon name="arrow" size={16}/></span>
              </a>
              <a href="#how" className="btn btn-ghost btn-xl">
                <Icon name="play" size={14}/> See how it works
              </a>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-stat"><b>3.8h</b> saved per staff, per day</div>
              <div style={{width: 1, height: 14, background: 'var(--line)'}}/>
              <div className="hero-trust-stat"><b>16,680+</b> tasks processed</div>
              <div style={{width: 1, height: 14, background: 'var(--line)'}}/>
              <div className="hero-trust-stat"><b>SOC 2</b> ready</div>
            </div>
          </div>
          <div>
            <HeroDashboard/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features ────────────────────────────────────────────────────────
function Features() {
  const items = [
    {
      icon: 'receipt',
      title: 'Invoice processing',
      body: 'Inbound invoices are parsed, matched to the right property and PO, flagged for duplicates, and routed for approval — with coding already filled in.',
      m1: '12s',
      m1l: 'per invoice',
      m2: '99.2%',
      m2l: 'accuracy'
    },
    {
      icon: 'truck',
      title: 'Vendor scheduling',
      body: 'Agents negotiate windows with vendors, confirm with tenants, and place work orders on the calendar — without a single phone tag loop.',
      m1: '24s',
      m1l: 'avg. response',
      m2: '3.1×',
      m2l: 'faster turn'
    },
    {
      icon: 'chart',
      title: 'Financial reporting',
      body: 'Owner statements, delinquency reports, and budget variance analyses drafted on a schedule you set — ready to review, not author.',
      m1: 'Monthly',
      m1l: 'automated runs',
      m2: '14',
      m2l: 'report types'
    },
    {
      icon: 'chat',
      title: 'Tenant communications',
      body: 'Responds to routine questions, escalates when it should, logs every exchange to the resident record, and keeps your tone — not a chatbot voice.',
      m1: '24/7',
      m1l: 'coverage',
      m2: '< 1min',
      m2l: 'first reply'
    }
  ];
  return (
    <section id="product" data-screen-label="02 Features">
      <div className="container">
        <div className="section-head">
          <div className="section-label">
            <span className="eyebrow eyebrow-dot">What it does</span>
            <div className="section-label-line"/>
          </div>
          <h2 className="h2">Four workflows. One less <em>operations team.</em></h2>
          <p className="lead">Every Acel Cortex Solutions agent is trained on property management data, wired into the tools you already use, and supervised by your staff — not the other way around.</p>
        </div>
        <div className="features-grid">
          {items.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"><Icon name={f.icon} size={18}/></div>
              <h3 className="h3">{f.title}</h3>
              <p className="body">{f.body}</p>
              <div className="feature-meta">
                <div><b>{f.m1}</b> · {f.m1l}</div>
                <div><b>{f.m2}</b> · {f.m2l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works (interactive) ──────────────────────────────────────
function HowItWorks() {
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      num: 'STEP 01',
      title: 'It listens',
      desc: 'Agents monitor email, portals, maintenance requests, and uploaded documents — the same inboxes your team already watches.',
      render: () => <ListenView/>
    },
    {
      num: 'STEP 02',
      title: 'It decides',
      desc: 'Using your rules, property context, and historical patterns, the agent chooses the next action — and explains its reasoning.',
      render: () => <DecideView/>
    },
    {
      num: 'STEP 03',
      title: 'It acts',
      desc: 'Schedules the vendor, drafts the reply, codes the invoice, updates the system of record. Your staff reviews only what matters.',
      render: () => <ActView/>
    }
  ];

  React.useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="how" className="workflow" data-screen-label="03 How it works">
      <div className="container">
        <div style={{maxWidth: 720}}>
          <div className="section-label">
            <span className="eyebrow eyebrow-dot">How it works</span>
            <div className="section-label-line" style={{background: 'rgba(255,255,255,0.15)'}}/>
          </div>
          <h2 className="h2">From inbox to resolution, <em>without the middle.</em></h2>
          <p className="lead">Acel Cortex Solutions isn't a copilot you have to drive. It's a workforce you supervise.</p>
        </div>
        <div className="workflow-stage">
          <div className="wf-steps">
            {steps.map((s, i) => (
              <div
                className={`wf-step ${i === step ? 'active' : ''}`}
                key={i}
                onClick={() => setStep(i)}
              >
                <div className="wf-step-bar"/>
                <div className="wf-step-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="wf-canvas" key={step}>
            {steps[step].render()}
          </div>
        </div>
      </div>
    </section>
  );
}

function ListenView() {
  return (
    <div className="chat fade-in">
      <div className="chat-meta">Monitored · 4 channels</div>
      <div className="chat-row">
        <div className="chat-avatar user">RS</div>
        <div style={{flex: 1}}>
          <div className="chat-meta">Tenant · 3B Riverside · 9:42a</div>
          <div className="chat-bubble">Hi — the sink in the kitchen started leaking overnight. There's water pooling under the cabinet. Can someone come take a look today?</div>
        </div>
      </div>
      <div className="chat-row">
        <div className="chat-avatar user">AP</div>
        <div style={{flex: 1}}>
          <div className="chat-meta">Vendor · Peak HVAC · 9:51a</div>
          <div className="chat-bubble">Invoice attached — service call for Oak & Vine unit 14. Net 30. Let me know if anything's off.</div>
        </div>
      </div>
      <div className="chat-row">
        <div className="chat-avatar user">OW</div>
        <div style={{flex: 1}}>
          <div className="chat-meta">Owner · Henderson · 10:03a</div>
          <div className="chat-bubble">Can I get Q1 variance for the Cedar portfolio before our 2pm call?</div>
        </div>
      </div>
    </div>
  );
}

function DecideView() {
  return (
    <div className="fade-in" style={{display: 'flex', flexDirection: 'column', gap: 16}}>
      <div className="chat-meta">Reasoning · Invoice #4821</div>
      <div className="doc-mock">
        <div className="doc-row"><span>Vendor</span><span>Peak HVAC</span></div>
        <div className="doc-row"><span>Property match</span><span>Oak & Vine · Unit 14</span></div>
        <div className="doc-row"><span>Matched to PO</span><span>PO-2199</span></div>
        <div className="doc-row"><span>GL code</span><span>6110 · Repairs</span></div>
        <div className="doc-row"><span>Duplicate check</span><span>✓ unique</span></div>
        <div className="doc-row"><span>Amount</span><span>$1,284.50</span></div>
      </div>
      <div className="chat-row">
        <div className="chat-avatar">C</div>
        <div style={{flex: 1}}>
          <div className="chat-bubble">
            Matched to open PO-2199 (HVAC repair, Oak & Vine #14). Amount within 2% of quote. No duplicate in last 90 days. Recommending approval and routing to Maria for sign-off.
            <div style={{marginTop: 8}}>
              <span className="chat-action">GL: 6110</span>
              <span className="chat-action">Confidence: 98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActView() {
  return (
    <div className="fade-in" style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div className="chat-meta">Actions taken · last 90s</div>
      <ActRow icon="receipt" title="Invoice #4821 approved" sub="Posted to AppFolio · notified Maria" time="9:51a"/>
      <ActRow icon="truck" title="Work order W-3104 created" sub="Rodriguez Plumbing · Tue 9–11a window" time="9:47a"/>
      <ActRow icon="chat" title="Reply drafted for tenant 3B" sub="Confirmed window, sent via portal" time="9:46a"/>
      <ActRow icon="doc" title="Q1 variance report rendered" sub="Cedar portfolio · sent to owner Henderson" time="10:04a"/>
    </div>
  );
}

function ActRow({ icon, title, sub, time }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '32px 1fr auto',
      gap: 14, alignItems: 'center',
      padding: '14px 16px',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.02)'
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'rgba(43,163,199,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)'
      }}>
        <Icon name={icon} size={15}/>
      </div>
      <div>
        <div style={{fontSize: 13.5, fontWeight: 500, color: '#fff'}}>{title}</div>
        <div style={{fontSize: 12, color: 'rgba(242,245,248,0.6)', marginTop: 2}}>{sub}</div>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'rgba(242,245,248,0.45)'
      }}>{time}</div>
    </div>
  );
}

window.Hero = Hero;
window.Features = Features;
window.HowItWorks = HowItWorks;

// ── Live mobile demo ────────────────────────────────────────────────
const LD_MESSAGES = [
  {
    kind: 'agent',
    delay: 900,
    body: (
      <>
        Unit 2 · 258 Riverside has leaks under the sink. Tenant sent the photo and verified the source of leak — dispatch Rodriguez Plumbing for <b style={{color:'#fff'}}>$185</b>?
      </>
    ),
    time: '2:14pm'
  },
  {
    kind: 'agent-action',
    delay: 1600,
    title: 'Recommended action',
    items: [
      'Dispatch Rodriguez Plumbing',
      'Send notice of entry to residents',
      'Notify owner',
    ],
    footer: <b style={{color:'#fff'}}>Approved?</b>,
    time: '2:14pm'
  },
  {
    kind: 'user',
    delay: 1800,
    body: 'Yes',
    time: '2:15pm'
  },
  {
    kind: 'typing',
    delay: 900,
  },
  {
    kind: 'agent',
    delay: 1400,
    body: (
      <>
        <span style={{display:'inline-block', verticalAlign:'-1px', marginRight:4}}>✅</span>
        Work order <b style={{color:'#fff'}}>#4471</b> dispatched. Vendor schedule updated.
      </>
    ),
    time: '2:15pm'
  },
  {
    kind: 'agent-receipt',
    delay: 1300,
    rows: [
      ['Work order', '#4471 · dispatched'],
      ['Vendor', 'Rodriguez Plumbing (warranty)'],
      ['Tenant notified', 'SMS + email · 2:15pm'],
      ['Cost', '$0.00'],
      ['Your time saved', '~22 min'],
    ],
    time: '2:16pm'
  },
];

function LiveDemo() {
  const [visible, setVisible] = React.useState(0);   // count of messages rendered so far
  const [restartKey, setRestartKey] = React.useState(0);
  const bodyRef = React.useRef(null);

  // Animation loop
  React.useEffect(() => {
    let cancelled = false;
    let timers = [];

    function play() {
      setVisible(0);
      let cumulative = 600; // initial delay after reset
      LD_MESSAGES.forEach((msg, i) => {
        cumulative += msg.delay;
        const t = setTimeout(() => {
          if (cancelled) return;
          setVisible(prev => Math.max(prev, i + 1));
        }, cumulative);
        timers.push(t);
      });
      // Schedule the restart
      const restart = setTimeout(() => {
        if (cancelled) return;
        setRestartKey(k => k + 1);
      }, cumulative + 4500);
      timers.push(restart);
    }

    play();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [restartKey]);

  // Auto-scroll to bottom as new bubbles appear
  React.useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [visible]);

  // Render: hide a 'typing' bubble once the message AFTER it is visible
  const renderable = LD_MESSAGES.slice(0, visible).filter((msg, i, arr) => {
    if (msg.kind !== 'typing') return true;
    // hide typing if the next message is already in
    return !arr[i + 1];
  });

  return (
    <section id="demo" className="livedemo" data-screen-label="04 Live demo">
      <div className="container">
        <div style={{maxWidth: 760}}>
          <div className="section-label">
            <span className="eyebrow eyebrow-dot">Zero learning curve</span>
            <div className="section-label-line" style={{background: 'rgba(255,255,255,0.15)'}}/>
          </div>
          <h2 className="h2">No dashboard to learn. <em>Just text it.</em></h2>
          <p className="lead">Acel Cortex runs on Telegram. Every agent — maintenance, leasing, accounting — is one chat away. Type what you need in plain English, get back a plan, approve it with a word. That's the whole UI.</p>
        </div>

        <div className="ld-stage">
          {/* Phone */}
          <div className="phone">
            <div className="phone-notch"/>
            <div className="phone-screen">
              <div className="tg-head">
                <button className="tg-back" aria-label="Back">‹</button>
                <div className="tg-avatar">
                  <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
                    <circle cx="50" cy="50" r="32" stroke="#F5F2EC" strokeWidth="3" fill="none"/>
                    <circle cx="50" cy="50" r="18" stroke="#F5F2EC" strokeWidth="2.5" fill="none" opacity="0.3"/>
                    <circle cx="50" cy="50" r="6" fill="#F5F2EC"/>
                    <circle cx="76.21" cy="31.64" r="8" fill="#4FB89C"/>
                  </svg>
                </div>
                <div className="tg-title">
                  <div className="tg-name">acel·cortex</div>
                  <div className="tg-status"><span className="tg-dot"/> AI ops agent · online</div>
                </div>
                <button className="tg-more" aria-label="More">≡</button>
              </div>

              <div className="tg-body" ref={bodyRef}>
                <div className="tg-daysep">Today</div>

                {renderable.map((msg, i) => {
                  const key = `${restartKey}-${i}`;
                  if (msg.kind === 'agent') {
                    return (
                      <div className="tg-row agent ld-enter" key={key}>
                        <div className="tg-bubble agent">
                          {msg.body}
                          <span className="tg-time">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }
                  if (msg.kind === 'user') {
                    return (
                      <div className="tg-row user ld-enter" key={key}>
                        <div className="tg-bubble user">
                          {msg.body}
                        </div>
                        <span className="tg-delivered">Delivered</span>
                      </div>
                    );
                  }
                  if (msg.kind === 'typing') {
                    return (
                      <div className="tg-row agent ld-enter" key={key}>
                        <div className="tg-typing"><span/><span/><span/></div>
                      </div>
                    );
                  }
                  if (msg.kind === 'agent-action') {
                    return (
                      <div className="tg-row agent ld-enter" key={key}>
                        <div className="tg-bubble agent action">
                          <div className="tg-action-title">{msg.title}</div>
                          <ul className="tg-action-list">
                            {msg.items.map((item, j) => (
                              <li key={j}><span className="tg-check">✓</span> {item}</li>
                            ))}
                          </ul>
                          {msg.footer && (
                            <div className="tg-action-footer">{msg.footer}</div>
                          )}
                          <span className="tg-time">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }
                  if (msg.kind === 'agent-receipt') {
                    return (
                      <div className="tg-row agent ld-enter" key={key}>
                        <div className="tg-bubble agent action receipt">
                          <div className="tg-action-title">Done · receipt</div>
                          <div className="tg-receipt">
                            {msg.rows.map(([k, v], j) => (
                              <div className="tg-receipt-row" key={j}>
                                <span className="tg-receipt-k">{k}</span>
                                <span className="tg-receipt-v">{v}</span>
                              </div>
                            ))}
                          </div>
                          <span className="tg-time">{msg.time}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="tg-input">
                <button className="tg-plus" aria-label="Attach">＋</button>
                <span className="tg-placeholder">Message</span>
                <button className="tg-mic" aria-label="Voice">🎙</button>
              </div>
            </div>
          </div>

          {/* Steps + channels */}
          <div className="ld-side">
            <ol className="ld-steps">
              <li>
                <span className="ld-num">01</span>
                <div>
                  <h4>Text your request</h4>
                  <p>In English, French, Spanish, Mandarin — whatever your team speaks. No forms, no menus, no training.</p>
                </div>
              </li>
              <li>
                <span className="ld-num">02</span>
                <div>
                  <h4>Agent pulls context</h4>
                  <p>It reads the tenant history, vendor contracts, lease terms, and prior tickets — then proposes a plan with actual dollar amounts.</p>
                </div>
              </li>
              <li>
                <span className="ld-num">03</span>
                <div>
                  <h4>One word to approve</h4>
                  <p>Type <b>"Yes"</b>, <b>"Edit"</b>, or <b>"Skip"</b>. The agent dispatches vendors, notifies tenants, updates your PMS, and sends you a receipt.</p>
                </div>
              </li>
            </ol>

            <div className="ld-channels">
              <span className="eyebrow">Also works on</span>
              <div className="ld-chips">
                <span className="ld-chip">WhatsApp</span>
                <span className="ld-chip">SMS</span>
                <span className="ld-chip">Slack</span>
                <span className="ld-chip">Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LiveDemo = LiveDemo;
