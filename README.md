# Groove Clone Engine

Microbeat-precision sequencer & groove analyzer for live performance.

## Phase 1: Foundation (Current)

### Features
- **Master Clock**: 1/8 beat quantization (BPM-driven)
- **Launcher Grid**: 4×4 pads × 8 banks (128 total slots)
- **Play/Stop Control**: Basic transport controls
- **BPM Adjustment**: Real-time BPM control

### Architecture
```
Master Clock Engine
  ├─ 1/8 beat resolution
  ├─ BPM management
  └─ Beat notifications

UI Components
  ├─ Master Clock Display
  ├─ Launcher Grid (4×4 × 8 banks)
  └─ Web Audio Integration (coming soon)
```

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
cd groove-clone-engine
npm install
npm run dev
```

Open http://localhost:3000 in browser (or OPPO Find X8 on same network).

### Build for Production

```bash
npm run build
```

## Next Phases

### Phase 2: Audio Capture & Onset Detection
- Microphone input via Web Audio API
- Energy-based onset detection
- Spectral analysis (STFT)

### Phase 3: Sequence Playback
- Play captured patterns
- BPM offset system
- LOOP mechanism

### Phase 4: Semi-modular Synth
- Tone.js-based oscillators
- LFO modulation (2 × LFO)
- Preset system

### Phase 5: Song Lane Recording
- Timeline record/playback
- Launcher fire event logging
- Snapshot-based synth state saving

### Phase 6: Piano Roll Editing
- Non-quantized display
- Snap grid (1/8, 1/14, 1/20 divisions)
- Event-based editing

## Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Audio**: Web Audio API + Tone.js
- **PWA**: vite-plugin-pwa (offline support)
- **Styling**: CSS3 (no framework, mobile-first)

## Design Philosophy

"すべての音楽理論はルールのふりをした方便に過ぎない"

This app breaks traditional music theory constraints:
- 1/8 beat resolution allows breaking measure boundaries
- Non-quantized sequencing captures microtiming nuance
- Free launcher triggering creates emergent rhythm
