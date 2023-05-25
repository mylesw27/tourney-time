import './Home.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../API';
import Login from './Login'
import Register from './Register';
import { Nav, Card, Row, Col } from 'react-bootstrap';

export default function Index(profile) {
    const [isLogin, setIsLogin] = useState(true);

    return (
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
                        {isLogin ? <Login /> : <Register /> }
                    </Card.Body>
                </Card>
                <Col></Col>
            </div>
        </div>
    )
}