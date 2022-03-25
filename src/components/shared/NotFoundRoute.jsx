import noticeImg from '../../assets/images/anim.png';

const NotFoundRoute = () => {
    return (
        <div className='h-screen bg-primary-sidebar pt-24'>
            <div className='flex justify-center'>
                <img
                    src={noticeImg}
                    alt='notice'
                    className='max-w-4xl object-contain'
                />
            </div>
        </div>
    );
};

export default NotFoundRoute;
