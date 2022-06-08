import { useReducer, useState } from "react";
import { conAddress, tokenAbi, tokenAddress } from "../../state/config";
import { useSelector, useDispatch } from "react-redux";
import {
  ConnectWalletButton,
  SelectTokenCombobox,
  TPChangeInheritorRadio,
  TPDoubleInput,
  TPEditableButton,
  TPInput,
  TPRadioGroup,
} from "../../components";
import { produce } from "immer";
import { nanoid } from "nanoid";
import tokens from "../../assets/data/tokens";
import { debounce } from "lodash";
import { changeAddressA, changeAmountA, removeAddressA } from "../../state";

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFormData":
      return produce(state, (draft) => {
        draft.formData[action.field] = action.value;
      });
    case "updateOtherRecipients":
      return produce(state, (draft) => {
        draft.formData.otherRecipients[action.index].percent = action.value;
      });
    default:
      return state;
  }
};

const TempLockRemove = () => {
  const dispatchA = useDispatch();
  const [beneficiaryAddress, setBeneficiaryAddress] = useState();
  const [beneficiaryAmount, setBeneficiaryAmount] = useState();
  const [SelectBNB, setSelectBNB] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    formData: {
      token: tokens[0],
      address: "",
      amount: "",
      amountUSD: "",
      removeWallet: { name: "Wallet 1" },
      sendAmount: "",
      wallets: [
        { name: "Wallet 1", value: "30$" },
        { name: "Wallet 2", value: "30$" },
        { name: "Wallet 3", value: "30$" },
        { name: "Wallet 4", value: "30$" },
      ],
      selectedWallet: { name: "Wallet 1" },
      otherRecipients: [
        { id: nanoid(), percent: "0.00$" },
        { id: nanoid(), percent: "0.00$" },
        { id: nanoid(), percent: "0.00$" },
        { id: nanoid(), percent: "0.00$" },
      ],
      changeWallet: { name: "Wallet 1" },
      walletAddressReplacement: "",
      walletEmailReplacement: "",
    },
  });

  const S2Data = useSelector((state) => {
    return state.adoptReducer.S2Data;
  });

  var refinedS2 =
    S2Data &&
    S2Data.filter(
      (item) =>
        item.beneficiaries != "0x0000000000000000000000000000000000000000"
    );

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
  console.log("s2 data", S2Data);

  const handleChangeToken = debounce((e) => {
    dispatch({
      type: "updateFormData",
      field: "token",
      value: e,
    });
  }, 500);

  const handleApprove = async () => {
    const asset = new web3.eth.Contract(
      tokenAbi,
      "0xc0a5E512a047555A87f9291864d5f6E079EAfcAF"
    );
    const tally = new web3.eth.Contract(tokenAbi, tokenAddress);
    //var _amounts = state.formData.recipients.map((v,e)=>v.amount)
    //var _totalAmount = _amounts.reduce((sum, val) => Number(sum) + Number(val),0)
    if (!SelectBNB) {
      asset.methods
        .approve(
          conAddress,
          web3.utils.toWei(beneficiaryAmount.toString(), "ether")
        )
        .send({ from: address });
      tally.methods
        .approve(conAddress, web3.utils.toWei(SPBNB[5].toString(), "ether"))
        .send({ from: address });
    } else {
      asset.methods
        .approve(
          conAddress,
          web3.utils.toWei(beneficiaryAmount.toString(), "ether")
        )
        .send({ from: address });
    }
  };

  const changeAmount = async (index) => {
    console.log("index", index);
    dispatchA(
      changeAmountA({
        _amount: beneficiaryAmount,
        _indexOfArray: index,
        value: SelectBNB ? web3.utils.toWei(SPBNB[4].toString(), "ether") : 0,
      })
    );
  };
  const changeAddress = async (index) => {
    dispatchA(
      changeAddressA({
        _address: setBeneficiaryAddress,
        _indexOfArray: index,
        value: SelectBNB ? web3.utils.toWei(SPBNB[4].toString(), "ether") : 0,
      })
    );
  };

  const removeAddress = async (index) => {
    dispatchA(
      removeAddressA({
        _indexOfArray: index,
        value: SelectBNB ? web3.utils.toWei(SPBNB[4].toString(), "ether") : 0,
      })
    );
  };

  return (
    <form
      className="container mx-auto min-h-screen max-w-2xl"
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

      <div style={{ color: "white" }}>
        <h1>Change / Remove == {">"} Address / Amount</h1>
        <table>
          <thead>
            <td style={{ width: "150px" }}>Beneficiary</td>
            <td style={{ width: "100px" }}>Amount</td>
            <td style={{ width: "100px" }}>E-mail Address</td>
            <td style={{ width: "100px" }}>Remove Address</td>
            <td style={{ width: "100px" }}>Change Amount</td>
            <td style={{ width: "100px" }}>Change Address</td>
          </thead>
          <tbody>
            {S2Data &&
              refinedS2.map((v, e) => (
                <tr>
                  <td style={{ width: "150px", color: "black" }}>
                    <input
                      style={{ color: "black", textAlign: "center" }}
                      placeholder={v.beneficiaries}
                      value={beneficiaryAddress}
                      onChange={(e) => {
                        setBeneficiaryAddress(e.target.value);
                      }}
                    />
                  </td>
                  <td style={{ width: "100px" }}>
                    <input
                      style={{ color: "black", textAlign: "center" }}
                      placeholder={v.amounts}
                      value={beneficiaryAmount}
                      onChange={(e) => {
                        setBeneficiaryAmount(e.target.value);
                      }}
                    />
                  </td>
                  <td style={{ width: "100px" }}>abc@gmail.com</td>
                  <td style={{ width: "100px" }}>
                    <button
                      onClick={() => {
                        removeAddress(v.index);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                  <td style={{ width: "100px" }}>
                    <button
                      onClick={() => {
                        changeAmount(v.index);
                      }}
                    >
                      Ch. Amount
                    </button>
                  </td>
                  <td style={{ width: "100px" }}>
                    <button
                      onClick={() => {
                        changeAddress(v.index);
                      }}
                    >
                      Ch. Address
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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

      {/* <div className='mt-6 w-full bg-[#282D32]/40 p-4'>
                <p className='text-center text-white'>Remove Recipient</p>

                <TPRadioGroup
                    options={state.formData.wallets}
                    title='Remove Recipient wallet Address '
                    label='Choose a wallet'
                    value={state.formData.selectedWallet}
                    onChange={value => {
                        dispatch({
                            type: 'updateFormData',
                            field: 'selectedWallet',
                            value,
                        });
                    }}
                />

                <div className='mt-6 w-full'>
                    <p className='mb-4 inline-flex items-center text-sm font-normal capitalize text-tallyPay-primaryText'>
                        Adjust Amount to send to other recipients
                    </p>

                    <div className='flex items-center gap-6'>
                        {state.formData.otherRecipients?.map((item, index) => (
                            <TPEditableButton
                                showTitle={false}
                                item={item}
                                index={index}
                                dispatch={dispatch}
                                key={item.id}
                                actionType='updateOtherRecipients'
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='mt-6 w-full bg-[#282D32]/40 p-4'>
                <div>
                    <p className='text-center text-white'>Change Recipient</p>
                    <TPChangeInheritorRadio
                        options={state.formData.wallets}
                        onChange={value => {
                            dispatch({
                                type: 'updateFormData',
                                field: 'changeWallet',
                                value,
                            });
                        }}
                        value={state.formData.changeWallet}
                        title={'Change Recipient wallet Address '}
                    />
                </div>
                <div className='mt-4'>
                    <TPInput
                        label='Click here to paste new wallet Address Replacment'
                        name='walletAddressReplacement'
                        dispatch={dispatch}
                    />
                </div>
                <div className='mt-4'>
                    <TPInput
                        label='Click here to paste new Email Address Replacment (if required)'
                        name='walletEmailReplacement'
                        dispatch={dispatch}
                    />
                </div>
            </div> */}

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
        <ConnectWalletButton price1={SPBNB[4]} price2={SPBNB[5]} />
      </div>
    </form>
  );
};

export default TempLockRemove;
