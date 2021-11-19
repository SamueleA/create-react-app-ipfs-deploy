import React from "react"
import { Container, Navbar, Row, Col } from 'react-bootstrap'

import './footerbar.css'

const FooterBar = () => {
    return (
        <Navbar className="component-navbar" fixed="bottom">
            <Container fluid>
                <Row>
                    <Col className="text-center ipfs-logo p-3">
                        <img alt="ipfs-logo" src="ipfs-icon.png" style={{ opacity: 0.4}} />
                        <span className="small px-2">
                            This page is hosted on IPFS
                        </span>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}

export default FooterBar