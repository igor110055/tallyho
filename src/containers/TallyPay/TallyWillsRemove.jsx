// import { useReducer } from 'react';
// import {
//     ConnectWalletButton,
//     SelectTokenCombobox,
//     TPChangeInheritorRadio,
//     TPDoubleInput,
//     TPEditableButton,
//     TPInput,
//     TPRadioGroup,
// } from '../../components';
// import { produce } from 'immer';
// import { nanoid } from 'nanoid';
// import tokens from '../../assets/data/tp-tokens';
// import { debounce } from 'lodash';

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'updateFormData':
//             return produce(state, draft => {
//                 draft.formData[action.field] = action.value;
//             });
//         case 'updateOtherInheritors':
//             return produce(state, draft => {
//                 draft.formData.otherInheritors[action.index].percent =
//                     action.value;
//             });
//         default:
//             return state;
//     }
// };

// const TallyWillsRemove = () => {
//     const [state, dispatch] = useReducer(reducer, {
//         formData: {
//             token: tokens[0],
//             address: '',
//             amount: '',
//             amountUSD: '',
//             removeWallet: { name: 'Wallet 1' },
//             sendAmount: '',
//             wallets: [
//                 { name: 'Wallet 1', value: '30%' },
//                 { name: 'Wallet 2', value: '30%' },
//                 { name: 'Wallet 3', value: '30%' },
//                 { name: 'Wallet 4', value: '30%' },
//             ],
//             selectedWallet: { name: 'Wallet 1' },
//             otherInheritors: [
//                 { id: nanoid(), percent: '0.00%' },
//                 { id: nanoid(), percent: '0.00%' },
//                 { id: nanoid(), percent: '0.00%' },
//                 { id: nanoid(), percent: '0.00%' },
//             ],
//             changeWallet: { name: 'Wallet 1' },
//             walletAddressReplacement: '',
//             walletEmailReplacement: '',
//         },
//     });

//     console.log(state.formData);

//     const handleChangeToken = debounce(e => {
//         dispatch({
//             type: 'updateFormData',
//             field: 'token',
//             value: e,
//         });
//     }, 500);

//     return (
//         <form
//             className='container mx-auto min-h-screen max-w-xl'
//             onSubmit={e => {
//                 e.preventDefault();
//                 console.log(state);
//             }}
//         >
//             <div className='w-full'>
//                 <SelectTokenCombobox
//                     tokens={tokens}
//                     onChange={handleChangeToken}
//                     selected={state.formData.token}
//                     title='Select Token to Withdraw'
//                 />
//             </div>

//             <div className='mt-4 w-full'>
//                 <TPInput
//                     label='Click here to paste Address'
//                     name='address'
//                     dispatch={dispatch}
//                 />
//             </div>

//             <div className='mt-6 w-full'>
//                 <TPDoubleInput
//                     label='Amount'
//                     name='amount'
//                     rightIcon='BNB'
//                     bottomLabel='Amount in USD'
//                     bottomRightIcon='USD'
//                     bottomName='amountUSD'
//                     dispatch={dispatch}
//                 />
//             </div>

//             <div className='mt-6 w-full bg-[#282D32]/40 p-4'>
//                 <p className='text-center text-white'>Remove Inheritor</p>

//                 <TPRadioGroup
//                     options={state.formData.wallets}
//                     title='Remove Inheritor wallet Address'
//                     label='Choose a wallet'
//                     value={state.formData.selectedWallet}
//                     onChange={value => {
//                         dispatch({
//                             type: 'updateFormData',
//                             field: 'selectedWallet',
//                             value,
//                         });
//                     }}
//                 />

//                 <div className='mt-6 w-full'>
//                     <p className='mb-4 inline-flex items-center text-sm font-normal text-tallyPay-primaryText'>
//                         Adjust % of other inheritors{' '}
//                     </p>

//                     <div className='flex items-center gap-6'>
//                         {state.formData.otherInheritors?.map((item, index) => (
//                             <TPEditableButton
//                                 showTitle={false}
//                                 item={item}
//                                 index={index}
//                                 dispatch={dispatch}
//                                 key={item.id}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <div className='mt-6 w-full bg-[#282D32]/40 p-4'>
//                 <div>
//                     <p className='text-center text-white'>Change Inheritor</p>
//                     <TPChangeInheritorRadio
//                         options={state.formData.wallets}
//                         onChange={value => {
//                             dispatch({
//                                 type: 'updateFormData',
//                                 field: 'changeWallet',
//                                 value,
//                             });
//                         }}
//                         value={state.formData.changeWallet}
//                     />
//                 </div>
//                 <div className='mt-4'>
//                     <TPInput
//                         label='Click here to paste new wallet Address Replacement'
//                         name='walletAddressReplacement'
//                         dispatch={dispatch}
//                     />
//                 </div>
//                 <div className='mt-4'>
//                     <TPInput
//                         label='Click here to paste new Email Address Replacement (if required)'
//                         name='walletEmailReplacement'
//                         dispatch={dispatch}
//                     />
//                 </div>
//             </div>

//             <div className='mt-6 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2'>
//                 <div className='flex max-w-fit flex-col'>
//                     <div className='flex items-center space-x-2 text-white'>
//                         <span>Available :</span>
//                         <span>Tally 0.348384</span>
//                     </div>
//                     <span className='self-end text-tallyPay-primaryText'>
//                         0.2445 USD
//                     </span>
//                 </div>

//                 <div className='flex items-start justify-end space-x-2 text-white'>
//                     <span>Defi Account Balance : </span>
//                     <span className='text-tallyPay-primaryText'>345.73USD</span>
//                 </div>

//                 <div className=' flex max-w-fit flex-col'>
//                     <div className='flex items-center space-x-2 text-white'>
//                         <span>Available :</span>
//                         <span>BNB 0.348384</span>
//                     </div>
//                     <span className='self-end text-tallyPay-primaryText'>
//                         0.2445 USD
//                     </span>
//                 </div>
//             </div>

//             <div className='my-6 flex w-full flex-col items-center justify-center'>
//                 <ConnectWalletButton price='10,000 Tally' />
//             </div>
//         </form>
//     );
// };

// export default TallyWillsRemove;
import { useEffect, useReducer, useState } from "react";
import { Abi, conAddress, tokenAbi, tokenAddress } from "../../state/config";
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
import tokens from "../../assets/data/tp-tokens";
import { debounce } from "lodash";
import {
  changeAddressA,
  changeAddressC,
  changeAmountA,
  changeAmountC,
  removeAddressA,
  removeAddressC,
} from "../../state";
import Web3 from "web3";
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

const TallyWillsRemove = () => {
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(Abi, conAddress);
  const dispatchA = useDispatch();
  const [beneficiaryAddress, setBeneficiaryAddress] = useState([]);
  const [beneficiaryAmount, setBeneficiaryAmount] = useState([]);
  const [SelectBNB, setSelectBNB] = useState(false);
  const [refinedS2, setRefinedArray] = useState(false);
  const [IndexOfArray, setIndexOfArray] = useState(false);
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

  useEffect(() => {
    async function abc() {
      web3.eth.getAccounts((e, r) => {
        contract.methods.getNumberS3ofAccounts(r[0]).call((a, b) => {
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

  const S2Data = useSelector((state) => {
    return state.adoptReducer.S3Data;
  });

  //    var refinedS2 = S2Data && S2Data.filter(item=>item.token=="0xc0a5E512a047555A87f9291864d5f6E079EAfcAF")

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

  const SPBNB = useSelector((state) => {
    return state.adoptReducer.prices3;
  });

  const handleChangeToken = debounce((e) => {
    dispatch({
      type: "updateFormData",
      field: "token",
      value: e,
    });
  }, 500);

  const handleApprove = async () => {
    //     const asset = new web3.eth.Contract(tokenAbi,"0xc0a5E512a047555A87f9291864d5f6E079EAfcAF")
    const tally = new web3.eth.Contract(tokenAbi, tokenAddress);
    //var _amounts = state.formData.recipients.map((v,e)=>v.amount)
    //var _totalAmount = _amounts.reduce((sum, val) => Number(sum) + Number(val),0)
    if (!SelectBNB) {
      //            asset.methods.approve(conAddress,web3.utils.toWei(beneficiaryAmount.toString(),"ether")).send({from:address})
      tally.methods
        .approve(conAddress, web3.utils.toWei(SPBNB[5].toString(), "ether"))
        .send({ from: address });
    } else {
      //           asset.methods.approve(conAddress,web3.utils.toWei(beneficiaryAmount.toString(),"ether")).send({from:address})
    }
  };

  const changeAmount = async (index) => {
    dispatchA(
      changeAmountC({
        _amount: beneficiaryAmount[index],
        _indexOfArray: IndexOfArray,
        _indexOfAddress: index,
        value: SelectBNB ? SPBNB[4] : 0,
      })
    );
  };
  const changeAddress = async (index) => {
    console.log("first", beneficiaryAddress);
    dispatchA(
      changeAddressC({
        _address: beneficiaryAddress[index],
        _indexOfArray: IndexOfArray,
        _indexOfAddress: index,
        value: SelectBNB ? SPBNB[4] : 0,
      })
    );
  };

  const removeAddress = async (index) => {
    dispatchA(
      removeAddressC({
        _indexOfArray: IndexOfArray,
        _indexOfAddress: index,
        value: SelectBNB ? SPBNB[4] : 0,
      })
    );
  };

  const updateAmount = (value, index) => {
    const amount = beneficiaryAmount[index];
    // amount[key] = value;
    setBeneficiaryAmount([
      ...beneficiaryAmount.slice(0, index),
      value,
      ...beneficiaryAmount.slice(index + 1, beneficiaryAmount.length),
    ]);
  };

  const updateAddress = (value, index) => {
    //        const amount = beneficiaryAddress[index];
    // amount[key] = value;
    setBeneficiaryAddress([
      ...beneficiaryAddress.slice(0, index),
      value,
      ...beneficiaryAddress.slice(index + 1, beneficiaryAddress.length),
    ]);
  };

  console.log("beneciary", beneficiaryAddress);
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
        <h1>Change / Remove == &gt; Address / Amount</h1>
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
            {refinedS2 &&
              refinedS2.beneficiaries.map((v, e) => {
                if (v != 0x0000000000000000000000000000000000000000) {
                  return (
                    <tr>
                      <td style={{ width: "150px", color: "black" }}>
                        <input
                          style={{ color: "black", textAlign: "center" }}
                          defaultValue={v}
                          value={beneficiaryAddress[e]}
                          onChange={(a) => {
                            updateAddress(a.target.value, e);
                          }}
                        />
                      </td>
                      <td style={{ width: "100px" }}>
                        <input
                          style={{ color: "black", textAlign: "center" }}
                          defaultValue={S2Data && refinedS2.amounts[e]}
                          value={beneficiaryAmount[e]}
                          onChange={(a) => {
                            updateAmount(a.target.value, e);
                          }}
                        />
                      </td>
                      <td style={{ width: "100px" }}>abc@gmail.com</td>
                      <td style={{ width: "100px" }}>
                        <button
                          onClick={() => {
                            removeAddress(e);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                      <td style={{ width: "100px" }}>
                        <button
                          onClick={() => {
                            changeAmount(e);
                          }}
                        >
                          Ch. Amount
                        </button>
                      </td>
                      <td style={{ width: "100px" }}>
                        <button
                          onClick={() => {
                            changeAddress(e);
                          }}
                        >
                          Ch. Address
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
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
                    title='Remove Recipient Wallet Address '
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

export default TallyWillsRemove;

// const updateBeneficiaryAmount = (index,value) => {
//     const newItems = beneficiaryAmount.map((v,e) => {
//       if (index == e) {
//         return { ...v, value}
//       }
//       return beneficiaryAmount;
//     });
//     setBeneficiaryAmount(newItems);

// }

// const updateBeneficiaryAddress = (index,value) => {
//     const newItems = beneficiaryAddress.map((v,e) => {
//       if (index == e) {
//         return { ...v, value}
//       }
//       return beneficiaryAddress;
//     });
//     setBeneficiaryAddress(newItems);

// }
