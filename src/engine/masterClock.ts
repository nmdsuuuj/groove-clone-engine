/**
 * Master Clock Engine
 * 
 * 1/8 単位で時間を進める
 * BPM = 120 の場合：
 *   1小節 = 2000ms
 *   1beat（1/8） = 250ms
 */

export class MasterClockEngine {
  private bpm: number;
  private beatTimeMs: number = 0;  // 現在の時刻（ミリ秒）
  private isRunning: boolean = false;
  private startTime: number = 0;
  private pauseTime: number = 0;
  
  private rafId?: number;
  
  // コールバック
  private onBeatCallbacks: ((beatTime: number) => void)[] = [];
  private onBarStartCallbacks: ((barNumber: number) => void)[] = [];
  private lastBeatNotified: number = -1;
  
  timeSignature: { numerator: number; denominator: number } = { numerator: 4, denominator: 4 };
  
  constructor(bpm: number = 120) {
    this.bpm = bpm;
  }
  
  /**
   * 1小節の長さをミリ秒で取得
   */
  getBarDurationMs(): number {
    // 4拍子を仮定
    const quarter = (60 / this.bpm) * 1000;  // 4分音符の長さ
    return quarter * 4;  // 1小節
  }
  
  /**
   * 1beat（1/8）の長さをミリ秒で取得
   */
  getBeatDurationMs(): number {
    return this.getBarDurationMs() / 8;
  }
  
  /**
   * ミリ秒から 1/8 ビート単位に変換
   */
  msToBeatTime(ms: number): number {
    return ms / this.getBeatDurationMs();
  }
  
  /**
   * 1/8 ビート単位からミリ秒に変換
   */
  beatTimeToMs(beatTime: number): number {
    return beatTime * this.getBeatDurationMs();
  }
  
  /**
   * 次の 1/8 クオンタイズ境界を計算
   */
  getNextBeatBoundary(beatTime: number): number {
    return Math.ceil(beatTime * 8) / 8;
  }
  
  /**
   * 開始
   */
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = performance.now();
    this.update();
  }
  
  /**
   * 一時停止
   */
  pause(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.pauseTime = this.beatTimeMs;
    
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }
  }
  
  /**
   * 再開
   */
  resume(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = performance.now() - this.beatTimeToMs(this.pauseTime);
    this.update();
  }
  
  /**
   * 停止（リセット）
   */
  stop(): void {
    this.isRunning = false;
    this.beatTimeMs = 0;
    this.startTime = 0;
    this.pauseTime = 0;
    this.lastBeatNotified = -1;
    
    if (this.rafId !== undefined) {
      cancelAnimationFrame(this.rafId);
    }
  }
  
  /**
   * 現在のビート時刻（1/8単位）を取得
   */
  getBeatTime(): number {
    return this.beatTimeMs;
  }
  
  /**
   * BPMを変更
   */
  setBpm(bpm: number): void {
    this.bpm = bpm;
  }
  
  /**
   * ビート変更時のコールバック登録
   */
  onBeat(callback: (beatTime: number) => void): void {
    this.onBeatCallbacks.push(callback);
  }
  
  /**
   * 小節開始時のコールバック登録
   */
  onBarStart(callback: (barNumber: number) => void): void {
    this.onBarStartCallbacks.push(callback);
  }
  
  /**
   * 内部更新ループ
   */
  private update(): void {
    if (!this.isRunning) return;
    
    const now = performance.now();
    const elapsedMs = now - this.startTime;
    this.beatTimeMs = this.msToBeatTime(elapsedMs);
    
    // ビート通知（1/8単位で通知）
    const currentBeat = Math.floor(this.beatTimeMs * 8) / 8;
    if (currentBeat !== this.lastBeatNotified) {
      this.lastBeatNotified = currentBeat;
      this.onBeatCallbacks.forEach(cb => cb(this.beatTimeMs));
      
      // 小節開始時（8beat ごと）
      if (currentBeat % 8 === 0 && currentBeat !== 0) {
        const barNumber = Math.floor(currentBeat / 8);
        this.onBarStartCallbacks.forEach(cb => cb(barNumber));
      }
    }
    
    this.rafId = requestAnimationFrame(() => this.update());
  }
  
  /**
   * 拍子を変更
   */
  setTimeSignature(numerator: number, denominator: number): void {
    this.timeSignature = { numerator, denominator };
  }
}

/**
 * グローバルシングルトン
 */
let masterClockInstance: MasterClockEngine | null = null;

export function getMasterClock(): MasterClockEngine {
  if (!masterClockInstance) {
    masterClockInstance = new MasterClockEngine();
  }
  return masterClockInstance;
}
