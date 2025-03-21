

import ImageCustom from './ImageCustom';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, IconButton, ImageListItemBar, Typography, useTheme, } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DestinationCol } from '../type';
import { useState } from 'react';
export default function CardImageDestination({ index, item, isDestLoaded }: { item: DestinationCol, index: number, isDestLoaded: boolean }) {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});

    const toggleSelection = (key: string) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };
    const [onHover, setHover] = useState<boolean>(false);
    const borderRadius = 25;
    return (

        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}
            sx={{
                minHeight: isDestLoaded ? 'none' : (300 * (item.rows ? item.rows : 1)),
                cursor:'pointer',
            }}
            onClick={(event) => { event.stopPropagation(); toggleSelection(item.thumbnail); }}

            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <ImageCustom item={item} borderRadius={borderRadius} isHover={isDestLoaded && onHover || selectedItems[item.thumbnail]}></ImageCustom>



            {isDestLoaded && onHover || selectedItems[item.thumbnail] ?
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
                            aria-label={`star ${item.name}`}
                            style={{
                                marginRight: 15, marginTop: 15
                            }}
                            onClick={(event) => { event.stopPropagation(); toggleSelection(item.thumbnail); }}
                        >
                            {selectedItems[item.thumbnail] ? (
                                <FavoriteIcon sx={{ color: theme.palette.white_text.main, fontSize: 'xx-large' }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ color: theme.palette.white_text.main, fontSize: 'xx-large' }} />
                            )}

                        </IconButton>
                    }
                    actionPosition="right"
                />
                : ""}
            {isDestLoaded && onHover || selectedItems[item.thumbnail] ?
                <ImageListItemBar
                    title={
                        <Typography fontSize={'large'} textAlign={'left'} fontWeight={'bold'} style={{
                            // display: '-webkit-box',
                            // WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3, // Limit to 3 lines
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            color: 'white', // Ensure readability
                        }}>
                            {item.name}
                        </Typography>}

                    sx={{
                        borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius,
                        bottom: 75,
                        background: 'none',
                    }}

                />
                : ''}
            {isDestLoaded && onHover || selectedItems[item.thumbnail] ?
                <ImageListItemBar
                    subtitle={
                        <Typography fontSize={'small'} fontWeight={'normal'} style={{ 
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width:'100%',
                            textAlign:'left',
                            whiteSpace: 'normal', // Ensure text wraps
                            wordBreak: 'break-word', // Break long words properly 
                            WebkitLineClamp: 4, // Set max lines to 4
                            color: 'white', // Ensure readability
                        }}>
                            {item.description}
                        </Typography>
                    }

                    sx={{
                        borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius,

                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%,  rgba(0,0,0,0.8) 100%)', 
                    }}

                />
                : ''}

        </ImageListItem>
    )
}