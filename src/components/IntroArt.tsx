export type IntroArtKind = 'lab' | 'factory' | 'eco'

type IntroArtProps = Readonly<{
  kind: IntroArtKind
}>

export function IntroArt({ kind }: IntroArtProps) {
  if (kind === 'lab') {
    return <LabArt />
  }

  if (kind === 'factory') {
    return <FactoryArt />
  }

  return <EcoArt />
}

/* 研发 / 产品体系：锥形瓶 + 分子团 + 能量轨道 */
function LabArt() {
  return (
    <svg className="intro-svg" viewBox="0 0 440 360" aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse
          className="ia-stroke-brand ia-orbitline"
          cx="220"
          cy="216"
          rx="158"
          ry="54"
          strokeWidth="2"
          strokeDasharray="4 10"
          opacity="0.4"
        />
        <line className="ia-stroke-brand" x1="72" y1="316" x2="368" y2="316" strokeWidth="4" strokeDasharray="1 16" opacity="0.4" />
        <path
          className="ia-fill-tint"
          stroke="none"
          d="M166 232 L148 270 a18 18 0 0 0 15 27 h114 a18 18 0 0 0 15 -27 L274 232 q-27 12 -54 0 t-54 0 z"
        />
        <circle className="ia-stroke-brand ia-bubble" cx="206" cy="262" r="5" strokeWidth="2.5" />
        <circle className="ia-stroke-brand ia-bubble b2" cx="228" cy="270" r="7" strokeWidth="2.5" />
        <circle className="ia-stroke-brand ia-bubble b3" cx="246" cy="256" r="4" strokeWidth="2.5" />
        <path className="ia-stroke-dark" d="M204 106 v40 L148 270 a18 18 0 0 0 15 27 h114 a18 18 0 0 0 15 -27 L236 146 v-40" />
        <line className="ia-stroke-dark" x1="196" y1="104" x2="244" y2="104" />
        <g className="ia-float">
          <line className="ia-stroke-brand" x1="330" y1="120" x2="368" y2="158" strokeWidth="2.5" />
          <line className="ia-stroke-brand" x1="330" y1="120" x2="296" y2="168" strokeWidth="2.5" />
          <circle className="ia-stroke-dark ia-fill-white" cx="330" cy="120" r="18" />
          <circle className="ia-stroke-dark ia-fill-white" cx="372" cy="162" r="11" />
          <circle className="ia-stroke-dark ia-fill-white" cx="292" cy="172" r="8" />
          <circle className="ia-fill-brand" cx="330" cy="120" r="5" stroke="none" />
        </g>
        <path className="ia-stroke-brand ia-twinkle" d="M104 92 v20 M94 102 h20" strokeWidth="2.5" />
        <path className="ia-stroke-brand ia-twinkle t2" d="M352 62 v16 M344 70 h16" strokeWidth="2.5" />
        <circle className="ia-fill-brand ia-twinkle t3" cx="136" cy="172" r="4" stroke="none" />
      </g>
    </svg>
  )
}

/* 生产 / 品控：锯齿厂房 + 齿轮 + 传送带 + 盾形质检 */
function FactoryArt() {
  return (
    <svg className="intro-svg" viewBox="0 0 440 360" aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line className="ia-stroke-brand" x1="48" y1="312" x2="400" y2="312" strokeWidth="3" opacity="0.45" />
        <path
          className="ia-stroke-dark"
          d="M72 312 V220 L126 190 V220 L180 190 V220 L234 190 V232 H368 V312"
        />
        <rect className="ia-stroke-brand ia-window" x="86" y="244" width="28" height="26" rx="3" strokeWidth="2.5" />
        <rect className="ia-stroke-brand ia-window w2" x="140" y="244" width="28" height="26" rx="3" strokeWidth="2.5" />
        <rect className="ia-stroke-brand ia-window w3" x="194" y="244" width="28" height="26" rx="3" strokeWidth="2.5" />
        <rect className="ia-stroke-dark ia-fill-tint" x="290" y="262" width="32" height="50" rx="3" strokeWidth="2.5" />
        <g className="ia-gear">
          <circle className="ia-stroke-dark ia-fill-white" cx="330" cy="130" r="30" />
          <circle className="ia-stroke-brand" cx="330" cy="130" r="11" strokeWidth="2.5" />
          <path
            className="ia-stroke-dark"
            d="M364 130 h10 M354 154 l7 7 M330 164 v10 M306 154 l-7 7 M296 130 h-10 M306 106 l-7 -7 M330 96 v-10 M354 106 l7 -7"
          />
        </g>
        <g className="ia-gear reverse">
          <circle className="ia-stroke-brand ia-fill-white" cx="272" cy="84" r="16" strokeWidth="2.5" />
          <circle className="ia-stroke-brand" cx="272" cy="84" r="6" strokeWidth="2.5" />
          <path
            className="ia-stroke-brand"
            strokeWidth="2.5"
            d="M291 84 h7 M285 97 l5 5 M272 103 v7 M259 97 l-5 5 M253 84 h-7 M259 71 l-5 -5 M272 65 v-7 M285 71 l5 -5"
          />
        </g>
        <line className="ia-stroke-brand ia-conveyor" x1="64" y1="336" x2="384" y2="336" strokeDasharray="12 10" opacity="0.5" />
        <rect className="ia-stroke-dark" x="150" y="318" width="26" height="18" rx="2" strokeWidth="2.5" />
        <rect className="ia-stroke-dark" x="210" y="318" width="26" height="18" rx="2" strokeWidth="2.5" />
        <g className="ia-float slow">
          <path className="ia-stroke-dark ia-fill-tint" d="M120 62 l30 12 v24 c0 20 -13 33 -30 40 c-17 -7 -30 -20 -30 -40 v-24 z" />
          <path className="ia-stroke-brand" d="M106 102 l10 10 l18 -20" />
        </g>
      </g>
    </svg>
  )
}

/* 绿色理念 / 可持续：线框地球 + 叶片 + 环绕轨道 */
function EcoArt() {
  return (
    <svg className="intro-svg" viewBox="0 0 440 360" aria-hidden="true" focusable="false">
      <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle
          className="ia-stroke-brand ia-orbitline"
          cx="220"
          cy="180"
          r="146"
          strokeWidth="2"
          strokeDasharray="5 11"
          opacity="0.45"
        />
        <g className="ia-orbit-group">
          <circle className="ia-fill-brand" cx="366" cy="180" r="6" stroke="none" />
          <circle className="ia-fill-brand" cx="147" cy="306" r="5" stroke="none" opacity="0.75" />
          <circle className="ia-fill-brand" cx="147" cy="54" r="4" stroke="none" opacity="0.55" />
        </g>
        <circle className="ia-stroke-dark" cx="220" cy="180" r="104" />
        <ellipse className="ia-stroke-dark" cx="220" cy="180" rx="104" ry="36" opacity="0.45" strokeWidth="2" />
        <ellipse className="ia-stroke-dark" cx="220" cy="180" rx="36" ry="104" opacity="0.45" strokeWidth="2" />
        <g className="ia-sway">
          <path className="ia-stroke-dark ia-fill-tint" d="M172 226 C160 158 200 110 268 104 C276 172 236 218 172 226 Z" />
          <path className="ia-stroke-brand" d="M172 226 C196 186 226 152 258 122" strokeWidth="2.5" />
        </g>
        <g className="ia-float">
          <path className="ia-stroke-brand" d="M84 132 c-3 -16 9 -27 25 -28 c1 16 -9 27 -25 28 z" strokeWidth="2.5" />
        </g>
        <g className="ia-float slow">
          <path className="ia-stroke-brand" d="M354 252 c-3 -16 9 -27 25 -28 c1 16 -9 27 -25 28 z" strokeWidth="2.5" />
        </g>
        <path className="ia-stroke-brand" d="M60 320 q80 -36 160 0" strokeWidth="2.5" opacity="0.35" />
        <path className="ia-stroke-brand" d="M220 320 q80 -30 160 0" strokeWidth="2.5" opacity="0.35" />
      </g>
    </svg>
  )
}
