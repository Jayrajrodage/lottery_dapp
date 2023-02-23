import React from "react";
import { Link, BrowserRouter, Switch } from "react-router-dom";
import "./Intro.css";
const Intro = () => {
    return (
        <div id="intro">
            <BrowserRouter>
                <Switch>
                    <React.Fragment>
                        <div >
                            <h2 className="heding">Welcome to the Future of Lottery: Introducing our Decentralized Lottery Dapp</h2>
                            <div className="main">
                                    <h1 className="who"> Who You are</h1>
                              
                            <Link to="/manager" className="button1">
                                        <button onClick={event => window.location.href = "/manager"} className="button1">Manager</button>
                                    </Link>

                            <Link to="/player" className="buttonPlayer" >
                                        <button onClick={event => window.location.href = '/player'} className="button1" id="palyer">Player</button>
                                    </Link>
                                </div >   
                            </div>
                        
                    </React.Fragment>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Intro;