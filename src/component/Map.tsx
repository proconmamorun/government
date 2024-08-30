{/*import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GoogleMapComponent from './GoogleMapComponent';
import DangerousAcquisition from './DangerousAcquisition';

type Position = {
    id: string;
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
};

interface Figure {
    latitude: number;
    longitude: number;
    dangerlevel: number;
    dangerkinds: number;
}

interface MapProps {
    figure: Figure;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, field: keyof Figure) => void;
    handleAdd: () => void;
    handleDelete: (id: string) => void;
    positions: Position[];
}

const Map: React.FC<MapProps> = ({ figure, handleInputChange, handleAdd, handleDelete, positions }) => {
    return (
        <div>
            <div className="container">
                <div className="item">
                    <Stack spacing={2} direction="column">
                        <Button variant="contained" size="large" className="map-button">町民位置情報</Button>
                        <Button variant="contained" size="large" className="danger-map-button">危険箇所情報</Button>
                        <Button variant="contained" size="large" className="rescue-team-button"></Button>
                    </Stack>
                </div>
                <div className="item">
                    {/*<GoogleMapComponent />
                </div>
            </div>
            <div>
                <h2>位置</h2>
                <div>
                {/*<label>
                        経度: {" "}
                        <input
                            type="number"
                            value={figure.longitude}
                            onChange={(event) => handleInputChange(event, 'longitude')}
                        />
                    </label>
                    <label>
                        緯度:{" "}
                        <input
                            type="number"
                            value={figure.latitude}
                            onChange={(event) => handleInputChange(event, 'latitude')}
                        />
    </label>
                    <label>
                        危険度: {" "}
                        <input
                            type="number"
                            value={figure.dangerlevel}
                            onChange={(event) => handleInputChange(event, 'dangerlevel')}
                        />
                    </label>
                    <label>
                        危険の種類: {" "}
                        <input
                            type="number"
                            value={figure.dangerkinds}
                            onChange={(event) => handleInputChange(event, 'dangerkinds')}
                        />
                    </label>
                    <button onClick={() => handleAdd()}>追加</button>
                </div>

                <table>
                    <tbody>
                        {positions.map((position) => (
                            <tr key={position.id}>
                                <td>{position.longitude}</td>
                                <td>{position.latitude}</td>
                                <td>{position.dangerlevel}</td>
                                <td>{position.dangerkinds}</td>
                                <td>
                                    <button onClick={() => handleDelete(position.id)}>削除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DangerousAcquisition />
            </div>
        </div>
    );
};

export default Map;*/}

export {};