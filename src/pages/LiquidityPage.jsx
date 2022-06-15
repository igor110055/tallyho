import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { RadioGroupComp, SettingsModal } from "../components";
import { LiquiditySection, SliderBanner } from "../containers";

import liquidityGif from "../assets/images/gifs/tally-ho_MOD.gif";

const LiquidityPage = () => {
  const types = [
    {
      name: "Liquidity",
      value: "pool",
    },
  ];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [type, setType] = useState(types[0].value);
  const [modalOpen, setModalOpen] = useState(false);

  const setTypeandNavigate = (type) => {
    setType(type);
    navigate("/liquidity");
  };

  const openSettingsModal = () => {
    setModalOpen(true);
  };

  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center bg-primary-sidebar px-4 pt-40 pb-8">
        <img
          src={liquidityGif}
          alt="gif img"
          className="mb-8 w-full max-w-lg flex-1"
        />
        <h1 className="mb-2 whitespace-nowrap text-center text-2xl font-bold text-white md:text-[40px]">
          Become a Liquidity Provider
        </h1>

        <h3 className=" text-center text-base font-light text-white">
          Receive high yields from earning a share of transaction fees.
        </h3>

        <div className="mb-4 flex flex-col text-center text-white">
          <a
            href="https://docs.tally-ho.org/readme"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-brand transition-colors hover:text-primary-brand/80"
          >
            Learn how to add liquidity
          </a>
        </div>

        <RadioGroupComp
          type={type}
          setType={setTypeandNavigate}
          types={types}
        />

        {pathname === "/liquidity" && (
          <LiquiditySection
            openSettingsModal={openSettingsModal}
            setType={setType}
          />
        )}
        <Outlet />
      </section>

      <SliderBanner />

      <SettingsModal open={modalOpen} setOpen={setModalOpen} />
    </main>
  );
};

export default LiquidityPage;
