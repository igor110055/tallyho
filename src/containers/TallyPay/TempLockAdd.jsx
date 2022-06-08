import { useReducer, useState } from "react";
import { initWeb3, S1DepositA, S1DepositB, S2DepositB } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import { conAddress, tokenAbi, tokenAddress } from "../../state/config";
import {
  ConnectWalletButton,
  SelectTokenCombobox,
  TPDateInput,
  TPDoubleInput,
  TPInput,
  TPTimeInput,
} from "../../components";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { debounce } from "lodash";
import tokens from "../../assets/data/tokens";

const reducer = (state, action) => {
  switch (action.type) {
    case "addRecipient":
      return produce(state, (draft) => {
        draft.formData.recipients.push({
          id: nanoid(),
          email: "",
          amount: "",
          address: "",
        });
      });
    case "removeRecipient":
      return produce(state, (draft) => {
        draft.formData.recipients.splice(action.index, 1);
      });
    case "updateRecipient":
      return produce(state, (draft) => {
        draft.formData.recipients[action.index][action.field] = action.value;
      });
    case "updateFormData":
      return produce(state, (draft) => {
        draft.formData[action.field] = action.value;
      });
    // case 'updateReleaseDate':
    //     return produce(state, draft => {
    //         draft.formData.recipients[action.index].releaseDate[
    //             action.field
    //         ] = action.value;
    //     });
    case "updateReleaseDate":
      return produce(state, (draft) => {
        draft.formData.releaseDate[action.field] = action.value;
      });
    default:
      return state;
  }
};

const TempLockAdd = () => {
  const dispatchA = useDispatch();
  const [SelectBNB, setSelectBNB] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    formData: {
      token: tokens[0],
      address: "",
      amount: "",
      amountUSD: "",
      password: "",
      confirmPassword: "",
      recipients: [
        {
          id: nanoid(),
          releaseDate: {
            day: "",
            month: "",
            year: "",
          },
          time: "",
        },
        // {
        //     id: nanoid(),
        //     releaseDate: {
        //         day: '',
        //         month: '',
        //         year: '',
        //     },
        //     time: '',
        // },
        // {
        //     id: nanoid(),
        //     releaseDate: {
        //         day: '',
        //         month: '',
        //         year: '',
        //     },
        //     time: '',
        // },
      ],
      releaseDate: {
        day: "",
        month: "",
        year: "",
      },
      time: "",
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
    return state.adoptReducer.prices2;
  });

  const S2Data = useSelector((state) => {
    return state.adoptReducer.S2Data;
  });

  console.log("s2 data", S2Data && S2Data);

  const handleApprove = async () => {
    const asset = new web3.eth.Contract(tokenAbi, state.formData.address);
    const tally = new web3.eth.Contract(tokenAbi, tokenAddress);
    var _amounts = state.formData.recipients.map((v, e) => v.amount);
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
    var a = state.formData;

    var _amounts = a.recipients.map((v, e) => v.amount);
    var _totalAmount = _amounts.reduce(
      (sum, val) => Number(sum) + Number(val),
      0
    );
    var _vestedTime = Date.parse(
      `${a.releaseDate.month - 1}/${a.releaseDate.day}/${a.releaseDate.year}`
    );
    console.log("day", a.releaseDate.day);
    console.log("month", a.releaseDate.month);
    console.log("year", a.releaseDate.year);
    dispatchA(
      S2DepositB({
        _token: a.address,
        _beneficiaries: a.recipients[0].address,
        _amounts: a.recipients[0].amount,
        _totalAmount: a.recipients[0].amount,
        _vestedTime,
        _phrase: 0,
        value: SelectBNB
          ? web3.utils.toWei(`${SPBNB[2] / 1000000000000000000}`, "ether")
          : 0,
      })
    );
  };

  return (
    <form
      className="container mx-auto max-w-2xl py-6"
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

      <div className="mt-6 w-full">
        <TPDoubleInput
          label="Amount"
          name="amount"
          rightIcon="BNB"
          bottomLabel="Amount in USD"
          bottomRightIcon="USD"
          bottomName="amountUSD"
          dispatch={dispatch}
        />
      </div>

      {state.formData.recipients.map((recipient, index) => (
        <div className="mt-6 w-full bg-[#282D32]/40 p-4" key={recipient.id}>
          <div className="inline-flex w-full items-center justify-between text-sm font-normal capitalize text-tallyPay-primaryText">
            <p className="text-white/50">
              <span className="text-tallyPay-primaryText">send to:</span>{" "}
              <TPDoubleInput
                placeholder="Click here to paste Address"
                dispatch={dispatch}
                bottomPlaceholder="Click here to paste Email Address"
                index={index}
                actionType="updateRecipient"
                name="address"
                bottomName="email"
              />
            </p>
            <p>
              <span className="ml-12 rounded-full bg-[#83BD33]/30 px-2.5 py-0.5 text-xs text-white">
                21 Days Max
              </span>
            </p>
            <p className="text-white/50">
              Send Amount :
              <span className="text-tallyPay-primaryText">
                {" "}
                <TPInput
                  placeholder="0.00"
                  name="amount"
                  dispatch={dispatch}
                  actionType="updateRecipient"
                  index={index}
                />
              </span>
            </p>
          </div>

          <div className="flex items-start justify-between">
            <div className="mt-4 flex basis-2/3 flex-row items-center space-x-2">
              <h2 className="mr-auto flex-1 whitespace-nowrap text-sm text-tallyPay-primaryText">
                Time Locked:
              </h2>
              <p className="inline-flex flex-1 items-center whitespace-nowrap text-sm font-normal capitalize text-white/50">
                Release Date
              </p>
              <TPDateInput
                name="releaseDate"
                dispatch={dispatch}
                // index={index}
              />
            </div>

            <div className="mt-4 ml-4 flex basis-1/4 justify-between">
              <p className="inline-flex items-center whitespace-nowrap text-sm font-normal capitalize text-white/50">
                Time
              </p>
              <TPTimeInput
                actionType="updateRecipient"
                name="time"
                dispatch={dispatch}
                // index={index}
              />
            </div>
          </div>
          <label style={{ color: "white" }}>
            Check for BNB and none for Tally
          </label>
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
        </div>
      ))}

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
        <ConnectWalletButton price1={SPBNB[2]} price2={SPBNB[3]} />
      </div>
    </form>
  );
};

export default TempLockAdd;
