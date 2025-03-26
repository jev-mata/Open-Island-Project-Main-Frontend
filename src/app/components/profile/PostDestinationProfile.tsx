"use client";

import { Card, CardContent, CardHeader, Avatar, IconButton, Typography, Box, Grid2, useTheme, useMediaQuery, CardMedia } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { UserPost } from "@/app/type";
import { randomInt } from "crypto";

export default function PostDestinationProfile({ posts }: { posts: UserPost[] }) {
    const extractHashtags = (content: string) => {
        const hashtagRegex = /#\w+/g; // Match words starting with #
        const hashtags = content.match(hashtagRegex) || []; // Extract hashtags
        return hashtags;
    };
    const removeHashtags = (content: string) => {
        const hashtagRegex = /#\w+/g; // Match words starting with #
        const cleanedContent = content.replace(hashtagRegex, "").trim(); // Remove hashtags from content
        return cleanedContent;
    };
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const theme = useTheme();
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
    const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const getRandomImage = (images: string[]) => {
        if (!images || images.length === 0) return "/default-image.jpg"; // Fallback image
        return images[Math.floor(Math.random() * images.length)];
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '70%', margin: "auto", mt: 4 }}>
            {posts.map((post, index) => (
                <Grid2 key={post.id} container spacing={4} >
                    {/* Left Image Section */}
                    {!isMobileWidth && !isTabWidth &&
                        <Box sx={{
                            mr: 5, 
                            height:'auto'
                        }}>
                            <Box sx={{
                                position: "relative",
                                overflow: 'hidden', // Prevents anything from overflowing
                                minWidth: 240,
                                maxWidth: 350, aspectRatio: '1/1',
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

                                        style={{ borderRadius: "12px", height: '100%', width: 'auto', maxWidth: 250, scale: 4 }}
                                    />
                                </Box>
                                <Box sx={{ position: "relative", width: '100%', height: '100%', }}>
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
                                            borderRadius: "12px", height: '100%', width: 'auto', maxHeight: 200, scale: 1
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
                                color: theme.palette.button1.main, 
                                width: '100%',
                                py:1,
                                mx: 4
                            }}>
                                <span style={{
                                    color: theme.palette.black.main
                                }}>From </span> {index == 0 ? 'My First Island' : getSeasonalTravelDate(post.dateTraveled)}
                            </Typography>
                        </Box>
                    }

                    <Grid2 size={isMobileWidth ? 12 : isTabWidth ? 12 : 7}  >

                        <Card sx={{ flex: 1, boxShadow: '0 0 4px 0px gray' }}>
                            <CardHeader
                                avatar={<Avatar src={post.user && post.user?.profile.profile_picture} sx={{ bgcolor: "gray" }}>{post.user?.profile?.username[0].toUpperCase()}</Avatar>}
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={<Typography textAlign={'left'} fontWeight={'bold'}>{capitalizeWords(post.user_island_group.user?.fname + " " + post.user_island_group.user?.lname)}</Typography>}
                                subheader={<Typography textAlign={'left'} fontSize={'small'}>@{post.user?.profile?.username}</Typography>}
                            />
                            {isMobileWidth || isTabWidth ?
                                <CardMedia
                                    component="img"
                                    height={isMobileWidth ? "254" : isTabWidth ? '500' : '300'}
                                    alt={post.user?.profile?.username}
                                    src={post.user && post.user?.profile.profile_picture}></CardMedia>
                                : ''
                            }

                            <CardContent>
                                <Typography variant="body2" textAlign={'left'} color="text">
                                    {post.content && removeHashtags(post.content)}
                                </Typography>
                                <Typography variant="body2" textAlign={'left'} sx={{ color: "#007497", mt: 1 }}>
                                    {post.content && extractHashtags(post.content).join(" ")}
                                </Typography>
                                <Typography variant="caption" textAlign={'left'} display="block" color="text.secondary" sx={{ mt: 1 }}>
                                    {post.created_at &&
                                        new Date(post.created_at).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        }).replace(/,([^,]*)$/, ",$1")}

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            ))}
        </Box>
    );
}
