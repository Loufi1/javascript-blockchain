import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {withRouter} from "react-router-dom";
import queriesManager from "../../services/queries";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

class LandingPage extends React.Component {
    state = {
        blockchain: [],
    };

    componentDidMount() {
        queriesManager.getBlockchain((res) => {
            this.setState({
                blockchain: res.data,
            });
        });
    }

    goToWallet() {
        queriesManager.connectToWallet(true, null, null,(keys) => {
            console.log(keys);
            this.props.history.push({
                pathname: '/wallet',
                state: {
                    newWallet: true,
                    privateKey: keys.data.privateKey,
                    publicKey: keys.data.publicKey,
                }
            });
        }).then();
    }

    render() {
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
                                    <Button block style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}} onClick={() => this.goToWallet()}>New wallet</Button>
                                </Col>
                                <Col className="my-auto">
                                    <Button href='/wallet/login' block style={{backgroundColor: '#414345', border: '#BD2ABB 1px solid'}}>Sign in</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container style={{marginTop: '10%'}} fluid={true}>
                    <div className="horizontal-scroll">
                        {
                            this.state.blockchain.map((block) => {
                                return (
                                    <div className="mr-2 ml-2 text-color-white" key={block.signature} style={{ width: '600px'}}>
                                        <Card bg={'dark'}>
                                            <Card.Header>{block.timeStamp}</Card.Header>
                                            <Card.Body>
                                                    <Accordion style={{cursor: 'pointer'}}>
                                                        <Card style={{backgroundColor: 'transparent', borderRadius: '10px'}}>
                                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                                <Row>
                                                                    nonce -> {block.nonce}
                                                                </Row>
                                                                <Row>
                                                                    prev -> {block.previousBlock}
                                                                </Row>
                                                                <Row>
                                                                    signature -> {block.signature}
                                                                </Row>
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    {
                                                                        block.data.map((transaction) => {
                                                                            return(
                                                                                <Container fluid={true} key={transaction.timeStamp}>
                                                                                    <Row>
                                                                                        {transaction.timeStamp}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        {'<-'} {transaction.from}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        {'->'} {transaction.to}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        {transaction.signature}
                                                                                    </Row>
                                                                                    <Row>
                                                                                        {transaction.amount} coin
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <hr/>
                                                                                    </Row>
                                                                                </Container>
                                                                            );
                                                                        })
                                                                    }
                                                                </Card.Body>
                                                            </Accordion.Collapse>
                                                        </Card>
                                                    </Accordion>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Container>
            </div>
        );
    }
}

export default withRouter(LandingPage);
