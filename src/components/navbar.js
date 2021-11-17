import React from "react";
import useSWR from "swr";
import { Navbar, Container, ButtonGroup, Button } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { injected } from "../components/connectors"

import './navbar.css'

const NETWORK = {
    1: "Mainet",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kvan"
}

const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    return library[method](...params)
}

export const Balance = (props) => {

    const { account, library } = props;
    const { data: balance } = useSWR(['getBalance', account, 'latest'], {
      fetcher: fetcher(library.eth),
    })

    if(!balance) {
      return <div>...</div>
    }
    return <div>{library.utils.fromWei(balance).toString().slice(0,6)} ETH</div>
}

export default class NavBar extends React.Component {

    ConnectWallet() {

        const { activate, deactivate, account, library, chainId } = useWeb3React();

        if (account) return (
            <ButtonGroup size="sm">
                {chainId !== 1
                ? <Button variant="warning">{NETWORK[chainId]}</Button>
                : <></>
                }
                <Button variant="secondary">{account.slice(0,5)}... <span role="img" aria-label="OK">✅</span> </Button>
                <Button variant="secondary"><Balance account={account} library={library} /></Button>
                <Button variant="danger" onClick={() => deactivate()}>Disconnect</Button>
            </ButtonGroup>
        )

        return (
            <>
                <Button size="sm" onClick={() => activate(injected)}>Connect</Button>
            </>
        )
    }

    render() {
        return (
            <Navbar collapseOnSelect variant="dark" bg="transparent" className="component-navbar" sticky="top">
            <Container>
                <Navbar.Brand href="#home">joaxap.eth</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <this.ConnectWallet />
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    }
}