import React, { useEffect, useState, createContext, useContext } from "react";
import {
    // Box,
    // Button,
    // Flex,
    // Input,
    // InputGroup,
    // Modal,
    // ModalBody,
    // ModalCloseButton,
    // ModalContent,
    // ModalFooter,
    // ModalHeader,
    // ModalOverlay,
    Stack,
    // Text,
    // useDisclosure
} from "@chakra-ui/core";
import { nanoid } from 'nanoid'
import axios from 'axios'
// import TodoForm from "./TodoForm"

function AddTodo() {
    const [item, setItem] = useState("")
    const {todos, fetchTodos} = useContext(TodosContext)

    const handleInput = event => {
        setItem(event.target.value)
    }

    const handleSubmit = (event) => {
        const newTodo = {
            "id":todos.length + 1,
            "item": item
        }
    }
}

const TodosContext = createContext({
    todos: [], fetchTodos: () => {}
})

export default function Todos() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:8000/todo")
        const todos = await response.json()
        setTodos(todos.data)
        console.log(todos)
    }
    function addTask(item) {
        const newTask = { id: "todo-" + nanoid(), item: item, completed: false };
        const response = axios.post("http://localhost:8000/todo", newTask, {
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(function (response) {
            console.log(response)
        }).catch(err => {
            console.error({err})
        });
    }
    const [name, setName] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        addTask(name)
        setName('')
        fetchTodos()
    }
    function handleChange(e) {
        setName(e.target.value);
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    return (
        <TodosContext.Provider value={{todos, fetchTodos}}>
            <form onSubmit={handleSubmit}>
                <h3 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h3>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
            {/* <TodoForm /> */}
            <Stack space={5}>
                {todos.map((todo) => (
                    <b key={todo.id}>{todo.item}</b>
                ))}
            </Stack>
        </TodosContext.Provider>
    )
}