
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios_Open from '@/app/lib/Axios_Open';
import { DestinationCol, TagsDestination, UserIslands, UserIslandsDestination } from '@/app/type';

import Cookies from "js-cookie";
function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}
const positions = [
    { name: "top", zIndex: 2 },
    { name: "left", zIndex: 1 },
    { name: "center", zIndex: 3 },
    { name: "right", zIndex: 4 },
    { name: "bottom", zIndex: 5 }
];

export default function DestinationProfile({ islands, Tags }: { islands: UserIslands[]; Tags: TagsDestination[] }) {
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    useEffect(() => {
        console.log('islands', islands)
    }, [islands])
    useEffect(() => {
        console.log('Tags', Tags)
    }, [Tags]);
    const [imagelist, setImagelist] = useState<string[]>([]);
    const [isHover, setHover] = useState<boolean>(false);
    const theme = useTheme();
    return (
        <ImageList
            sx={{ width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '70%', height: 'auto', mx: 'auto', overflow: 'hidden' }}
            variant="quilted"
            cols={isMobileWidth ? 6 : isTabWidth ? 6 : 8}
            rowHeight={150}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {islands.map((item, index) => index == 0 ?
                <ImageListItem key={`${item.destination.name}-${index}`} cols={item.destination.cols || 1} rows={item.destination.rows || 1} sx={{

                }}>
                    <Box sx={{
                        position: 'relative',
                        mt: 0,
                        background: '',//blur image here
                        borderColor: isHover ? 'black' : '',
                        borderStyle: isHover ? 'solid' : '',
                        borderWidth: isHover ? 1 : 0,
                        borderRadius: 10,
                        overflow: 'hidden', // Prevents anything from overflowing
                        height: '100%'
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            filter: 'blur(40px)',
                            pointerEvents: 'none', // Ensures it doesn't interfere with interactions
                            zIndex: 0, // Push it to the background
                        }}>
                            <Box sx={{
                                display: 'grid',
                                width: '50%',
                                mt: -45,
                                mx: 'auto',
                                opacity: 0.9,
                                gridTemplateColumns: '100px 100px 100px',
                                gridTemplateRows: '100px 100px 100px',
                                gap: 2,
                                scale: 4,
                                transform: 'rotate(45deg)', // Rotate the grid into an "X"
                            }}>

                                {Tags.slice(0, 5).map((tag, index) => (
                                    <ImageBox key={index} src={tag.Image_URL} position={positions[index].name} index={positions[index].zIndex} />
                                ))}
                            </Box>

                        </Box>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'

                        }}>
                            <Box sx={{
                                display: 'grid',
                                width: '80%',
                                mt: -15,
                                mx: 'auto',
                                gridTemplateColumns: '100px 100px 100px',
                                gridTemplateRows: '100px 100px 100px',
                                gap: 2, scale: 1.5,
                                transform: 'rotate(45deg)', // Rotate the grid into an "X"
                            }}>

                                {Tags.slice(0, 5).map((tag, index) => (
                                    <ImageBox key={index} src={tag.Image_URL} position={positions[index].name} index={positions[index].zIndex} />
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            background: 'linear-gradient(rgba(0,0,0,0),rgba(0, 0, 0, 0.23),rgba(0, 0, 0, 0.62))',
                            bottom: 0,
                            left: 0,
                        }}>
                            <Typography variant='h5' sx={{
                                position: 'absolute',
                                bottom: 55,
                                left: 20,
                                fontWeight: 'bolder',
                                color: theme.palette.white.main

                            }}>
                                {item.destination.name}

                            </Typography>
                            <Typography variant='body1' sx={{
                                position: 'absolute',
                                bottom: 15,
                                left: 25,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                textAlign: 'left',
                                color: theme.palette.white.main
                            }}>
                                {islands.length} {islands.length > 1 ? 'Destinations' : 'Destination'}

                            </Typography>
                        </Box>
                    </Box>

                </ImageListItem>
                :
                Array.from(
                    new Map(
                        Tags.filter(tag =>
                            item.destination.tags?.some(destag => destag === tag.Name) // ✅ Check match
                        ).map(tag => [tag.Name, tag]) // Use Name as the key to ensure uniqueness
                    ).values()
                ).map((val, tagIndex) => {
                    return imagelist.includes(val.Name) ? null : (
                        <Box key={`tag-${tagIndex}`} sx={{
                            position: 'relative',
                            mt: 0,

                            borderColor: isHover ? 'black' : '',
                            borderStyle: isHover ? 'solid' : '',
                            borderWidth: isHover ? 1 : 0,
                            borderRadius: 10,
                            overflow: 'hidden',
                            height: '100%',
                            width: '100%',
                        }}
                        >
                            {/* ✅ Blurred Background Image */}
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                opacity: 0.9,
                                filter: 'blur(40px)',
                                aspectRatio: '1/1',
                                pointerEvents: 'none',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gridTemplateRows: 'repeat(3, 1fr)',
                                zIndex: 0,
                            }}>
                                <Image key={`blur-${tagIndex}`} width={100} height={100}
                                    {...srcset(val.Image_URL, 921, 1, 1)}
                                    alt={item.destination.name}
                                    loading="lazy"
                                    style={{
                                        scale: 4,
                                        width: '100%', height: '100%',
                                        borderRadius: isMobileWidth ? 10 : isTabWidth ? 15 : 20
                                    }}
                                />
                            </Box>

                            {/* ✅ Main Foreground Image */}
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gridTemplateRows: 'repeat(3, 1fr)',
                                pointerEvents: 'none',
                                zIndex: 1,
                            }}>
                                <Image key={`image-${tagIndex}`} width={100} height={100}
                                    {...srcset(val.Image_URL, 921, 1, 1)}
                                    alt={item.destination.name}
                                    loading="lazy"
                                    style={{
                                        width: '100%', height: '100%',
                                        scale: 1.2,
                                        borderRadius: isMobileWidth ? 10 : isTabWidth ? 15 : 20
                                    }}
                                />
                            </Box>
                        </Box>

                    )
                }
                )


            )}
        </ImageList>
    );
}

const ImageBox = ({ src, position, index }: { src: string; position: string, index: number }) => {
    // Define correct grid placement for each image
    const gridPositions: Record<string, string> = {
        top: "1 / 2",   // Row 1, Center
        left: "2 / 1",  // Row 2, Left
        center: "2 / 2", // Row 2, Center
        right: "2 / 3", // Row 2, Right
        bottom: "3 / 2" // Row 3, Center
    };

    return (
        <Box sx={{
            width: 225,
            height: 225,
            gridColumn: gridPositions[position].split(" / ")[1],
            gridRow: gridPositions[position].split(" / ")[0],
            transform: 'rotate(-45deg)', // Rotate images back upright
            zIndex: index,
        }} >

            <Box component="img" src={src} sx={{
                width: '100%',
                height: 'auto',
                aspectRatio: '1/1'
            }} />
        </Box>
    );
};