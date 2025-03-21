
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios_Open from '@/app/lib/Axios_Open';
import { DestinationCol, UserIslands } from '@/app/type';
import Cookies from "js-cookie";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function DestinationProfile() {
    const isMobileWidth = useMediaQuery("(max-width:600px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const [itemData, setItemData] = useState<UserIslands[]>([
    ]);
    useEffect(() => {
        const getIsland = async () => {

            const allCookies = Cookies.get();
            try {
                const response = await Axios_Open.post("/api/www/island", {

                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                        'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    },
                    withCredentials: true, // ✅ Important for Laravel Sanctum or session-based auth
                });

                if (response.data.userIslands) {
                    setItemData((prevItemData) => {
                        const newData = response.data.userIslands as UserIslands[];

                        if (newData.length > 0) {
                            // Preserve the `rows` and `cols` for the first item
                            newData[0] = {
                                ...newData[0],
                                destination: {
                                    ...newData[0].destination,
                                    rows: 2,
                                    cols: isMobileWidth ? 4 : isTabWidth ? 4 : 6,
                                }
                            };
                        }

                        return newData;
                    });

                } else {
                }
            } catch (error) {
                console.error("Error checking login:", error);
            }
        };
        getIsland();
    }, [isMobileWidth, isTabWidth]);
    return (
        <ImageList
            sx={{ width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '70%', height: 'auto', mx: 'auto', overflow: 'hidden' }}
            variant="quilted"
            cols={isMobileWidth ? 6 : isTabWidth ? 6 : 8}
            rowHeight={isMobileWidth ? 70 :isTabWidth?100: 150}
        >
            {itemData.map((item, index) => (
                <ImageListItem key={index} cols={item.destination.cols || 1} rows={item.destination.rows || 1} sx={{

                }}>
                    <Image width={100} height={100}
                        {...srcset(item.destination.thumbnail, 921, item.destination.rows, item.destination.cols)}
                        alt={item.destination.name}
                        loading="lazy"
                        style={{
                            width: '100%', height: '100%',
                            borderRadius: isMobileWidth ? 10 : isTabWidth ? 15 : 20
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

