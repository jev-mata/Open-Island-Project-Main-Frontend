
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { Destination, TagsDestination } from "../type";
import { useEffect, useState } from "react";
import Axios_Open from "../lib/Axios_Open";
import Cookies from "js-cookie"; 
export default function SaveIsland({ selectedIsland,setSignin }: { selectedIsland: Destination[],  setSignin: (setSignin: boolean) => void }) {
    const [Tags, setTags] = useState<TagsDestination[]>([]);
    const getUniqueTags = (): string[] => {
        const allTags = selectedIsland.flatMap(island => island.tags);
        return Array.from(new Set(allTags)); // Remove duplicates
    }; 

    const positions = [
        { name: "top", zIndex: 2 },
        { name: "left", zIndex: 1 },
        { name: "center", zIndex: 3 },
        { name: "right", zIndex: 4 },
        { name: "bottom", zIndex: 5 }
    ];

    useEffect(() => {
 
        const getTag = async () => {
            const allCookies = Cookies.get();
            const uniqueTags = getUniqueTags(); // Get unique tags
            console.log("uniqueTags", uniqueTags);
            Axios_Open.post("/api/get/tag", {
                tags: uniqueTags
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true, // Maintain session using cookies
            })
                .then(response => {
                    console.log(response.data);
                    setTags(response.data as TagsDestination[]);
                })
                .catch(error => console.error("Error:", error));
    
        }
        getTag();
    }, [])
    const theme = useTheme(); // ✅ Use the theme provided by RootLayout
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgb(0, 119, 139),rgb(129, 187, 177))',
            position: 'fixed'
        }}>
            <Grid2 container spacing={1} sx={{
                width: '80%', mx: 'auto'
            }}>

                <Grid2 size={9}>
                    <Box sx={{
                        position: 'relative',
                        mt: 20,
                    }}>
                        <Box sx={{
                            display: 'grid',
                            width: '50%',
                            ml: 15,
                            gridTemplateColumns: '100px 100px 100px',
                            gridTemplateRows: '100px 100px 100px',
                            gap: 2,
                            transform: 'rotate(45deg)', // Rotate the grid into an "X"
                        }}>

                            {Tags.slice(0, 5).map((tag, index) => (
                                <ImageBox key={index} src={tag.Image_URL} position={positions[index].name} index={positions[index].zIndex} />
                            ))}
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={3}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: 300,
                        mt: '60%',
                        borderRadius: 5,
                        padding: 5,
                        bgcolor: theme.palette.white.main,
                        boxShadow: "0 0 10px -2px gray"
                    }}>
                        <Typography variant="h4">

                            Your Dream Island Awaits!
                        </Typography>
                        <Typography sx={{
                            width: '80%',
                            mx: 'auto',
                            mt: 2
                        }}>
                            Explore every corner, uncover hidden gems,
                            and let the adventure unfold.
                        </Typography>
                        <Button variant="contained" 
                        onClick={()=>setSignin(true)}
                        sx={{
                            borderRadius: 10,
                            py: 1,
                            px: 4,
                            mt: 5

                        }}>Save Island</Button>

                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}
const ImageBox = ({ src, position, index }: { src: string; position: string, index: number }) => {
    // Define correct grid placement for each image
    const gridPositions: Record<string, string> = {
        top: "1 / 2",   // Row 1, Center
        left: "2 / 1",  // Row 2, Left
        center: "2 / 2", // Row 2, Center
        right: "2 / 3", // Row 2, Right
        bottom: "3 / 2" // Row 3, Center
    };

    return (
        <Box component="img" src={src} sx={{
            width: 275,
            height: 275,
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 1,
            gridColumn: gridPositions[position].split(" / ")[1],
            gridRow: gridPositions[position].split(" / ")[0],
            transform: 'rotate(-45deg)', // Rotate images back upright
            zIndex: index
        }} />
    );
};