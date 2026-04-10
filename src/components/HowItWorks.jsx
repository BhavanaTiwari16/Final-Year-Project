export default function HowItWorks() {
  return (
    <section className="how-section" id="how">
      <div className="how-inner">
        <div className="section-label" style={{ color: "var(--earth)" }}>
          Your journey
        </div>

        <h2 className="section-title">
          Simple steps to <em>feeling supported</em>
        </h2>

        <p className="section-sub" style={{ margin: "0 auto 0" }}>
          From first sign-in to daily companionship — getting started takes less than two minutes.
        </p>

        <div
          style={{
            marginTop: "52px",
            background: "var(--white)",
            borderRadius: "24px",
            border: "1px solid rgba(122,158,135,.12)",
            padding: "36px 24px",
          }}
        >
          <svg
            width="100%"
            viewBox="0 0 680 580"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              <marker
                id="arr2"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="context-stroke"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>

            {/* Step 1 */}
            <g>
              <rect x="240" y="20" width="200" height="52" rx="10" fill="#e8f0eb" stroke="#7a9e87" strokeWidth="1.2" />
              <text x="340" y="42" textAnchor="middle" dominantBaseline="central" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#5a4a35" fontWeight="500">
                01 · Create your account
              </text>
              <text x="340" y="60" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#7a6e67">
                Secure sign-up, encrypted profile
              </text>
            </g>

            <line x1="340" y1="72" x2="340" y2="108" stroke="#7a9e87" strokeWidth="1.5" markerEnd="url(#arr2)" fill="none"/>

            {/* Step 2 */}
            <g>
              <rect x="200" y="108" width="280" height="52" rx="10" fill="#e8f0eb" stroke="#7a9e87" strokeWidth="1.2"/>
              <text x="340" y="130" textAnchor="middle" dominantBaseline="central" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#5a4a35" fontWeight="500">
                02 · Read articles &amp; parenting tips
              </text>
              <text x="340" y="148" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#7a6e67">
                Curated resources for every stage
              </text>
            </g>

            <line x1="340" y1="160" x2="340" y2="196" stroke="#7a9e87" strokeWidth="1.5" markerEnd="url(#arr2)" fill="none"/>

            {/* Decision */}
            <polygon points="340,196 430,238 340,280 250,238" fill="#fdf4f5" stroke="#e8b4b8" strokeWidth="1.4"/>
            <text x="340" y="234" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="12" fill="#5a4a35" fontWeight="500">Feeling</text>
            <text x="340" y="250" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="12" fill="#5a4a35" fontWeight="500">depressed?</text>

            {/* No branch */}
            <text x="214" y="295" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#7a9e87" fontWeight="500">No</text>
            <path d="M250 238 L120 238 L120 134" stroke="#b5cfc0" strokeWidth="1.3" strokeDasharray="5 3" fill="none" markerEnd="url(#arr2)"/>
            <text x="68" y="192" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="#7a6e67" transform="rotate(-90,68,192)">
              Continue reading
            </text>

            {/* Yes branch */}
            <text x="465" y="295" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#e8b4b8" fontWeight="500">Yes</text>
            <line x1="430" y1="238" x2="540" y2="238" stroke="#e8b4b8" strokeWidth="1.3" fill="none"/>
            <line x1="540" y1="238" x2="540" y2="300" stroke="#e8b4b8" strokeWidth="1.3" markerEnd="url(#arr2)" fill="none"/>

            {/* Step 3 */}
            <g>
              <rect x="410" y="300" width="260" height="52" rx="10" fill="#fdf4f5" stroke="#e8b4b8" strokeWidth="1.2"/>
              <text x="540" y="322" textAnchor="middle" dominantBaseline="central" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#5a4a35" fontWeight="500">
                03 · Take the assessment
              </text>
              <text x="540" y="340" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#7a6e67">
                Validated perinatal screening (EPDS)
              </text>
            </g>

            <line x1="540" y1="352" x2="540" y2="388" stroke="#e8b4b8" strokeWidth="1.3" markerEnd="url(#arr2)" fill="none"/>

            {/* Score */}
            <polygon points="540,388 620,420 540,452 460,420" fill="#fdf4f5" stroke="#e8b4b8" strokeWidth="1.3"/>
            <text x="540" y="416" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#5a4a35" fontWeight="500">Score?</text>

            {/* Mild */}
            <text x="415" y="474" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="#7a9e87" fontWeight="500">
              Mild / moderate
            </text>
            <path d="M460 420 L340 420 L340 456" stroke="#7a9e87" strokeWidth="1.4" markerEnd="url(#arr2)" fill="none"/>

            {/* High */}
            <text x="635" y="435" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="#c47070" fontWeight="500">
              Highly
            </text>
            <text x="635" y="449" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="#c47070" fontWeight="500">
              depressed
            </text>
            <path d="M620 420 L660 420 L660 500" stroke="#e8a0a0" strokeWidth="1.4" markerEnd="url(#arr2)" fill="none"/>

            {/* AI */}
            <g>
              <rect x="220" y="456" width="240" height="56" rx="10" fill="#e8f0eb" stroke="#7a9e87" strokeWidth="1.3"/>
              <text x="340" y="477" textAnchor="middle" dominantBaseline="central" fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#5a4a35" fontWeight="500">
                04A · Meet your AI companion
              </text>
              <text x="340" y="495" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#7a6e67">
                Chat, mood tracking, CBT exercises
              </text>
            </g>

            {/* Psychologist */}
            <g>
              <rect x="540" y="500" width="120" height="56" rx="10" fill="#fceaea" stroke="#d08080" strokeWidth="1.3"/>
              <text x="600" y="522" textAnchor="middle" dominantBaseline="central" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#5a4a35" fontWeight="500">
                04B · Psychologist
              </text>
              <text x="600" y="540" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="#7a6e67">
                Clinical consultation
              </text>
            </g>

          </svg>
        </div>
      </div>
    </section>
  );
}