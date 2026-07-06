import { useState } from 'react';
import './LauncherGrid.css';

export function LauncherGrid() {
  const [currentBank, setCurrentBank] = useState(0);
  const totalBanks = 8;
  
  const launchersPerBank = 16;  // 4×4
  
  const getLauncherId = (slotIndex: number): string => {
    return `launcher_${currentBank * launchersPerBank + slotIndex}`;
  };

  const handlePrevBank = () => {
    setCurrentBank((prev) => (prev > 0 ? prev - 1 : totalBanks - 1));
  };

  const handleNextBank = () => {
    setCurrentBank((prev) => (prev < totalBanks - 1 ? prev + 1 : 0));
  };

  const handleLauncherClick = (slotIndex: number) => {
    const launcherId = getLauncherId(slotIndex);
    console.log('Launch:', launcherId);
    // TODO: 実装
  };

  return (
    <div className="launcher-grid-container">
      <div className="launcher-bank-header">
        <button className="bank-btn" onClick={handlePrevBank}>
          ◀
        </button>
        <span className="bank-indicator">
          BANK {currentBank + 1} / {totalBanks}
        </span>
        <button className="bank-btn" onClick={handleNextBank}>
          ▶
        </button>
      </div>

      <div className="launcher-grid">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => {
            const slotIndex = row * 4 + col;
            const launcherId = getLauncherId(slotIndex);
            
            return (
              <button
                key={slotIndex}
                className="launcher-pad"
                onClick={() => handleLauncherClick(slotIndex)}
              >
                <span className="launcher-id">{slotIndex}</span>
              </button>
            );
          })
        )}
      </div>

      <div className="launcher-info">
        <p>Tap pads to launch patterns</p>
      </div>
    </div>
  );
}
