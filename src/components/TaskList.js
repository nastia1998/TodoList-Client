import React, { Component } from 'react';
import Moment from 'react-moment';
import {Button, Card, CardBody, Col, Container, Form, FormGroup, Label} from 'reactstrap';
import axios from "axios";
import DatePicker from "react-datepicker"
import moment from 'moment'

import "../styles/TodoList.css"

import "react-datepicker/dist/react-datepicker.css";

class TaskList extends Component {

    state = {
        taskList: [],
        nameVal: '',
        dateStart: '',
        dateEnd: '',
        taskId: 0,
        status: false,
        gmailPass: ''
    };

    async componentDidMount(){
        try {
            const {data} = await axios.get(`https://todolistweb20190517052233.azurewebsites.net/api/todolists/${this.props.listId}/tasks`)
                this.setState({taskList: data});

        } catch (e) {
            console.log(e)
        }
    }

    addTaskItem = async(e) => {

        e.preventDefault()

        if(this.state.dateStart > this.state.dateEnd) return new Error(alert('Date Start cannot be later than Date End!'))
        if(this.state.dateStart < new Date() || this.state.dateEnd < new Date()) return new Error(alert('Date cannot be earlier than today!'))

        const value = {
            todoListId: this.props.listId,
            name: this.state.nameVal,
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd
        }

        try {
            const { data } = await axios
                .post(`https://todolistweb20190517052233.azurewebsites.net/api/todolists/${this.props.listId}/tasks`, value)

            data.dateStart = moment(data.dateStart).subtract(3, 'hours')
            data.dateEnd = moment(data.dateEnd).subtract(3, 'hours')
            this.setState(state => ({
                 taskList: [...state.taskList, data], nameVal:'', dateStart:'', dateEnd:''
             }))

        } catch (e) {
            console.log(e)
        }

    }

    deleteTaskItem = event => {
        this.setState({taskId: event.target.id}, () => {
            axios
                .delete(`https://todolistweb20190517052233.azurewebsites.net/api/todolists/${this.state.listId}/tasks/${this.state.taskId}`)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        })

        this.updateTaskList(event.target.id)
    }

    updateTaskList = id => {
        const newTaskList = this.state.taskList.filter(item => item.id !== +id);

        this.setState({
            taskList: newTaskList
        })
    }

    updateDateStart = date => {
        this.setState({dateStart: date})

    }

    updateDateEnd = date => {
        this.setState({dateEnd: date})
    }

    updateInputName = (event) => {
        this.setState({nameVal: event.target.value})
    }

    sendToEmail = async(event) => {

        const { data } = await axios.get(`https://todolistweb20190517052233.azurewebsites.net/api/todolists/${this.state.listId}/tasks/${event.target.id}`)
        const value = {
            emailFrom : localStorage.getItem('email'),
            password: this.state.gmailPass,
            emailTo: localStorage.getItem('email'),
            message: data.name,
            datestart: data.dateStart,
            dateend: data.dateEnd
        }
        await axios.post("https://todolistweb20190517052233.azurewebsites.net/api/email", value)
    }




    updatePassword = (event) => {
        this.setState({gmailPass: event.target.value})
    }

    render() {

        return(
            <div>
                {this.state.taskList.map(item => {
                    return (
                        <div key={item.id}>
                            <Card key={item.id}>
                                <CardBody key={item.id}>
                                    Name: {item.name}<br />
                                    Date Start: <Moment local format="D.MM.YYYY HH:mm">{item.dateStart}</Moment>
                                    <Button id={item.id} color="danger" onClick={this.deleteTaskItem}>X</Button>
                                    <Button id={item.id} color="info" onClick={this.sendToEmail}>Send to Email</Button><br/>
                                    Date End:  <Moment local format="D.MM.YYYY HH:mm">{item.dateEnd}</Moment><br />
                                    <div  className="test"><input type="password" placeholder="Email Password" onChange={this.updatePassword} /></div>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}

                <Container>
                    <Form onSubmit={this.addTaskItem}>
                        <FormGroup row>
                            <Label for="Name" sm={7}>Name</Label>
                            <Col sm={15}>
                                <input type="text" name="name" id="Name" value={this.state.nameVal} onChange={this.updateInputName} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={7}>Date Start</Label>
                            <Col sm={15}>
                                <DatePicker selected={this.state.dateStart}
                                            onChange={this.updateDateStart}
                                            showTimeSelect timeFormat="HH:mm" timeIntervals={1} value={this.state.dateStart} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={7}>Date End</Label>
                            <Col sm={15}>
                                <DatePicker selected={this.state.dateEnd}
                                            onChange={this.updateDateEnd}
                                            showTimeSelect timeFormat="HH:mm" timeIntervals={1} value={this.state.dateEnd} required />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Add Task</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>

            </div>
        )
    }

}

export default TaskList;