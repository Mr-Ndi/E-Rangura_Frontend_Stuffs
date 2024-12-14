import React from "react";
import './ProgressBar.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {

    const clampedProgress = Math.min(100, Math.max(0, progress));


    const progressClass = clampedProgress === 100 ? 'progress-complete' : '';

    return (
        <div className="byose">
            <p>Fetching from our database ...</p>
            <div className="progress-bar-container" role="progressbar" aria-valuenow={clampedProgress} aria-valuemin={0} aria-valuemax={100}>
                <div 
                    className={`progress-bar ${progressClass}`} 
                    style={{ width: `${clampedProgress}%` }}>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
