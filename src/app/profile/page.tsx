'use client'
import Box from '@mui/material/Box';
import HeaderMenu from '../components/HeaderMenu';
import { useEffect, useMemo, useState } from 'react';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material/styles';
import { Avatar, CssBaseline, Grid2, Skeleton, Typography, useMediaQuery } from '@mui/material';
import bgProfile from '../../Images/landingpageBG.png';
import ProfileMiniTab from '../components/ProfileMiniTab';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import Axios_Open from '../lib/Axios_Open';
import { Favorate, ProfileType, TagsDestination, UserData, UserIslands, UserIslandsDestination, UserPost } from '../type';
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

export default function Profile() {

    const [mode] = useState<PaletteMode>("light"); // Use a function to ensure consistent initial state
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
    const isMobileWidth = useMediaQuery("(max-width:700px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const [user, setUser] = useState<UserData | null | undefined>();
    const [profile, setProfile] = useState<ProfileType | null | undefined>();
    const [itemData, setItemData] = useState<UserIslands[]>([]);
    const [Tags, setTags] = useState<TagsDestination[]>([]);
    const router = useRouter();
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await Axios_Open.get("/api/www/checkAuth", {
                    withCredentials: true, // ✅ Important for Laravel Sanctum or session-based auth
                });

                console.log(response.data);
                if (response.data.authenticated && response.data.user) {
                    setUser(response.data.user);
                    setProfile(response.data.profile as ProfileType);
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

                    const newData = response.data.userIslands as UserIslands[];
                    console.log("New Data Being Set:", newData);
                    if (newData.length > 0) {
                        // Create a completely new array with updated first element
                        const updatedData = newData.map((island, index) =>
                            index === 0
                                ? {
                                    ...island,
                                    destination: {
                                        ...island.destination,
                                        rows: 2,
                                        cols: isMobileWidth ? 4 : isTabWidth ? 4 : 6,
                                    }
                                }
                                : island
                        );

                        console.log("Modified NewData:", updatedData);
                        setItemData(updatedData);

                    }

                } else {
                }
            } catch (error) {
                console.error("Error checking login:", error);
            }
        };
        getIsland();

    }, []);

    useEffect(() => {
        const getTag = async ({ updatedData }: { updatedData: UserIslands[] }) => {
            const allCookies = Cookies.get();
            console.log('itemData', updatedData); // Debugging output
            const uniqueTags = getUniqueTags({ updatedData }); // Get unique tags 
            console.log('uniqueTags', uniqueTags); // Debugging output
            Axios_Open.post("/api/get/tag", {
                tags: uniqueTags
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true, // Maintain session using cookies
            })
                .then(response => {
                    console.log('Tags', response.data as TagsDestination[]);
                    setTags(response.data as TagsDestination[]);
                })
                .catch(error => console.error("Error:", error));

        }
        getTag({ updatedData: itemData });
    }, [itemData]);
    const getUniqueTags = ({ updatedData }: { updatedData: UserIslands[] }): string[] => {
        const allTags = updatedData.flatMap(island => Array.isArray(island.destination.tags) ? island.destination.tags : []);
        return Array.from(new Set(allTags)); // Remove duplicates
    };

    const [posts, setPost] = useState<UserPost[]>([
    ]);
    const [favorateTemplate,] = useState<Favorate[]>([
        {
            destination: {
                thumbnail: '',
                name: 'Breakfast',
                description: 'Breakfast'
            },
            rows: 1,
            cols: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Burger'
            },
            rows: 2,
            cols: 2,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Camera',
            },
            rows: 1,
            cols: 1,
        },
        {

            destination: {
                thumbnail: '',
                name: 'Coffee'
            },
            rows: 1,
            cols: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Hats',
            },
            rows: 1,
            cols: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Honey',
                author: '@arwinneil'
            },
            rows: 2,
            cols: 2,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Basketball',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Fern',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Mushrooms'
            },
            rows: 2,
            cols: 2,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Tomato basil',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Sea star',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Bike',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Bike',
            },
            cols: 2,
            rows: 2,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Bike',
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Bike'
            },
            cols: 1,
            rows: 1,
        },
        {
            destination: {
                thumbnail: '',
                name: 'Bike',
                cols: 1,
                rows: 1,
            },
            cols: 1,
            rows: 1,
        },
    ]);
    const [favorate, setFavorate] = useState<Favorate[]>([
    ]);

    useEffect(() => {
        const getTag = async () => {
            const allCookies = Cookies.get();
            Axios_Open.post("/api/get/user/post", {
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true, // Maintain session using cookies
            })
                .then(response => {
                    console.log('Tags', response.data.post as UserPost[]);
                    setPost(response.data.post as UserPost[]);
                })
                .catch(error => console.error("Error:", error));

        }
        getTag()
    }, []);

    useEffect(() => {
        const getTag = async () => {
            const allCookies = Cookies.get();
            Axios_Open.post("/api/get/user/favorate", {
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                },
                withCredentials: true, // Maintain session using cookies
            })
                .then(response => {
                    const data = response.data.favorite as Favorate[];
                    setFavorate((prevItems) =>
                        data.map((dest, index) => ({  
                            id: dest.id,
                            thumbnail: dest.destination?.thumbnail,
                            name: dest.destination?.name,
                            destination:dest.destination,
                            description: dest.destination?.description,
                            rows: favorateTemplate[index] ? favorateTemplate[index].rows : 1, // Preserve existing rows, default to 1
                            cols: favorateTemplate[index] ? favorateTemplate[index].cols : 1, // Preserve existing cols, default to 1
                        }))
                    );
                })
                .catch(error => console.error("Error:", error));

        }
        getTag()
    }, []);

    useEffect(() => {

        console.log('favorite', favorate);
    }, [favorate]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                backgroundColor: theme.palette.black.main,
                width: "100%",
                position: 'absolute'
            }}>
                <HeaderMenu></HeaderMenu>
                <Box
                    sx={{
                        width: "100%",
                        position: 'absolute',
                        left: 0,
                        right: 0, top: isMobileWidth ? 70 : 65,
                        height: isMobileWidth ? '35vh' : isTabWidth ? '34vh' : '50vh',
                        backgroundImage: `url(${bgProfile.src})`,
                        backgroundPosition: "center 70%",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% auto',
                        opacity: 1
                    }}
                >
                    <Box sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(0,0,0,0.7)',
                    }}>

                        <Box sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: '100%',
                        }}>
                            {profile?.username ?
                                <Avatar alt={profile?.username} src={profile?.profile_picture} sx={{
                                    width: isMobileWidth ? '20%' : '10%',
                                    height: 'auto',
                                    aspectRatio: '1/1',
                                    mx: 'auto',
                                }}> </Avatar>
                                :
                                <Box sx={{
                                    width: isMobileWidth ? '20%' : '10%',
                                    height: 'auto',
                                    aspectRatio: '1/1',
                                    mx: 'auto',
                                    borderRadius: '100%',
                                    bgcolor: theme.palette.white.main,
                                }}  >
                                    <Skeleton animation='wave' variant="circular" sx={{
                                        width: '100%',
                                        height: 'auto',
                                        aspectRatio: '1/1',
                                        mx: 'auto',
                                    }}  ></Skeleton>
                                </Box>
                            }

                            <Typography fontSize={isMobileWidth ? 'large' : 'xx-large'} color='white' fontFamily={'inter'} fontWeight={'bold'}>
                                {user ? user?.fname.replace(/\b\w/g, (char) => char.toUpperCase()) + " " + user?.lname.replace(/\b\w/g, (char) => char.toUpperCase()) :
                                    <Skeleton animation='wave' variant="text" sx={{
                                        width: isMobileWidth ? '20%' : '10%',
                                        mx: 'auto',
                                        bgcolor: theme.palette.grey[400],
                                    }}  ></Skeleton>
                                }
                            </Typography>



                            <Typography fontSize={isMobileWidth ? 'medium' : 'x-large'} color='white' fontFamily={'inter'} fontWeight={'normal'}>
                                {profile ? '@' + profile.username : <Skeleton animation='wave' variant="text" sx={{
                                    width: isMobileWidth ? '20%' : '10%',
                                    mx: 'auto',
                                    bgcolor: theme.palette.grey[400],
                                }}  ></Skeleton>
                                }
                            </Typography>


                            <Grid2 container spacing={4} sx={{
                                width: isMobileWidth ? '100%' : '45%',
                                mx: 'auto', mt: 3
                            }}>
                                <Grid2 size={4}>
                                    <Typography color={theme.palette.white_text.main} fontSize={isMobileWidth ? 'small' : 'large'}>
                                        {profile ? <> <b>5,315 </b>followers</> :
                                            <Skeleton animation='wave' variant="text" sx={{
                                                width: isMobileWidth ? '80%' : '60%',
                                                mx: 'auto',
                                                bgcolor: theme.palette.grey[400],
                                            }}  ></Skeleton>
                                        }
                                    </Typography>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Typography color={theme.palette.white_text.main} fontSize={isMobileWidth ? 'small' : 'large'}>

                                        {profile ? <><b>5734</b> following</> :
                                            <Skeleton animation='wave' variant="text" sx={{
                                                width: isMobileWidth ? '80%' : '60%',
                                                mx: 'auto',
                                                bgcolor: theme.palette.grey[400],
                                            }}  ></Skeleton>
                                        }
                                    </Typography>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Typography color={theme.palette.white_text.main} fontSize={isMobileWidth ? 'small' : 'large'}>


                                        {profile ? <><b>20.7k</b> Page views</> :
                                            <Skeleton animation='wave' variant="text" sx={{
                                                width: isMobileWidth ? '80%' : '60%',
                                                mx: 'auto',
                                                bgcolor: theme.palette.grey[400],
                                            }}  ></Skeleton>
                                        }
                                    </Typography>
                                </Grid2>
                            </Grid2>

                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: isMobileWidth ? '40vh' : isTabWidth ? '38vh' : '54vh',
                    width: '100%',
                    height: 'auto',
                }}>

                    <ProfileMiniTab profile={profile} islands={itemData} Tags={Tags} favorate={favorate} posts={posts}>

                    </ProfileMiniTab>
                    <Box sx={{
                        bgcolor: theme.palette.white.main
                    }}>

                        <Footer></Footer>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider >
    )
}