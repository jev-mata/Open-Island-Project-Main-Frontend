
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { IconButton, ImageListItemBar, useTheme } from '@mui/material'; 
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import Image from 'next/image';
function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function GridImageList() {
    const theme = useTheme();

    const borderRadius = 35;
    return (
        <ImageList
            sx={{ width: '100%', pb: 5, px: 5 }}
            variant="quilted"
            cols={4}
        >
            {itemData.map((item) => {
                const [isSelected, setSelected] = useState<boolean>(false);
                return (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}

                        onClick={(event) => { event.stopPropagation(); setSelected(!isSelected) }}
                    >
                        <Image
                            {...srcset(item.img, 221, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                            style={{ borderRadius: borderRadius, }}
                        />

                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                            }}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label={`star ${item.title}`}
                                    style={{
                                        marginRight: 15, marginTop: 15
                                    }}
                                    onClick={(event) => { event.stopPropagation(); setSelected(!isSelected) }}
                                >
                                    {!isSelected ?
                                        <FavoriteBorderIcon sx={{ color: theme.palette.white_text.main }}
                                            style={{
                                                fontSize: 'xx-large',
                                            }}
                                        /> :

                                        <FavoriteIcon sx={{ color: theme.palette.white_text.main }}
                                            style={{
                                                fontSize: 'xx-large',
                                            }}
                                        />}

                                </IconButton>
                            }
                            actionPosition="right"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}

                            sx={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }}

                        />
                    </ImageListItem>
                );
            })
            }
        </ImageList>



    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];
