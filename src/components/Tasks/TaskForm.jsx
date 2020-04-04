import React, {useState} from "react";

import {FontAwesomeIcon, axios} from '../../components'


const TaskForm = ({folder, onAddTask}) => {
    const [isVisibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isPosting, setIsPosting] = useState(false);


    function toggleFormVisible() {
        setFormVisible(!isVisibleForm);
        setInputValue('');

    }

    function addTask() {
        const newTask = {
            listId: folder.id,
            text: inputValue,
            completed: false
        };

        setIsPosting(true);

        axios.post('http://localhost:3001/tasks/', newTask)
            .then(({data}) => {
                onAddTask(folder.id, data);
                toggleFormVisible()
            })
            .catch(() => alert('Something went wrong! :( Adding a task is failed'))
            .finally( () => setIsPosting(false))
    }


    return (
        <div className="tasks__form">
            {!isVisibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form__add-task">
                    <FontAwesomeIcon icon={'plus-circle'} className={'form-plus'}/>
                    <span>New task</span>
                </div>
            ) : (
                <div className="tasks__form__create-task">
                    <input className={"field"} type="text"
                           placeholder={"Task about"}
                           value={inputValue}
                           onChange={e => setInputValue(e.target.value)}
                    />
                    <button onClick={addTask} disabled={!inputValue.trim() || isPosting}
                            className={"button create-task-btn"}>{!isPosting ? 'Add task' : 'Adding...'}
                    </button>
                    <button onClick={toggleFormVisible}
                            disabled={isPosting}
                            className={"cancel-task-btn"}>Cancel</button>
                </div>
            )}
        </div>
    )
};

export default TaskForm;
