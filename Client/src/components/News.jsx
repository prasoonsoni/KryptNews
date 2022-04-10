import React, { useContext } from "react";

import { NewsContext } from "../context/NewsContext";
import { shortenAddress } from "../utils/shortenAddress";

const NewsCard = ({ title, description, publisher, date }) => {
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-white text-base">Title: {title}</p>
          <p className="text-white text-base">Description: {description}</p>
          <p className="text-white text-base">Publisher: {publisher}</p>
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{date}</p>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const { news, currentAccount } = useContext(NewsContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest News
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest News
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...news].reverse().map((news, i) => (
            <NewsCard key={i} {...news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
