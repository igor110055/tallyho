import { Carousel } from 'react-responsive-carousel';
import gif1 from '../../assets/images/gifs/Tally-ho_icon2.gif';
import gif2 from '../../assets/images/gifs/tally-ho_MOD.gif';
import gif3 from '../../assets/images/gifs/TallySWAPHomePage.gif';

const SlideshowHome = () => {
    return (
        <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            centerMode={true}
            centerSlidePercentage={100}
        >
            <div className='mx-auto w-full max-w-md'>
                <img src={gif1} alt='gif1' className='w-full' />
            </div>
            <div className='mx-auto w-full max-w-md'>
                <img src={gif2} alt='gif2' className='w-full' />
            </div>
            <div className='mx-auto w-full max-w-md'>
                <img src={gif3} alt='gif3' className='w-full' />
            </div>
        </Carousel>
    );
};

export default SlideshowHome;
