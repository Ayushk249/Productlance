import React from 'react'
import {Navbar, Nav, Container, Badge} from 'react-bootstrap'
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'
import logo from '../assets/logo.png'



const Header = () => {

    const {cartItems} = useSelector((state) => (state.cart))

  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand > <img src={logo} alt="ProductLance" />ProductLance</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto fw-bold'>

                            <LinkContainer to='/cart'>
                                <Nav.Link >
                                    <FaShoppingCart/>Cart
                                    {
                                        cartItems.length > 0 && (
                                            <Badge pill bg='danger' style= {{marginLeft: '5px'}}>
                                                {cartItems.reduce((accumulator,current) => accumulator+ current.qty,0)}
                                            </Badge>
                                        ) 
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to='/login'>
                                <Nav.Link >
                                    <FaShoppingCart/>Login
                                </Nav.Link>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header