import React from 'react'
import { Button } from 'react-bootstrap'

function Footer() {
  return (
    <div>
         <footer className='mt-4 footer-banner'>
         <h2>
         Join the <span>family</span> today!
            </h2>
            <p>
            Take advantage of the various products to build your own 
              <br />
              customized trading strategies.
            </p>
            <Button variant="light" style={{color:"#0461D1",fontSize:"14px",fontWeight:"700"}}>Open new account</Button>
  </footer>
  </div>
  )
}

export default Footer