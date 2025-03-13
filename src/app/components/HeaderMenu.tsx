'use client'

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu'; 
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import Axios_Open from '../lib/Axios_Open';
import Cookies from "js-cookie";
import iconLogo from '@/Images/openisland icon.png';

export default function HeaderMenu() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const theme = useTheme();
    const Search = styled('div')(() => ({
        position: 'relative',
        display: 'flex',
        borderColor: theme.palette.gray.main,
        borderWidth: 1,
        borderStyle: 'solid',
        maxHeight: 40,
        borderRadius: 10,
        width: '80% !important',
        padding: 0, m: 0,
        maxWidth: '80vw',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(() => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.gray.main,
        m: 0,
    }));

    const StyledInputBase = styled(InputBase)(() => ({
        color: theme.palette.gray.main,
        padding: 0,
        m: 0,
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
    const handleLogout = async () => {
        try {
            const allCookies = Cookies.get();
           await Axios_Open.post("/api/logout",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': allCookies['XSRF-TOKEN'],
                        'CSRF-TOKEN': allCookies['XSRF-TOKEN'],
                    },
                    withCredentials: true, // Maintain session using cookies
                });
            // console.log("Session saved:", response.data);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu'; 
    const mobileMenuId = 'primary-search-account-menu-mobile'; 
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                position: 'fixed',
                backgroundColor: theme.palette.white.main, zIndex: 99,
                p: 0,m:0

            }}>
                <Toolbar sx={{ p: 0 }}>
                    {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 1, ml: 1 }}
                >
                    <MenuIcon color='disabled' />
                </IconButton> */}
                    <Typography
                        variant="h6"
                        noWrap

                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', color: theme.palette.button1.main, width: 150 } }}
                    >
                        Open Island
                    </Typography>

                    <IconButton
                        sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <img src={iconLogo.src} alt='' width={50} height={50} style={{
                            filter: "drop-shadow(1px 1px 1px black) drop-shadow(-1px -1px 1px black)", // Adjust thickness and color
                        }}
                        ></img>
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search
                    >
                        <SearchIconWrapper >
                            <SearchIcon
                                sx={{
                                    color: theme.palette.gray.main,
                                    padding: 0,
                                    m: 0,
                                }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            fullWidth
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon sx={{ color: theme.palette.gray.main }} />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon sx={{ color: theme.palette.gray.main }} />
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

        </Box>

    )
}