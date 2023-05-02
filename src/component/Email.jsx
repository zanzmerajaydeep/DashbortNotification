import React, { useEffect, useState } from 'react'
import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col } from 'reactstrap'
import { Emailbase_url } from '../assest/base_url';
import axios from 'axios';

export const Email = () => {

    const [Students, setStudent] = useState([]);
    const [ReqResponse, setReqResponse] = useState([]);
    const [errorResponse,setErrorResponse]=useState([]);

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

    const sendAllEmail = () => {
        axios.post(`${Emailbase_url}/sendmail`).then(
            (res) => {
                let arr=res.data;
                console.log("arr",typeof arr);
                alert("success all email")  //array 
                
                console.log("send all email,",res.data)
                setReqResponse([...ReqResponse,...res.data])
                console.log(ReqResponse)
            },
            (error) => {
                setReqResponse(error)
                alert("failure all email")

                console.log("send all email error",error)
            }
        );
    }

    const sendEmailByEmail = (studentEmail) => {
        axios.post(`${Emailbase_url}/sendmailByEmail`,studentEmail,{
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
                        <Col  md={7} >
                            <h3 style={{ margin: '30px' }}><strong>Streamline Your Email Workflow with NotifyMe.com </strong></h3 >
                            {/* <p className='containparagraph' >NotifyMe.com's Email Service is a REST-based component that provides a simple and reliable way to send customizable and personalized email notifications. The service supports multiple email providers and configurable templates, ensuring consistent branding and reliable email delivery.</p> */}
                            <h5 style={{ margin: '30px' }}>Here one use case of Email Service :</h5>
                            <p className='containparagraph' >Notifyme.com: Send personalized email notifications to all students about their internal semester results. Easily integrate your student database and keep students informed with just a few clicks.</p>
                            
                        </Col>
                        <Col md={5} style={{marginTop:'20px'}} >
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
                    <header className='headertable'>
                        <h2>Student Data</h2>
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
                                            <td><Button onClick={()=>sendEmailByEmail(student.studentEmail)}>Send</Button></td>
                                        </tr>
                                    </tbody>
                                </>)
                            })
                        }
                    </Table>
                </div>

                <div style={{margin:'20px'}}>
                    {/* {Array.from(ReqResponse).map((res, i) => { */}
                    <header className='errorHeader'>
                        <h4>Request Response Data</h4>
                    </header>
                    <div >
                        {
                            
                            Array.from(ReqResponse).map((res,i) => {
                             
                                    return (<>
                                   
                                        <p key={i} >
                                            
                                        ({i+1}) 
                                        DateTime : {res.headers?.Date}<br/>
                                        Response : <span style={{color:res.statusCodeValue==200? "green":"red"}}>  {res.body}</span><br/> 
                                        Status Code : {res.statusCodeValue}<br/>
                                        {/* Status Code value : {res.statusCodeValue}<br/> */}
                                        <hr></hr>
                                        </p>
                                    
    
                                    </>
                                    ) 
                            })
                            
                        }
                        {
                             Array.from(errorResponse).map((res,i) => {
                             
                                return (<>
                               
                                    <p key={i}>
                                        
                                    ({ReqResponse.length+i+1}) 
                                    DateTime : {res.headers?.Date}<br/>
                                    Response : <span style={{color:res.response.status==200? "green":"red"}}>  {res.response.data}</span><br/> 
                                    Status Code : {res.response.status}<br/>
                                    {/* Status Code value : {res.message}<br/> */}
                                    <hr></hr>
                                    </p>
                                

                                </>
                                ) 
                        })
                        }
                    </div>
                    {/* <td>{i}</td>
                    <td>{res.headers.Date}</td>
                    <td style={{ color: 'red' }}>{res.body}</td>
                    <td>{res.statusCode}</td>
                    <td>{res.statusCodeValue}</td> */}



                </div>
            </div>
        </>

    )
}
