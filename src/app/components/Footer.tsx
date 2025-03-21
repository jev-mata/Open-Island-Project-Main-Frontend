
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, Typography, useMediaQuery, } from '@mui/material';
import CircleIcon from "@mui/icons-material/Circle";
import { Grid2 } from '@mui/material';
export default function Footer() {

    const isMobileWidth = useMediaQuery("(max-width:700px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    return (
        <Box>
            <Box sx={{
                width: isMobileWidth ? '95%' : isTabWidth ? '95%' : '75%',
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 5,
                mx: 'auto',

            }}>

            </Box>
            <Box sx={{
                width: '95%',
                mx: 'auto',
                py: 5

            }}>
                <Grid2 container spacing={isMobileWidth ? 1 : isTabWidth ? 1 : 4}>
                    {/* Left Section (Heading & Button) */}
                    {!isMobileWidth && !isTabWidth &&
                        <Grid2 size={1.5}  >
                        </Grid2>
                    }
                    <Grid2 size={isMobileWidth ? 4 : isTabWidth ? 4 : 3.5}  >
                        <Typography variant={isMobileWidth ? 'subtitle1' : "h4"} fontWeight="bold" gutterBottom textAlign={'left'}>
                            Lorem ipsum <br />
                            dolor sit amet, <br />
                            consectetur <br />
                            adipiscing elit.
                        </Typography>
                        <Button variant="contained" sx={{ backgroundColor: "#18889e", borderRadius: "20px", px: 3, mt: 2, display: 'block' }}>
                            Button 1
                        </Button>
                    </Grid2>

                    {/* Right Section (Grid2 of Text) */}
                    <Grid2 size={isMobileWidth ? 8 : isTabWidth ? 8 : 6} >
                        <Grid2 container spacing={2}>
                            {Array.from({ length: 16 }).map((_, index) => (
                                <Grid2 size={3} key={index}>
                                    <Typography variant="body2" fontSize={isMobileWidth ? 'small' : 'normal'}>Lorem ipsum</Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Bottom Section */}
                <Grid2 spacing={isMobileWidth ? 1 : isTabWidth ? 1 : 2} container sx={{
                    pt: isMobileWidth ? 5 : isTabWidth ? 5 : 15, width: '100%'
                }} >
                    {/* Left Footer Links */}
                    {!isMobileWidth && !isTabWidth &&
                        <Grid2 size={1.5}>
                        </Grid2>
                    }

                    <Grid2 size={7}>
                        <Grid2 container spacing={isMobileWidth ? 1 : isTabWidth ? 1 : 8} sx={{ mx: 'auto' }}>
                            {["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"].map((text, index) => (
                                <Grid2 size={3} key={index}>
                                    <Typography variant="body2">{text}</Typography>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>

                    {/* Right Dots (Pagination) */}
                    <Grid2 size={isMobileWidth ? 5 : isTabWidth ? 5 : 3.5}>
                        <Box sx={{
                            width: 'auto', mx: 'auto'
                        }}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <CircleIcon key={index} sx={{ fontSize: isMobileWidth ? 'normal' : 30, mx: isMobileWidth ? 0.5 : 1, color: index === 0 ? "#18889e" : "gray" }} />
                            ))}
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}