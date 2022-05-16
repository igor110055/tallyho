const ConnectWalletButton = () => {
    return (
        <>
            <button
                type='button'
                className='mr-2 mb-2 w-60 rounded-full bg-tp_gradient px-5 py-3 text-center text-sm font-medium text-white'
            >
                Connect Wallet
            </button>

            <span className='mt-3 space-x-2 text-sm text-white'>
                <span>Price :</span>
                <span className='text-tallyPay-primaryText'>
                    1 BNB or 10,000 Tally
                </span>
            </span>
        </>
    );
};

export default ConnectWalletButton;
