import React from 'react'

import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col, Alert } from 'reactstrap'
import { SMSbase_url } from '../assest/base_url';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const SMS = () => {

    const [Patients, setPatients] = useState([]);

    const [ReqResponse, setReqResponse] = useState([]);
    const [errorResponse, setErrorResponse] = useState([]);
    const [errorResponse1, setErrorResponse1] = useState([]);

    const [loading,setloading]=useState(false);

 

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
        setloading(true);
        axios.post(`${SMSbase_url}/sendsms`).then(
            (res) => {
                setloading(false)
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
                setloading(false)
                setReqResponse(error)
                alert("Error : Something wrong!")
                
                }
        );
    }

    const sendSMSByContactNo = (contactNo) => {
        axios.post(`${SMSbase_url}/callSMSServiceByContactNo`, contactNo, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(
            (response) => {
                        
                toast.success("Status Code : "+response.status );
                 setErrorResponse([...errorResponse,response])
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
                {
                   loading? <ScaleLoader color="#36d7b7" />:" "

                }
                
                <div className='contain'>
                    <Row style={{ height: '400px' }}>
                        <Col md={7} >
                            <h3 style={{ margin: '30px' }}><strong>Automate Your SMS Notifications and Save Time with NotifyMe.com</strong></h3 >
                            {/* <p className='containparagraph' >NotifyMe.com's SMS Service is a REST-based component that offers a simple and reliable way to send personalized SMS notifications. Our service supports multiple SMS providers and configurable message templates, ensuring consistent branding and reliable delivery of your important messages. With our easy-to-use API, you can seamlessly integrate SMS notifications into your web or mobile app, providing instant updates and alerts to your users.</p> */}
                            <h5 style={{ margin: '30px' }}>Here one use case :</h5>
                            <p className='containparagraph' >NotifyMe.com: Send personalized SMS appointment confirmations to patients with date and time details. Easily integrate with your appointment management system and keep your patients informed with just a few clicks.</p>

                        </Col>
                        <Col md={5} style={{ marginTop: '20px' }} >
                            <div className='emailCardBody'>
                                <Card className='emailCard' onClick={() => sendAllSMS()} >
                                    <CardTitle><strong>SMS </strong></CardTitle>
                                    <CardImg src='sms4.png'></CardImg>
                                </Card>
                                <CardSubtitle ></CardSubtitle>
                            </div>
                            <div style={{ marginLeft: '140px' }}>
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
                                            <td><Button onClick={() => sendSMSByContactNo(Patient.contactNo)}>Send</Button></td>
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

                                        ({ i + 1})
                                        
                                        Response : <span style={{ color: res.status == 200 ? "green" : "red" }}>  {res.data}</span><span></span> Status Code :<strong> {res.data}</strong><br />

                                       
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


            </div>
        </>

    )
}
