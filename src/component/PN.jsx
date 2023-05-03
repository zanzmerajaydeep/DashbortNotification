import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { PNbase_url } from '../assest/base_url';
import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';

export const PN = () => {

    const [Customers, setCustomers] = useState([]);

    const [ReqResponse, setReqResponse] = useState([]);
    const [errorResponse, setErrorResponse] = useState([]);
    const [errorResponse1, setErrorResponse1] = useState([]);

    useEffect(() => {

        axios.get(`${PNbase_url}/getAllCustomer`).then(
            (response) => {

                // console.log(response.data);
                setCustomers(response.data)
                console.log(response.data)
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);

    const sendAllNotification = () => {
        axios.post(`${PNbase_url}/sendpn`).then(
            (res) => {
               
                Array.from(res.data).map((data) => {
                    if (data.statusCodeValue != 200) {
                        toast.error("Status Code : "+data.statusCodeValue);

                    }
                    else {
                        toast.success("Status Code : "+data.statusCodeValue);

                    }

                })
                setReqResponse([...ReqResponse, ...res.data])
            },
            (error) => {
                setReqResponse(error)
                alert("Error : Something wrong! "+error)
                
            }
        );
    }

    const sendPnByToken = (token) => {
        console.log(token)
        axios.post(`${PNbase_url}/sendpnbyid`, token, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(
            (response) => {
                
                toast.success("Status Code : "+response.status);
                setErrorResponse([...errorResponse, response])
            },
            (error) => {
                setErrorResponse1([...errorResponse1, error])
                toast.error("Status Code : "+error.response.status);

            }
        );
    }




    return (
        <>
            <div className='home'>
                <ToastContainer />
                <div className='contain'>
                    <Row style={{ height: '400px' }}>
                        <Col md={7}>
                            <h3 style={{ margin: '30px' }}><strong>Effortlessly send personalized notifications with NotifyMe.com </strong></h3 >
                            {/* <p className='containparagraph' >NotifyMe.com's Push Notification Microservice is a reliable and customizable way to send personalized push notifications. Our easy integration and configurable templates allow for consistent branding and reliable delivery. Experience streamlined push notifications with NotifyMe.com's Push Notification Microservice today.</p> */}
                            <h5 style={{ margin: '30px' }}>Here one use case :</h5>
                            <p className='containparagraph' >Notifyme.com: Send personalized push notifications to all customers about exclusive food discounts. Easily integrate your customer database and keep them informed with just a few clicks.</p>

                        </Col>
                        <Col md={5} style={{ marginTop: '30px' }} >
                            <div className='emailCardBody'>
                                <Card className='emailCard' onClick={() => sendAllNotification()} >
                                    <CardTitle><strong>Notification </strong></CardTitle>
                                    <CardImg src='pn2.png'></CardImg>
                                </Card>
                                <CardSubtitle ></CardSubtitle>
                            </div>
                            <div style={{ marginLeft: '40px' }}>
                                <h5 >Click notification icon to notify all customer.</h5>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='table'>
                    <header className='headertable'>
                        <h2>Customer Data</h2>
                    </header>
                    <Table
                        bordered
                        borderless
                        hover
                        responsive
                        size="sm"
                        striped
                    >
                        <thead className="table-SlateGray">
                            <tr>
                                <th>
                                    Customer Name
                                </th>
                                <th>
                                    Credit CardNo
                                </th>
                                <th>
                                    Contact No
                                </th>
                                <th>
                                    Expairy Date
                                </th>
                                <th>
                                    Bank Name
                                </th>

                            </tr>
                        </thead>
                        {
                            Array.from(Customers).map((customer) => {
                                return (<>
                                    <tbody className="table-light">
                                        <tr>
                                            <td>{customer.customerName}</td>
                                            <td>{customer.cardNo}</td>
                                            <td>{customer.customerContactNo}</td>
                                            <td>{customer.expairyDate}</td>
                                            <td>{customer.bankName}</td>
                                            <td><Button onClick={() => sendPnByToken(customer.customerName)} >Send</Button></td>
                                        </tr>
                                    </tbody>
                                </>)
                            })
                        }
                    </Table>
                </div>

                <div style={{ margin: '20px' }}>

                    {/* //-------------for singal one-------------------- */}
                    <header className='errorHeader'>
                        <h4>Singal Request Response Data</h4>
                    </header>

                    <div>

                        {
                            Array.from(errorResponse).map((res, i) => {

                                return (<>

                                    <p key={i}>

                                        ({i + 1})

                                        Response : <span style={{ color: res.status == 200 ? "green" : "red" }}>  {res.data}</span><span></span> Status Code :<strong> {res.status}</strong><br />


                                        <hr></hr>
                                    </p>


                                </>
                                )
                            })
                        }
                        {
                            Array.from(errorResponse1).map((res, i) => {

                                return (<>

                                    <p key={i}>

                                        ({errorResponse.length + i + 1})
                                        {/* DateTime : {res.headers?.Date}<br /> */}
                                        Response : <span style={{ color: res.response.status == 200 ? "green" : "red" }}>  {res.response.data}</span><span></span>Status Code : <strong>{res.response.status}</strong><br />


                                        <hr></hr>
                                    </p>


                                </>
                                )
                            })
                        }

                    </div>


                    <header className='errorHeader'>
                        <h4>Multiple Request Response Data</h4>
                    </header>
                    <div >
                        {

                            Array.from(ReqResponse).map((res, i) => {

                                return (<>

                                    <p key={i} >

                                        ({i + 1})
                                        {/* DateTime : {res.headers?.Date}<br /> */}
                                        Response : <span style={{ color: res.statusCodeValue == 200 ? "green" : "red" }}>  {res.body}</span><span></span>Status Code : <strong>{res.statusCodeValue}</strong><br />


                                        <hr></hr>
                                    </p>


                                </>
                                )
                            })

                        }

                    </div>




                </div>
            </div >
        </>
    )
}
