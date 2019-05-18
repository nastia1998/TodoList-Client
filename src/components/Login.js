import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container} from 'reactstrap';
import axios from "axios";

class Login extends Component {

    state = {
        login: '',
        password: '',
        token: '',
        error: false
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const body = {
            login: this.state.login,
            password: this.state.password
        }

        try {
            const { data } = await axios.post("https://todolistweb20190517052233.azurewebsites.net/api/auth/authenticate", body);
            if (data.token) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.id)
                localStorage.setItem('loggedIn', 'loggedIn')
                localStorage.setItem('email', data.email)
                this.props.history.push("/todolists")

            } else {
                this.setState({error: true})
            }

        } catch (e) {
            console.log(e)
            alert('Authorization failed. Check your input values!')
        }

    }

    onChange = (e) => {

        switch(e.target.type) {
            case 'text':
                this.setState({login: e.target.value})
                break

            case 'password':
                this.setState({password: e.target.value})
                break

            default: break;
        }

    }

    render() {
        return (
            <div>
                <Container>
                    <Form method="post" onSubmit={this.handleSubmit}>
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
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Sign In</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
        }

}
export default Login;