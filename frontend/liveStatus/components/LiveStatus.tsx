import React from "react";
import { useLiveStatus } from '../useLiveStatus'
import LiveStatusPanel from './LiveStatusPanel'

const LiveStatus: React.FC = () => {
    const {
        liveStatusData,
        initialLoading,
        error,
        lastSync
    } = useLiveStatus();

    return (
        <div className="LiveStatusList">
            <h1>Status Maszyn</h1>
            <div className="LiveStatusGrid">
                {liveStatusData.map((panel) => (
                    <LiveStatusPanel panelData={panel} />
                ))}
            </div>
        </div>
    )
}

export default LiveStatus;

