import React from "react";

import {FontAwesomeIcon, TaskList, axios, Task} from '../../components'

import './Tasks.scss'


const Tasks = ({folder, onEditTitle, onAddTask, onRemoveTask, withoutEmpty}) => {

    function editTitle() {
        const newTitle = window.prompt('Enter new folder name', folder.name);
        if (newTitle) {
            onEditTitle(folder.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + folder.id, {name: newTitle})
                .catch(() => alert('Something went wrong! :( => Editing failed'))

        }
    }


    return (
        <div className={'tasks'}>
            <h2 style={{color: folder.color.hex}} className={"tasks__title"}>{folder.name}
                <FontAwesomeIcon onClick={editTitle} className={'edit-title'} icon={'pencil-alt'}/>
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && !folder.tasks.length && <h2 className={'tasks__items__empty-title'}>No tasks</h2>}
                {
                    folder.tasks.map(task => <Task key={task.id} task={task}/>)
                }
            </div>
            <TaskList folder={folder} onAddTask={onAddTask}/>
        </div>
    )
};

export default Tasks;
