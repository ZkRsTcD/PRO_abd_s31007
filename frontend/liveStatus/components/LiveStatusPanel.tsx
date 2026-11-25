import React from "react";
import type { LiveStatusPanelData } from '../typesLiveStatus';

interface LiveStatusPanelProps {
    panelData: LiveStatusPanelData;
}

const LiveStatusPanel: React.FC<LiveStatusPanelProps> = ({
    panelData,
}) => {
    return (
        <div className="LiveStatusPanel">
            <div className="MachineLabel">
                <strong>{panelData.machine_code}</strong>
            </div>
            <div className="NotificationTopPanel">
                
            </div>
        </div>
    )
}

export default LiveStatusPanel;

