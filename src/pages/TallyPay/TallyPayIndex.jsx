import { accountsData, plans, valdata } from "../../assets/data/tally-pay";
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
  featureBg,
  infoImage,
  tpGif,
} from "./imports";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Heading = ({ title, colorText, subTitle }) => {
  return (
    <div className="pt-8 pb-16 text-center text-white">
      <h2 className=" text-3xl  font-semibold ">
        {title}{" "}
        <span
          className={`relative text-[#A2E941] before:absolute before:content-headerBg  ${
            title === ""
              ? "before:left-[-22px] before:bottom-[-16px]"
              : "before:left-[-84px] before:bottom-[-16px]"
          }`}
        >
          {" "}
          {colorText}
        </span>
      </h2>
      <h4 className="mt-2 text-xl font-normal">{subTitle}</h4>
    </div>
  );
};

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
          <div className="relative ml-4 hidden md:block">
            <img src={BannerImg} alt="" />
            <img
              src={tpGif}
              alt="gif"
              className="absolute inset-y-0 right-0 aspect-square w-10/12"
            />
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
              <h2 className="stoke-text stroke-white font-['Comfortaa'] text-[70px] text-white">
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

      {/* Features */}
      <div className="bg-[#0F0F0F]">
        <div className="mt-0 md:mt-[-298px]">
          <div className=" mx-auto flex w-[80%] flex-col items-center justify-center pb-8 pt-8 md:pt-[350px] md:pb-24">
            <Heading
              title=""
              colorText="Features"
              subTitle="The safe place For Your Coins."
            />
            <img src={featureBg} alt="" />
          </div>
        </div>
      </div>

      {/* Accounts */}
      <div className="bg-[#0F0F0F]">
        <Heading
          title="Defi"
          colorText="Accounts"
          subTitle="The safe place For Your Coins."
        />

        {accountsData.map((item) => (
          <div
            key={item.id}
            className={`  ${
              item.id % 2 === 1 ? "bg-[#161616]" : "bg-[#0F0F0F]"
            }`}
          >
            <div
              className={` mx-auto flex w-[80%] flex-col flex-wrap  items-center justify-center py-16 md:flex-row custom:flex-nowrap custom:justify-between ${
                item.id % 2 === 0 ? "md:flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`relative z-[99] before:absolute before:top-[-20px] before:z-[-1] before:h-full before:w-full before:bg-[#405523] before:content-[''] md:before:h-[378px] md:before:w-[496px]  ${
                  item.id % 2 === 0
                    ? "before:right-[-20px]"
                    : "before:left-[-20px]"
                }`}
              >
                <img src={item.img} alt="" />
              </div>
              <div>
                <h4 className="my-8 text-lg font-medium capitalize tracking-wide text-white md:my-4">
                  {item.title}{" "}
                  <span className="text-[#A2E941]">{item.name}</span>
                </h4>
                <ul>
                  {item.details.map((data, index) => (
                    <li
                      key={index}
                      className={`relative my-2 text-base font-thin text-white before:absolute before:left-[-25px] before:content-link`}
                    >
                      {data}
                    </li>
                  ))}
                </ul>
                <p className="my-4 capitalize text-[#A2E941]">
                  <a href="#">discover more...</a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Section */}
      <div className="mx-auto  mt-8 mb-8 w-[95%] pb-16 md:w-[75%] md:pt-12 md:pb-20">
        <div className="flex flex-col items-center justify-center">
          <Heading
            title="Tally"
            colorText="Pay Defi"
            subTitle="The safe place For Your Coins."
          />

          <ReactPlayer
            url="https://www.youtube.com/watch?v=nOQyWbPO2Ds"
            controls={true}
            className="hidden aspect-video md:block"
          />
          <ReactPlayer
            url="https://www.youtube.com/watch?v=nOQyWbPO2Ds"
            controls={true}
            width="100%"
            height={225}
            className="md:hidden"
          />
        </div>
      </div>

      {/* Pricing Plan */}
      <div className="mx-auto  mt-8 mb-8 w-[95%] md:w-[75%] md:pt-44 md:pb-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {plans.map((item) => (
            <div
              key={item.id}
              className={` flex flex-col items-center justify-between rounded-3xl pt-6 pl-3 pr-[14px] pb-7 md:pl-6 md:pr-3 ${
                item.id % 2 === 0
                  ? "bg-[#0F0F0F] md:mt-[-51px] md:mb-[51px]"
                  : "mt-0 bg-gray-200"
              }`}
            >
              {/* bg-price-plan bg-no-repeat	bg-cover */}
              <div>
                <h2
                  className={`py-6 text-center text-xl font-semibold md:text-left ${
                    item.id % 2 === 0 ? "text-[#A2E941]" : "text-black"
                  }  `}
                >
                  {item.title}
                </h2>
                {item.details.map((data, index) => (
                  <ul>
                    <li
                      key={index}
                      className={`relative my-6 ml-[25px]  text-lg before:absolute before:left-[-25px] ${
                        item.id % 2 === 0
                          ? "text-white before:content-greenCheck"
                          : "text-[#0F0F0F] before:content-blackCheck"
                      }`}
                    >
                      {data}
                    </li>
                  </ul>
                ))}
              </div>
              <div>
                <h4
                  className={`py-6 text-xl font-semibold ${
                    item.id % 2 === 0 ? " text-[#A2E941] " : "text-[#0F0F0F] "
                  }`}
                >
                  <span className="text-base">1/2</span> Price before 15
                  <sup>th</sup> July.
                </h4>
                <p
                  className={`rounded-3xl py-4   px-12 text-center text-base capitalize ${
                    item.id % 2 === 0
                      ? "bg-[#A2E941] font-semibold text-[#0F0F0F]"
                      : "bg-[#0F0F0F] text-[#A2E941]"
                  }`}
                >
                  <a href={`/tally-pay/${item.href}`}>create account</a>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-12 ml-4 mr-2 flex flex-col items-center justify-start rounded-r-2xl bg-[#0F0F0F] py-6 pl-8 pr-6 before:absolute before:left-[-10px] before:top-0 before:h-full before:w-[10px] before:rounded-l-2xl before:bg-[#A2E941] md:mx-auto md:w-[65%] md:flex-row">
          <div className="mb-4 md:ml-4 md:mr-8">
            <img src={infoImage} alt="" width={80} />
          </div>
          <div className="text-white">
            <h6 className="ml-2 mb-5 text-lg text-[#A2E941]">
              Credit cards not accepted on Decentralised Platforms.
            </h6>
            <h6 className="ml-2 mb-5  text-lg">
              DeFi Accounts must be purchased in:{" "}
              <span className="text-[#A2E941]">BNB</span> or{" "}
              <span className="text-[#A2E941]">TALLY</span>
            </h6>
            <h6 className="ml-2  text-lg">
              Tally holders receive a percentage of revenue when accounts are
              purchased in <span className="text-[#A2E941]">$Tally</span>
            </h6>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#0F0F0F]">
        <div className="mx-auto  mt-8 w-full pt-8 pb-8 md:w-[75%] md:pt-20 md:pb-20 ">
          {/* upper section  */}

          <h2 className="px-8 text-center text-3xl  font-semibold text-white md:px-0 md:text-left">
            Our
            <span className="text-[#A2E941]"> Core Values</span>
          </h2>
          <div className="mt-14 grid grid-cols-1  md:grid-cols-3">
            {valdata.map((item, index) => (
              <div key={index} className="mb-12 px-8 md:mb-0 md:px-0 md:pr-16">
                <div className="flex items-center justify-start">
                  <img src={item.img} alt="" />
                  <h5 className="ml-4 text-lg font-medium capitalize text-white">
                    {item.title}
                  </h5>
                </div>
                <p
                  className={`mt-2 text-base font-normal text-white ${
                    item.id % 2 === 0 ? "uppercase" : ""
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* bottom section  */}

          <div className="mx-4 mt-8 mb-8 flex flex-col items-center justify-between rounded-3xl bg-white py-12 px-4 md:mx-8 md:mt-48 md:mb-28 md:flex-row md:px-14">
            <div className="text-center md:text-left">
              <h3 className="mb-6 text-2xl font-normal tracking-widest">
                Ready to start Depositing Tokens ?
              </h3>
              <h5 className="mb-6 text-xl font-medium md:mb-0 md:text-2xl">
                Why not get started?
              </h5>
            </div>
            <Link
              to="/tally-pay/tally-wills"
              className="rounded-3xl bg-[#0F0F0F] py-4 px-16 text-center text-base font-semibold capitalize text-primary-brand_light transition-colors hover:bg-primary-brand_light hover:text-[#0f0f0f] md:px-12"
            >
              <span>create account</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TallyPayIndex;
