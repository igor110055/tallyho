import { useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConnectWalletButton, TPInput } from "../../components";
import { produce } from "immer";
import {
  initWeb3,
  S1DepositA,
  S1DepositB,
  S3DepositA,
  TriggerS3A,
} from "../../state";
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

const TallyWillsReport = () => {
  const dispatchA = useDispatch();
  const [state, dispatch] = useReducer(reducer, {
    formData: {
      address: "",
    },
  });

  const handleSubmit = async () => {
    console.log("address", state.formData.address);
    dispatchA(
      TriggerS3A({
        _address: state.formData.address,
      })
    );
  };

  console.log(state.formData);

  return (
    <form
      className="container mx-auto max-w-xl pb-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(state);
      }}
    >
      <div className="mt-4 w-full">
        <p className="my-4 text-white">
          Two Reports required for validation
          <span className="ml-2 text-tallyPay-primaryText">*</span>
        </p>
        <p className="inline-flex items-center text-sm font-normal text-tallyPay-primaryText">
          Paste wallet address of deceased
        </p>
        <TPInput
          placeholder="Click here to paste wallet Address"
          name="address"
          dispatch={dispatch}
        />
      </div>

      <p className="my-4 text-tallyPay-primaryText">Connect your wallet</p>

      <button style={{ color: "white" }} onClick={handleSubmit}>
        Submit{" "}
      </button>
      <p className="my-4 text-sm text-white">
        Making this transaction is free but requires{" "}
        <span className="text-tallyPay-primaryText">Gas fee</span> In BNB.
      </p>
      <p className="my-4 text-sm text-white">
        Making this transaction triggers{" "}
        <span className="text-tallyPay-primaryText">TALLY PAY</span> TO EXECUTE
        WILL.
      </p>
      <p className="my-4 text-sm uppercase text-white">
        ONCE TWO VERIFICATIONS ARE RECEIVED, funds WILL BE TRANSFERRED TO
        INHERITORS IN{" "}
        <span className="text-tallyPay-primaryText">21 Days.</span>
      </p>

      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <ConnectWalletButton />
        <p className="text-white">
          <span>Gas Fee: </span>
          <span className="text-tallyPay-primaryText">0.0003</span>
        </p>
      </div>
    </form>
  );
};

export default TallyWillsReport;
