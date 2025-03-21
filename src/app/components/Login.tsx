'use client'
import Axios_Open from "../lib/Axios_Open";
import { Alert, Box, Button,  Slide, SlideProps, Snackbar,   TextField, Typography } from "@mui/material";
import { Serverinty } from "../type";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
interface ErrorResponse {
    message?: string; // Message may or may not exist
}

export default function Login({  setLogin, setSignin }: {   setLogin: (val: boolean) => void, setSignin: (val: boolean) => void }) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const theme = useTheme(); // ✅ Use the theme provided by RootLayout
    const router = useRouter();
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault(); // ⛔ Prevents page refresh


        const allCookies = Cookies.get();
        try {
            const response = await Axios_Open.post("/api/www/login", {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true, // Maintain session using cookies
            });

            if (response.data.user) {
                setOpen(true);
                setMSG_res("Login successful!");
                setResultType('success');
                router.push('/dashboard');
                // Redirect to login or dashboard here
            } else {
                setOpen(true);
                setMSG_res("Invalid Credentials");
                setResultType('error');
            }

        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>; // 👈 Cast error with our type

            setOpen(true);
            setResultType('error');
            if (axiosError.response) {
                setMSG_res(axiosError.response.data.message || "Something went wrong!");
            } else {
                setMSG_res("Network error or server not responding.");
            }

            console.error("Error registering:", error);
        }
    };
    const [open, setOpen] = useState<boolean>(false);
    const [msgRes, setMSG_res] = useState<string>('');
    const [resultType, setResultType] = useState<Serverinty>('info');



    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                slots={{ transition: SlideTransition }}
            >
                <Alert
                    onClose={handleClose}
                    severity={resultType}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msgRes}
                </Alert>
            </Snackbar>
            <Box
                component={"div"}
                onClick={(event) => { event.stopPropagation(); setLogin(false) }}
                sx={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}>

                <Box
                    component={"form"}
                    onSubmit={handleRegister}
                    onClick={(event) => { event.stopPropagation(); setLogin(true) }}
                    sx={{
                        position: 'fixed',
                        width: '30%',
                        left: "50%",
                        top: "50%",
                        minWidth: 400,
                        transform: 'translate(-50%,-50%)',
                        borderRadius: 5,
                        boxShadow: '0 0 15px 1px rgba(255, 255, 255, 0.53)',
                        bgcolor: theme.palette.white.main,
                    }}>
                    <Typography variant="h5"
                        sx={{
                            width: '100%',
                            color: theme.palette.black.main,
                            fontWeight: 'bolder',
                            textAlign: 'left',
                            pt: 5,
                            pl: 5
                        }}
                    >
                        Login
                    </Typography>

                    {/* <Typography
                        sx={{
                            width: '100%',
                            color: theme.palette.black.main,
                            textAlign: 'left',
                            pt: 1,
                            pl: 5,
                            fontSize: 'small'
                        }}
                    >
                        Ready to Start Your Journey?
                    </Typography> */}
                    <Box
                        sx={{
                            width: '100%',
                            color: theme.palette.black.main,
                            textAlign: 'left',
                            fontWeight: 'bolder',
                            pt: 3,
                            px: 5
                        }}>
                        <Typography
                            sx={{
                                width: '100%',
                                color: theme.palette.black.main,
                                textAlign: 'left',
                                fontWeight: 'bolder',
                                mt: 1
                            }}
                        >
                            Email
                        </Typography>
                        <TextField id="Email" label="Email" variant="outlined" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />

                        <Typography
                            sx={{
                                width: '100%',
                                color: theme.palette.black.main,
                                textAlign: 'left',
                                fontWeight: 'bolder',
                                mt: 1
                            }}
                        >
                            Password
                        </Typography>
                        <TextField id="Password" label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                        <Button variant="contained" fullWidth
                            type="submit"
                            disabled={!password || !email}
                            sx={{
                                borderRadius: 10,
                                backgroundColor: theme.palette.button1.main,
                                mt: 4,
                            }}>Signin</Button>
                        <Box sx={{
                            display: 'flex', // Use flexbox for proper centering
                            alignItems: 'center',
                            justifyContent: 'center', // Centers content horizontally
                            mb: 3,
                            width: 'auto',
                            mx: 'auto', // Centers the box itself if inside a flex parent 
                            padding: 1, // Optional: Adds some padding for spacing 
                        }}>
                            <Typography sx={{ fontSize: 'small' }}>Don’t have an account?</Typography>
                            <Button variant="text" sx={{ fontSize: 'small', }} onClick={(event) => { event.stopPropagation(); setSignin(true); setLogin(false); }}>Signup</Button>
                        </Box>

                    </Box>
                </Box>
            </Box>
        </>

    );
} function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}