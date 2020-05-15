import React from 'react';
import {Button, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {withRouter} from "react-router-dom";
import queriesManager from "../../services/queries";

class LoginPage extends React.Component {
    state = {
        pkey: '',
        pukey: '',
    };

    onChangePrivate(e) {
        this.setState({
            pkey: e.target.value,
        });
    };

    onChangePublic(e) {
        this.setState({
            pukey: e.target.value,
        });
    };

    goToWallet() {
        queriesManager.connectToWallet(false, this.state.pkey, this.state.pukey, (keys) => {
            console.log(keys);
            this.props.history.push({
                pathname: '/wallet',
                state: {
                    newWallet: false,
                    privateKey: keys.data.privateKey,
                    publicKey: keys.data.publicKey,
                }
            });
        }).then();
    };

    render() {
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
                                    <Row>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="private-key">Private key</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                value={this.state.pkey}
                                                onChange={(e) => this.onChangePrivate(e)}
                                                placeholder="Private key"
                                                aria-label="private-key"
                                                aria-describedby="private-key"
                                            />
                                        </InputGroup>
                                    </Row>
                                    <Row className="mt-3">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="public-key">Public key</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                value={this.state.pukey}
                                                onChange={(e) => this.onChangePublic(e)}
                                                placeholder="Public key"
                                                aria-label="public-key"
                                                aria-describedby="public-key"
                                            />
                                        </InputGroup>
                                    </Row>
                                </Col>
                                <Col className="my-auto mt-3" xs={1}>
                                    <Button block style={{backgroundColor: '#414345', border: '#27d2edfa 1px solid'}} onClick={() => this.goToWallet()}>Login</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(LoginPage);
