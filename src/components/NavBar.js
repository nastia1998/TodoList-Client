import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
}
    from 'reactstrap';

class NavBar extends Component {

    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logOffClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('loggedIn')
    }

    render() {
        return (
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">To do list</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/todolists">To do lists</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href='/' onClick={this.logOffClick}>Log Off</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </header>
        )
    }
}
export default NavBar;