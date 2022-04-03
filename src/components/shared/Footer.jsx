import {
    aboutItems,
    productItems,
    serviceItems,
    socialItems,
} from '../../assets/data/footerData';
import FooterToggle from './FooterToggle';
import btally from '../../assets/images/btally.png';
import Tooltip from 'rc-tooltip';

function MetaMaskIcon(props) {
    return (
        <svg
            viewBox='0 0 35 33'
            width='22px'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-primary fill-white'
            {...props}
        >
            <path
                d='M32.958 1l-13.134 9.718 2.442-5.727z'
                fill='#e17726'
                stroke='#e17726'
            />
            <g fill='#e27625' stroke='#e27625'>
                <path d='M2.663 1l13.017 9.809-2.325-5.818zM28.23 23.534l-3.495 5.338 7.483 2.06 2.143-7.282zM1.273 23.65l2.13 7.282 7.47-2.06-3.481-5.339z' />
                <path d='M10.47 14.515L8.393 17.65l7.405.337-.247-7.97zM25.15 14.515l-5.157-4.587-.169 8.06 7.405-.337zM10.873 28.872l4.482-2.164-3.858-3.006zM20.266 26.708l4.469 2.164-.61-5.17z' />
            </g>
            <path
                d='M24.735 28.872l-4.47-2.164.365 2.903-.04 1.23zM10.873 28.872l4.157 1.97-.026-1.231.351-2.903z'
                fill='#d5bfb2'
                stroke='#d5bfb2'
            />
            <path
                d='M15.108 21.784l-3.715-1.088 2.624-1.205zM20.513 21.784l1.09-2.293 2.638 1.205z'
                fill='#233447'
                stroke='#233447'
            />
            <path
                d='M10.873 28.872l.65-5.338-4.131.116zM24.098 23.534l.637 5.338 3.494-5.222zM27.23 17.65l-7.406.338.689 3.796 1.09-2.293 2.638 1.205zM11.393 20.696l2.624-1.205 1.091 2.293.689-3.796-7.405-.337z'
                fill='#cc6228'
                stroke='#cc6228'
            />
            <path
                d='M8.392 17.65l3.105 6.052-.104-3.006zM24.241 20.696l-.117 3.006 3.105-6.051zM15.797 17.988l-.689 3.796.87 4.484.196-5.91zM19.824 17.988l-.364 2.358.182 5.922.87-4.484z'
                fill='#e27525'
                stroke='#e27525'
            />
            <path
                d='M20.513 21.784l-.87 4.484.623.44 3.858-3.006.117-3.006zM11.393 20.696l.104 3.006 3.858 3.006.624-.44-.87-4.484z'
                fill='#f5841f'
                stroke='#f5841f'
            />
            <path
                d='M20.59 30.842l.04-1.231-.338-.285h-4.963l-.325.285.026 1.23-4.157-1.969 1.455 1.192 2.95 2.035h5.053l2.962-2.035 1.442-1.192z'
                fill='#c0ac9d'
                stroke='#c0ac9d'
            />
            <path
                d='M20.266 26.708l-.624-.44H15.98l-.624.44-.35 2.903.324-.285h4.963l.338.285z'
                fill='#161616'
                stroke='#161616'
            />
            <path
                d='M33.517 11.353L34.62 5.99 32.958 1l-12.692 9.394 4.885 4.12 6.898 2.01 1.52-1.776-.663-.48 1.053-.958-.806-.622 1.052-.804zM1 5.989l1.117 5.364-.714.532 1.065.803-.805.622 1.052.959-.663.48 1.52 1.774 6.899-2.008 4.884-4.12L2.663 1z'
                fill='#763e1a'
                stroke='#763e1a'
            />
            <path
                d='M32.049 16.523l-6.898-2.008 2.078 3.136-3.105 6.051 4.106-.052h6.131zM10.47 14.515l-6.898 2.008-2.3 7.127h6.12l4.105.052-3.105-6.051zM19.824 17.988l.442-7.594 2-5.403h-8.911l2 5.403.442 7.594.169 2.384.013 5.896h3.663l.013-5.896z'
                fill='#f5841f'
                stroke='#f5841f'
            />
        </svg>
    );
}

const Footer = () => {
    return (
        <footer className='bg-primary-dark px-4 py-8'>
            <div className='container mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-4 xl:grid-cols-6'>
                {/* Info Card */}
                <div className='flex flex-row gap-4 rounded-2xl bg-[#3c3c3c] p-4 md:col-span-4 xl:col-span-2'>
                    <div className='flex flex-col justify-between space-y-3 md:space-y-0'>
                        <div>
                            <div className='flex flex-row'>
                                <img src={btally} alt='logo' />
                                <span className='ml-2 text-sm uppercase text-primary-brand'>
                                    Tally
                                </span>
                            </div>
                            <span className='font-semibold text-white'>
                                $1.076
                            </span>
                        </div>

                        <div className='flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2'>
                            <button className='grid h-10 w-10 place-items-center rounded-full border-none bg-[#dcdcdc] outline-none'>
                                <MetaMaskIcon />
                            </button>

                            <a
                                target='_blank'
                                rel='noopener noreferrer'
                                href='https://exchange.tally.org/#/swap?outputCurrency=0x965f527d9159dce6288a2219db51fc6eef120dd1'
                                className='rounded-lg bg-[#f93b5d] px-2 py-2 text-xs font-bold text-white'
                            >
                                Buy TALLY
                            </a>
                        </div>
                    </div>

                    <div className='grow space-y-3 font-bold text-white'>
                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-[#c3c3c3]'>
                                Max supply:
                            </span>
                            <span className='text-xs font-bold'>
                                1, 000, 000, 000
                            </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-[#c3c3c3]'>
                                Total supply:
                            </span>
                            <span className='text-xs font-bold'>
                                1, 000, 000, 000
                            </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-[#c3c3c3]'>
                                Circulating supply:
                            </span>
                            <span className='text-xs font-bold'>
                                478, 000, 000
                            </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-[#c3c3c3]'>
                                Total Burned:
                            </span>
                            <span className='text-xs font-bold'>0</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-xs font-bold text-[#c3c3c3]'>
                                Market Cap:
                            </span>
                            <span className='text-xs font-bold'>
                                $647, 000, 000
                            </span>
                        </div>
                    </div>
                </div>

                <div className=' my-2 md:mx-auto md:mt-4 md:px-5 xl:px-10'>
                    <FooterToggle title='Service' items={serviceItems} />
                </div>
                <div className=' my-2 md:mx-auto md:mt-4 md:px-5 xl:px-10'>
                    <FooterToggle title='Products' items={productItems} />
                </div>
                <div className=' my-2 md:mx-auto md:mt-4 md:px-5 xl:px-10'>
                    <FooterToggle title='About' items={aboutItems} />
                </div>

                <div className='ml-0 mr-4 md:col-span-2 md:mt-4 md:ml-6 xl:col-span-1 xl:ml-auto'>
                    <h4 className='text-base font-semibold text-white'>
                        Community
                    </h4>
                    <div className='group mt-4 flex items-center space-x-3 text-white'>
                        {/* <FaTelegramPlane className='cursor-pointer transition duration-200 hover:text-white/60' /> */}
                        {socialItems.map(item => {
                            const { children, href, Icon, title } = item;

                            if (children && children.length) {
                                return (
                                    <Tooltip
                                        placement='topLeft'
                                        trigger={['hover']}
                                        overlay={
                                            <div
                                                className='flex flex-col items-center space-y-2'
                                                key={title}
                                            >
                                                {children.map(child => {
                                                    const { title, href } =
                                                        child;
                                                    return (
                                                        <a
                                                            href={href}
                                                            target='_blank'
                                                            rel='noopener noreferrer'
                                                            className='flex items-center text-xs font-semibold text-white'
                                                            key={title}
                                                        >
                                                            {title}
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        }
                                        overlayClassName='bg-[#888888] max-w-fit rounded-lg p-4'
                                        destroyTooltipOnHide
                                        arrowContent
                                        key={title}
                                    >
                                        <Icon
                                            key={title}
                                            className='cursor-pointer transition duration-200 hover:text-white/60'
                                        />
                                    </Tooltip>
                                );
                            } else {
                                return (
                                    <a
                                        href={href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='cursor-pointer transition duration-200 hover:text-white/60'
                                        title={title}
                                        key={title}
                                    >
                                        <Icon
                                            key={title}
                                            className='cursor-pointer transition duration-200 hover:text-white/60'
                                        />
                                    </a>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
