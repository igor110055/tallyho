import { useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { initWeb3, S1DepositA, S1DepositB, S3DepositA } from "../../state";
import { conAddress, tokenAbi, tokenAddress } from "../../state/config";
import {
  ConnectWalletButton,
  SelectTokenCombobox,
  TPDoubleInput,
  TPInput,
  TPPasswordInputs,
} from "../../components";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { debounce } from "lodash";
import tokens from "../../assets/data/tokens";

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'addInheritor':
//             return produce(state, draft => {
//                 draft.formData.inheritors.push({
//                     id: nanoid(),
//                     email: '',
//                     address: '',
//                 });
//             });
//         case 'removeInheritor':
//             return produce(state, draft => {
//                 draft.formData.inheritors.splice(action.index, 1);
//             });
//         case 'updateInheritor':
//             return produce(state, draft => {
//                 draft.formData.inheritors[action.index][action.field] =
//                     action.value;
//             });
//         case 'updateFormData':
//             return produce(state, draft => {
//                 draft.formData[action.field] = action.value;
//             });
//         default:
//             return state;
//     }
// };
const reducer = (state, action) => {
  switch (action.type) {
    case "addInheritor":
      return produce(state, (draft) => {
        draft.formData.inheritors.push({
          id: nanoid(),
          email: "",
          amount: "",
          address: "",
        });
      });
    case "removeInheritor":
      return produce(state, (draft) => {
        draft.formData.inheritors.splice(action.index, 1);
      });
    case "updateInheritor":
      return produce(state, (draft) => {
        draft.formData.inheritors[action.index][action.field] = action.value;
      });
    case "updateFormData":
      return produce(state, (draft) => {
        draft.formData[action.field] = action.value;
      });
    case "updateReleaseDate":
      return produce(state, (draft) => {
        draft.formData.releaseDate[action.field] = action.value;
      });
    default:
      return state;
  }
};

const TallyWillsNew = () => {
  const dispatchA = useDispatch();

  const [SelectBNB, setSelectBNB] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    formData: {
      token: tokens[0],
      address: "",
      amount: "",
      amountUSD: "",
      email: "",
      password: "",
      confirmPassword: "",
      inheritors: [{ id: nanoid(), email: "", address: "", amount: "" }],
    },
  });

  const handleChangeToken = debounce((e) => {
    dispatch({
      type: "updateFormData",
      field: "token",
      value: e,
    });
  }, 500);

  const balance = useSelector((state) => {
    return state.adoptReducer.balance;
  });

  const ethBalance = useSelector((state) => {
    return state.adoptReducer.ethBalance;
  });

  const address = useSelector((state) => {
    return state.adoptReducer.address;
  });

  const TallyPrice = useSelector((state) => {
    return state.adoptReducer.TallyPrice;
  });

  const BNBPrice = useSelector((state) => {
    return state.adoptReducer.BNBPrice;
  });

  const web3 = useSelector((state) => {
    return state.adoptReducer.web3;
  });

  const SPBNB = useSelector((state) => {
    return state.adoptReducer.prices3;
  });

  const handleApprove = async () => {
    const asset = new web3.eth.Contract(tokenAbi, state.formData.address);
    const tally = new web3.eth.Contract(tokenAbi, tokenAddress);
    var _amounts = state.formData.inheritors.map((v, e) => v.amount);
    var _totalAmount = _amounts.reduce(
      (sum, val) => Number(sum) + Number(val),
      0
    );
    if (!SelectBNB) {
      asset.methods
        .approve(conAddress, web3.utils.toWei(_totalAmount.toString(), "ether"))
        .send({ from: address });
      tally.methods
        .approve(conAddress, web3.utils.toWei(SPBNB[3].toString(), "ether"))
        .send({ from: address });
    } else {
      asset.methods
        .approve(conAddress, web3.utils.toWei(_totalAmount.toString(), "ether"))
        .send({ from: address });
    }
  };

  const handleSubmit = async () => {
    if (state.formData.password.length >= 14) {
      var a = state.formData;
      var _beneficiaries = a.inheritors.map((v, e) => v.address);
      var _amounts = a.inheritors.map((v, e) => v.amount);
      var _totalAmount = _amounts.reduce(
        (sum, val) => Number(sum) + Number(val),
        0
      );

      dispatchA(
        S3DepositA({
          _token: state.formData.address,
          _beneficiaries,
          _amounts,
          _totalAmount,

          _phrase: state.formData.password,
          value: SelectBNB
            ? web3.utils.toWei(`${SPBNB[0] / 1000000000000000000}`, "ether")
            : 0,
        })
      );
    } else {
      window.alert(
        "Password must be numerical and should be more than 14 digit"
      );
    }
  };

  console.log("state date", state.formData);

  return (
    <form
      className="container mx-auto min-h-screen max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(state);
      }}
    >
      <div className="w-full">
        <SelectTokenCombobox
          tokens={tokens}
          onChange={handleChangeToken}
          selected={state.formData.token}
        />
      </div>

      <div className="mt-4 w-full">
        <TPInput
          label="Click here to paste Address"
          name="address"
          dispatch={dispatch}
        />
      </div>

      {/* <div className='mt-6 w-full'>
                <TPDoubleInput
                    label='Amount'
                    name='amount'
                    rightIcon={
                        // this will be the first 3 characters of the token name
                        state.formData.token.title.slice(0, 3).toUpperCase()
                    }
                    bottomLabel='Amount in USD'
                    bottomRightIcon='USD'
                    bottomName='amountUSD'
                    dispatch={dispatch}
                />
            </div> */}

      <div className="mt-6 w-full">
        {state.formData?.inheritors?.map((recipient, index) => (
          <div
            key={recipient.id}
            className="flex w-full items-start justify-between"
          >
            <div className="basis-2/3 pb-5">
              <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
                Recipient {index + 1} wallet address{" "}
                {index > 0 && (
                  <XIcon
                    className="ml-3 h-4 w-4 cursor-pointer text-tallyPay-red"
                    onClick={() =>
                      dispatch({
                        type: "removeInheritor",
                        index,
                      })
                    }
                  />
                )}
              </p>
              <TPDoubleInput
                placeholder="Click here to paste Address"
                dispatch={dispatch}
                bottomPlaceholder="Click here to paste Email Address"
                index={index}
                actionType="updateInheritor"
                name="address"
                bottomName="email"
              />
            </div>
            <div className="basis-1/4">
              <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
                Send Amount
              </p>
              <TPInput
                placeholder="0.00"
                name="amount"
                dispatch={dispatch}
                actionType="updateInheritor"
                index={index}
              />
              <p className="-mt-6 inline-flex items-center space-x-1 text-xs font-normal text-tallyPay-primaryText">
                <span className="text-white">Balance:</span>
                <span>3.22$</span>
              </p>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="mr-2 inline-flex items-center rounded-full bg-tallyPay-gray-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-tallyPay-gray-light focus:outline-none"
          onClick={() => dispatch({ type: "addInheritor" })}
        >
          <PlusIcon className="mr-2 -ml-1 h-5 w-5" />
          Add More Addresses
        </button>
      </div>

      <div className="mt-4 w-full">
        <TPInput label="Your Email Address" name="email" dispatch={dispatch} />
      </div>

      <div className="mt-6 w-full">
        <TPPasswordInputs
          dispatch={dispatch}
          password={state.formData.password}
          confirmPassword={state.formData.confirmPassword}
        />
      </div>

      <label style={{ color: "white" }}>Check for BNB and none for Tally</label>
      <input
        type="checkbox"
        onChange={(e) => {
          setSelectBNB(e.target.checked);
        }}
      ></input>
      <br />

      <button style={{ color: "white" }} onClick={handleApprove}>
        Approve{" "}
      </button>

      <br />

      <button style={{ color: "white" }} onClick={handleSubmit}>
        Submit{" "}
      </button>

      <div className="mt-6 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
        <div className="flex max-w-fit flex-col">
          <div className="flex items-center space-x-2 text-white">
            <span>Available :</span>
            <span>Tally {`${(balance / 1000000000000000000).toFixed(0)}`}</span>
          </div>
          <span className="self-end text-tallyPay-primaryText">
            {((balance / 1000000000000000000) * TallyPrice).toFixed(5)} USD
          </span>
        </div>

        <div className="flex items-start justify-end space-x-2 text-white">
          <span>Defi Account Balance : </span>
          <span style={{ color: "red" }} className="text-tallyPay-primaryText">
            345.73USD
          </span>
        </div>

        <div className=" flex max-w-fit flex-col">
          <div className="flex items-center space-x-2 text-white">
            <span>Available :</span>
            <span>
              BNB {`${(ethBalance / 1000000000000000000).toFixed(2)}`}
            </span>
          </div>
          <span className="self-end text-tallyPay-primaryText">
            {((ethBalance / 1000000000000000000) * BNBPrice).toFixed(5)} USD
          </span>
        </div>

        <div className="flex items-start justify-end space-x-2 text-white">
          <span className="text-tallyPay-primaryText">
            <a target="_blank" href={"https://testnet.bscscan.com/"}>
              view Contract
            </a>
          </span>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <ConnectWalletButton
          price1={SPBNB && SPBNB[2]}
          price2={SPBNB && SPBNB[3]}
        />
      </div>
    </form>
  );
};

export default TallyWillsNew;
