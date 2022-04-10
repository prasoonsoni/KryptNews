import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const NewsContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const newsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return newsContract;
};

export const NewsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    title: "",
    description: "",
    publisher: "",
    date: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newsCount, setNewsCount] = useState(localStorage.getItem("newsCount"));
  const [news, setNews] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllNews = async () => {
    try {
      if (ethereum) {
        const newsContract = createEthereumContract();

        const availableNews = await newsContract.getAllNews();

        const structuredNews = availableNews.map((n) => ({
          title: n.title,
          description: n.description,
          publisher: n.publisher,
          date: n.date_published,
        }));

        console.log(structuredNews);

        setNews(structuredNews);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllNews();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfNewsExists = async () => {
    try {
      if (ethereum) {
        const newsContract = createEthereumContract();
        const currentNewsCount = await newsContract.getNewsCount();
        window.localStorage.setItem("newsCount", currentNewsCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendNews = async () => {
    try {
      if (ethereum) {
        const { title, description, publisher, date } = formData;
        const newsContract = createEthereumContract();

        const newsHash = await newsContract.addToBlockchain(
          title,
          description,
          publisher,
          date
        );

        setIsLoading(true);
        console.log(`Loading - ${newsHash.hash}`);
        await newsHash.wait();
        console.log(`Success - ${newsHash.hash}`);
        setIsLoading(false);

        const newsCount = await newsContract.getNewsCount();

        setNewsCount(newsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfNewsExists();
  }, [newsCount]);

  return (
    <NewsContext.Provider
      value={{
        newsCount,
        connectWallet,
        news,
        currentAccount,
        isLoading,
        sendNews,
        handleChange,
        formData,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
