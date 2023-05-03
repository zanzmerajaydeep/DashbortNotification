import React, { useEffect, useState } from 'react'
import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col, Link, NavItem, NavLink } from 'reactstrap'
import { Emailbase_url } from '../assest/base_url';
import { NavLink as reactlink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export const Email = () => {

    const [Students, setStudent] = useState([]);

    const [ReqResponse, setReqResponse] = useState([]);
    const [errorResponse, setErrorResponse] = useState([]);
    const [errorResponse1, setErrorResponse1] = useState([]);



    //get all email data----------
    useEffect(() => {

        axios.get(`${Emailbase_url}/getAllStudent`).then(
            (response) => {

                // console.log(response.data);
                setStudent(response.data)
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);

    //for send All--------------
    const sendAllEmail = () => {
        axios.post(`${Emailbase_url}/sendmail`).then(
            (res) => {

                Array.from(res.data).map((data) => {
                    if (data.statusCodeValue != 200) {
                        toast.error("Status Code : " + data.statusCodeValue);

                    }
                    else {
                        toast.success("Status Code : " + data.statusCodeValue);

                    }

                })
                setReqResponse([...ReqResponse, ...res.data])

            },
            (error) => {
                setReqResponse(error)
                alert("Error : Something wrong!")

            }
        );
    }

    //-------------------for Email By Email-----------------------------------------------------

    const sendEmailByEmail = (studentEmail) => {

        axios.post(`${Emailbase_url}/sendmailByEmail`, studentEmail, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(
            (response) => {

                toast.success("Status Code : " + response.status);
                setErrorResponse([...errorResponse, response])
            }

        ).catch((error) => {
            alert(error)
            console.log("error" + error)
            // setErrorResponse1([...errorResponse1, error])
            // toast.error(error.response.data);

        });
    }



    return (
        <>
            <div className='home'>

                <div className='contain'>
                    <Row style={{ height: '400px' }}>
                        <Col md={7} >
                            <h3 style={{ margin: '30px' }}><strong>Streamline Your Email Workflow with NotifyMe.com </strong></h3 >
                            {/* <p className='containparagraph' >NotifyMe.com's Email Service is a REST-based component that provides a simple and reliable way to send customizable and personalized email notifications. The service supports multiple email providers and configurable templates, ensuring consistent branding and reliable email delivery.</p> */}
                            <h5 style={{ margin: '30px' }}>Here one use case  :</h5>
                            <p className='containparagraph' >Notifyme.com: Send personalized email notifications to all students about their internal semester results. Easily integrate your student database and keep students informed with just a few clicks.</p>

                        </Col>
                        <Col md={5} style={{ marginTop: '20px' }} >
                            <div className='emailCardBody'>
                                <Card className='emailCard' onClick={sendAllEmail}>
                                    <CardTitle><strong>Email </strong></CardTitle>
                                    <CardImg src='email.png'></CardImg>
                                </Card>
                                <CardSubtitle ></CardSubtitle>
                            </div>
                            <div className='iconHeader'>
                                <h5 >Click email icon to email all students.</h5>
                            </div>
                        </Col>
                    </Row>
                </div>


                <div className='table'>

                    <header className='headertable'      >

                            <NavLink style={{alignSelf:'revert'}} tag={reactlink} to="/addStudent" class="btn "><Button>Add Student</Button> </NavLink>
                        <h2 >Student Data</h2>

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
                                    Student Name
                                </th>
                                <th>
                                    Student Mark
                                </th>
                                <th>
                                    Student Email
                                </th>
                                <th>
                                    Student Mentor Name
                                </th>
                                <th>
                                    Student University
                                </th>
                                <th>
                                    Student Contact no
                                </th>
                            </tr>
                        </thead>
                        {
                            Array.from(Students).map((student) => {
                                return (<>
                                    <tbody className="table-light">
                                        <tr>
                                            <td>{student.studentName}</td>
                                            <td>{student.studentMark}</td>
                                            <td>{student.studentEmail}</td>
                                            <td>{student.studentMentorName}</td>
                                            <td>{student.studentUniversity}</td>
                                            <td>{student.studentContactno}</td>
                                            <td><Button onClick={() => sendEmailByEmail(student.studentEmail)}>Send</Button></td>
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
                                        {/* DateTime : {res.headers?.Date}<br /> */}
                                        Response : <span style={{ color: res.status == 200 ? "green" : "red" }}>  {res.data}</span> Status Code : <strong>{res.status}</strong><br />


                                        <hr></hr>
                                    </p>


                                </>
                                )
                            })
                        }
                        {
                            Array.from(errorResponse1).map((res, i) => {

                                return (<>
                                    {/* 
                                    <p key={i}>

                                        ({errorResponse.length + i + 1})
                                      
                                        Response : <span style={{ color: res.response.status == 200 ? "green" : "red" }}>  {res.response.data}</span><br />
                                        Status Code : {res.response.status}<br />

                                        <hr></hr>
                                    </p> */}



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
                                        Response : <span style={{ color: res.statusCodeValue == 200 ? "green" : "red" }}>  {res.body}</span><span></span>Status Code : <strong><b>{res.statusCodeValue}</b></strong><br />


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
