import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { BenefitItem } from '../../components';
const FeaturesSection = () => {
    return (
        <section className='bg-primary-background px-4 pt-6'>
            <h2 className='mb-8 text-center text-2xl font-semibold text-primary-darkText'>
                Our Exchange Features to Look Forward to
            </h2>

            <div className='mt-6'>
                <Slider
                    dots={true}
                    infinite={true}
                    autoplay={false}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                            },
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                    ]}
                >
                    <BenefitItem />
                    <BenefitItem />
                    <BenefitItem />
                </Slider>
            </div>
        </section>
    );
};

export default FeaturesSection;
