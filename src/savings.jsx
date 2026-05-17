// savings.jsx — interactive calculator + platform stats

function useCountUp(target, duration = 900) {
  const [val, setVal] = React.useState(target);
  const prevRef = React.useRef(target);
  React.useEffect(() => {
    const from = prevRef.current;
    const to = target;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

const fmt = {
  money: (n) => '$' + Math.round(n).toLocaleString('en-US'),
  int: (n) => Math.round(n).toLocaleString('en-US'),
  dec: (n, d = 1) => n.toFixed(d),
};

function SavingsCalculator({ defaults }) {
  const [units, setUnits] = React.useState(defaults.units);
  const [staff, setStaff] = React.useState(defaults.staff);
  const [salary, setSalary] = React.useState(defaults.salary);

  // Model: 3.8h/day saved per staff member × working days × hourly cost
  const HOURS_PER_STAFF_PER_DAY = 3.8;
  const WORKDAYS_YEAR = 252;
  const OVERHEAD = 1.35; // employer overhead multiplier

  const dailyHours = staff * HOURS_PER_STAFF_PER_DAY;
  const annualHours = dailyHours * WORKDAYS_YEAR;
  const hourlyCost = (salary * OVERHEAD) / (WORKDAYS_YEAR * 8);
  const annualSavings = annualHours * hourlyCost;
  const monthlySavings = annualSavings / 12;
  const perUnit = units > 0 ? annualSavings / units : 0;

  const aSavings = useCountUp(annualSavings);
  const aDaily = useCountUp(dailyHours);
  const aMonthly = useCountUp(monthlySavings);
  const aPerUnit = useCountUp(perUnit);

  return (
    <div className="savings-grid">
      <div className="calc">
        <h3 className="h3">Your portfolio</h3>
        <div className="calc-sub">Slide to match your operation. Numbers update live.</div>

        <CalcField
          label="Units under management"
          value={fmt.int(units)}
          min={25} max={1500} step={25}
          v={units} setV={setUnits}
          ticks={['25', '500', '1,500']}
        />
        <CalcField
          label="Admin / ops staff"
          value={fmt.int(staff) + (staff === 1 ? ' person' : ' people')}
          min={1} max={20} step={1}
          v={staff} setV={setStaff}
          ticks={['1', '10', '20']}
        />
        <CalcField
          label="Avg. fully-loaded salary"
          value={fmt.money(salary)}
          min={45000} max={120000} step={1000}
          v={salary} setV={setSalary}
          ticks={['$45k', '$80k', '$120k']}
        />

        <div className="calc-result">
          <div className="small" style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <Icon name="sparkle" size={13} stroke="var(--accent)"/>
            Based on 3.8 hours saved per staff, per working day
          </div>
        </div>
      </div>

      <div className="result-card">
        <div>
          <div className="result-label">You could save</div>
          <div className="result-big">
            {fmt.money(aSavings)}<span className="unit">/ year</span>
          </div>
        </div>

        <div className="result-divider"/>

        <div className="result-mini-grid">
          <div className="result-mini">
            <div className="result-label">Hours / day</div>
            <div className="result-mini-value">
              {fmt.dec(aDaily, 1)}<span className="unit">hrs</span>
            </div>
          </div>
          <div className="result-mini">
            <div className="result-label">Per month</div>
            <div className="result-mini-value">
              {fmt.money(aMonthly)}
            </div>
          </div>
          <div className="result-mini">
            <div className="result-label">Per unit / year</div>
            <div className="result-mini-value">
              {fmt.money(aPerUnit)}
            </div>
          </div>
          <div className="result-mini">
            <div className="result-label">Headcount equiv.</div>
            <div className="result-mini-value">
              {fmt.dec((annualHours / (WORKDAYS_YEAR * 8)), 1)}<span className="unit">ppl</span>
            </div>
          </div>
        </div>

        <div className="result-foot">
          <span>Reinvest in growth, or trim fixed costs. Either way — it's real money.</span>
          <span className="mono">v1 · 2026</span>
        </div>
      </div>
    </div>
  );
}

function CalcField({ label, value, min, max, step, v, setV, ticks }) {
  return (
    <div className="calc-field">
      <label>
        <span>{label}</span>
        <span className="calc-field-value">{value}</span>
      </label>
      <div className="slider-wrap">
        <input
          type="range"
          className="slider"
          min={min} max={max} step={step}
          value={v}
          onChange={e => setV(+e.target.value)}
        />
        <div className="slider-ticks">
          {ticks.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Savings({ defaults }) {
  return (
    <section id="savings" className="savings" data-screen-label="04 Savings">
      <div className="container">
        <div className="section-head">
          <div className="section-label">
            <span className="eyebrow eyebrow-dot">The math</span>
            <div className="section-label-line"/>
          </div>
          <h2 className="h2">See exactly what you'd <em>save.</em></h2>
          <p className="lead">No vague "efficiency gains." Your numbers, our benchmarks, one honest answer.</p>
        </div>
        <SavingsCalculator defaults={defaults}/>
      </div>
    </section>
  );
}

// ── Platform stats strip ──────────────────────────────────────────
function StatsStrip() {
  return (
    <section className="stats-strip" data-screen-label="05 Stats">
      <div className="container">
        <div className="stats-grid">
          <div>
            <div className="stat-label">Tasks processed on-platform</div>
            <div className="stat-value">16,680<span className="unit">+</span></div>
            <div className="stat-caption">Invoices, messages, schedules, and reports — handled end-to-end by Cortex agents.</div>
          </div>
          <div>
            <div className="stat-label">Hours saved per staff, daily</div>
            <div className="stat-value">3.8<span className="unit">hrs</span></div>
            <div className="stat-caption">Measured across active customer workspaces — the time your people get back.</div>
          </div>
          <div>
            <div className="stat-label">Average payback period</div>
            <div className="stat-value">&lt; 60<span className="unit">days</span></div>
            <div className="stat-caption">From first integration to positive ROI — including onboarding and configuration.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Savings = Savings;
window.StatsStrip = StatsStrip;
