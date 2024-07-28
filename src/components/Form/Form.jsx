import React, { useState } from 'react';
import logo from '../../assets/logoo.png';
import './Form.css';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Chatbot from 'react-simple-chatbot';
import {Segment} from 'semantic-ui-react';
import ToggleButton from '@mui/material/ToggleButton';
import { ThemeProvider } from 'styled-components';

    const theme ={
        background:'#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#ff0000',
        headerFontColor: '#fff',
        headerFontSize:'15px',
        botBubbleColor: '#ff0000',
        botFontColor: '#fff',
        userBubbleColor :'#fff',
        userFontColor: '#4a4a4a'
    };
const Form = () => {
   
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };
    
    const [input, setInput] = useState({
        Name: "",
        Email: "",
        Sub: "",
        Description: "",
        Category: "",
        Urgency_level: ""
    });

    const addHandler = () => {
        console.log("Form submitted!");

         // Send email notification about acceptance
       axios.post('http://localhost:3005/send-email', {
        recipientEmail: input.Email,
        subject: 'Grievance Form Has Been Submitted.',
        text: 'One user submitted the Grievance form.'
      });

        // Correctly sending the input state as part of the request body
        axios.post("http://localhost:3005/form", input)
            .then((res) => {
                console.log(res);
                alert(res.data.message); // Displaying the success message
                window.location.reload(); // Refresh the page
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again.");
            });
    };

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input);
    };

    const preventDefaultOnEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const steps = [
        {
            id: 'Greet',
            message: 'Hello, Welcome to our website.',
            trigger: 'Ask Name'
        },
        {
            id: 'Ask Name',
            message: 'Please enter your name.',
            trigger: 'waiting'
        },
        {
            id: 'waiting',
            user:true,
            trigger:'Name'
        },
        {
            id: 'Name',
            message:'Hi {previousValue}, Please select your issue.',
            trigger:'issues'
        },
        {
            id:'issues',
            options:[ {value:'Technical ', label:'Technical', trigger:'Technical'},
                {value:'Service complaint', label:'Service complaint', trigger:'Service complaint'}
            ],
        },
        {
            id:'Technical',
            message:'What specific software or hardware is causing the issue?',
            trigger:'t1'
        },
        {
            id:'Service complaint',
            message:'What service are you complaining about?',
            trigger:'t3'
        },
        {
            id: 't1',
            user:true,
            trigger:'t2'
        },
        {
            id:'t2',
            message:"Try the troubleshooting steps and submit the grievance form..",
            end:true
        },
        {
            id: 't3',
            user:true,
            trigger:'t2'
        },
    ];
  return (

    <div className='form-body'>
         {/* -------------navbar--------------- */}
          <div id = 'nav'>
            <div id = 'logo-img'>
                <img src={logo} alt="" />
            </div>
            <div id = 'items'>
                <ul>
                  {/* <li>HOME</li>
                  <li>ABOUT US</li> */}
                  <li><Button className='logout-btn'><Link to = {'/'} style = {{color:'black', textDecoration:'none'}}>Logout</Link></Button>  </li>              
                </ul>
            </div>
          </div>
         
      <div className="form-container">
        <main className='row'>

            {/* left section col */}
            <section className='col left'>
                {/* title */}
                <div className="contactTitle">
                    <h2>Grievance Submission Portal</h2>
                    <p>Submit your complaints and concerns quickly and securely. Our user-friendly form ensures a smooth process and prompt resolution of your issues. Your feedback matters to us!</p>                
                </div>
            </section>

            {/* rigth section  col*/}
            <section className='col right'>
                {/* form */}

                <div className={`chatbot-container ${isChatVisible ? '' : 'hidden'}`}>
                    
                        <Segment floated='left'>
                        <ThemeProvider theme={theme}>
                            <Chatbot steps={steps} />
                         </ThemeProvider>
                        </Segment>
                    </div>
                    
                    <div className={`form-content ${isChatVisible ? 'move-up' : ''}`}>
                <form className="msgForm">
                    <div className="inputGroup halfWidth">
                        <input type="text"  required="required" onChange={inputHandler} name = "Name" value = {input.Name} onKeyPress={preventDefaultOnEnter}/>
                        <label>Name</label>
                    </div>

                    <div className="inputGroup halfWidth">
                        <input type="email" required="required" onChange={inputHandler} name = "Email" value = {input.Email} onKeyPress={preventDefaultOnEnter}/>
                        <label>Email Address</label>
                    </div>

                    
                    <div className="inputGroup fullWidth">
                        <input type="text" required="required" onChange={inputHandler} name = "Sub" value = {input.Sub} onKeyPress={preventDefaultOnEnter}/>
                        <label>Subject / Title</label>
                    </div>

                    <div className="inputGroup fullWidth">
                        <textarea required="required" onChange={inputHandler} name = "Description" value = {input.Description} ></textarea>
                        <label>Description(detailed explanation of issue)</label>
                    </div>

                    <div className="inputGroup halfWidth">
                        <select required="required"
                        value={input.Category}
                        onChange={inputHandler}
                        name="Category">
                            <option value="" disabled >Select Category</option>
                            <option value="Technical Issues">Technical Issues</option>
                            <option value="Service Complaint">Service Complaint</option>
                            <option value="Billing Issues">Billing Issues</option>
                            <option value="Others">Others</option>
                        </select>
                        <label>Category</label>
                    </div>

                    <div className="inputGroup halfWidth">
                        <select required="required"
                        value={input.Urgency_level}
                        onChange={inputHandler}
                        name="Urgency_level">
                            <option value="" disabled >Select Urgency Level</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <label>Urgency Level</label>
                    </div>

                    <div className="inputGroup fullWidth">
                        <button onClick = {addHandler} >Submit</button>
                    </div>
                </form>
                <ToggleButton
                            value="chat"
                            selected={isChatVisible}
                            onChange={toggleChatVisibility}
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '50%', // Makes the button round
                                backgroundColor: 'white', // Sets the background color to white
                                color: isChatVisible ? 'red' : 'black', // Dynamically changes text color based on isChatVisible
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // Slightly darker shade on hover
                                },
                                position: 'fixed', // Positions the button
                                bottom: 20, // Distance from the bottom
                                left: 20, // Distance from the left
                                p: 1, // Padding around the text
                            }}
                        >
{isChatVisible ?
                                    <span style={{ color: 'red' }}>X</span> :
                                    <span>Get Help!</span>
                                }                        </ToggleButton>
                        </div>

            </section>

        </main>
      </div>
    </div>
  )
}

export default Form
