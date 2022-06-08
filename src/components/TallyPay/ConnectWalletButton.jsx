import { useSelector, useDispatch } from "react-redux";
import { initWeb3 } from "../../state";

const ConnectWalletButton = ({ price1, price2 }) => {
  const dispatch = useDispatch();
  async function connect() {
    dispatch(initWeb3({}));
  }

  const address = useSelector((state) => {
    return state.adoptReducer.address;
  });

  return (
    <>
      <button
        onClick={connect}
        type="button"
        className="mr-2 mb-2 w-60 rounded-full bg-tp_gradient px-5 py-3 text-center text-sm font-medium text-white"
      >
        {address
          ? `${address.slice(0, 4)}...${address.slice(-4)}`
          : `Connect Wallet`}
      </button>

      {price1 && (
        <span className="mt-3 space-x-2 text-sm text-white">
          <span>Price :</span>
          <span className="text-tallyPay-primaryText">
            {price1 &&
              `${(price1 / 1000000000000000000).toFixed(
                2
              )} BNB or ${price2} Tally`}
          </span>
        </span>
      )}
    </>
  );
};

export default ConnectWalletButton;
