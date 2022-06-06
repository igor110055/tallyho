import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../utils/classNames";
import { speedOptions } from "../../consts/transSettings";
import { TRANSACTION_SPEED_SET } from "../../Store/Actions/actionTypes";

const GasSpeedRadio = () => {
  const dispatch = useDispatch();
  const transSetting = useSelector((state) => state.transSetting);

  return (
    <RadioGroup
      value={transSetting.transSpeed}
      onChange={(value) => {
        dispatch({
          type: TRANSACTION_SPEED_SET,
          payload: {
            transSpeed: value,
          },
        });
      }}
    >
      <RadioGroup.Label className="sr-only">
        Choose a Gas Speed
      </RadioGroup.Label>
      <div className="flex flex-wrap justify-between ">
        {speedOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option.value}
            className={({ active, checked }) =>
              classNames(
                checked
                  ? " bg-[#1263f1] text-white "
                  : " bg-[#e4efff] text-[#1263f1]",
                "flex h-12  cursor-pointer items-center rounded-lg px-3 font-semibold md:px-6"
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

export default GasSpeedRadio;
