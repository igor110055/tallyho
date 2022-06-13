import { useEffect, useReducer, useState } from "react";
import {
  ConnectWalletButton,
  TPInput,
  TPPasswordInputs,
} from "../../components";
import { produce } from "immer";
import { debounce } from "lodash";
import Web3 from "web3";
import { Abi, conAddress, tokenAbi, tokenAddress } from "../../state/config";
import { useSelector, useDispatch } from "react-redux";
import { Recovery } from "../../state";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFormData":
      return produce(state, (draft) => {
        draft.formData[action.field] = action.value;
      });
    default:
      return state;
  }
};

const TallyWillsRecovery = () => {
  const dispatchA = useDispatch();
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(Abi, conAddress);
  const [refinedS2, setRefinedArray] = useState(false);
  const [IndexOfArray, setIndexOfArray] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    formData: {
      address: "",
      replaceAddress: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function abc() {
      web3.eth.getAccounts((e, r) => {
        contract.methods.getfullS3Array().call((a, b) => {
          console.log("array received", b);
          for (var i = 0; i < b.length; i++) {
            if (b[i].token == state.formData.address) {
              setRefinedArray(b[i]);
            }
            setIndexOfArray(i);
          }
        });
      });
    }

    if (state.formData.address.length == 42) {
      abc();
    }
  }, [state.formData.address]);

  console.log(IndexOfArray);

  const handleSubmit = async () => {
    dispatchA(
      Recovery({
        _address: state.formData.replaceAddress,
        _indexOfArray: IndexOfArray,
        phrase: state.formData.currentPassword,
      })
    );
  };

  const handleChange = debounce((e) => {
    dispatch({
      type: "updateFormData",
      field: e.target.name,
      value: e.target.value,
    });
  }, 500);

  return (
    <form
      className="container mx-auto max-w-xl pb-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(state);
      }}
    >
      <p className="my-4 text-white">
        Require an Inheritor to connect wallet to validate wallet change
        <span className="ml-2 text-tallyPay-primaryText">*</span>
      </p>
      <div className="mt-4 w-full">
        <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
          Loss of wallet address
        </p>
        <TPInput
          placeholder="Click here to paste token Address"
          name="address"
          dispatch={dispatch}
        />
      </div>

      <div className="mt-4 w-full">
        <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
          Replace lost wallet with new wallet address
        </p>
        <TPInput
          placeholder="Click here to paste your new wallet Address replacement"
          name="replaceAddress"
          dispatch={dispatch}
        />
      </div>

      <div className="mt-4 w-full">
        <input
          type="password"
          name="currentPassword"
          id="currentPassword"
          className="block w-full rounded-lg border border-tallyPay-gray-lighter bg-transparent p-2.5 text-sm text-white "
          placeholder="Current password"
          required
          onChange={handleChange}
        />
      </div>
      <br />
      <button style={{ color: "white" }} onClick={handleSubmit}>
        Submit{" "}
      </button>

      {/* <div className='mt-4 w-full'>
                <p className='inline-flex items-center text-sm font-normal text-tallyPay-primaryText'>
                    Replace lost wallet with new wallet address
                </p>
                <p className='mb-4 text-sm text-white'>
                    If you are using your replacement wallet for the first time
                    connect new wallet and enter a new password.
                </p>
                <TPPasswordInputs dispatch={dispatch} />
            </div> */}

      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <ConnectWalletButton />
        <p className="text-white">
          <span>Gas Fee: </span>
          <span className="text-tallyPay-primaryText">0.0003</span>
        </p>
      </div>

      <div className="mt-4 text-center text-sm text-white">
        <p className="text-tallyPay-primaryText">New wallet is owner</p>
        <p>Connect new wallet in private and create a new password</p>
      </div>
    </form>
  );
};

export default TallyWillsRecovery;
