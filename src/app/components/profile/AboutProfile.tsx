
import { Grid2, List, ListItem, Rating, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function AboutProfile() {
    const theme = useTheme();

    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    return (
        <Box>

            <Box
                sx={{
                    width: isMobileWidth ? '100%' : isTabWidth ? '80%' : '65%', mx: 'auto',
                    borderWidth: 0.2,
                    borderColor: 'rgba(0,0,0,0.15)',
                    borderStyle: 'solid', p: isMobileWidth ? 0 : 5
                }}
            >

                <Typography fontWeight={'bold'} textAlign={'left'}
                    sx={{
                        p: 0, mb: 2, width: '100%', color: theme.palette.black.main
                    }}>
                    About
                </Typography>
                <Typography textAlign={'left'}>
                    Hey, I’m Anna! Just a wanderluster trying to see as much of the world as I can—one plane ticket at a time. ✈️🌍 Whether it’s eating my weight in street food, chasing sunsets, or getting lost in new cities, I’m all about making memories and living for those ‘wow’ moments. Follow my adventures for travel inspo, tips, and the occasional
                </Typography>
            </Box>

            <Box
                sx={{
                    width: isMobileWidth ? '100%' : isTabWidth ? '80%' : '65%', mx: 'auto',
                    borderWidth: 0.2,
                    borderColor: 'rgba(0,0,0,0.15)',
                    borderStyle: 'solid', p: isMobileWidth ? 0 : 5
                }}
            >

                <Typography fontWeight={'bold'} textAlign={'left'}
                    sx={{
                        p: 0, mb: 2, width: '100%', color: theme.palette.black.main
                    }}>
                    Statistic
                </Typography>
                <Grid2 container spacing={isMobileWidth ? 0 : 4}>
                    <Grid2 size={4}>


                        <Typography fontWeight={'bold'} textAlign={'center'}
                            variant={isMobileWidth ? 'h3' : isTabWidth ? 'h2' : 'h1'}
                            sx={{
                                p: 0, width: '100%', color: theme.palette.black.main
                            }}>
                            1
                        </Typography>
                        <Typography textAlign={'center'}
                            sx={{
                                p: 0, mb: 2, width: '100%', color: theme.palette.black.main
                            }}>
                            Completed Islands
                        </Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography fontWeight={'bold'} textAlign={'center'}
                            variant={isMobileWidth ? 'h3' : isTabWidth ? 'h2' : 'h1'}
                            sx={{
                                p: 0, width: '100%', color: theme.palette.black.main
                            }}>
                            9
                        </Typography>
                        <Typography textAlign={'center'}
                            sx={{
                                p: 0, mb: 2, width: '100%', color: theme.palette.black.main
                            }}>
                            360 Photos Uploaded
                        </Typography>
                    </Grid2>
                    <Grid2 size={4}>
                        <Typography fontWeight={'bold'} textAlign={'center'}
                            variant={isMobileWidth ? 'h3' : isTabWidth ? 'h2' : 'h1'}
                            sx={{
                                p: 0, width: '100%', color: theme.palette.black.main
                            }}>
                            5
                        </Typography>
                        <Typography textAlign={'center'}
                            sx={{
                                p: 0, mb: 2, width: '100%', color: theme.palette.black.main
                            }}>
                            Visited Destinations
                        </Typography>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}

