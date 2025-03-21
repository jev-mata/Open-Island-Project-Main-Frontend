
import { Grid2, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CardDestination from './mini_component/CardDestination';
import Axios_Open from '@/app/lib/Axios_Open';

export default function PhotosDestinationProfile() {
    const [itemData, setItemData] = useState<{ img: string, title: string }[]>(
        [
            {
                img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                title: 'Breakfast',
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
            },
            {
                img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
                title: 'Hats',
            },
            {
                img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
                title: 'Honey',
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
            },
        ]
    );

    const [destination, setDestination] = useState<{ img: string, title: string }[]>([
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ]);
    const theme = useTheme();
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabletWidth = useMediaQuery("(max-width:1100px)");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    return (
        <Grid2 container spacing={0}>
            {!isMobileWidth && !isTabletWidth &&
                <Grid2 size={1}>

                </Grid2>
            }

            <Grid2 size={isMobileWidth ? 4 : isTabletWidth ? 4 : 2}>
                <List sx={{
                    width: isMobileWidth ? '100%' : isTabletWidth ? '90%' : '80%',
                    mx: 'auto'
                }}>
                    {destination.map((des, index) =>
                        <CardDestination key={index} des={des} index={index} isSelected={selectedIndex == index} setSelected={setSelectedIndex}></CardDestination>
                    )}
                </List>

            </Grid2>
            <Grid2 size={8}>

                <ImageList sx={{ width: isMobileWidth ? '95%' : isTabletWidth ? '90%' : '75%', height: 'auto', mx: 'auto', mt: 0 }} cols={isMobileWidth ? 2 : 3}  >
                    {itemData.map((item, index) => (
                        <ImageListItem key={index + "_" + item.title}>
                            <Image width={164} height={164}
                                style={{ width: '100%', height: '100%' }}
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>

                    ))}
                </ImageList>
            </Grid2>
        </Grid2 >
    );
}

