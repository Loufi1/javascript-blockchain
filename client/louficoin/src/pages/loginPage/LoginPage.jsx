import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {Link} from "react-router-dom";

function LoginPage() {
    return (
        <div className="App">
            <Container fluid={true}>
                <Row className="mt-5">
                    <Col>
                        <Row className="my-auto justify-content-center">
                            <Col xs={1} className="my-auto">
                                <Image src={require('../../assets/blockchain.png')} height={75}/>
                            </Col>
                            <Col className="my-auto" xs={6}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="private-key">Private key</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Private key"
                                        aria-label="private-key"
                                        aria-describedby="private-key"
                                    />
                                </InputGroup>
                            </Col>
                            <Col className="my-auto" xs={1}>
                                <Link style={{ textDecoration: 'none' }} to={{
                                    pathname: '/wallet',
                                    state: {
                                        newWallet: false,
                                        privateKey: '1272bdzj27djDEceZDE34dRec4I3neeBef',
                                    }
                                }}>
                                    <Button block style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}}>Login</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginPage;
