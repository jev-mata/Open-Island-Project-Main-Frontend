
import ImageList from '@mui/material/ImageList';
import { DestinationCol } from '../type';
import CardImageDestination from './CardImageDestination';

export default function GridImageList({ itemData, isDestLoaded, OnSaveFavorate }: { itemData: DestinationCol[], isDestLoaded: boolean, OnSaveFavorate: (id: number) => void }) {

    return (
        <ImageList
            sx={{ width: '100%', pb: 5, px: 5 }}
            variant="quilted"
            cols={4}
        >
            {itemData.map((item, index) => {
                return (

                    <CardImageDestination OnSaveFavorate={OnSaveFavorate} key={index} index={index} item={item} isDestLoaded={isDestLoaded}></CardImageDestination>
                );
            })
            }
        </ImageList>



    );
}
