'use client'
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Pages } from "../type";

function LandingPage({ page, setPage }: { page: Pages, setPage: (setPage: Pages) => void }) {

    const theme = useTheme(); // ✅ Use the theme provided by RootLayout
    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>
            <Box sx={{
                width: '50%',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: "translate(-50%, -50%)", // Centers element properly
                textAlign: "center", // Centers text inside the element

            }}>

                <Typography color="white" fontWeight={'bolder'} sx={{
                    fontSize: '4vw',
                }} >
                    Unleash Your Perfect Island Getaway
                </Typography>
                <Typography color="white" sx={{
                    width: '50%',
                    mx: 'auto'
                }}>
                    Design a personalized island escape tailored to your dreams - from hidden gems to iconic landmarks.
                </Typography>
                <Button variant="contained" sx={{
                    borderRadius: 10,
                    bgcolor: theme.palette.white.main,
                    color: theme.palette.black.main,
                }}
                onClick={()=>setPage("Question")}
                >
                    Plan Your Adventure
                </Button>
            </Box>
        </Box>
    );
}
export default LandingPage;
