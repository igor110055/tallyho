import React from "react";

import {
  BannerImg,
  Binance,
  Bitcoin,
  Chainlink,
  Cross,
  Dai,
  Ether,
  Logo,
  Solana,
  Tether,
  fakeData,
} from "./imports";

const TallyPayIndex = () => {
  return (
    <>
      {/* Banner */}
      <div className="banner">
        <div className=" flex flex-col items-center justify-between py-8 px-6  md:mx-auto md:w-[80%] md:flex-row md:pt-28 md:pb-[300px]">
          <div className=" flex basis-2/3 flex-col items-center md:items-start md:justify-start">
            <img src={Logo} width={80} alt="" />
            <h3 className="my-3 text-2xl font-semibold capitalize text-white md:my-2 md:text-3xl">
              taLLY <span className="text-[#A0E641]">pay Defi</span>
            </h3>
            <h2 className="my-6 text-3xl font-semibold capitalize text-white md:text-5xl">
              The safe place
              <br /> for Your Coins.
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start">
              <img src={Bitcoin} alt="" className="mr-3" />
              <img src={Ether} alt="" className="mr-3" />
              <img src={Tether} alt="" className="mr-3" />
              <img src={Binance} alt="" className="mr-3" />
              <img src={Chainlink} alt="" className="mr-3" />
              <img src={Dai} alt="" className="mr-3" />
              <img src={Solana} alt="" className="mr-3" />
              <img src={Cross} alt="" className="mr-3" />
              <p className="mr-3 text-xl font-thin text-white underline">
                {" "}
                <a href="#!">+1000 More</a>
              </p>
            </div>
            <div className="mt-6">
              <button class="rounded-full bg-[#A2E941] px-[120px] py-[16px] font-semibold text-[#0F0F0F] md:px-[120px]">
                Get Started
              </button>
            </div>
          </div>
          <div className="ml-4 hidden md:block">
            <img src={BannerImg} alt="" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="z-1 relative mx-auto mb-4 mt-4 w-[90%]  rounded-3xl bg-[#030403] px-4 pt-12 pb-16 md:mt-[-210px] md:w-[95%] md:px-12">
        <h2 className="text-center text-[24px] font-semibold text-white md:text-left md:text-[28px]">
          Private, Affordable And Secure Accounts.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {fakeData.map((item) => (
            <div key={item.id} className="pl-2">
              <h2 className="stoke-text stroke-white font-['Comfortaa'] text-[70px] text-[#030403]">
                {item.id}
              </h2>
              <h6 className="mb-5 text-lg font-medium text-[#A2E941]">
                {item.title}
              </h6>
              <ul className="ml-4 list-disc">
                {item.details.map((item) => (
                  <li
                    key={item}
                    className="my-2 text-base font-thin text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TallyPayIndex;
