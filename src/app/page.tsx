'use client'
import { useState, useMemo, useEffect } from "react";
import { Destination, Pages, UserData } from "./type";
import LandingPage from "./components/LandingPage";
import QuestionPage from "./components/QuestionPage";
import LoadingPage from "./components/LoadingPage";
import RecommendationPage from "./components/RecommendationPage";
import SaveIsland from "./components/SaveIsland";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import logo from "../Images/logo.png";
import Login from "./components/Login";
import Signup from "./components/Signin";
import Axios_Open from "./lib/Axios_Open";
import { useRouter } from "next/navigation";
declare module "@mui/material/styles" {
  interface Palette {
    header: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
    button1: Palette["primary"];
    white_text: Palette["primary"];
    gradient_t: Palette["primary"];
    gradient_b: Palette["primary"];
  }
  interface PaletteOptions {
    header?: PaletteOptions["primary"];
    button1?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    white_text?: PaletteOptions["primary"];
    gradient_t?: PaletteOptions["primary"];
    gradient_b?: PaletteOptions["primary"];
  }
}

function Page() {
  const [currentPage, setCurrentPage] = useState<Pages>('Landing');
  const [targetPage, settargetPage] = useState<Pages>('Loading');

  const [selectedIsland, SetSelectedIsland] = useState<Destination[]>([]);
  const [mode] = useState<PaletteMode>(() => "light"); // Use a function to ensure consistent initial state
  const [user, setUser] = useState<UserData | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await Axios_Open.get("/api/www/checkAuth", {
          withCredentials: true, // ✅ Important for Laravel Sanctum or session-based auth
        });

        if (response.data.authenticated && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          router.push('/dashboard');
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking login:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkLogin();
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) { 
    }
  }, [user]);

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

  const [hover, setHover] = useState(false);
  const [signin, setSignin] = useState(false);
  const [login, setLogin] = useState(false); 
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (!hydrated) {

      setHydrated(true);
    }
  }, [hydrated]);

  if (!hydrated) {
    return null; // Prevent rendering until hydration is complete
  }
  return (
    <>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={{
          backgroundColor: theme.palette.header.main,
          boxShadow: 'none',
          marginTop: 3,
          position: 'fixed',
          zIndex: 5
        }}>
          <Container maxWidth="xl" sx={{

            backgroundColor: theme.palette.header.main,
          }}>
            <Toolbar disableGutters
              sx={{

                backgroundColor: theme.palette.header.main,
              }}
            >
              <Box component={'img'} src={logo.src} sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, width: "30%", minWidth: 200, height: 'auto' }} ></Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
                <Tooltip title="Login">

                  <Button variant={hover ? 'contained' : 'outlined'}
                    onMouseEnter={() => { setHover(true) }}
                    onMouseLeave={() => { setHover(false) }}
                    sx={{
                      borderRadius: 10,
                      borderWidth: 2,
                      bgcolor: hover ? theme.palette.white.main : '',
                      borderColor: theme.palette.white.main,
                      color: hover ? theme.palette.black.main : theme.palette.white.main,
                      transition: "all 0.2s  ease-in-out",
                      fontWeight: 'normal',
                      "&:hover": {
                        fontWeight: 'bold',
                        borderWidth: 3,
                      },
                    }}
                    onClick={() => { setLogin(true); setSignin(false) }}
                  >Login</Button>
                </Tooltip>
                <Tooltip title="SignUp">

                  <Button variant={hover ? 'outlined' : 'contained'}
                    onMouseEnter={() => { setHover(false) }}
                    onMouseLeave={() => { setHover(false) }}
                    onClick={() => { setLogin(false); setSignin(true) }}
                    sx={{
                      mx: 2, mr: 4,
                      borderRadius: 10,

                      borderWidth: 2,
                      bgcolor: hover ? 'none' : theme.palette.white.main,
                      borderColor: theme.palette.white.main,
                      color: hover ? theme.palette.white.main : theme.palette.black.main,
                      fontWeight: 'normal',
                      transition: "all 0.2s  ease-in-out",
                      "&:hover": {
                        opacity: 1,
                        borderWidth: 3,
                        fontWeight: 'bold',
                      },
                    }}>Signup</Button>
                </Tooltip>

              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {currentPage == 'Landing' ?
          <LandingPage  setPage={setCurrentPage}></LandingPage>
          : currentPage == 'Question' ?
            <QuestionPage setPage={setCurrentPage} settargetPage={settargetPage}></QuestionPage>
            : currentPage == 'Loading' ?
              <LoadingPage setPage={setCurrentPage} targetPage={targetPage}></LoadingPage>
              : currentPage == 'Recommendation' ?
                <RecommendationPage  setPage={setCurrentPage} settargetPage={settargetPage} setSelected={SetSelectedIsland}></RecommendationPage>
                : currentPage == 'Save' ?
                  <SaveIsland selectedIsland={selectedIsland}  setSignin={setSignin}></SaveIsland>
                  : ""
        }
        {signin && <Signup selectedIsland={selectedIsland} setLogin={setLogin} setSignin={setSignin}></Signup>}
        {login && <Login  setLogin={setLogin} setSignin={setSignin}></Login>}
      </ThemeProvider>
    </>
  );
}

export default Page;
