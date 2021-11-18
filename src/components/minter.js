import React from "react"
import { useState } from "react" 
import { Card, Button } from "react-bootstrap"
import { ethers } from "ethers"

import MintingContract from "../MintingContract.json";

import './minter.css'

const Minter = () => {

    const CONTRACT_ADDRESS = "0x26FF6e064D70531AE5bb824D504D055D69b62ba8";
    const abi = MintingContract.abi;

    const [mintedURL, setMintedURL] = useState("")
    const [tokenCount, setTokenCount] = useState(0)
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState(["Initialized"]);
    const handleAddComment = (comment, ...args) => {
        console.log(comment, args);
    }

    function getEthereumObject() {
        const { ethereum } = window;

        if (!ethereum) {
            handleAddComment("Ethereum object doesn't exist!");
            throw new Error("Ethereum object doesn't exist!");
        } else {
            return ethereum;
        }
    }

    async function connectWallet() {
        handleAddComment(`Connecting... to Metamask...`);
        try {
            const ethereum = getEthereumObject();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            handleAddComment(`Connected to ${accounts}`);
            setCurrentAccount(accounts[0]);
            const tokens = await getTokenCount()
            setTokenCount(tokens)
        } catch (error) {
            handleAddComment(`Failed to connect to Metamask`, error);
        }
    }

    async function getTokenCount() {
        try {
            const connectedContract = await connectToContract();
            handleAddComment(`Getting NFT count...`);

            const count = await connectedContract.tokenCount();
            handleAddComment(`Minted NFTs total: ${count.toNumber()}`);

            return count.toNumber();
        } catch (error) {
            handleAddComment(`Failed to get token count`, error);
            return 0;
        }
    }

    async function connectToContract() {
        const ethereum = await getEthereumObject();
        handleAddComment("Connecting to contract...");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    }

    const mintBasicNFT = async () => {
        setIsLoading(true);
        try {
            handleAddComment("Connecting to contract...");
            const connectedContract = await connectToContract();

            handleAddComment("Going to pop wallet now to pay gas...");
            let nftTxn = await connectedContract.mintBasicNFT();

            handleAddComment("Mining...please wait.");
            await nftTxn.wait();

            handleAddComment(
            `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
            );
            const count = await getTokenCount();
            handleAddComment(
            `OpenSea link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${count}`
            );
            let url = `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${count}`
            setMintedURL(url)
        } catch (error) {
            console.log(error);
            handleAddComment(`Failed to mint`, error);
        } finally {
            setIsLoading(false);
        }
    }

    connectWallet()

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://gateway.pinata.cloud/ipfs/QmdpG92bzgXU8nC8g7NhD6N6LjwKZDojT3tzxxMTB9AQ5P" />
            <Card.Body>
                <Card.Title>
                    Business Card NFT    
                </Card.Title>
                <Card.Text className="text-black">
                    Minted: {tokenCount}
                </Card.Text>
                {mintedURL !== ""
                ? ( <div className="d-grid gap-2 opensea-link">
                        <Button variant="success" href={mintedURL} target="_blank"><img src="opensea-icon.png" /> See Card NFT</Button>
                    </div>)
                : <span></span>
                }
                {mintedURL == ""
                ? (<div className="d-grid gap-2">
                    {isLoading 
                    ? <Button disabled variant="warning">Minting...</Button>
                    : <Button onClick={currentAccount && !isLoading ? mintBasicNFT : undefined} variant="primary">Mint One for Me</Button>
                    }
                    </div>)
                : <span></span>
                } 
            </Card.Body>
        </Card>
    );
}

export default Minter 

