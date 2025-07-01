import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../../../AppContext';

export const Layout = () => {
  const { userId, setUserId } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const tabPaths = ["/main", "/watched", "/configuration", "/recommended"];
  const currentTab = tabPaths.includes(location.pathname) ? location.pathname : false;

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleLogout = () => {
    setUserId("");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              What to watch
            </Link>
          </Typography>
          {userId && (
            <>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                textColor="inherit"
              >
                <Tab label="Movies to Watch" value="/main"/>
                <Tab label="Watched Movies" value="/watched"/>
                <Tab label="Configuration" value="/configuration"/>
                <Tab label="Recommended Movies" value="/recommended"/>
              </Tabs>

              <Button
                color="error"
                variant="outlined"
                onClick={handleLogout}
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ marginTop: 8, padding: 2 }}>
        <Outlet/>
      </Box>
    </>
  );
};