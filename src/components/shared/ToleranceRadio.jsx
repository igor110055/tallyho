import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../utils/classNames";
import { toleranceOptions } from "../../assets/data/transSettings";
import { SLIPPAGE_TOLERANCE_SET } from "../../Store/Actions/actionTypes";

const ToleranceRadio = () => {
  const dispatch = useDispatch();
  const transSetting = useSelector((state) => state.transSetting);

  return (
    <RadioGroup
      value={transSetting.slipTolerance}
      onChange={(value) => {
        dispatch({
          type: SLIPPAGE_TOLERANCE_SET,
          payload: {
            slipTolerance: value,
          },
        });
      }}
    >
      <RadioGroup.Label className="sr-only">
        Choose a Slippage tolerance
      </RadioGroup.Label>
      <div className="flex justify-between space-x-4">
        {toleranceOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option.value}
            className={({ checked }) =>
              classNames(
                checked
                  ? " bg-[#1263f1] text-white "
                  : " bg-[#e4efff] text-[#1263f1]",
                "flex h-10  cursor-pointer items-center rounded-lg px-6 font-semibold"
              )
            }
          >
            <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ToleranceRadio;