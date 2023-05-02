import React from 'react'

import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col } from 'reactstrap'
import { SMSbase_url } from '../assest/base_url';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export const SMS = () => {

    const [Patients, setPatients] = useState([]);
    const [ReqResponse, setReqResponse] = useState([]);
    const [errorResponse, setErrorResponse] = useState([]);

    useEffect(() => {

        axios.get(`${SMSbase_url}/getAllPatient`).then(
            (response) => {

                console.log(response.data);
                setPatients(response.data)
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);


    const sendAllSMS = () => {
        axios.post(`${SMSbase_url}/sendsms`).then(
            (res) => {
                let arr = res.data;
                console.log("arr", typeof arr);
                alert("success all sms")  //array 

                console.log("send all sms,", res.data)
                setReqResponse([...ReqResponse, ...res.data])
                console.log(ReqResponse)
            },
            (error) => {
                setReqResponse(error)
                alert("failure all sms")

                console.log("send all sms error", error)
                console.log("ans--" + ReqResponse)
            }
        );
    }

    const sendSMSByContactNo = (contactNo) => {
        axios.post(`${SMSbase_url}/callSMSServiceByContactNo`,contactNo,{
            headers:{
                "Content-Type":"application/json"
            },
        }).then(
            (response) => {
                alert("success")
                console.log([...errorResponse,response]) //object
                setReqResponse([...errorResponse,response])

                // setReqResponse(res.data)
                // setErrorResponse([...errorResponse,error])  

               
            },
            (error) => {
                alert("error")
                console.log(error) 
                setErrorResponse([...errorResponse,error])  
                
                // setReqResponse([...ReqResponse, Array.from(error.response)])
                
            }
        );
    }


    return (
        <>
            <div className='home'>

                <div className='contain'>
                    <Row style={{height:'400px'}}>
                        <Col md={7} >
                            <h3 style={{ margin: '30px' }}><strong>Automate Your SMS Notifications and Save Time with NotifyMe.com</strong></h3 >
                            {/* <p className='containparagraph' >NotifyMe.com's SMS Service is a REST-based component that offers a simple and reliable way to send personalized SMS notifications. Our service supports multiple SMS providers and configurable message templates, ensuring consistent branding and reliable delivery of your important messages. With our easy-to-use API, you can seamlessly integrate SMS notifications into your web or mobile app, providing instant updates and alerts to your users.</p> */}
                            <h5 style={{ margin: '30px' }}>Here one use case of SMS Service :</h5>
                            <p className='containparagraph' >NotifyMe.com: Send personalized SMS appointment confirmations to patients with date and time details. Easily integrate with your appointment management system and keep your patients informed with just a few clicks.</p>

                        </Col>
                        <Col md={5} style={{ marginTop: '20px' }} >
                            <div className='emailCardBody'>
                                <Card className='emailCard' onClick={sendAllSMS} >
                                    <CardTitle><strong>SMS </strong></CardTitle>
                                    <CardImg src='sms4.png'></CardImg>
                                </Card>
                                <CardSubtitle ></CardSubtitle>
                            </div>
                            <div style={{marginLeft:'140px'}}>
                                <h5 >Click sms icon to sms all Patient.</h5>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='table'>
                    <header className='headertable'>
                        <h2>Patients Data</h2>
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
                                    Patient Name
                                </th>
                                <th>
                                    Contact No
                                </th>
                                <th>
                                    Doctor Name
                                </th>
                                <th>
                                    Appointment Date
                                </th>
                                <th>
                                    Appointment Time
                                </th>
                                <th>
                                    Hospital Name
                                </th>
                            </tr>
                        </thead>
                        {
                            Array.from(Patients).map((Patient) => {
                                return (<>
                                    <tbody className="table-light">
                                        <tr>
                                            <td>{Patient.patientName}</td>
                                            <td>{Patient.contactNo}</td>
                                            <td>{Patient.doctorName}</td>
                                            <td>{Patient.date}</td>
                                            <td>{Patient.time}</td>
                                            <td>{Patient.hospitalName}</td>
                                            <td><Button onClick={()=>sendSMSByContactNo(Patient.contactNo)}>Send</Button></td>
                                        </tr>
                                    </tbody>
                                </>)
                            })
                        }
                    </Table>
                </div>

                <div style={{ margin: '20px' }}>

                    <header className='errorHeader'>
                        <h4>Request Response Data</h4>
                    </header>
                    <div >
                        {

                            Array.from(ReqResponse).map((res, i) => {

                                return (<>

                                    <p key={i} >

                                        ({i + 1})
                                        DateTime : {res.headers?.Date}<br />
                                        Response : <span style={{ color: res.statusCodeValue == 200 ? "green" : "red" }}>  {res.body}</span><br />
                                        Status Code : {res.statusCodeValue}<br />

                                        <hr></hr>
                                    </p>


                                </>
                                )
                            })

                        }
                        {
                            Array.from(errorResponse).map((res, i) => {

                                return (<>

                                    {/* <p key={i}>

                                        ({ReqResponse.length + i + 1})
                                        DateTime : {res.headers?.Date}<br />
                                        Response : <span style={{ color: res.response.status == 200 ? "green" : "red" }}>  {res.response.data}</span><br />
                                        Status Code : {res.response.data}<br />

                                        <hr></hr>
                                    </p> */}


                                </>
                                )
                            })
                        }
                    </div>




                </div>


            </div>
        </>

    )
}
