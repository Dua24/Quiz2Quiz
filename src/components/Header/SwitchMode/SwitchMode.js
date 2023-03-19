import { useState } from 'react';
import Switch from '@mui/material/Switch';

export default (props) => {
    const { toggled } = props
    return (
        <Switch
            checked={toggled}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}