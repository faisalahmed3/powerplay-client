import React from 'react';
import Lottie from 'lottie-react';
import runnerAnimation from '../../assets/runner.json';

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen ">
            <Lottie animationData={runnerAnimation} loop={true} style={{ height: 300, width: 300 }} />
        </div>
        </div>
    );
};

export default Loading;