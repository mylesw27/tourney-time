import './Home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../API';
import Login from './Login'
import Register from './Register';
import { Nav, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Index(profile) {
    const [isLogin, setIsLogin] = useState(true);
    const [lastStep, setLastStep] = useState(false)

    return (
        <div className='homeBackground'>
            <div className='home'>  
                <img className='logo' src='./tournament_time.png' />
                <div className='cardDiv'>
                    <Col></Col>
                    <Card style={{width: '80vw'}} className='homeCardDiv' >
                        <Card.Header>
                            <Nav justify variant="tabs" defaultActiveKey={'login'} className='homeNavTabs'>
                                <Nav.Item onClick={() => setIsLogin(true)} eventKey='login'>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={() => setIsLogin(false)} eventKey='register'>
                                    <Nav.Link eventKey='register'>Register</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Header>
                        <Card.Body>
                            {isLogin ? <Login /> : <Register lastStep={lastStep} /> }
                        </Card.Body>
                    </Card>
                    <Col></Col>
                </div>
                <div className='or'>
                    <p className='or'>or</p>
                    <Link to='/tournaments'><Button variant='success'>View Tournaments without Logging In</Button></Link>
                </div>
            </div>
        </div>
        
    )
}