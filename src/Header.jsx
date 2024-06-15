import React, { useState } from 'react'
import './MarketPlaceStyles.css'
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function Header() {
    const [activeLink, setActiveLink] = useState('marketplace');
    const handleSelect = (eventKey) => {
        setActiveLink(eventKey);
      }
  return (
    <div>
         <Navbar bg="none" expand="lg" className="py-3">
          <Container>
            <Navbar.Brand href="#home" className='heading'>Evoque Innovative Lab</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className="justify-content-end flex-grow-1 pe-3 gap-5" activeKey={activeLink} onSelect={handleSelect}>
      <Nav.Link eventKey="about" className={`nav-link-custom ${activeLink === 'about' ? 'active' : ''}`}>About</Nav.Link>
      <Nav.Link eventKey="marketplace" className={`nav-link-custom ${activeLink === 'marketplace' ? 'active' : ''}`}>Marketplace</Nav.Link>
      <Nav.Link eventKey="resources" className={`nav-link-custom ${activeLink === 'resources' ? 'active' : ''}`}>Resources</Nav.Link>
      <Nav.Link eventKey="contact" className={`nav-link-custom ${activeLink === 'contact' ? 'active' : ''}`}>Contact</Nav.Link>
    </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Button variant="outline-primary" className="me-2">Login</Button>
                <Button variant="primary">Sign Up</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  )
}

export default Header