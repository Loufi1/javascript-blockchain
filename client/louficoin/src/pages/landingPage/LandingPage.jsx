import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LandingPage() {
    return (
        <div className="App">
            <Container fluid={true}>
                <Row className="mx-auto mt-3">
                    <Col xs={1} className="my-auto">
                        <Image src={require('../../assets/blockchain.png')} height={75}/>
                    </Col>
                    <Col xs={9} className="my-auto">
                        <h1 className="title">Javascript based blockchain</h1>
                    </Col>
                    <Row>
                        <Col className="my-auto">
                            <Button style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}}>Register</Button>
                        </Col>
                        <Col className="my-auto">
                            <Button style={{backgroundColor: '#414345', border: '#BD2ABB 1px solid'}}>Sign in</Button>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
}

export default LandingPage;
