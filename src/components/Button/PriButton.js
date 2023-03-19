import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue, common } from '@mui/material/colors';
export default (props) => {

    const ColorButton = styled(Button)(({ theme }) => {
        const options = {
            bgColor: null,
            text: props.text,
            color: null,
            border: null,
            hover: null
        }
        if (props.type === "pri") {
            options.bgColor = blue
            options.color = "#fff"
        } else {
            options.bgColor = common
            options.color = blue[700]
            options.border = `1px solid ${blue[700]}`
            options.hover = blue[50]
        }
        return (({
            borderRadius: '100px',
            padding: '4px 24px',
            border: options.border,
            fontWeight: 600,
            color: options.color || options.color,
            backgroundColor: options.bgColor['white'] || options.bgColor['600'],
            '&:hover': {
                backgroundColor: options.hover || blue[500]
            },
        }))
    });
    return (
        <ColorButton variant="contained">
            {props.icons && <span style={{ marginRight: '8px' }}>{props.icons}</span>}
            {props.text}
        </ColorButton>
    );
}