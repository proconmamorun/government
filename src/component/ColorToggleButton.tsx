import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ColorToggleButtonProps {
    content: boolean;
    setContent: React.Dispatch<React.SetStateAction<boolean>>;
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
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
        >
            <ToggleButton value="map" className="mapbutton"
                onClick={() => setContent(true)}
            >地図</ToggleButton>
            <ToggleButton value="names" className="namesbutton"
                onClick={() => setContent(false)}
            >名簿</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ColorToggleButton;
