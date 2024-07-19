import React, { useState }  from 'react';
import GoogleMapComponent from './component/GoogleMapComponent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';


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

type TableProps = {
    columns: string[];
    data: { [key: string]: string | number }[];
};
const DataTable: React.FC<TableProps> = ({ columns, data }) => {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>{row[column]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
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


    const App: React.FC = () => {
        const columns = ['名前', '年齢', '職業'];
        const data = [
            { name: '山田 太郎', age: 30, job: 'エンジニア' },
            { name: '佐藤 花子', age: 25, job: 'デザイナー' },
            { name: '鈴木 一郎', age: 35, job: 'マネージャー' }
        ];

        const [content, setContent] = useState(true);

        return (
            <div>
                <h1>市役所用動作UI</h1>
                <ColorToggleButton content={content} setContent={setContent} />
                {content ?
                    <div>
                        <GoogleMapComponent/>
                        <Button variant="outlined">町民位置情報</Button>
                        <Button variant="outlined">危険度マップ</Button>
                        <Button variant="outlined">救助隊位置情報</Button>
                    </div>:
                    <div className={"list"}><
                        h1>表の例</h1>
                        <InputWithIcon />
                        <h3>並び替え</h3>
                        <Button variant="outlined">五十音順</Button>
                        <Button variant="outlined">年齢順</Button>
                        <DataTable columns={columns} data={data}/>
                    </div>
                }

            </div>
        );
    };

export default App;