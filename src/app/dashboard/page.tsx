'use client'
import { styled, alpha, useTheme, createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { CssBaseline } from '@mui/material';
import iconLogo from '../../Images/openisland icon.png';
import { useEffect, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);

    const [mode, setMode] = useState<PaletteMode>(() => "light"); // Use a function to ensure consistent initial state
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
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
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const [imgIcon, setImgIcon] = useState<StaticImageData | null>(null);
    useEffect(() => {
        setImgIcon(iconLogo);
    }, []);
    return (

        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{
                    position: 'fixed',
                    backgroundColor: theme.palette.white.main, zIndex: 99,
                    p: 0

                }}>
                    <Toolbar sx={{ p: 0 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 1, ml: 1 }}
                        >
                            <MenuIcon color='disabled' />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', color: theme.palette.button1.main, } }}
                        >
                            Open Island
                        </Typography>
                        <Image src={imgIcon?.src ? imgIcon?.src : 'http://localhost:3000/img.png'} height={40} width={40} alt='logo'

                            style={{
                                height:'100%', 
                                padding:3,
                                filter: "drop-shadow(1px 1px 0px black) drop-shadow(-1px -1px 0px black)", // ✅ Black stroke effect
                            }}></Image>
                        <Box sx={{ flexGrow: 1 }} />
                        <Search sx={{ display: 'flex', borderColor: theme.palette.gray.main, borderWidth: 1, borderStyle: 'solid', maxHeight: 40, borderRadius: 10, width: '100% !important', padding: 0, m: 0, maxWidth: '60vw' }} >
                            <SearchIconWrapper sx={{ color: theme.palette.gray.main, m: 0, }} >
                                <SearchIcon sx={{ color: theme.palette.gray.main, padding: 0, m: 0, }} />
                            </SearchIconWrapper>
                            <StyledInputBase sx={{ color: theme.palette.gray.main, padding: 0, m: 0 }}
                                fullWidth
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <MailIcon sx={{ color: theme.palette.gray.main }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge badgeContent={17} color="error">
                                    <NotificationsIcon sx={{ color: theme.palette.gray.main }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle sx={{ color: theme.palette.gray.main }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon sx={{ color: theme.palette.gray.main }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.white.main }}>

            </Box>
        </ThemeProvider>
    );
}
