import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button,DropdownButton,Dropdown, Badge } from 'react-bootstrap'
import {LinkContainer,NavLink} from 'react-router-dom'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {useSelector} from 'react-redux'
function Headercmp() {
    const datacmp=encryptStorage.getItem("user")==undefined?<></>:<><Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item>
    <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
    </>
    const datacmp2=encryptStorage.getItem("user")==undefined?<></>:<><Nav.Link as={NavLink} to="/taskmanagement" >Task Management</Nav.Link>
    </>
    var datacmp1=""
    if(encryptStorage.getItem("user")==undefined){
        datacmp1=""
    }
    else{
        if(encryptStorage.getItem("user").profile_img==""){
            datacmp1=<><img src="../user.png" style={{widht:"40px",height:"40px"}}  className="rounded" alt="Cinque Terre" onClick={()=>{window.location.replace("/changeimage")}} /></>
        }
        else{
            datacmp1=<><img src={`http://localhost:8899/images/${encryptStorage.getItem("user").profile_img}`} style={{widht:"40px",height:"40px"}}  className="rounded" alt="Cinque Terre" onClick={()=>{window.location.replace("/changeimage")}} style={{width:"40px" ,height:"40px"}} /></>
        }
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/"> <img
                    alt=""
                    src="/images/logo.jpg"
                    height="30"
                    className="d-inline-block align-top"
                /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
                        {datacmp2}
                    </Nav>
                    <DropdownButton id="dropdown-basic-button" title="Contact" style={{marginLeft:"74%",marginRight:"3%"}}>
                        <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/register">Register</Dropdown.Item>
                        {datacmp}
                        <Dropdown.Item as={NavLink} to="/aboutus">Aboutus</Dropdown.Item>
                    </DropdownButton>
                    <div>
                        {datacmp1}
                         </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Headercmp
