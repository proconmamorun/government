import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ColorToggleButtonProps {
    content: boolean;
    setContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColorToggleButton: React.FC<ColorToggleButtonProps> = ({ content, setContent }) => {
    const [alignment, setAlignment] = useState('map');

    const handleChange1 = (
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
            onChange={handleChange1}
            aria-label="Platform"
        >
            <ToggleButton value="map" onClick={() => setContent(true)}>地図</ToggleButton>
            <ToggleButton value="names" onClick={() => setContent(false)}>名簿</ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ColorToggleButton;
