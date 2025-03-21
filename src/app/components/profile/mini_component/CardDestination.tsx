
import { Grid2, List, ListItem, Rating, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function CardDestination({ index, des, isSelected, setSelected }: { index: number, des: { img: string, title: string }, isSelected: boolean, setSelected: (setSelected: number) => void }) {
    const theme = useTheme();

    const isMobileWidth = useMediaQuery("(max-width:600px)");
    return (
        <Box key={des.img + "_" + index}
            sx={{
                position: 'relative',
                borderRadius: isMobileWidth?2:5.5,
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
                style={{ width: '100%', height: '100%', borderRadius: isMobileWidth?5:20 }}
                src={`${des.img}?w=164&h=164&fit=crop&auto=format`}
                alt={des.title}
                loading="lazy"
            />
            <Typography sx={{
                p: 0, mb: 2, width: '100%', color: theme.palette.button1.main
            }}>

                <span style={{ color: theme.palette.text.secondary }}>From </span>{des.title}
            </Typography>
        </Box>
    );
}

