import React from "react";

import {List, FontAwesomeIcon} from '../../components'

import './Tasks.scss'


const Tasks = ({list}) => {
    console.log(list);
    return (
        <div className={'tasks'}>
            <h2 className={"tasks__title"}>{list.name} <FontAwesomeIcon className={'edit-title'} icon={'pencil-alt'}/>
            </h2>
            <div className="tasks__items">
                {list.tasks.map(task => {
                    return (
                        <div className={'tasks__items__item-block'} key={task.id}>
                            <div className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox"/>
                                <label htmlFor={`task-${task.id}`}>
                                    <FontAwesomeIcon className={'check'} icon={'check'}/>
                                </label>
                            </div>
                            <p>{task.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Tasks
