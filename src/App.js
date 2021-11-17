import React from 'react';
import NavBar from "./components/navbar"
import withLoading from "./components/withLoading"
import { Container, Row } from 'react-bootstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <p> joaxap.eth </p>
        </Row>
      </Container>
    </>
  );
}

export default withLoading(App);
