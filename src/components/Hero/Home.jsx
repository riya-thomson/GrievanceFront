import React from 'react'
import logo from '../../assets/logoo.png'
import './Home.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='body'>
      <div id = 'main'>
        <div id = 'box1'></div>

        <div id = 'box2'>
          <div id = 'text'>
            <div id='title'>
              {/* GRIEVANCES <br/>MADE EASY */}
          {/* Your Concerns, <br/>Our Commitment */}
          HELPING HANDS, <br/> HERE FOR YOU
          </div>
          <div id = 'para'>
            <p>Effortlessly address and resolve your concerns with ease and efficiency, 
              ensuring swift and effective solutions for any issue.</p>
          </div>
          </div>
        </div>

        <div id = 'box3'>
          <div id = 'container'>
            <div id = 'logo'>
                <img src={logo} />
            </div>
            <div id = 'menu'>
                <ul>
                  {/* <li>HOME</li>
                  <li>ABOUT US</li> */}
                  <li><Button className='login-btn'><Link to = {'/login'} style = {{color:'black', textDecoration:'none'}}>Login</Link></Button>  </li>              
                </ul>
            </div>
          </div>
        </div>
        <div id='box4'></div>
      </div>
      
    </div>
  )
}

export default Home
