'use client'
import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid2, InputLabel, Select, Skeleton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Destination, Pages, QnA } from "../type";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "@mui/material";
import Cookies from "js-cookie";

import Axios_Open from "../lib/Axios_Open";
function RecommendationPage({ page, setPage, settargetPage, setSelected }: { page: Pages, setPage: (setPage: Pages) => void, settargetPage: (setPage: Pages) => void, setSelected: (setSelected: Destination[]) => void }) {
    const [selectedIsland, setSelectedIsland] = useState<Destination[]>([]);
    const [MAX_SELECTION] = useState<number>(5);
    const [recommendations, setRecommendations] = useState<Destination[]>([]);
    const [isFetch, setFetch] = useState<boolean>(false);
    const hasFetched = useRef(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSelect = (destination: Destination) => {
        // console.log("clicked");

        setSelectedIsland((prev) => {
            const isAlreadySelected = prev.some((item) => item.id === destination.id); // Check by ID

            if (isAlreadySelected) {
                return prev.filter((item) => item.id !== destination.id); // Remove if already selected
            } else if (prev.length < MAX_SELECTION) {
                return [...prev, destination]; // Add if within limit
            }

            return prev; // Prevent selection beyond max limit
        });
    };

    const onClickSave = () => {
        setPage('Loading');
        settargetPage('Save');
        setSelected(selectedIsland);
        
    }
    const theme = useTheme(); // ✅ Use the theme provided by RootLayout


    const fetchRecommendations = useCallback(async () => {
        const sessionId = Cookies.get("session_id");
        setLoading(true);

        if (!sessionId) {
            // console.error("No session ID found");
            return;
        }

        try {

            // console.log("Fetching Recommendation");
            const response = await Axios_Open.get<Destination[]>(`/api/recommendations/${sessionId}`);
            setRecommendations(response.data);
            setFetch(false);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    }, []);

    // useEffect(() => {
    //     if (selectedIsland.length > 0) {
    //         console.log(selectedIsland);
    //     }
    // }, [selectedIsland]);
    // useEffect(() => {
    //     if (recommendations.length > 0) {
    //         console.log(recommendations);
    //     }
    // }, [recommendations]);
    useEffect(() => {
        if (!isFetch && !hasFetched.current) {
            hasFetched.current = true;
            fetchRecommendations();
        }
    }, [isFetch]);
    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>

            <Box
                sx={{
                    width: '75%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    pb: 2,
                    mt: 4,
                    transform: "translate(-50%, -50%)", // Centers element properly
                    textAlign: "center", // Centers text inside the element

                    borderRadius: 10,
                    bgcolor: theme.palette.white.main,
                }}
            >
                <Typography variant="h4" sx={{
                    fontWeight: 'bold', mt: 4,
                    color: theme.palette.black.main,
                }}>
                    Discover and Explore Your Favorite Destinations
                </Typography>
                <Typography sx={{
                    mt: 1,
                    color: theme.palette.black.main,
                }}>
                    Choose at least 5 destinations and click save to create your island
                </Typography>
                <Box sx={{
                    width: '90%', mx: 'auto', mt: 5
                }}>
                    <Grid2 container spacing={1} >
                        {isLoading ?
                            <Box sx={{ width: '100%' }}>

                                <Grid2 container spacing={1} >
                                    <Grid2 size={3}>
                                        <Skeleton animation="wave" sx={{
                                            width: '100%',
                                            height: "180px",
                                        }}></Skeleton>
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <Skeleton animation="wave" sx={{
                                            width: '100%',
                                            height: "180px",
                                        }}></Skeleton>
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <Skeleton animation="wave" sx={{
                                            width: '100%',
                                            height: "180px",
                                        }}></Skeleton>
                                    </Grid2>
                                    <Grid2 size={3}>
                                        <Skeleton animation="wave" sx={{
                                            width: '100%',
                                            height: "180px",
                                        }}></Skeleton>
                                    </Grid2>
                                </Grid2>
                            </Box>
                            :
                            ''
                        }
                        {recommendations.map((destination, index) => (
                            <Grid2 key={index} size={2.4} >
                                <Box
                                    sx={{
                                        position: "relative",
                                        textAlign: "center",
                                        borderRadius: 5,
                                        transition: 'all 0.2s ease-in-out',
                                        border: selectedIsland.includes(destination) ? "2px solid #1976d2" : "2px solid transparent",
                                        "&:hover": {
                                            border: "2px solid #1976d2",
                                        },
                                        boxShadow: '0 0 5px -1px black'
                                    }}

                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleSelect(destination)
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundImage: `url('${destination.thumbnail}')`,
                                            backgroundPosition: 'center',
                                            backgroundSize: '100% auto',
                                            width: "100%",
                                            height: "120px",
                                            borderRadius: 5,
                                            transition: 'all 0.2s ease-in-out',
                                            objectFit: "cover",
                                            opacity: selectedIsland.includes(destination) ? 0.6 : 1,
                                        }}
                                    >
                                    </Box>
                                    <Checkbox
                                        checked={selectedIsland.includes(destination)}
                                        onClick={(event) => event.stopPropagation()}
                                        onChange={(event) => {
                                            handleSelect(destination)
                                        }}
                                        sx={{ position: "absolute", top: 8, left: 8, color: theme.palette.white_text.main }}
                                        disabled={!selectedIsland.includes(destination) && selectedIsland.length >= MAX_SELECTION}
                                    />
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '40%',
                                            borderBottomLeftRadius: 18,
                                            borderBottomRightRadius: 18,
                                            position: "absolute", bottom: 0, left: '50%', transform: 'translate(-50%, 0%)',
                                            color: theme.palette.black.main,
                                            backgroundImage: "linear-gradient(to top, " + theme.palette.gradient_b.main + "," + theme.palette.gradient_t.main + ")",
                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                width: '100%',
                                                position: "absolute",
                                                bottom: 4,
                                                color: theme.palette.black.main,
                                            }}
                                        >{destination.name}</Typography>
                                    </Box>
                                </Box>
                            </Grid2>
                        ))}
                    </Grid2>
                    <Button
                        onClick={onClickSave}
                        disabled={selectedIsland.length==0}
                        sx={{
                            bgcolor: selectedIsland.length==0?theme.palette.action.disabled:theme.palette.button1.main,
                            color: theme.palette.white_text.main,
                            borderRadius: 10,
                            minWidth: 200,
                            mt: 2
                        }}
                    >Save</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default RecommendationPage;