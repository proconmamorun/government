import React, { useState }  from 'react';
import GoogleMapComponent from './component/GoogleMapComponent';
import RosterTable from "./component/RosterTable";
import './App.css';

import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';


const ColorToggleButton: React.FC<{ content: boolean, setContent: React.Dispatch<React.SetStateAction<boolean>> }> = ({ content, setContent }) => {
    const [alignment, setAlignment] = useState('map');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="map"
                        onClick={() => setContent(true)}
            >地図</ToggleButton>
            <ToggleButton value="names"
                        onClick={() => setContent(false)}
            >名簿</ToggleButton>
        </ToggleButtonGroup>
    );
};

const InputWithIcon: React.FC = () => {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                    人物を検索
                </InputLabel>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
};



const Map: React.FC = () => {
    return (
        <div>
            <div className={"container"}>
                <div className={"item"}>
                    <Stack spacing={2} direction="column">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#85d162',//ボタンの色
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#5f9948', // ホバー時の背景色
                                },
                            }}>
                            町民位置情報</Button>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#fa944b',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#cc793d', // ホバー時の背景色
                                },
                            }}>
                            危険度マップ</Button>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#fa4b4b',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#cc3d3d', // ホバー時の背景色
                                },
                            }}>救助隊位置情報</Button>
                    </Stack>
                </div>
                <div className={"item"}>
                    <GoogleMapComponent/>
                </div>
            </div>
        </div>
    );
}

const List: React.FC = () => {
    return (
        <div>
            <h1>表の例</h1>
            <InputWithIcon />
            <h3>並び替え</h3>
            <Button variant="outlined">五十音順</Button>
            <Button variant="outlined">年齢順</Button>
            <RosterTable />
        </div>
    );
}

    const App: React.FC = () => {
        const [content, setContent] = useState(true);

        return (
            <Paper　elevation={4}>
                <div className={"header"}>
                    <h1>市役所用動作UI</h1>
                    <ColorToggleButton content={content} setContent={setContent}/>
                </div>
                {content ? <Map/> : <List/>}
            </Paper>
        );
    };

export default App;