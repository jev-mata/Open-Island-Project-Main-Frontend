
import { Grid2, List, ListItem, Rating, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserPost } from '@/app/type';


export default function CardDestination({ index, des, isSelected, setSelected }: { index: number, des: UserPost, isSelected: boolean, setSelected: (setSelected: number) => void }) {
    const theme = useTheme();

    const isMobileWidth = useMediaQuery("(max-width:600px)");
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
        <Box key={des.user_island_photo[0].thumbnail + "_" + index}
            sx={{
                position: 'relative',
                borderRadius: isMobileWidth ? 2 : 5.5,
                borderColor: isSelected ? theme.palette.button1.main : '',
                borderWidth: isSelected ? 2 : 0,
                borderStyle: isSelected ? 'solid' : '',
                mb: 2
            }}
            onClick={() => setSelected(index)}
        >
            <FavoriteIcon sx={{
                position: 'absolute',
                top: 15,
                color: theme.palette.white_text.main,
                right: 15,
                fontSize: 'xx-large'

            }}></FavoriteIcon>
            <Image width={164} height={164}
                style={{ width: '100%', height: '100%', borderRadius: isMobileWidth ? 5 : 20 }}
                src={`${des.user_island_photo[0].thumbnail}?w=864&h=864&fit=crop&auto=format`}
                alt={des.content || ''}
                loading="lazy"
            />
            <Typography sx={{
                p: 0, mb: 2, width: '100%', color: theme.palette.button1.main
            }}>

                <span style={{ color: theme.palette.text.secondary }}>From </span>{index==0?'My First Island':getSeasonalTravelDate(des.dateTraveled)}
            </Typography>
        </Box>
    );
}

