import {AppBar, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const Layout = () => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        What to watch
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};