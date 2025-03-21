"use client";

import { Card, CardContent, CardHeader, Avatar, IconButton, Typography, Box, Grid2, useTheme, useMediaQuery, CardMedia } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";

export default function PostDestinationProfile() {
    const posts = [
        {
            id: 1,
            username: "Anna Rivera",
            handle: "@AnnaTravels",
            date: "December 21, 2025, 11:24 AM",
            content:
                "Spent the day at Magellan’s Cross with the family—a humbling and inspiring experience. The sight of the iconic cross housed within its simple yet beautiful kiosk felt like stepping back in time. The vibrant murals on the ceiling depict the arrival of Christianity in Cebu, and you can almost feel the weight of history in the air. It’s a powerful symbol of faith, culture, and resilience, reminding us of where we’ve come from and how far we’ve grown. Truly a meaningful stop that left us reflecting long after we left. 🌏✨",
            hashtags: "#CebuChronicles #FamilyDays",
            imageSrc: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            from: "My First Island",
        },
        {
            id: 2,
            username: "Anna Rivera",
            handle: "@AnnaTravels",
            date: "April 14, 2025, 4:56 PM",
            content:
                "Summer well spent with the family at Sheraton Mactan! 🌴☀️ From the crystal-clear waters to the cozy, luxurious rooms, everything felt like paradise. The kids loved the pool (and so did we 😅), while the food was absolutely top-tier—local flavors with a gourmet twist. Whether lounging by the beach or watching the sunset together, every moment was unforgettable. Sheraton Mactan, you made this vacation one for the books! 🏖️✨",
            hashtags: "#FamilyVacation #MactanMagic #SheratonMactan",
            imageSrc: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            from: "Summer Adventures 2025",
        },
    ];
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '70%', margin: "auto", mt: 4 }}>
            {posts.map((post) => (
                <Grid2 key={post.id} container spacing={4} >
                    {/* Left Image Section */}
                    {!isMobileWidth && !isTabWidth &&
                        <Grid2 size={5}>
                            <Box sx={{ position: "relative", width: '70%', height: '75%', aspectRatio: '1/1', marginLeft: 'auto', marginRight: 'auto' }}>
                                <Image
                                    src={post.imageSrc}
                                    alt={post.from}
                                    layout="fill"
                                    objectFit="cover"

                                    style={{ borderRadius: "12px", }}
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
                            <Typography textAlign={'center'} sx={{
                                color: theme.palette.button1.main, width: '100%'
                            }}>
                                <span style={{
                                    color: theme.palette.black.main
                                }}>From </span> {post.from}
                            </Typography>
                        </Grid2>}

                    <Grid2 size={isMobileWidth ? 12 : isTabWidth ? 12 : 7}  >

                        <Card sx={{ flex: 1 }}>
                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: "gray" }}>A</Avatar>}
                                action={
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={<Typography textAlign={'left'} fontWeight={'bold'}>{post.username}</Typography>}
                                subheader={<Typography textAlign={'left'} fontSize={'small'}>{post.handle}</Typography>}
                            />
                            {isMobileWidth || isTabWidth ?
                                <CardMedia
                                    component="img"
                                    height={isMobileWidth ? "254" : isTabWidth ? '500' : '300'}
                                    alt="Paella dish"
                                    src={post.imageSrc}></CardMedia>
                                : ''
                            }

                            <CardContent>
                                <Typography variant="body2" textAlign={'left'} color="text.secondary">
                                    {post.content}
                                </Typography>
                                <Typography variant="body2" textAlign={'left'} sx={{ color: "blue", mt: 1 }}>
                                    {post.hashtags}
                                </Typography>
                                <Typography variant="caption" textAlign={'left'} display="block" color="text.secondary" sx={{ mt: 1 }}>
                                    {post.date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            ))}
        </Box>
    );
}
