import * as React from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import { BiChevronDown } from 'react-icons/bi'
import Accordion from 'react-bootstrap/Accordion';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
const SubPosts = () => {
    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));


    const data = [
        {
            title: 'Popular Communities',
            detail: ['AskReddit', 'NoStupidQuestions', 'DestinyTheGame', 'explainlikeimfive', 'AskMen', 'leagueoflegends', 'Minecraft']
        },
        {
            title: 'Gaming',
            detail: ['AskReddit', 'NoStupidQuestions', 'DestinyTheGame', 'explainlikeimfive', 'AskMen', 'leagueoflegends', 'Minecraft']
        },
        {
            title: 'Sports',
            detail: ['AskReddit', 'NoStupidQuestions', 'DestinyTheGame', 'explainlikeimfive', 'AskMen', 'leagueoflegends', 'Minecraft']
        },
        {
            title: 'TV',
            detail: ['AskReddit', 'NoStupidQuestions', 'DestinyTheGame', 'explainlikeimfive', 'AskMen', 'leagueoflegends', 'Minecraft']
        },
    ]

    return (
        <>
            {data.map((item, i) => {
                return (
                    <Accordion key={i} className="accor_container">
                        <AccordionSummary className="accor_summary" aria-controls={`panel${i}d-content`} id={`panel${i}d-header`}>
                            <Typography className="accor_title">{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="accor_detail">
                            {item.detail && item.detail.length > 0 && item.detail.map((detail, indexDetail) => {
                                return (
                                    <Typography key={indexDetail}>
                                        <a className="detail_item">{detail}</a>
                                    </Typography>
                                )
                            })}
                            {/* <span>See more</span> */}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </>

    )
}


export default SubPosts