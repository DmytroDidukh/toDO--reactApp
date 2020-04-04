import React from 'react';

import {FontAwesomeIcon, axios} from '../../components'



const Task = ({task}) => {

  /*  function removeTask(taskId) {
        if (window.confirm('Delete task?')) {
            axios.delete('http://localhost:3001/tasks/' + taskId)
            //onRemoveTask(folder, taskId)
        }
    }*/

    return (
        <div className={'tasks__items__item-block'} key={task.id}>
            <div className="tasks__items__item-block__checkbox">
                <input id={`task-${task.id}`} type="checkbox"/>
                <label htmlFor={`task-${task.id}`}>
                    <FontAwesomeIcon className={'check'} icon={'check'}/>
                </label>
            </div>
            <input type="text" value={task.text} readOnly/>
            <div className={'tasks__items__item-block__actions'}>
                <FontAwesomeIcon  icon={'pencil-alt'}/>
                <FontAwesomeIcon /*onClick={() => removeTask(task.id)}*/ icon={'times'}/>
            </div>
        </div>
    )
};


export default Task;
