import { useReducer, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { conAddress, tokenAbi, tokenAddress } from "../../state/config";
import { initWeb3, S1DepositA } from "../../state";
import {
  ConnectWalletButton,
  SelectTokenCombobox,
  TPDateInput,
  TPDoubleInput,
  TPInput,
  TPRadioGroup,
  TPTimeInput,
} from "../../components";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { debounce } from "lodash";
import tokens from "../../assets/data/tokens";
const timeOptions = [
  { name: "Daily" },
  { name: "Weekly" },
  { name: "Monthly" },
  { name: "Anually" },
];

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
    case "updateReleaseDate":
      return produce(state, (draft) => {
        draft.formData.recipients[action.index].releaseDate[action.field] =
          action.value;
      });
    case "updateTimelock":
      return produce(state, (draft) => {
        draft.formData.recipients[action.index].timelock = action.value;
      });
    case "updateTime":
      return produce(state, (draft) => {
        draft.formData.recipients[action.index].time = action.value;
      });
    default:
      return state;
  }
};

const LivingTrustRecurring = () => {
  const [allowance, setAllowance] = useState();
  const [SelectBNB, setSelectBNB] = useState(false);
  const dispatchA = useDispatch();
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
          email: "",
          address: "",
          amount: "",
          releaseDate: {
            day: "",
            month: "",
            year: "",
          },
          time: "",
          timelock: timeOptions[0].name,
        },
      ],
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
    return state.adoptReducer.prices1;
  });

  const toggle = useSelector((state) => {
    return state.adoptReducer.toggle;
  });

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
        .approve(conAddress, web3.utils.toWei(SPBNB[1].toString(), "ether"))
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
      var _beneficiaries = a.recipients.map((v, e) => v.address);
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
        S1DepositA({
          _token: state.formData.address,
          _beneficiaries,
          _amounts,
          _totalAmount,
          _vestedTime,
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

  console.log("toggle", toggle);

  return (
    <form
      className="container mx-auto max-w-xl py-6"
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

      <div className="mt-6 w-full">
        {state.formData?.recipients?.map((recipient, index) => (
          <div key={recipient.id} className="my-5">
            <div className="flex w-full items-start justify-between">
              <div className="basis-2/3 pb-5">
                <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
                  Recipient {index + 1} wallet address{" "}
                  {index > 0 && (
                    <XIcon
                      className="ml-3 h-4 w-4 cursor-pointer text-tallyPay-red"
                      onClick={() =>
                        dispatch({
                          type: "removeRecipient",
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
                  actionType="updateRecipient"
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
                  actionType="updateRecipient"
                  index={index}
                />
                <p className="-mt-6 inline-flex items-center space-x-1 text-xs font-normal text-tallyPay-primaryText">
                  <span className="text-white">Balance:</span>
                  <span>3.22$</span>
                </p>
              </div>
            </div>
            <div className="w-full">
              <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
                Time lock
              </p>

              <div className="my-4 w-full">
                <TPRadioGroup
                  options={timeOptions}
                  value={state.formData.timelock}
                  onChange={(e) => {
                    dispatch({
                      type: "updateTimelock",
                      field: "timelock",
                      value: e,
                      index: index,
                    });
                  }}
                  variant="primary"
                  title=" "
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="mt-4 flex basis-1/2 flex-col space-y-3">
                  <p className="inline-flex items-center text-sm font-normal capitalize text-white/50">
                    Release Date
                  </p>
                  <TPDateInput
                    name="releaseDate"
                    dispatch={dispatch}
                    index={index}
                  />
                </div>

                <div className="mt-4 flex basis-1/3 flex-col space-y-3">
                  <p className="inline-flex items-center text-sm font-normal capitalize text-white/50">
                    Select Time
                  </p>
                  <TPTimeInput
                    name="time"
                    dispatch={dispatch}
                    index={index}
                    actionType="updateTime"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="my-5 mr-2 inline-flex items-center rounded-full bg-tallyPay-gray-default px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-tallyPay-gray-light focus:outline-none"
          onClick={() => dispatch({ type: "addRecipient" })}
        >
          <PlusIcon className="mr-2 -ml-1 h-5 w-5" />
          Add More Addresses
        </button>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
        <div className="flex max-w-fit flex-col">
          <div className="flex items-center space-x-2 text-white">
            <span>Available :</span>
            <span>Tally {`${(balance / 1000000000000000000).toFixed(5)}`}</span>
          </div>
          <span className="self-end text-tallyPay-primaryText">0.2445 USD</span>
        </div>

        <div className="flex items-start justify-end space-x-2 text-white">
          <span>Defi Account Balance : </span>
          <span className="text-tallyPay-primaryText">345.73USD</span>
        </div>

        <div className=" flex max-w-fit flex-col">
          <div className="flex items-center space-x-2 text-white">
            <span>Available :</span>
            <span>BNB 0.348384</span>
          </div>
          <span className="self-end text-tallyPay-primaryText">0.2445 USD</span>
        </div>

        <div className="flex items-start justify-end space-x-2 text-white">
          <span className="text-tallyPay-primaryText">view Contract</span>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <ConnectWalletButton price="1 BNB or 10,000 Tally" />
      </div>
    </form>
  );
};

export default LivingTrustRecurring;
