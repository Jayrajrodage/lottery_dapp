import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import "./Manager.css";

const Manager = ({ state, account }) => {
    const [Cbalance, setCbalance] = useState(0);
    const [Lwinner, setLwinner] = useState("");
    const getBalance = async () => {
        const { contract } = state;
        try {
            const balance = await contract.getBalance();
            const Balance = ethers.utils.formatEther(balance);
            console.log(Balance)
            setCbalance(Balance)

        } catch (e) {
            setCbalance("You are not the manager");

        }
    }
    const winner = async () => {
        const { contract } = state;
        try {
            await contract.pickWinner();
            const LotteryWinner = await contract.winner();
            setLwinner(LotteryWinner);
        }
        catch (e) {
            if (e.message.includes("There is no amount ")) {
                setLwinner("There is no amount collected")
            } else if (e.message.includes("This function is only for Manager")) {
                setLwinner("This function is only for Manager")
            } else if (e.message.includes("Players are less than 3")) {
                setLwinner("Players are less than 3")
            } else {
                setLwinner("No Winner Yet...!")
            }
        }
    }

    return (
          <>
            <div className="center">
                <b id='connected'>Connected account -:</b> <span id='account'>{account}</span>
              
              
                <b id='winner'>  <span id="lwinner"> {Lwinner} </span></b><br />
                   
                    <button className="buttonWinner" onClick={winner}>
                        Click For Winner
                </button><br />
                
         
                <b id='balance'> </b> <span id='ethbalance'> {Cbalance} ETH </span> <br />
                    <button className="buttongetbal" onClick={getBalance}>
                        Click For Balance
                </button><br />
            </div>
        </>
    )
}

export default Manager;