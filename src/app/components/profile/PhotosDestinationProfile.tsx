
import { Grid2, IconButton, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CardDestination from './mini_component/CardDestination';
import Axios_Open from '@/app/lib/Axios_Open';
import { UserPost } from '@/app/type';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function PhotosDestinationProfile({ posts }: { posts: UserPost[] }) {

    const theme = useTheme();
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabletWidth = useMediaQuery("(max-width:1100px)");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const getSeasonalTravelDate = (date: Date | string | undefined): string => {
        if (!date) return "Unknown Travel Time";

        const travelDate = new Date(date); // Ensure it's a Date object
        const year = travelDate.getFullYear();

        // Determine season based on month
        const month = travelDate.getMonth() + 1; // getMonth() returns 0-11
        let season = "";

        if (month >= 3 && month <= 5) season = "Spring";
        else if (month >= 6 && month <= 8) season = "Summer";
        else if (month >= 9 && month <= 11) season = "Autumn";
        else season = "Winter";

        return `${season} Adventures ${year}`;
    };
    return (
        <Grid2 container spacing={0}>
            {!isMobileWidth && !isTabletWidth &&
                <Grid2 size={1}>

                </Grid2>
            }

            <Grid2 size={isMobileWidth ? 4 : isTabletWidth ? 4 : 3} spacing={2}>
                <List sx={{
                    width: isMobileWidth ? '100%' : isTabletWidth ? '90%' : '80%',
                    mx: 'auto'
                }}>
                    {posts.map((post, index) =>
                        <Box sx={{  
                        }}>
                            <Box sx={{
                                position: "relative",
                                overflow: 'hidden', // Prevents anything from overflowing
                                maxWidth: 450, aspectRatio: '1/1',
                                width: '100%',
                                borderRadius:5,
                                mx: 4
                            }}>
                                <Box sx={{
                                    position: "absolute", width: '100%', height: '100%', marginLeft: 'auto', marginRight: 'auto',
                                    zIndex: 0,
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%,-50%)',
                                    filter: 'blur(40px)'
                                }}>
                                    <Image
                                        src={post.tagImages[0]}
                                        alt={post.user_island_photo[0].thumbnail}
                                        height={500}
                                        width={500}

                                        style={{ borderRadius: "12px", height: '100%', width: 'auto', maxWidth: 200, scale: 4 }}
                                    />
                                </Box>
                                <Box sx={{ position: "relative", width: '100%', height: '100%', zIndex: 5 }}>
                                    <Image
                                        src={post.tagImages[0]}
                                        alt={post.user_island_photo[0].thumbnail}
                                        height={200}
                                        width={200}

                                        style={{
                                            position: "absolute",
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            borderRadius: "12px", height: '70%', width: 'auto', scale: 1
                                        }}
                                    />
                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor: "rgba(255,255,255,0.8)",
                                            borderRadius: "50%",
                                        }}
                                    >
                                        <FavoriteBorderIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography textAlign={'center'} sx={{
                                mx: 4,mb:2,
                                color: theme.palette.button1.main, width: '100%'
                            }}>
                                <span style={{
                                    color: theme.palette.black.main,  width: '100%'
                                }}>From </span> {index == 0 ? 'My First Island' : getSeasonalTravelDate(post.dateTraveled)}
                            </Typography>
                        </Box>
                    )}
                </List>

            </Grid2>
            <Grid2 size={isMobileWidth ? 8 : isTabletWidth ? 8 : 7}>

                <ImageList sx={{ width: isMobileWidth ? '95%' : isTabletWidth ? '90%' : '75%', height: 'auto', mx: 'auto', mt: 0 }} cols={isMobileWidth ? 2 : 3}  >
                    {posts.map((item, index) =>
                        item.user_island_photo.map((photo, index2) => (
                            <ImageListItem key={index2 + "_" + photo.thumbnail}>
                                <Image width={164} height={164}
                                    style={{ width: '100%', height: '100%' }}
                                    src={`${photo.thumbnail}?w=464&h=464&fit=crop&auto=format`}
                                    alt={photo.thumbnail}
                                    loading="lazy"
                                />
                            </ImageListItem>

                        ))
                    )}
                </ImageList>
            </Grid2>
        </Grid2 >
    );
}

