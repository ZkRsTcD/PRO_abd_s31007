import React from "react";
import { useLiveStatus } from '../useLiveStatus'
//import

const LiveStatus: React.FC = () => {
    const {
        liveStatusData,
        initialLoading,
        error
    } = useLiveStatus();

    return (
        <div className="LiveStatusList">

        </div>
    )
}

export default LiveStatus;

