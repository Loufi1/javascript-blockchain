import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <div className="App">
            <Container fluid={true}>
                <Row className="mx-auto mt-3">
                    <Col xs={1} className="my-auto">
                        <Image src={require('../../assets/blockchain.png')} height={75}/>
                    </Col>
                    <Col xs={7} className="my-auto">
                        <h1 className="title">Javascript based blockchain</h1>
                    </Col>
                    <Col className="my-auto">
                        <Row className="my-auto">
                            <Col className="my-auto">
                                <Link style={{ textDecoration: 'none' }} to={{
                                    pathname: '/wallet',
                                    state: {
                                        newWallet: true,
                                    }
                                }}>
                                    <Button block style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}}>New wallet</Button>
                                </Link>
                            </Col>
                            <Col className="my-auto">
                                <Button href='/wallet/login' block style={{backgroundColor: '#414345', border: '#BD2ABB 1px solid'}}>Sign in</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage;
