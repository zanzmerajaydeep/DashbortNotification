import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { PNbase_url } from '../assest/base_url';
import { Card, Button, CardBody, CardSubtitle, CardText, CardTitle, CardImg, Table, Row, Col } from 'reactstrap'

export const PN = () => {

  const [Foods, setFoods] = useState([]);
  const [ReqResponse, setReqResponse] = useState([]);
  const [errorResponse, setErrorResponse] = useState([]);

  useEffect(() => {

    axios.get(`${PNbase_url}/getAllfood`).then(
      (response) => {

        // console.log(response.data);
        setFoods(response.data)
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





  return (
    <>
      <div className='home'>

        <div className='contain'>
          <Row style={{height:'400px'}}>
                <Col  md={7}>
                    <h3 style={{ margin: '30px' }}><strong>Effortlessly send personalized notifications with NotifyMe.com </strong></h3 >
                    {/* <p className='containparagraph' >NotifyMe.com's Push Notification Microservice is a reliable and customizable way to send personalized push notifications. Our easy integration and configurable templates allow for consistent branding and reliable delivery. Experience streamlined push notifications with NotifyMe.com's Push Notification Microservice today.</p> */}
                    <h5 style={{ margin: '30px' }}>Here one use case of Notification Service :</h5>
                    <p className='containparagraph' >Notifyme.com: Send personalized push notifications to all customers about exclusive food discounts. Easily integrate your customer database and keep them informed with just a few clicks.</p>
                    
                </Col>
                <Col md={5} style={{marginTop:'30px'}} >
                    <div className='emailCardBody'>
                        <Card className='emailCard' onClick={sendAllNotification} >
                            <CardTitle><strong>Notification </strong></CardTitle>
                            <CardImg src='pn2.png'></CardImg>
                        </Card>
                        <CardSubtitle ></CardSubtitle>
                    </div>
                    <div style={{marginLeft:'40px'}}>
                    <h5 >Click notification icon to notify all customer.</h5>
                    </div>
                </Col>
            </Row>
        </div>

        <div className='table'>
          <header className='headertable'>
            <h2>Student Data</h2>
          </header>
          {/* <Table
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
                                    <td>{Foods.foodName}</td>
                                    <td>{Foods.discount}</td>
                                    <td>{Foods.customerName}</td>
                                    <td>{Foods.customerContactNo}</td>
                                    <td>{student.studentUniversity}</td>
                                    <td>{student.studentContactno}</td>
                                    <td><Button onClick={()=>sendEmailByEmail(student.studentEmail)}>Send</Button></td>
                                </tr>
                            </tbody>
                        </>)
                    })
                }
            </Table> */}
        </div>

        <div style={{margin:'20px'}}>
            
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
