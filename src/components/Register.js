import React, { Component } from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios';

class Register extends Component {

    state = {
        login: '',
        password: '',
        email: ''
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const body = {
            login: this.state.login,
            password: this.state.password,
            email: this.state.email
        }
        console.log(body)

        try {

            await axios.post("https://todolistweb20190517052233.azurewebsites.net/api/auth/register", body);
            this.props.history.push("/login")

        } catch (e) {
            console.log(e)
        }

    }

    onChange = (e) => {

        switch(e.target.type) {
            case 'text':
                this.setState({login: e.target.value})
                break;
            case 'password':
                this.setState({password: e.target.value})
                break
            case 'email':
                this.setState({email: e.target.value})
                break
            default: break
        }

    }

    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit} method="post">
                        <FormGroup row>
                            <Label for="Login" sm={7}>Login</Label>
                            <Col sm={10}>
                                <Input type="text" name="login" id="Login" onChange={this.onChange} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Password" sm={7}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="Password" id="Password" onChange={this.onChange} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Email" sm={7}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="Email" onChange={this.onChange} required />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Sign Up</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default Register;