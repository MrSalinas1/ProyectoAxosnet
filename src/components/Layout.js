import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';



const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="primary" dark expand="md">
                <NavbarBrand href="/" className="red">ALAN</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/recibos" className="nav-link">Recibos</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/agregar" className="nav-link">Agregar</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

            { props.children }
        </div>
    )
}

export default Layout

