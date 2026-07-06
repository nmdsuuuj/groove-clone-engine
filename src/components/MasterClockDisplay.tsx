import './MasterClockDisplay.css';

interface MasterClockDisplayProps {
  beatTime: number;
  bpm: number;
  isRunning: boolean;
  onBpmChange: (bpm: number) => void;
  onStart: () => void;
  onStop: () => void;
}

export function MasterClockDisplay({
  beatTime,
  bpm,
  isRunning,
  onBpmChange,
  onStart,
  onStop
}: MasterClockDisplayProps) {
  // ビート時刻を「小節 / 1/8」表記に変換
  const barNumber = Math.floor(beatTime / 8);
  const beatInBar = beatTime % 8;
  const beatDisplay = beatInBar.toFixed(1);

  const handleBpmInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) {
      onBpmChange(val);
    }
  };

  return (
    <div className="master-clock-display">
      <div className="clock-main">
        <div className="clock-bar-number">
          Bar: <span>{barNumber}</span>
        </div>
        <div className="clock-beat-time">
          <span>{beatDisplay}</span>
          <small>/8</small>
        </div>
      </div>

      <div className="clock-controls">
        <div className="bpm-control">
          <label>BPM</label>
          <input
            type="number"
            value={bpm}
            onChange={handleBpmInput}
            disabled={isRunning}
            min="40"
            max="240"
          />
        </div>

        <div className="play-control">
          {!isRunning ? (
            <button className="btn btn-play" onClick={onStart}>
              ▶ PLAY
            </button>
          ) : (
            <button className="btn btn-stop" onClick={onStop}>
              ⏹ STOP
            </button>
          )}
        </div>
      </div>

      <div className="clock-status">
        {isRunning ? (
          <span className="status-running">● RUNNING</span>
        ) : (
          <span className="status-stopped">○ STOPPED</span>
        )}
      </div>
    </div>
  );
}
