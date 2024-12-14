import React from "react";
import './ProgressBar.css';

interface ProgressBarProps {
    progress: number; // Expecting a number between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    // Ensure progress is within the range of 0 to 100
    const clampedProgress = Math.min(100, Math.max(0, progress));

    // Dynamic class based on progress
    const progressClass = clampedProgress === 100 ? 'progress-complete' : '';

    return (
        <div className="progress-bar-container" role="progressbar" aria-valuenow={clampedProgress} aria-valuemin={0} aria-valuemax={100}>
            <div 
                className={`progress-bar ${progressClass}`} 
                style={{ width: `${clampedProgress}%` }}>
            </div>
        </div>
    );
};

export default ProgressBar;
