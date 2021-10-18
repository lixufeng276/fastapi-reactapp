import React, {useState} from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'

function TodoForm() {
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
    }
    function handleChange(e) {
        setName(e.target.value);
    }


    return (
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
    );
}

export default TodoForm;