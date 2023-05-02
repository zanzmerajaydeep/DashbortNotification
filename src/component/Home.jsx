import React from 'react'
import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Col, Row } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


import { Link, NavLink } from 'react-router-dom'

export const Home = ({ products }) => {
    return (
        <div className='home'>
            <div>
                <div >
                    <Row className='row'>
                        <Col md={8}>
                            <h1 style={{ margin: '30px' }} class="display-2">NotifyMe.com</h1>
                            <p className='containparagraph' >NotifyMe.com's Notification Service is a REST-based component that offers a simple and reliable way to send notifications via multiple channels. Our service supports configurable message templates, ensuring consistent branding and reliable delivery of your important messages. With our easy-to-use API, you can seamlessly integrate notifications into your web or mobile app, providing instant updates and alerts to your users across multiple channels.</p>
                            <h5 className='containparagraph' >Multi-channel notifications via :</h5>
                            <ul className='containparagraph'>
                                <li>Email</li>
                                <li>SMS</li>
                                <li>Push Notification</li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <div className="App">
                                <img src='bell2.png' className="App-logo" alt="logo" />
                            </div>
                        </Col>
                    </Row>

                </div>
                <hr></hr>
                <h3 style={{ margin: '30px' }}><strong>Send notifications via multiple channels include Below Services </strong></h3 >
                <hr></hr>
                <div className='card1 ' >
                    {
                        Array.from(products).map((product) => {

                            return (
                                <div className='productItem' style={{ width: '33%' }} >
                                    <div sm="6" md="4" lg="3">
                                        <Row>
                                            <Col sm="6" md="4" lg="3">
                                                <Card className='card'
                                                    body
                                                    color="dark"
                                                    inverse
                                                    outline
                                                    style={{
                                                        width: '18rem',
                                                        color: "black",
                                                        backgroundColor: "white"
                                                    }}
                                                >
                                                    <CardImg
                                                        top
                                                        alt="Sample"
                                                        width="100%"

                                                        src={product.img}
                                                        style={{ height: "200px" }}
                                                    />
                                                    <CardBody>
                                                        <CardTitle tag="h5" className='cardname'>
                                                            {product.name}
                                                        </CardTitle>
                                                        <CardSubtitle
                                                            className="mb-2"
                                                            tag="h6"
                                                        >
                                                            {product.des}
                                                        </CardSubtitle>
                                                        <CardText>
                                                        </CardText>
                                                        <Button color='dark'>
                                                            <Link to={'/' + product.name} >Learn More</Link>
                                                        </Button>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}
