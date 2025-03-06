
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { Destination } from "../type";
export default function SaveIsland({ selectedIsland }: { selectedIsland: Destination[] }) {

    const theme = useTheme(); // ✅ Use the theme provided by RootLayout
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgb(0, 119, 139),rgb(129, 187, 177))'
        }}>
            <Grid2 container spacing={1} sx={{
                width:'90%',mx:'auto'
            }}>

                <Grid2 size={9}>
                    <Box  sx={{
                        width: '60%', ml: 10, mt: 25, borderWidth: 1, borderColor: 'black', borderStyle: 'solid',
                    }}>
                        {selectedIsland.map((island, index) => {

                            return (
                                <Box key={index} component={'img'} src={island.thumbnail} sx={{
                                    width: 'auto', maxWidth: 250, maxHeight: 250, borderWidth: 1, borderColor: 'black', borderStyle: 'solid',
                                    
                                }}></Box>
                            )
                        })}
                    </Box>
                </Grid2>
                <Grid2 size={3}>
                    <Box sx={{
                        width: '100%',
                        maxWidth: 300,
                        mt: '60%',
                        borderRadius: 5,
                        padding: 5,
                        bgcolor: theme.palette.white.main,
                        boxShadow: "0 0 10px -2px gray"
                    }}>
                        <Typography variant="h4">

                            Your Dream Island Awaits!
                        </Typography>
                        <Typography sx={{
                            width: '80%',
                            mx: 'auto',
                            mt: 2
                        }}>
                            Explore every corner, uncover hidden gems,
                            and let the adventure unfold.
                        </Typography>
                        <Button variant="contained" sx={{
                            borderRadius: 10,
                            py: 1,
                            px: 4,
                            mt: 5

                        }}>Save Island</Button>

                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}