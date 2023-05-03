import React, { Fragment, useState } from 'react'
import { Button, Card, Container, Form, FormGroup, Input } from 'reactstrap'
import { Emailbase_url } from '../assest/base_url'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

export const AddStudent = () => {

    const [Students, setStudent] = useState({})

    const handleForm = (e) => {
        console.log(Students);
        postDataToServer(Students);
        e.preventDefault();

    }

    //insert student data into database with api
    const postDataToServer = (data) => {
        axios.post(`${Emailbase_url}/addStudent`, data, {
           
        }).then(
            (response) => {
               
                toast.success("Student Details added!...");
            },
            (error) => {
                
                toast.error("Error | Something went wrong!....");

            }
        );

    }
    return (
        <div className='addStudentHome' style={{backgroundColor:'#c1ccde'}}>
            <div className='addform'>
                <ToastContainer />
                <header><h1>Add Student Details</h1></header>
                <Card className='formCard'>
                    <Form onSubmit={handleForm} action='post' style={{padding:'40px'}}>
                        <FormGroup>
                            <Input type='text' required placeholder='Enter Student Name' name='studentName' id='fname'pattern="^[a-zA-Z\s]+$" title="Name must be in  String allow!."
                                onChange={(e) => {
                                    setStudent({ ...Students, studentName: e.target.value })
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='text' required placeholder='Enter Student Marks' name='studentMark' id='fcategory'min="0" max="100" title="Student Marks must be in between 0 to 100!."
                                onChange={(e) => {
                                    setStudent({ ...Students, studentMark: e.target.value })
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='email' required placeholder='Enter Student Email' name='studentEmail' id='hname'title="Must be in Proper Email Formate"
                                onChange={(e) => {
                                    setStudent({ ...Students, studentEmail: e.target.value })
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='text' required placeholder='Enter Student Mentor Name' name='studentMentorName' id='description'
                                onChange={(e) => {
                                    setStudent({ ...Students, studentMentorName: e.target.value })
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='text' required placeholder='Enter University Name' name='studentUniversity' id='price'
                                onChange={(e) => {
                                    setStudent({ ...Students, studentUniversity: e.target.value })
                                }} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='number' required placeholder='Enter Student Contact No:' min="10" max="10" name='studentContactno' id='file' title="Contact number must be 10 digit!"
                                onChange={(e) => {
                                    setStudent({ ...Students, studentContactno: e.target.value })
                                }} />
                        </FormGroup>
                        <Container>
                            <Button type='submit' color='success' outline>Add Student</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button color='warning ml-2' type='reset' outline>Clear details</Button>
                        </Container>
                    </Form>
                </Card>

            </div>
        </div>
    )
}
