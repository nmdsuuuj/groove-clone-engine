/**
 * Microbeat Timing Event
 * 非クオンタイズのシーケンスイベント
 */
export type MicroTimingEvent = {
  absoluteTime: number;      // ミリ秒（絶対時刻）
  frequency: number;          // Hz
  velocity: number;           // 0-127
  duration: number;           // ミリ秒
  spectralProfile?: number[]; // スペクトラム指紋
  confidence?: number;        // 検出信頼度 0-1
};

/**
 * Library Pattern（原本、不変）
 */
export type LibraryPattern = {
  id: string;
  name: string;
  originalSequence: MicroTimingEvent[];
  baselineBpm: number;
  duration: number;           // ミリ秒
  synthSnapshot?: SynthSnapshot;
};

/**
 * Synth Snapshot
 * ランチャー発火時に一度だけ適用
 */
export type SynthSnapshot = {
  osc1Freq: number;
  osc1Waveform: 'sine' | 'noise';
  osc2Freq: number;
  osc2Waveform: 'sine' | 'noise';
  filterCutoff: number;
  filterResonance: number;
  envelope: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  lfo1: LFOConfig;
  lfo2: LFOConfig;
};

export type LFOConfig = {
  freq: number;
  waveform: 'sine' | 'saw' | 'square';
  depth: number;           // 0-1
  target: 'osc1_pitch' | 'osc2_pitch' | 'filter' | 'amp';
};

/**
 * Launcher Pattern（32個スロット × 8バンク）
 */
export type LauncherPattern = {
  id: string;
  sourceLibraryId: string;
  
  logicalStructure: {
    sourcePatternLength: number;  // ミリ秒
    baselineBpm: number;
  };
  
  execution: {
    bpmOffset: number;  // マスタークロックからの相対値
    bpmAutomation: Array<{ beatTime: number; bpmOffset: number }>;
    manualTriggers: Array<{ beatTime: number; velocity: number }>;
  };
  
  synthSnapshot?: SynthSnapshot;
};

/**
 * Song Lane Event
 * ユーザーが叩いたランチャーの記録
 */
export type LauncherFireEvent = {
  beatTime: number;      // 1/8単位（例：3.2 = 小節の3.2/8）
  launcherId: string;
};

/**
 * Song Lane
 * マスタークロック軸での演奏記録
 */
export type SongLane = {
  id: string;
  
  masterBpm: number;
  timeSignature: { numerator: number; denominator: number }; // 拍子
  startBeatTime: number;
  endBeatTime: number;
  
  // ユーザーが叩いたランチャー
  launcherFireEvents: LauncherFireEvent[];
  
  // 結果として鳴ったシーケンス
  recordedSequence: {
    events: MicroTimingEvent[];
  };
};

/**
 * Song（最上位）
 * ランチャー32個 × 8バンク を管理
 */
export type Song = {
  id: string;
  name?: string;  // 保存時に指定
  
  masterBpm: number;
  timeSignature: { numerator: number; denominator: number };
  
  // 128個のランチャースロット（16 × 8）
  launchers: Map<string, LauncherPattern>;  // key = "launcher_0", "launcher_1", ...
  
  // 複数ソングレーン
  songLanes: SongLane[];
};

/**
 * Synth State
 * リアルタイムシンセのパラメーター
 */
export type SynthState = SynthSnapshot;

/**
 * Master Clock
 * 全体の時間基準
 */
export type MasterClock = {
  bpm: number;
  timeSignature: { numerator: number; denominator: number };
  beatTime: number;          // 現在の 1/8 単位での時刻
  isRunning: boolean;
  
  // コールバック
  onBeat?: (beatTime: number) => void;
  onBarStart?: (barNumber: number) => void;
};
