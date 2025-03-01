import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../AppContext";
import {useNavigate} from "react-router-dom";
import {UserApi} from "../../api/UserApi";
import {User} from "../../model/User";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";

export const UserLogin = () => {
    const {setUserId} = useContext(UserContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<User>({username: "", password: ""});

    useEffect(() => {
        console.log("in user");
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        const userData = await UserApi.login(credentials)
            .catch((error: Error) => {
                console.log(error);
            })
        if (userData) {
            setUserId(userData);
            navigate("/main");
        }
    }

    const handleGoToRegister = () => navigate("/register");
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{padding: 4, width: 320, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
                <Button fullWidth sx={{mt: 2}} onClick={handleGoToRegister}>
                    Don't have an account? Register
                </Button>
            </Paper>
        </Box>
    );
}