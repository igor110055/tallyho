import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { bannerData } from "../../assets/data/bannerData";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const HeaderSection = () => {
  return (
    <section className="bg-pools_header">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 p-6 pt-28 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white md:text-[40px]">
            Tally Pools
          </h1>
          <p className="font-light leading-5 text-[#dddddd]">
            Stake your tokens – And earn
            <br />
            It is as simple as that. Very low fees and high yields
          </p>
          <div>
            <a
              href="https://docs.tally-ho.org/stake-tally-tokens/new-to-staking"
              className="flex items-center space-x-2 py-1 text-sm text-primary-brand"
              target="_blank"
              rel="noreferrer"
            >
              <QuestionMarkCircleIcon className="h-5 w-5" />
              <span>New to Staking</span>
            </a>
            <a
              href="https://docs.tally-ho.org/stake-tally-tokens"
              className="flex items-center space-x-2 py-1 text-sm text-primary-brand"
              target="_blank"
              rel="noreferrer"
            >
              <QuestionMarkCircleIcon className="h-5 w-5" />
              <span>How to Stake</span>
            </a>
          </div>
        </div>

        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          swipeable
          emulateTouch
          stopOnHover
          className="mt-4 md:mt-0"
        >
          {bannerData.map((item) => (
            <a
              href={item.url}
              key={item.id}
              className="ml-auto flex w-full max-w-md rounded-lg"
            >
              <img
                src={item.image}
                alt={"banner"}
                className="ml-auto h-full w-full rounded-2xl object-cover"
              />
            </a>
          ))}
        </Carousel>
      </div>

      <div className="container mx-auto mt-6 flex max-w-6xl space-x-0 text-sm md:max-w-5xl md:space-x-5 md:px-8 md:text-base">
        <NavLink
          to="stake_tally"
          end
          className={({ isActive }) =>
            classNames(
              "rounded-lg rounded-b-none px-3 py-3 font-semibold text-white md:px-7",
              {
                "bg-primary-brand": isActive,
              }
            )
          }
        >
          Stake Tally
        </NavLink>
        <NavLink
          to="stake_tokens"
          end
          className={({ isActive }) =>
            classNames(
              "rounded-lg rounded-b-none px-3 py-3 font-semibold text-white md:px-7",
              {
                "bg-primary-brand": isActive,
              }
            )
          }
        >
          Stake Tokens
        </NavLink>
      </div>
    </section>
  );
};

export default HeaderSection;
