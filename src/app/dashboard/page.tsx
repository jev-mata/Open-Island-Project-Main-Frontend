'use client';
import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles';
import HeaderMenu from '../components/HeaderMenu';
import { Chip, CssBaseline, Divider } from '@mui/material';
import Axios_Open from '../lib/Axios_Open';
import { UserData } from '../type';
import { useRouter } from 'next/navigation';
import GridImageList from '../components/GridImageList';
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
    const [mode ] = useState<PaletteMode>("light"); // Use a function to ensure consistent initial state

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

        checkLogin();
    }, [router]);
    useEffect(()=>{
        if(user){

        }
    },[user])
     
    const [categories,setActive] = useState<{ name: string; isActive: boolean }[]>(
        [
          'all',
          'Mata islands',
          'Nature and Eco',
          'Adventure',
          'Gastronomy',
          'Recreational',
          'Religious and Spiritual',
          'Others',
          'Accommodation',
          'Cultural and Heritage'
        ].map(name => ({ name, isActive: false }))
      );
      const toggleCategory = (categoryName: string) => {
        setActive(prevCategories =>
          prevCategories.map(category =>
            category.name === categoryName
              ? { ...category, isActive: !category.isActive }
              : category
          )
        );
      };
          return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HeaderMenu></HeaderMenu>
            <Box sx={{ width: '100%', m: 0, bgcolor: theme.palette.white.main }}>
                <Box sx={{ pt: 15, width: '80%', mx: 'auto',my:0 }}>
                    <Box>
                        {categories.map((val) => {
                            const handleClick = () => {
                                console.info('You clicked the Chip.');
                                toggleCategory(val.name);
                            };
                            
                                return ( 
                                    <Chip key={val.name} label={val.name} onClick={handleClick}
                                        sx={{
                                            px: 3,
                                            py: 4,
                                            m: 1,
                                            backgroundColor: val.isActive ? theme.palette.button1.main : '',
                                            borderRadius: 10,
                                            fontSize: 'medium',
                                            color: val.isActive  ? theme.palette.white_text.main : '',
                                            borderWidth:1,
                                            borderStyle:'solid',
                                            borderColor: theme.palette.action.selected,
                                            '&:hover': {
                                                opacity:0.8,
                                                backgroundColor: val.isActive  ? theme.palette.button1.main : '',
                                                color: val.isActive  ? theme.palette.white_text.main : '',
                                                borderWidth:1,
                                                borderStyle:'solid',
                                                borderColor:theme.palette.button1.main 
                                            },
                                        }}
                                    />
                                )
                            }
                        )}
                    </Box>
                    <Box>
                        <GridImageList></GridImageList>
                    </Box>
                    <Divider  sx={{
                        pb:5,
                        height:21
                    }}></Divider>
                    <Box sx={{
                        pb:5,
                    }}>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
