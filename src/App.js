import React from 'react';
import NavBar from "./components/navbar"
import FooterBar from "./components/footerbar"
import Minter from "./components/minter"
import withLoading from "./components/withLoading"
import { Container, Row, Col } from 'react-bootstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <NavBar />
      <Container fluid style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Container style={{ maxWidth: "45rem" }}>
          <Row>
            <Col style={{ maxWidth: '20rem' }}>
              <Minter />
            </Col>
            <Col className="px-3 py-2">
              <h1 >Get business card NFT</h1>
              <p>
                This new world needs new ways of sharing the information. Here is another way to share my business card with you.
              </p>
              <p>
                Connect your metamask wallet and get my business card NFT in your wallet. You will be able to see the NFT in Opensea and other NFT viewers out there.
              </p>
            </Col> 
          </Row>
        </Container>
      </Container>
      <FooterBar />
    </>
  );
}

export default withLoading(App);
