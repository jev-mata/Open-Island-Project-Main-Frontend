'use client';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles';
import HeaderMenu from '../components/HeaderMenu';
import { Chip, CssBaseline, Divider, useMediaQuery } from '@mui/material';
import Axios_Open from '../lib/Axios_Open';
import { DestinationCol, Favorate, UserData, UserPost } from '../type';
import { useRouter } from 'next/navigation';
import GridImageList from '../components/GridImageList';
import { getCsrfToken } from '../fetch/api_fetch';
import Footer from '../components/Footer';
import Cookies from "js-cookie";
declare module "@mui/material/styles" {
    interface Palette {
        header: Palette["primary"];
        white: Palette["primary"];
        black: Palette["primary"];
        button1: Palette["primary"];
        white_text: Palette["primary"];
        gradient_t: Palette["primary"];
        gradient_b: Palette["primary"];
        gray: Palette["primary"];
    }
    interface PaletteOptions {
        header?: PaletteOptions["primary"];
        button1?: PaletteOptions["primary"];
        white?: PaletteOptions["primary"];
        black?: PaletteOptions["primary"];
        white_text?: PaletteOptions["primary"];
        gradient_t?: PaletteOptions["primary"];
        gradient_b?: PaletteOptions["primary"];
        gray?: PaletteOptions["primary"];
    }
}


export default function PrimarySearchAppBar() {
    const [mode] = useState<PaletteMode>("light"); // Use a function to ensure consistent initial state
    const [isDestLoaded, setLoaded] = useState<boolean>(false);
    const [itemDestination, setDestinationItem] = useState<DestinationCol[]>([
        {
            thumbnail: '',
            name: 'Breakfast',
            description: 'Breakfast',
            rows: 1,
            cols: 1,
        },
        {
            thumbnail: '',
            name: 'Burger',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: '',
            name: 'Camera',
        },
        {
            thumbnail: '',
            name: 'Coffee',
            rows: 1,
            cols: 1,
        },
        {
            thumbnail: '',
            name: 'Hats',
            cols: 1,
        },
        {
            thumbnail: '',
            name: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: '',
            name: 'Basketball',
        },
        {
            thumbnail: '',
            name: 'Fern',
        },
        {
            thumbnail: '',
            name: 'Mushrooms',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: '',
            name: 'Tomato basil',
        },
        {
            thumbnail: '',
            name: 'Sea star',
        },
        {
            thumbnail: '',
            name: 'Bike',
            cols: 1,
        },
        {
            thumbnail: '',
            name: 'Bike',
            cols: 2,
            rows: 2,
        },
        {
            thumbnail: '',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
        {
            thumbnail: '',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
        {
            thumbnail: '',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
    ]);
    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: "'Inter'", // Replace with your preferred font
                    allVariants: {
                        textTransform: "none", // Ensures all text is lowercase
                        fontVariant: "none", // Converts lowercase to small caps
                    },
                },
                palette: {
                    mode,
                    primary: {
                        main: "#1976d2",
                    },
                    secondary: {
                        main: "#ff4081",
                    },
                    gray: {
                        main: mode === "light" ? "rgb(71, 71, 71)" : "rgb(95, 95, 95)",
                    },
                    header: {
                        main: mode === "light" ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)",
                    },
                    white: {
                        main: mode === "light" ? "rgb(255, 255, 255)" : "rgb(49, 49, 49)", // 50% transparent pink
                    },
                    white_text: {
                        main: mode === "light" ? "rgb(255, 255, 255)" : "rgb(255, 255, 255)", // 50% transparent pink
                    },
                    black: {
                        main: mode === "light" ? "rgb(0, 0, 0)" : "rgb(226, 226, 226)", // 50% transparent pink
                    },
                    button1: {
                        main: mode === "light" ? "#2B92A7" : "rgb(0, 102, 109)", // 50% transparent pink
                    },
                    gradient_b: {
                        main: mode === "light" ? `rgba(255, 255, 255, 0.75)` : `rgba(0, 0, 0, 0.75)`, // 50% transparent pink
                    },
                    gradient_t: {
                        main: mode === "light" ? `rgba(255, 255, 255, 0)` : `rgba(0,0,0,0)`, // 50% transparent pink
                    },
                },
            }),
        [mode]
    );
    const [user, setUser] = useState<UserData | null>();
    const router = useRouter();
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await Axios_Open.get("/api/www/checkAuth", {
                    withCredentials: true, // ✅ Important for Laravel Sanctum or session-based auth
                });

                if (response.data.authenticated && response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                    router.push('/');
                }
            } catch (error) {
                console.error("Error checking login:", error);
                setUser(null);
            }
        };
        getCsrfToken();
        checkLogin();
    }, [router,]);
    useEffect(() => {

        if (user) {

        }
    }, [user]);
    useEffect(() => {
        getCsrfToken();
    }, [getCsrfToken]);


    const [categories, setActive] = useState<{ name: string; isActive: boolean }[]>(
        [
            'All',
            'Mata Islands',
            'Nature and Eco',
            'Adventure',
            'Gastronomy',
            'Recreational',
            'Religious and Spiritual',
            'Others',
            'Accommodation',
            'Cultural and Heritage'
        ].map(name => ({ name, isActive: name === 'All' }))
    );
    const toggleCategory = (categoryName: string) => {
        setLoaded(false);

        setActive(prevCategories => {
            if (categoryName === "All") {
                // If "All" is selected, deactivate everything else and activate "All"
                return prevCategories.map(category => ({
                    ...category,
                    isActive: category.name === "All"
                }));
            } else {
                // Toggle selected category
                const updatedCategories = prevCategories.map(category =>
                    category.name === categoryName
                        ? { ...category, isActive: !category.isActive }
                        : category.name === "All"
                            ? { ...category, isActive: false } // Deactivate "All"
                            : category
                );

                // Check if no category is active after toggle
                const isAnyActive = updatedCategories.some(cat => cat.isActive);
                if (!isAnyActive) {
                    // If none are active, reactivate "All"
                    return updatedCategories.map(category => ({
                        ...category,
                        isActive: category.name === "All"
                    }));
                }

                return updatedCategories;
            }
        });
    };

    useEffect(() => {

        const fetchFilteredDestinations = async () => {
            const selectedCategories = categories
                .filter(category => category.isActive && category.name !== "All")
                .map(category => category.name);
            try {
                const response = await Axios_Open.post('/api/destinations/recommendationByTag', {
                    categories: selectedCategories, // Send selected categories to the backend 
                });
                const data = response.data as DestinationCol[];
                setDestinationItem((prevItems) =>
                    data.map((dest, index) => ({
                        id: dest.id,
                        thumbnail: dest.thumbnail,
                        name: dest.name,
                        description: dest.description,
                        rows: prevItems[index]?.rows ?? 1, // Preserve existing rows, default to 1
                        cols: prevItems[index]?.cols ?? 1, // Preserve existing cols, default to 1
                    }))
                ); setLoaded(true);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };
        fetchFilteredDestinations();
    }, [categories]);

    const isMobileWidth = useMediaQuery("(max-width:700px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");

    const OnSaveFavorate = async (id: number) => {
        try {
            const allCookies = Cookies.get();
            const response = await Axios_Open.post('/api/store/user/favorate', {
                destination_id: id, // Send selected categories to the backend 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true,
            },

            );
            const data = response.data.result;
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    }


    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderMenu></HeaderMenu>
            <Box sx={{ width: '100%', m: 0, bgcolor: theme.palette.white.main, position: 'absolute' }}>
                <Box sx={{ pt: 15, width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '80%', mx: 'auto', my: 0 }}>
                    <Box>
                        {categories.map((val) => {
                            const handleClick = () => {
                                console.info('You clicked the Chip.');
                                toggleCategory(val.name);
                            };

                            return (
                                <Chip key={val.name} label={val.name} onClick={handleClick}
                                    sx={{
                                        px: isMobileWidth ? 1 : isTabWidth ? 1 : 3,
                                        py: isMobileWidth ? 1 : isTabWidth ? 1 : 4,
                                        m: 1,
                                        backgroundColor: val.isActive ? theme.palette.button1.main : '',
                                        borderRadius: 10,
                                        fontSize: 'medium',
                                        color: val.isActive ? theme.palette.white_text.main : '',
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: theme.palette.action.selected,
                                        '&:hover': {
                                            opacity: 0.8,
                                            backgroundColor: val.isActive ? theme.palette.button1.main : '',
                                            color: val.isActive ? theme.palette.white_text.main : '',
                                            borderWidth: 1,
                                            borderStyle: 'solid',
                                            borderColor: theme.palette.button1.main
                                        },
                                    }}
                                />
                            )
                        }
                        )}
                    </Box>
                    <Box>
                        <GridImageList OnSaveFavorate={OnSaveFavorate} itemData={itemDestination} isDestLoaded={isDestLoaded}></GridImageList>
                    </Box>
                    <Box sx={{
                        pb: 5,
                    }}>
                    </Box>
                </Box>
                <Footer></Footer>
            </Box>
        </ThemeProvider>
    );
}
