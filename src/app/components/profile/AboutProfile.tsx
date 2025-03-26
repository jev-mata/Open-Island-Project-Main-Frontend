
import { Grid2, List, ListItem, Rating, Skeleton, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProfileType } from '@/app/type';


export default function AboutProfile({ profile }: { profile: ProfileType | null | undefined }) {
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
                    {profile ?
                        profile?.bio
                        :

                        <Skeleton animation='wave' variant="text" sx={{
                            width: isMobileWidth ? '80%' : '60%',
                            mx: 'auto',
                            bgcolor: theme.palette.grey[400],
                        }}  ></Skeleton>
                    }
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

