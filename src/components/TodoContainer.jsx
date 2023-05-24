import { useRef, useState } from "react";
import classes from "../modules_css/TodoContainer.module.css";

export function TodoContainer() {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const inputRef = useRef();

    const handleChange = (event) => {
        setTask(event.target.value);
    };

    const addTask = () => {
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            value: task,
            display: true,
            todo: true,
            completed: false,
            edit: false,
        };

        setTaskList([newTask, ...taskList]);

        setTask("");
    };

    const deleteTask = (id) => {
        const newArray = taskList.filter(task => task.id !== id);
        setTaskList(newArray);
    };

    const completedTasks = (id) => {
        setTaskList((currentArrayTasks) => {
            return currentArrayTasks.map((currentTask) => (
                currentTask.id === id 
                ? {...currentTask, todo: false, completed: true}
                : currentTask
            ));
        });
    };

    const incompleteTasks = (id) => {
        setTaskList((currentArrayTasks) => {
            return currentArrayTasks.map((currentTask) => (
                currentTask.id === id 
                ? {...currentTask, todo: true, completed: false}
                : currentTask
            ));
        });
    };

    const editTask = (id) => {
        setTaskList((currentArrayTasks) => {
            return currentArrayTasks.map((currentTask) => (
                currentTask.id === id 
                ? {...currentTask, edit: true}
                : currentTask
            ));
        });
    };

    const renameInputText = (id) => {
        setTaskList((currentArrayTasks) => {
            return currentArrayTasks.map((currentTask) => (
                currentTask.id === id 
                ? {...currentTask, value: inputRef.current.value, edit: true}
                : currentTask
            ));
        });
    };

    const handleInputBlur = (id) => {
        setTaskList((currentArrayTasks) => {
            return currentArrayTasks.map((currentTask) => (
                currentTask.id === id 
                ? {...currentTask, edit: false}
                : currentTask
            ));
        });
    };

    return (
        <div className={classes.container}>
            <h2>TODO LIST</h2>
            <h3>Add Item</h3>
            <p>
                <input 
                    type="text"
                    value={task}
                    onChange={handleChange}
                />
                <button 
                    onClick={addTask}
                >
                    Add
                </button>
            </p>

            <h3>Todo</h3>
            <ul>
            {taskList.map(({ id, value, display, todo, completed, edit }) => {
                const editTextInput = edit === false 
                        ? <label>{value}</label>
                        : <input 
                            type="text" 
                            value={value} 
                            className={classes.editMode_input} 
                            ref={inputRef} 
                            onChange={() => renameInputText(id)} 
                            onBlur={() => handleInputBlur(id)} 
                         />         

                const taskDisplay = (display && todo)
                        ?<li 
                            key={id} 
                            className={completed === true ? classes.task_invisible : classes.task_visible}
                        >
                            <input 
                                type="checkbox" 
                                onChange={() => completedTasks(id)}
                            />
                            {editTextInput}
                            <button 
                                className={classes.edit} 
                                onClick={() => editTask(id)}
                            >
                                Edit
                            </button>
                            <button 
                                className={classes.delete} 
                                onClick={() => deleteTask(id)}
                            >
                                Delete
                            </button>
                        </li>
                        : null;
                    
                return (taskDisplay);
            })}
            </ul>

            <h3>Completed</h3>
            <ul>
            {taskList.map(({ id, value, todo, completed, edit }) => {
                const editTextInput = edit === false 
                    ?<label 
                        className={classes.completed_tasks}
                    >
                        {value}
                    </label>
                    :<input 
                        type="text" 
                        value={value} 
                        className={classes.editMode_input} 
                        ref={inputRef} 
                        onChange={() => renameInputText(id)}
                        onBlur={() => handleInputBlur(id)}
                    />;

                const completedDisplay = (completed === true && todo === false)
                    ?<li 
                        key={id} 
                        className={completed === false ? classes.task_invisible : classes.task_visible}
                    >
                        <input 
                            type="checkbox" 
                            defaultChecked onChange={() => incompleteTasks(id)} 
                        />
                        {editTextInput}
                        <input 
                            type="text" 
                            className={classes.inputTypeText_hidden} 
                        />
                        <button 
                            className={classes.edit} 
                            onClick={() => editTask(id)}
                        >
                            Edit
                        </button>
                        <button 
                            className={classes.delete} 
                            onClick={() => deleteTask(id)}
                        >
                            Delete
                        </button>
                    </li>
                    :null;

                return (completedDisplay);
            })}
            </ul>
        </div>
    );
}
