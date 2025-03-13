'use client'
import { Box, Typography } from "@mui/material";
import Leche_Flan from "../../Images/loading/2s_Leche_Flan 1.png";
import Snabaw from "../../Images/loading/3s_Snabaw 1.png";
import Taho from "../../Images/loading/4s_Taho 1.png";
import Pastry from "../../Images/loading/5s_Pastry 1.png";
import Bread from "../../Images/loading/6s_Bread 1.png";
import E_trycicle from "../../Images/loading/7s_E-trycicle 1.png";
import Jeep from "../../Images/loading/8s_Jeep 1.png";
import Trycicle from "../../Images/loading/9s_Trycicle 1.png";
import Untitled_Artwork from "../../Images/loading/Untitled_Artwork (2) 1.png";
import loading1 from "../../Images/loading/loading1.png";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { Pages } from "../type";

export default function LoadingPage({ targetPage, setPage }: { setPage: (setPage: Pages) => void, targetPage: Pages }) {

    const [loadingImgs] = useState<{ img: StaticImageData, text: string }[]>([
        {

            img: Leche_Flan,
            text: "Colonial Influence: Leche flan is a caramel custard dessert made with egg yolks, milk, and sugar, steamed to perfection. It was introduced during Spanish colonization and adapted into a Filipino classic."
        },
        {
            img: Snabaw,
            text: "Soup of the Soul: Sinigang is a tamarind-based sour soup filled with vegetables and your choice of pork, shrimp, or fish."
        },
        {
            img: Taho,
            text: "Morning Ritual: Taho is often sold by roaming vendors with large aluminum containers, calling out \"Tahoooo!\" to attract customers. "
        },
        {
            img: Pastry,
            text: "Perfect Pairing: Torta goes well with coffee or sikwate (Filipino hot chocolate) for a cozy merienda (afternoon snack)."
        },
        {
            img: Bread,
            text: "Ensaymada: A sweet, fluffy bread topped with butter, sugar, and grated cheese, often enjoyed as a snack or dessert."
        },
        {
            img: E_trycicle,
            text: "Eco-Friendly Upgrade: E-tricycles run on electricity instead of gasoline, reducing air pollution and making rides quieter."
        },
        {
            img: Jeep,
            text: "From WWII to Now: Jeepneys were originally repurposed American military jeeps after World War II, evolving into a unique form of transportation."
        },
        {
            img: Trycicle,
            text: "King of Short Rides: Tricycles are the go-to transportation for short distances in towns and provinces. They’re fast, flexible, and can navigate narrow streets."
        },
        {
            img: Untitled_Artwork,
            text: "Longest Celebration: Parols are a signature decoration in the Philippines, which celebrates the world’s longest Christmas season, starting as early as September!"
        },
        {
            img: loading1,
            text: "Longest Celebration: Parols are a signature decoration in the Philippines, which celebrates the world’s longest Christmas season, starting as early as September!"
        }
    ])
    const [rand, setRand] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (!loading) {
            setLoading(true);
            setRand(Math.floor(Math.random() * loadingImgs.length));
            setTimeout(() => {
                setPage(targetPage);
            }, 2000);

        }
    }, [loading, loadingImgs, targetPage])



    const theme = useTheme(); // ✅ Use the theme provided by RootLayout
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            bgcolor: theme.palette.white.main,
            zIndex: 99,
            position: 'fixed'
        }}>
            <Box
                sx={{
                    width: '35%',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: "translate(-50%, -50%)", // Centers element properly
                    textAlign: "center", // Centers text inside the element

                    borderRadius: 10,
                    bgcolor: theme.palette.white.main,
                }}
            >
                <Box component={"img"}
                    sx={{
                        width: '50%',

                        borderRadius: 10,
                        bgcolor: theme.palette.white.main,
                    }}
                    src={loadingImgs[rand].img.src}
                >

                </Box>

            </Box>
            <Box sx={{

                left: '50%',
                transform: "translate(-50%, -50%)", // Centers element properly
                position: 'absolute',
                bottom: 0,
                width: '35%',
            }}>

                <Typography variant="h5"

                    sx={{
                        fontWeight: 'bolder',
                        color: theme.palette.button1.main,
                        "&::after": {
                            content: '"."',
                            animation: "dots 1.5s steps(3, end) infinite",
                        },
                        "@keyframes dots": {
                            "0%": { content: '"."' },
                            "33%": { content: '".."' },
                            "66%": { content: '"..."' },
                            "100%": { content: '"."' },
                        },
                    }}>
                    Loading
                </Typography>
                <Typography sx={{
                    mt: 2
                }}>
                    <b>
                        {loadingImgs[rand].text.split(':')[0]}:
                    </b>
                    {loadingImgs[rand].text.split(':')[1]}
                </Typography>
            </Box>
        </Box>
    )
}