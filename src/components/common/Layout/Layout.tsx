import {AppBar, Box, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";

export const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(newValue);
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                            What to watch
                        </Link>
                    </Typography>
                    <Tabs
                        value={location.pathname}
                        onChange={handleTabChange}
                        textColor="inherit"
                    >
                        <Tab label="Movies to Watch" value="/main" />
                        <Tab label="Watched Movies" value="/watched" />
                        <Tab label="Configuration" value="/configuration"/>
                        <Tab label="Recommended Movies" value="/recommended"/>
                    </Tabs>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ marginTop: 8, padding: 2 }}>
                <Outlet/>
            </Box>
        </>
    );
};