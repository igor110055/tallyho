import noticeImg from '../../assets/images/notfoundpage.png';

const NotFoundRoute = () => {
    return (
        <div className='h-screen bg-primary-sidebar pt-24'>
            <div className='flex justify-center'>
                <img
                    src={noticeImg}
                    alt='notice'
                    className='object-contain md:max-w-4xl'
                />
            </div>
        </div>
    );
};

export default NotFoundRoute;
