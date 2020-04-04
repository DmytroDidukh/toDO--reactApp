import React from "react";

import {FontAwesomeIcon, TaskList, axios} from '../../components'

import './Tasks.scss'


const Tasks = ({folder, onEditTitle, onAddTask, onRemoveTask}) => {

    function editTitle() {
        const newTitle = window.prompt('Enter new folder name', folder.name);
        if (newTitle) {
            onEditTitle(folder.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + folder.id, {name: newTitle})
                .catch(() => alert('Something went wrong! :( => Editing failed'))

        }
    }

    function removeTask(taskId) {
        if (window.confirm('Delete task?')) {
            axios.delete('http://localhost:3001/tasks/' + taskId)
            //onRemoveTask(folder, taskId)
        }
    }


    return (
        <div className={'tasks'}>
            <h2 className={"tasks__title"}>{folder.name}
                <FontAwesomeIcon onClick={editTitle} className={'edit-title'} icon={'pencil-alt'}/>
            </h2>
            <div className="tasks__items">
                {!folder.tasks.length && <h2 className={'tasks__items__empty-title'}>No tasks</h2>}
                {folder.tasks.map(task => {
                    return (
                        <div className={'tasks__items__item-block'} key={task.id}>
                            <div className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox"/>
                                <label htmlFor={`task-${task.id}`}>
                                    <FontAwesomeIcon className={'check'} icon={'check'}/>
                                </label>
                            </div>
                            <p>{task.text}</p>
                            <FontAwesomeIcon onClick={() => removeTask(task.id)} icon={'times'}/>
                        </div>
                    )
                })}
            </div>
            <TaskList folder={folder} onAddTask={onAddTask}/>
        </div>
    )
};

export default Tasks;
