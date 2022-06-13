import { useState } from "react";
import { useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

import { StakeCard } from "../../components";
import { MASTERCHEF_ADDRESS } from "../../assets/data/addresses.js";
import masterchefAbi from "../../assets/abi/Masterchef.json";
import AprModal from "../../components/shared/AprModal";
import { usePerformanceFee } from "../../hooks";
import { poolsCards } from "../../assets/data/poolsCards";
import AutoCompoundCard from "../../components/PoolsPage/AutoCompoundCard";

const CardsSection = ({ stakeType, status }) => {
  // status = active, coming_soon
  // stakeType = stake_tally, stake_tokens

  const { chainId } = useEthers();
  const [aprModalOpen, setAprModalOpen] = useState(false);
  const [aprModalVal, setAprModalVal] = useState(undefined);
  const perfFee = usePerformanceFee(chainId);

  const poolLength =
    useCall({
      contract: new Contract(
        MASTERCHEF_ADDRESS[chainId],
        new utils.Interface(masterchefAbi)
      ),
      method: "poolLength",
      args: [],
    })?.value?.[0] ?? undefined;

  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {stakeType === "stake_tally" && status === "active" && (
        <StakeCard
          poolId={0}
          perfFee={perfFee}
          showAprModal={setAprModalOpen}
          setAprModalValue={setAprModalVal}
        />
      )}
      {stakeType === "stake_tally" &&
        Array.from({ length: poolLength - 1 }, (x, i) => {
          return (
            <StakeCard
              key={i + 1}
              poolId={i + 1}
              perfFee={perfFee}
              setAprModalValue={setAprModalVal}
              showAprModal={setAprModalOpen}
            />
          );
        })}

      {status === "coming_soon" &&
        poolsCards.map((pool, i) => {
          return (
            <AutoCompoundCard
              key={pool.id}
              pool={pool}
              perfFee={perfFee}
              setAprModalValue={setAprModalVal}
              showAprModal={setAprModalOpen}
            />
          );
        })}

      {/* {poolsCards.map((card, i) => {
        return (
          <StakeCard
            key={i}
            poolId={i + 1}
            perfFee={perfFee}
            setAprModalValue={setAprModalVal}
            showAprModal={setAprModalOpen}
          />
        );
      })} */}

      <AprModal
        open={aprModalOpen}
        setOpen={setAprModalOpen}
        aprValue={aprModalVal}
      />
    </div>
  );
};

export default CardsSection;
