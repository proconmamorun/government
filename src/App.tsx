import React, { useState, useEffect } from 'react';
import ColorToggleButton from './component/ColorToggleButton';
import MainApp from './page/MainApp';
import ListApp from './page/ListApp';
import SharePhoto from './page/sharephoto';
import './App.css';
import './index.css';


const App: React.FC = () => {
    const [content, setContent] = useState(0);

    return (
        <div>
            <div className="header">
            </div>
            <ColorToggleButton content={content} setContent={setContent} />
            {content === 0 && <MainApp />}
            {content === 1 && <ListApp />}
            {content === 2 && <SharePhoto/>}
        </div>
    );
};

export default App;
