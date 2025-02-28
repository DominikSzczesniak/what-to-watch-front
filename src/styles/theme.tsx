import {createTheme} from "@mui/material";

const primaryMainColor = '#5d1d1d';
const secondaryMainColor = '#952735';
const primaryTextColor = '#000000';
const secondaryTextColor = '#00000099';
const defaultBackgroundColor = '#ffffff';
const paperBackgroundColor = '#f8f8f8';

export const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: primaryMainColor,
        },
        secondary: {
            main: secondaryMainColor,
        },
        text: {
            primary: primaryTextColor,
            secondary: secondaryTextColor,
        },
        background: {
            default: defaultBackgroundColor,
            paper: paperBackgroundColor,
        },
    },
});