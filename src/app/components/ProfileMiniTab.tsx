
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import DestinationProfile from './profile/DestinationProfile';
import PhotosDestinationProfile from './profile/PhotosDestinationProfile';
import FavorateDestinationList from './profile/FavorateDestinationList';
import { SyntheticEvent, useState } from 'react';
import { DestinationCol } from '../type';
import { Button, IconButton, ImageList, Menu, MenuItem, useMediaQuery } from '@mui/material';
import AboutProfile from './profile/AboutProfile';
import PostDestinationProfile from './profile/PostDestinationProfile';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fade from '@mui/material/Fade';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    isMobileWidth: boolean;
    theme: Theme;
}
const tabs = ['Islands', 'Photos', 'Posts', 'Favorites', 'About']
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, isMobileWidth, theme, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`Profile-tabpanel-${index}`}
            aria-labelledby={`Profile-tab-${index}`}
            {...other}

        >
            {value === index && <Box sx={{
                p: 3, mt: isMobileWidth ? 5 : 15, pb: isMobileWidth ? 5 : 20,
            }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `Profile-tab-${index}`,
        'aria-controls': `Profile-tabpanel-${index}`,
    };
}

export default function ProfileMiniTab() {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [itemData, setItemData] = useState<DestinationCol[]>([
        {
            thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            name: 'Breakfast',
            description: 'Breakfast',
            rows: 1,
            cols: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            name: 'Burger',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            name: 'Camera',
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            name: 'Coffee',
            rows: 1,
            cols: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            name: 'Hats',
            cols: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            name: 'Honey',
            author: '@arwinneil',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            name: 'Basketball',
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            name: 'Fern',
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            name: 'Mushrooms',
            rows: 2,
            cols: 2,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            name: 'Tomato basil',
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            name: 'Sea star',
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            name: 'Bike',
            cols: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            name: 'Bike',
            cols: 2,
            rows: 2,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
        {
            thumbnail: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            name: 'Bike',
            cols: 1,
            rows: 1,
        },
    ]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isMobileWidth = useMediaQuery("(max-width:700px)");
    const isTabWidth = useMediaQuery("(max-width:1100px)");
    const [isDestLoaded, setDestLoaded] = useState<boolean>(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ width: '100%', bgcolor: theme.palette.white.main, }}>
            <Box sx={{
                borderBottom: 1, width: '100%', borderColor: 'divider', zIndex: 99, position: 'sticky',
                top: 0,
            }}>
                <Box sx={{
                    bgcolor: theme.palette.white.main,
                    width: '100%', display: 'flex'
                }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Profile-tabs" sx={{
                        bgcolor: theme.palette.white.main, py: 2,

                        mx: 'auto',
                        color: theme.palette.button1.main,
                        "& .MuiTabs-indicator": {
                            backgroundColor: theme.palette.button1.main, // Custom indicator color
                        },
                        "& .MuiButtonBase-root": {
                            color: theme.palette.button1.main, // Custom indicator color
                        }

                    }}   >
                        {tabs.map((tab, index) =>
                            <Tab key={index} label={tab}  {...a11yProps(index)} color={theme.palette.button1.main} sx={{
                                px: isMobileWidth ? 0 : 3, fontSize: isMobileWidth ? 'medium' : 'large',
                                minWidth: isMobileWidth ? 'calc(100vw / 7)' : '',
                                "&.Mui-selected": {
                                    color: theme.palette.button1.main, // Keeps color when selected
                                    fontWeight: "bold", // Optional: Emphasize selected tab
                                }
                            }} />

                        )}


                    </Tabs>
                    {!isMobileWidth &&

                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}

                        >
                            Edit Profile
                        </Button>
                    }
                    <IconButton
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AddCircleIcon sx={{
                            fontSize: 'xx-large',
                            color: theme.palette.button1.main
                        }}></AddCircleIcon>
                    </IconButton>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {isMobileWidth &&

                            <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                        }
                        <MenuItem onClick={handleClose}>Create New Island</MenuItem>
                        <MenuItem onClick={handleClose}>Upload 360 Photo</MenuItem>
                        <MenuItem onClick={handleClose}>Create Post</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={0} theme={theme}>
                <DestinationProfile></DestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={1} theme={theme}>
                <PhotosDestinationProfile></PhotosDestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={2} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}
                <PostDestinationProfile></PostDestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={3} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}

                <ImageList
                    sx={{ width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '80%', pb: 5, px: isMobileWidth ? 1 : isTabWidth ? 1 : 5, mx: 'auto' }}
                    variant="quilted"
                    cols={4}
                >
                    {itemData.map((item, index) => {
                        return (

                            <FavorateDestinationList key={index} index={index} item={item} isDestLoaded={isDestLoaded}></FavorateDestinationList>
                        );
                    })
                    }
                </ImageList>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={4} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}
                <AboutProfile></AboutProfile>
            </CustomTabPanel>
        </Box>
    );
}
