import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import queriesManager from "../../services/queries";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import MaterialIcon from 'material-icons-react';

class WalletPage extends React.Component {
    state = {
        privateKey: '',
        publicKey: '',
        newWallet: false,
        sold: 0,
    };

    componentDidMount() {
        if (this.props.location.state.newWallet) this.setState({newWallet: true});

        this.setState({
            privateKey: this.props.location.state.privateKey,
            publicKey: this.props.location.state.publicKey,
        });

        queriesManager.getWalletSold((sold) => {
            console.log(sold);
            this.setState({sold: sold.data})
        }).then();
    }

    handleClose() {
        this.setState({
            newWallet: false,
        })
    }

    mineBlock() {
        console.log(this.state.publicKey);
        queriesManager.mineNewBlock(this.state.publicKey, (res) => {
            console.log(res);
        }).then();
    }

    render() {
        return (
            <div className="App">
                <Container fluid={true}>
                    <Modal show={this.state.newWallet} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>New wallet created</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <InputGroup className="mb-3 ml-3 mr-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="pkey">Private key</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        value={this.state.privateKey}
                                        placeholder="Private key"
                                        aria-label="Private key"
                                        aria-describedby="pkey"
                                        readOnly={true}
                                    />
                                </InputGroup>
                            </Row>
                            <Row>
                                <InputGroup className="mb-3 ml-3 mr-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="pukey">Public key</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        value={this.state.publicKey}
                                        placeholder="Public key"
                                        aria-label="Public key"
                                        aria-describedby="pukey"
                                        readOnly={true}
                                    />
                                </InputGroup>
                            </Row>
                            <Row className="mx-auto" style={{color: '#BD2ABB', fontWeight: 'bold'}}>
                                Make sur to save your private key !
                            </Row>
                        </Modal.Body>
                    </Modal>
                    <Row className="mt-3">
                        <Col className="my-auto" xs={9}>
                            <Image src={require('../../assets/blockchain.png')} height={75}/>
                        </Col>
                        <Col className="mt-4 text-color-white" xs={2} style={{textAlign: 'end'}}>
                            You have {this.state.sold} coin
                        </Col>
                        <Col className="my-auto mr-3" style={{textAlign: 'end', cursor: 'pointer'}}>
                            <MaterialIcon icon="settings" color='white' size={25}/>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={6} className="mx-auto">
                            <Row className="mx-auto mt-5">
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="Public-key">To</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Public key"
                                        aria-label="Public key"
                                        aria-describedby="Public-key"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="Coins">Amount</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Coins"
                                        aria-label="Coins"
                                        aria-describedby="Coins"
                                    />
                                </InputGroup>
                            </Row>
                            <Row>
                                <Col xs={4} className="mx-auto">
                                    <Button block style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}}>Send</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={6} className="mx-auto mt-5">
                            <Row className="mx-auto mt-5">
                                <Col xs={4} className="mx-auto">
                                    <Button block
                                            style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}}
                                            onClick={() => this.mineBlock()}
                                    >Mine a block</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default WalletPage;