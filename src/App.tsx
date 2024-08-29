import React, { useState } from 'react';
//import Paper from '@mui/material/Paper';
import ColorToggleButton from './component/ColorToggleButton';
import MainApp from './page/MainApp';
import ListApp from './page/ListApp';
import './App.css';
import './index.css';


const App: React.FC = () => {
    const [content, setContent] = useState(true);

    return (
        <div>
        {/*<Paper elevation={4} sx={{ backgroundColor: 'transparent' }}>*/}
            <div className="header">
            </div>
            <ColorToggleButton content={content} setContent={setContent} />
            {content ? <MainApp /> : <ListApp />}
        {/*</Paper>*/}
        </div>
    );
};

export default App;
