import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import ColorToggleButton from './component/ColorToggleButton';
import MainApp from './page/MainApp';
import ListApp from './page/ListApp';
import './App.css';

const App: React.FC = () => {
    const [content, setContent] = useState(true);

    return (
        <Paper elevation={4} sx={{ backgroundColor: 'transparent' }}>
            <div className="header">
                {/*<h1>役場用動作UI</h1>*/}
            </div>
            <ColorToggleButton content={content} setContent={setContent} />
            {content ? <MainApp /> : <ListApp />}
        </Paper>
    );
};

export default App;
