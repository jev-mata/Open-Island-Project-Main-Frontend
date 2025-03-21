import Image from "next/image";
import { DestinationCol } from "../type";
import { useState } from "react";
import { Box, Skeleton, useMediaQuery } from '@mui/material';
function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        width: 350 * cols,
        height: 300 * rows,
        src: `${(image)}?w=${size * cols}&h=${size * rows}&fit=cover&auto=format`,
        srcSet: `${(image)}?w=${size * cols}&h=${size * rows
            }&fit=cover&auto=format&dpr=2 2x`,
    };
}

export default function ImageCustom({ item, borderRadius, isHover }: { item: DestinationCol, borderRadius: number, isHover: boolean }) {
    const [isLoad, setLoad] = useState<boolean>(false);

    const isMobileWidth = useMediaQuery("(max-width:600px)");
    return (
        <Box sx={{
            borderRadius: isMobileWidth ? 1 : 6,
            height: '100%',
            background: isHover ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'
        }}
        >
            {item.thumbnail != "" ?
                <Image
                    onLoad={() => setLoad(true)}
                    {...srcset(item.thumbnail, 351, item.rows, item.cols)}
                    alt={item.name}
                    loading="lazy"
                    style={{
                        width: '100%', height: isLoad ? '100%' : '0',
                        borderRadius: borderRadius,
                        opacity: isLoad ? isHover ? 0.5 : 1 : 0,
                        background: isHover ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)'
                    }}
                />
                : ''

            }
            <Skeleton animation="wave"
                style={{
                    // width: 350 * (item.cols ? item.cols : 1),
                    // height: 300 * (item.rows ? item.rows : 1),
                    // minHeight: 300 * (item.rows ? item.rows : 1),
                    borderRadius: borderRadius, width: "100%", height: "100%",
                    display: !isLoad ? 'block' : 'none'
                }}>

            </Skeleton>

        </Box>
    )
}