import abi from "./artifacts/Lottery.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Intro from "./component/Intro";
import Manager from "./component/Manager"
import Player from "./component/Player"
import { BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css"
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const contractAddress = "0x66713EFE523b94AA821C49e02eA00DF0c4c57eA3";
  const [account, setAccount] = useState("None");

 useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x66713EFE523b94AA821C49e02eA00DF0c4c57eA3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <>

      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <Intro />
          </Route>
          <Route path="/manager" >
            <Manager state={state} account={account} />
          </Route>
          <Route path="/player">
            <Player state={state} contractAddress={contractAddress} account={account} />
          </Route>

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
