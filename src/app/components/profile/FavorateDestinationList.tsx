

import ImageCustom from '../ImageCustom';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, IconButton, ImageListItemBar, Typography, useMediaQuery, useTheme, } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DestinationCol, Favorate } from '../../type';
import { useState } from 'react';
export default function FavorateDestinationList({ index, item, isDestLoaded }: { item: Favorate, index: number, isDestLoaded: boolean }) {
    const theme = useTheme(); 

   
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const borderRadius = isMobileWidth ? 5 : 25;
    const [onHover, setHover] = useState<boolean>(false);
    return (

        <ImageListItem key={index} cols={item ? item.cols : 1} rows={item ? item.rows : 1}
            sx={{
                minHeight: isDestLoaded ? 'none' : isMobileWidth ? 'none' : isTabWidth ? 'none' : (300 * (item ? item.rows ? item.rows : 1 : 1)),
                cursor: 'pointer',
            }}
            onClick={(event) => { event.stopPropagation();  }}

            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <ImageCustom item={item.destination ? item.destination : null} borderRadius={borderRadius} isHover={!onHover }></ImageCustom>



            <ImageListItemBar
                sx={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    p: 0,
                }}
                position="top"
                actionIcon={
                    <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.destination?.name}`}
                        style={{
                            padding: 0,
                            marginRight: isMobileWidth ? 3 : 15, marginTop: isMobileWidth ? -20 : 15
                        }}
                        onClick={(event) => { event.stopPropagation(); }}
                    >
                        {/* {!selectedItems[item.destination?.thumbnail || ''] ? ( */}
                            <FavoriteIcon sx={{ color: theme.palette.white_text.main, fontSize: isMobileWidth ? 'large' : 'xx-large' }} />
                         {/* ) : ( */}
                            {/* <FavoriteBorderIcon sx={{ color: theme.palette.white_text.main, fontSize: isMobileWidth ? 'large' : 'xx-large' }} /> */}
                        {/* )} */}

                    </IconButton>
                }
                actionPosition="right"
            />
            {onHover ?
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
                            {item.destination?.name}
                        </Typography>}

                    sx={{
                        borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius,
                        bottom: 75,
                        background: 'none',
                    }}

                />
                : ''}
            {onHover ?
                <ImageListItemBar
                    subtitle={
                        <Typography fontSize={'small'} fontWeight={'normal'} style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%',
                            textAlign: 'left',
                            whiteSpace: 'normal', // Ensure text wraps
                            wordBreak: 'break-word', // Break long words properly 
                            WebkitLineClamp: 4, // Set max lines to 4
                            color: 'white', // Ensure readability
                        }}>
                            {item.destination?.description}
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