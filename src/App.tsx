import React, { useState, useEffect } from 'react';
import ColorToggleButton from './component/ColorToggleButton';
import MainApp from './page/MainApp';
import ListApp from './page/ListApp';
import SendAlert from "./page/SendAlert";
import './App.css';
import './index.css';


const App: React.FC = () => {
    const [content, setContent] = useState(0);

    useEffect(() => {
        if (content === 2) {
            handleSendAlert();
        }
    }, [content]);

    const handleSendAlert = () => {
        SendAlert("save", "send Alert!", "123");
    };

    return (
        <div>
            <div className="header">
            </div>
            <ColorToggleButton content={content} setContent={setContent} />
            {content === 0 && <MainApp />}
            {content === 1 && <ListApp />}
            {content === 2 && null}
        </div>
    );
};

export default App;
