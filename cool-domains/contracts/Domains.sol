// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {

    struct Domain {
        address registrant;
        address controller;
        string content;
        string email;
    }

    // custom "mapping" data type to store their names
    mapping(string => Domain) public domains;

    // A "mapping" data type to store their names
	// mapping(string => address) public domains;

	// Checkout our new mapping! This will store values
    // mapping(string => string) public records;
    
    constructor() {
        console.log("BREAKING THIS BETTER. HOLD FOR ERROR RESOLUTION.");
    }
    
    // A register function that adds their names to our mapping
    function register(string calldata name) public {
        // Check that the name is unregistered
        require(domains[name].registrant == address(0));
        domains[name].registrant = msg.sender;
        domains[name].controller = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // This will give us the domain owners' address
    function getAddress(string calldata name) public view returns (address) {
        // Check that the owner is the transaction sender
        return domains[name].controller;
    }

    function setRecord(string calldata name, Domain calldata domain) public {
        // Check that the owner is the transaction sender
        require(domains[name].controller == msg.sender);
        domains[name] = domain;
    }

    function getRecord(string calldata name) public view returns(Domain memory) {
        return domains[name];
    }

    function setEmail(string calldata name, string calldata email) public {
        // Check that the owner is the transaction sender
        require(domains[name].controller == msg.sender, "only the domain controller can set it's 'email'");
        domains[name].email = email;
    }

    function getEmail(string calldata name) public view returns(string memory) {
        return domains[name].email;
    }

    function setContent(string calldata name, string calldata content) public {
        // Check that the owner is the transaction sender
        require(domains[name].controller == msg.sender, "only the domain controller can set it's 'content'");
        domains[name].content = content;
    }

    function getContent(string calldata name) public view returns(string memory) {
        return domains[name].content;
    }
}