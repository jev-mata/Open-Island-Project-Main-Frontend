'use client'
import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Pages, QnA } from "../type";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Axios_Open from "../lib/Axios_Open";
import { getCsrfToken } from "../fetch/api_fetch";

function QuestionPage({ setPage, settargetPage }: { setPage: (setPage: Pages) => void, settargetPage: (setPage: Pages) => void }) {
    const [questions, setQuestions] = useState<QnA[]>([
        {
            question: 'What activities make your vacation unforgettable?',
            option: [
                "Adventure: hiking, water sports, zip-lining...",
                "Relaxation:  spa days, beach lounging, picnics...",
                "Cultural Exploration:  museum visits, historic tours, local cuisine tasting...",
                "Nature & Wildlife: birdwatching, safaris, nature trails..."
            ],
            selected: -1
        },
        {
            question: 'Where do you picture yourself staying?',
            option: [
                "Luxury Resort: All-inclusive, with premium...",
                "Budget-friendly Lodge: Sustainable, in harmony with nature",
                "Beachfront Villa: Direct access to the beach and ocean views",
                "Option: 4"
            ],
            selected: -1
        },
        {
            question: 'What unique experiences are on your travel bucket list?',
            option: [
                "Local Festivities: Participating in cultural festivals or parade...",
                "Wildlife Encounters:  Diving with marine life or jungle safaris...",
                "Foodie Adventure: Cooking classes or local food tours",
                "Hidden Gems: Exploring secret beaches or lesser- known landmarks"
            ],
            selected: -1
        },
    ]);

    const [selectedQuestions, setselectedQuestions] = useState<boolean>(false);
    useEffect(() => {
        if (!selectedQuestions) {
            setselectedQuestions(true);
            const savedSelections = Cookies.get("selectedQuestions");
            if (savedSelections) {
                setQuestions((prev) =>
                    prev.map((q, i) => ({
                        ...q,
                        selected: JSON.parse(savedSelections)[i] ?? -1, // Load saved selection
                    }))
                );
            }
        }
    }, [selectedQuestions]);
    const [Q_no, setQ_no] = useState<number>(0);
    const handleChange = (index: number) => {

        // Update the specific question's selected field
        setQuestions((prevQuestions) =>

            prevQuestions.map((q, i) => (i === Q_no ? { ...q, selected: index } : q))
        );
        setTimeout(() => {
            if (questions.length - 1 > Q_no) {
                setQ_no(Q_no + 1);
            } else {
                setPage('Loading');
                settargetPage('Recommendation');
            }
        }, 1000);
        Cookies.set(
            "selectedQuestions",
            JSON.stringify(
                questions.map((q, i) => (i === Q_no ? index : q.selected))
            ),
            { expires: 7 } // Cookie expires in 7 days
        );
        saveSession();
    };
    const getSessionId = () => {
        let sessionId = Cookies.get("session_id");
        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(2) + Date.now();
            Cookies.set("session_id", sessionId, { expires: 7 }); // Expires in 7 days
        }
        return sessionId;
    };
    const saveSession = async () => {
        await getCsrfToken();
        const sessionId = getSessionId();

        // Convert questions into required format
        const formattedData = {
            session_id: sessionId,
            question: questions.map(q => q.question),
            answer: questions.map(q => q.selected !== -1 ? q.option[q.selected] : ""),
        };
        const allCookies = Cookies.get();
        try {
            await Axios_Open.post("/api/save-session", formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                        'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    },
                    withCredentials: true, // Maintain session using cookies
                });
            // console.log("Session saved:", response.data);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    };

    // useEffect(() => {
    //     if (questions.length > 0) {
    //         console.log(questions);

    //     }
    // }, [questions]);
    const theme = useTheme(); // ✅ Use the theme provided by RootLayout

    const [onHover, setHover] = useState<number>(-1);
    return (
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>
            <Card sx={{
                width: '30%',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: "translate(-50%, -50%)", // Centers element properly
                textAlign: "center", // Centers text inside the element

                borderRadius: 10,
                bgcolor: theme.palette.white.main,
            }}>
                <CardHeader sx={{ mt: 2, mb: 0, pb: 0 }} title=
                    {(Q_no + 1) + ". " + questions[Q_no].question + " "}>

                </CardHeader>
                <CardContent>
                    {questions[Q_no].option.map((option, index) => {
                        const opt = option.split(":");

                        const isSelected = questions[Q_no].selected === index;
                        const isAnySelected = questions[Q_no].selected !== -1;
                        const isHovered = onHover === index;
                        return (
                            <Button variant={isSelected || isHovered ? "contained" : "outlined"} fullWidth key={index}
                                onMouseEnter={() => { if (isAnySelected) setHover(index) }}
                                onMouseLeave={() => { if (isAnySelected) setHover(-1) }}
                                onClick={() => handleChange(index)}
                                sx={{
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    mb: 1,
                                    color: isSelected || isHovered ? '' : theme.palette.black.main,
                                    bgcolor: isSelected || isHovered ? theme.palette.button1.main : '',
                                    borderColor: isSelected || isHovered ? '' : theme.palette.black.main,
                                    textAlign: 'left',
                                }}>
                                <Typography sx={{
                                    px: 3, py: 1
                                }}>
                                    <b>{opt[0]}:</b>  {opt[1]}
                                </Typography>

                            </Button>
                        );
                    })}
                </CardContent>
            </Card >
        </Box>
    )
}
export default QuestionPage;