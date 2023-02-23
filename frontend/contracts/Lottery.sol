//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Lottery{

    address payable[] public players;
    address payable public  manager;
    address payable public winner;
    constructor() public
    {
        manager = payable(msg.sender);
    }
    receive() external payable {}
    function acceptPayment() external payable {
    require(msg.value == 0.001 ether, "Incorrect payment amount.");
    address player=msg.sender;
    for (uint i=0;i<players.length;i++){
            require(players[i]!=player,"You already Participated");
        }
    players.push(payable(player));
     payable(address(this)).transfer(0.001 ether);
}
    function getBalance() public view returns(uint)
    {
        require(msg.sender == manager,"You are not the managerr");
        return address(this).balance;
    }
    function random() internal view returns(uint)
    {
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }
    function GetAllPlayers() public view returns(address payable[] memory){
        return players;
    }
    function pickWinner() public
    {    
        require(address(this).balance>0,"There is no amount ");
        require(msg.sender == manager,"This function is only for Manager");
        require (players.length >= 3,"Players are less than 3");
        uint r = random();
        uint index = r % players.length;
        winner = players[index];
        uint balance=getBalance();
        uint profit=(balance*3)/100;
        manager.transfer(profit);
        winner.transfer(getBalance());
        players = new address payable[](0);
    }
}
