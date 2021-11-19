import React from "react"
import { useState, useEffect, useCallback } from "react" 
import { Card, Button, Spinner } from "react-bootstrap"
import { ethers } from "ethers"

import MintingContract from "../MintingContract.json";

import './minter.css'

const Minter = () => {

    const CONTRACT_ADDRESS = "0x26FF6e064D70531AE5bb824D504D055D69b62ba8";
    const abi = MintingContract.abi;

    const [chainId, setChainId] = useState(0)
    const [mintedURL, setMintedURL] = useState("")
    const [tokenCount, setTokenCount] = useState(0)
    const [myTokenCount, setMyTokenCount] = useState(0)
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleAddComment = (comment, ...args) => {
        console.log(comment, args);
    }

    function getEthereumObject() {
        const { ethereum } = window;

        if (!ethereum) {
            throw new Error("Ethereum object doesn't exist!");
        } else {
            return ethereum;
        }
    }

    const connectWallet = useCallback(async () => {
        try {
            const ethereum = getEthereumObject();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            
            const chain = ethereum.chainId
            setChainId(parseInt(chain))

            const tokens = await getTokenCount()

            setTokenCount(tokens)
        } catch (error) {
            handleAddComment(`Failed to connect to Metamask`, error);
        }
    }, []);

    async function getTokenCount() {
        try {
            const connectedContract = await connectToContract();
            const count = await connectedContract.tokenCount();

            // Ask as well for tokens by this contract
            const myCount = await connectedContract.tokenCount();
            setMyTokenCount(myCount)

            // Return the tokens minted so far.
            return count.toNumber();
        } catch (error) {
            handleAddComment(`Failed to get token count`, error);
            return 0;
        }
    }

    async function connectToContract() {
        const ethereum = await getEthereumObject();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    }

    const mintBasicNFT = async () => {
        setIsLoading(true);
        try {
            const connectedContract = await connectToContract();
            let nftTxn = await connectedContract.mintBasicNFT();
            await nftTxn.wait();
            const count = await getTokenCount();
            let url = `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${count}`
            setMintedURL(url)
        } catch (error) {
            console.log(error);
            handleAddComment(`Failed to mint`, error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log('Calling Wallet Here...')
        connectWallet()
    }, [connectWallet])

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://gateway.pinata.cloud/ipfs/QmdpG92bzgXU8nC8g7NhD6N6LjwKZDojT3tzxxMTB9AQ5P" />
            {myTokenCount > 0
            ? (
                <Card.Body style={{ background: "green" }}>
                    <Card.Text>
                        You have <a href="https://testnets.opensea.io/account" style={{ color: "white" }} target="_blank">one</a>!
                    </Card.Text>
                </Card.Body>  
            )
            : <></>
            }
            <Card.Body>
                <Card.Title>
                    Business Card NFT    
                </Card.Title>
                {chainId !== 4
                ? (
                    <Card.Body className="rounded" style={{ background: "red" }}>
                        <Card.Text>
                            You need to connect to Rinkeby Network.
                        </Card.Text>
                    </Card.Body>
                )
                : (
                    <>
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
                            ? <Button disabled variant="warning">
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    />
                                    &nbsp;
                                    Minting...
                                </Button>
                            : <Button onClick={currentAccount && !isLoading ? mintBasicNFT : undefined} variant="primary">Mint One for Me</Button>
                            }
                            </div>)
                        : <span></span>
                        }
                    </>
                )
                } 
            </Card.Body>
        </Card>
    );
}

export default Minter 

