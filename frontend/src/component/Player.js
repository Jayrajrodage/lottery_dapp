import React, { useEffect, useState } from "react";
import "./Player.css"
import { ethers } from "ethers"
const Players = ({ state, contractAddress, account }) => {
    const [registerdPlayers, setRegisterdPlayers] = useState([]);
    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    
    const Pay = async () => {
        try {
            const { contract } = state;
            const tx = await contract.acceptPayment({ value: ethers.utils.parseEther("0.001")});
            setMessage("Transaction sent, waiting for confirmation...");
            await tx.wait();
            setMessage("Payment accepted.");
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 15000);
        } catch (e) {
            if (e.message.includes("Incorrect payment amount.")) {
                setMessage("Incorrect payment amount.");
            } else if (e.message.includes("You already Participated")) {
                setMessage("You already Participated");
            } else {
                setMessage("somthing went wrong");
            }

        }
    }
    useEffect(() => {
        const getPlayers = async () => {
            const { contract } = state;
            const players = await contract.GetAllPlayers();
            const registerdPlayers = await Promise.all(
                players.map((player) => {
                    return player;
                   
                })
            );
            setRegisterdPlayers(registerdPlayers);
        };
        state.contract && getPlayers()
    }, [state, state.contract, reload]);
    return (
        <>
                <div className="div">
                <b id="Caccount">Connected account -:</b> <span id="ac">{account}</span><br /><br />
                <button id="msg" onClick={Pay}>Pay</button>  <br /> <br />
                <b id="RPlyer">Registerd Players -:</b><br />
                        {registerdPlayers.length !== 0 &&
                    registerdPlayers.map((name) => <p id="Players" key={name}>{name}</p>)}
                <p>{message}</p>

            </div>
            </>
    );
};
export default Players;
//ok