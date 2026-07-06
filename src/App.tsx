import { useEffect, useState } from 'react';
import { getMasterClock } from './engine/masterClock';
import { MasterClockDisplay } from './components/MasterClockDisplay';
import { LauncherGrid } from './components/LauncherGrid';
import './App.css';

export function App() {
  const masterClock = getMasterClock();
  const [isRunning, setIsRunning] = useState(false);
  const [beatTime, setBeatTime] = useState(0);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    const handleBeat = (bt: number) => {
      setBeatTime(bt);
    };

    masterClock.onBeat(handleBeat);

    return () => {
      // Clean up
    };
  }, [masterClock]);

  const handleStart = () => {
    if (!isRunning) {
      masterClock.setBpm(bpm);
      masterClock.start();
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    masterClock.stop();
    setIsRunning(false);
    setBeatTime(0);
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    masterClock.setBpm(newBpm);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Groove Clone Engine</h1>
      </header>

      <main className="app-main">
        {/* Master Clock Display */}
        <MasterClockDisplay
          beatTime={beatTime}
          bpm={bpm}
          isRunning={isRunning}
          onBpmChange={handleBpmChange}
          onStart={handleStart}
          onStop={handleStop}
        />

        {/* Launcher Grid (4×4 × 8 Banks) */}
        <LauncherGrid />
      </main>

      <footer className="app-footer">
        <p>tap pad or press keyboard to launch patterns</p>
      </footer>
    </div>
  );
}
