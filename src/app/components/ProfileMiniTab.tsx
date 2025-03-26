
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import DestinationProfile from './profile/DestinationProfile';
import PhotosDestinationProfile from './profile/PhotosDestinationProfile';
import FavorateDestinationList from './profile/FavorateDestinationList';
import { SyntheticEvent, useEffect, useState } from 'react';
import { DestinationCol, Favorate, ProfileType, TagsDestination, UserIslands } from '../type';
import { Button, IconButton, ImageList, Menu, MenuItem, useMediaQuery } from '@mui/material';
import AboutProfile from './profile/AboutProfile';
import PostDestinationProfile from './profile/PostDestinationProfile';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fade from '@mui/material/Fade';
import { UserPost } from "@/app/type";
import Cookies from "js-cookie";
import Axios_Open from '../lib/Axios_Open';
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

export default function ProfileMiniTab({ profile, islands, Tags, posts, favorate }: { profile: ProfileType | null | undefined; islands: UserIslands[]; Tags: TagsDestination[], posts: UserPost[], favorate: Favorate[] }) {
    const theme = useTheme();
    const [value, setValue] = useState<number>(0);
    const [isEdit, setEdit] = useState<boolean>(false);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
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

    const editProfile = () => {
        setValue(4);
        setEdit(true);
    }
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
                            onClick={editProfile}
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

                            <MenuItem onClick={editProfile}>Edit Profile</MenuItem>
                        }
                        <MenuItem onClick={handleClose}>Create New Island</MenuItem>
                        <MenuItem onClick={handleClose}>Upload 360 Photo</MenuItem>
                        <MenuItem onClick={handleClose}>Create Post</MenuItem>
                    </Menu>
                </Box>
            </Box>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={0} theme={theme}>
                <DestinationProfile islands={islands} Tags={Tags}></DestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={1} theme={theme}>
                <PhotosDestinationProfile posts={posts} ></PhotosDestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={2} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}
                <PostDestinationProfile posts={posts}></PostDestinationProfile>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={3} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}

                <ImageList
                    sx={{ width: isMobileWidth ? '100%' : isTabWidth ? '100%' : '80%', pb: 5, px: isMobileWidth ? 1 : isTabWidth ? 1 : 5, mx: 'auto' }}
                    variant="quilted"
                    cols={4}
                >
                    {favorate.map((item, index) => {
                        return (

                            <FavorateDestinationList key={index} index={index} item={item} isDestLoaded={isDestLoaded}></FavorateDestinationList>
                        );
                    })
                    }
                </ImageList>
            </CustomTabPanel>
            <CustomTabPanel isMobileWidth={isMobileWidth} value={value} index={4} theme={theme}>
                {/* <DestinationProfile></DestinationProfile> */}
                <AboutProfile profile={profile}></AboutProfile>
            </CustomTabPanel>
        </Box>
    );
}
