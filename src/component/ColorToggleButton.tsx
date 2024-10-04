import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ColorToggleButtonProps {
    content: number;
    setContent: React.Dispatch<React.SetStateAction<number>>;
}

const ColorToggleButton: React.FC<ColorToggleButtonProps> = ({ content, setContent }) => {
    const [alignment, setAlignment] = useState('map');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="map" className="mapbutton"
                onClick={() => setContent(0)}
            >地図</ToggleButton>
            <ToggleButton value="names" className="namesbutton"
                onClick={() => setContent(1)}
            >名簿</ToggleButton>
            <ToggleButton value="alert" className="alertbutton"
                onClick={() => setContent(2)}
            >危険設定</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ColorToggleButton;
