import { Carousel } from 'react-responsive-carousel';
import gif1 from '../../assets/images/gifs/Tally-ho_Home 2.gif';
import gif2 from '../../assets/images/gifs/tally-ho_MOD.gif';
import gif3 from '../../assets/images/gifs/Tally-ho_Home Page 3.gif';
import { useState } from 'react';

const SlideshowHome = () => {
    const [interval, setInterval] = useState(9000);

    const handleOnChange = (index, item) => {
        setInterval(item.props['data-interval']);
    };

    return (
        <Carousel
            showArrows={false}
            onChange={handleOnChange}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={interval}
            centerMode={true}
            centerSlidePercentage={100}
            className='w-fit'
        >
            <div
                className='mx-auto w-full max-w-md lg:ml-auto lg:mr-0'
                data-interval={9000}
            >
                <img src={gif1} alt='gif1' className='w-full' loading='lazy' />
            </div>
            <div
                className='mx-auto w-full max-w-md lg:ml-auto lg:mr-0'
                data-interval={7000}
            >
                <img src={gif2} alt='gif2' className='w-full' loading='lazy' />
            </div>
            <div
                className='mx-auto w-full max-w-md lg:ml-auto lg:mr-0'
                data-interval={10000}
            >
                <img src={gif3} alt='gif3' className='w-full' loading='lazy' />
            </div>
        </Carousel>
    );
};

export default SlideshowHome;
