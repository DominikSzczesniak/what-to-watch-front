import {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {UserApi} from "../../api/UserApi";

export const UserRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {  // todo
        const response = await UserApi.register({username, password});
    }

    const handleGoToLogin = () => navigate("/login");

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Paper elevation={3} sx={{padding: 4, width: 320, textAlign: "center"}}>
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />

                <Button variant="contained" color="primary" fullWidth sx={{mt: 2}} onClick={handleRegister}>
                    Register
                </Button>

                <Button fullWidth sx={{mt: 2}} onClick={handleGoToLogin}>
                    Already have an account? Login
                </Button>
            </Paper>
        </Box>
    );
};