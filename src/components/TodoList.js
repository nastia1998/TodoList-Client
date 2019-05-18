import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem,
    Container,
    Row,
    Col,
    Input,
    Form, FormGroup, Label
} from 'reactstrap';
import axios from "axios";

import TaskList from './TaskList';
import '../styles/TodoList.css'

import { Redirect } from 'react-router-dom';

class TodoList extends Component {

    state = {
        modal: false,
        listId: 0,
        taskList: [],
        nameVal: '',
        descrVal: '',
        todoList: []
    };

    async componentDidMount(){
        try {
            if(localStorage.getItem('userId') !== null) {
                const { data } = await axios.get(`https://todolistweb20190517052233.azurewebsites.net/api/users/${localStorage.getItem('userId')}/todolists`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} });
                this.setState({todoList: data});
            }
        } catch (e) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            console.log(e.response)
        }
    }

    addTodoList = async(e) => {

        e.preventDefault();
        const value = {
            userId: localStorage.getItem('userId'),
            name: this.state.nameVal,
            description: this.state.descrVal
        }

        try {
            const { data } = await axios
                .post(`https://todolistweb20190517052233.azurewebsites.net/api/users/${localStorage.getItem('userId')}/todolists`, value, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} })

            this.setState(state => ({
                todoList: [...state.todoList, data], nameVal: '', descrVal: ''// записывает в массив все элементы текущего туду листа и в конец записываем новый туду лист
            }))

        } catch (e) {
            console.log(e)
        }
    }

    deleteTodoList = event => {
        this.setState({listId: event.target.id}, () => {
            axios
                .delete(`https://todolistweb20190517052233.azurewebsites.net/api/users/${localStorage.getItem('userId')}/todolists/${this.state.listId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} })
                .then(response => {
                })
                .catch(error => {
                    console.log(error)
                })
        })

        this.updateTodoList(event.target.id)
    }

    updateTodoList = id => {
        const newTodoList = this.state.todoList.filter(item => item.id !== +id);

        this.setState({
            todoList: newTodoList
        })
    }

    openModal = listId => {

        this.setState((prevState) => ({
             modal: !prevState.modal
        }));

        if(!this.state.modal) {
            this.setState({listId: listId})
        }

    }

    loadData = async (listid) => {
       const {data} = await axios.get(`https://localhost:44390/api/todolists/${listid}/tasks`)
        this.setState({taskList: data, listId: listid})
    }

    updateInputName = event => {
        this.setState({nameVal: event.target.value})
    }

    updateInputDescr = event => {
        this.setState({descrVal: event.target.value})
    }

    render() {

        return localStorage.getItem('loggedIn') !== null ?
            (
            <div>
                {this.state.todoList.map(item =>
                    <Container key={item.id} className="todo">
                        <ListGroup>
                            <Row>
                                <Col xs="auto">
                                    <ListGroupItem id={item.id} tag="button" onClick={()=>this.openModal(item.id)}>{item.name} | {item.description} </ListGroupItem>
                                </Col>
                                <Button id={item.id} color="danger" onClick={this.deleteTodoList} close>x</Button>
                            </Row>
                        </ListGroup>
                    </Container>
                )}
                <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className} tasks={this.state.taskList}>
                    <ModalHeader toggle={this.openModal}>Tasks</ModalHeader>
                    <ModalBody>
                        <div>
                            <TaskList listId={this.state.listId} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <br/>
                    </ModalFooter>
                </Modal>
                <hr />
                <Container>
                    <Form onSubmit={this.addTodoList}>
                        <FormGroup row>
                            <Label for="Name" sm={7}>Name</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" id="Name" value={this.state.nameVal} onChange={this.updateInputName} required />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Description" sm={7}>Description</Label>
                            <Col sm={10}>
                                <Input type="text" name="description" id="Description" value={this.state.descrVal} onChange={this.updateInputDescr} required />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button>Add</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>

            </div>
        ) : <Redirect to='/login'/> ;
    }
}

export default TodoList;