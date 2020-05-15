import React, {useEffect, useState} from 'react';
import {Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function WalletPage(props) {
    const [privateKey, setPrivateKey] = useState('');

    useEffect(() => {
        if (!props.location.state.newWallet)
            setPrivateKey(props.location.state.privateKey);
    });

    return (
        <div className="App">
            <Container fluid={true}>
                <Row className="mt-3">
                    <Col className="my-auto">
                        <Image src={require('../../assets/blockchain.png')} height={75}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WalletPage;
