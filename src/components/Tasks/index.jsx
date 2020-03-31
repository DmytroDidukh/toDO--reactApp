import React from "react";
import List from "../List";

import './Tasks.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Tasks = () => {
    return (
        <div className={'tasks'}>
            <h2 className={"tasks__title"}>Node.js <FontAwesomeIcon className={'edit-title'} icon={'pencil-alt'}/></h2>
            <div className="tasks__items">
                <div className={'tasks__items__item-block'}>
                    <div className="checkbox">
                        <input id={'check1'} type="checkbox"/>
                        <label htmlFor="check1">
                            <FontAwesomeIcon className={'check'} icon={'check'}/>
                        </label>
                    </div>
                    <p>ReactJS Hooks (useState, useReducer, useEffect и т.д.)</p>
                </div>
                <div className={'tasks__items__item-block'}>
                    <div className="checkbox">
                        <input id={'check2'} type="checkbox"/>
                        <label htmlFor="check2">
                            <FontAwesomeIcon className={'check'} icon={'check'}/>
                        </label>
                    </div>
                    <p>Redux (redux-observable, redux-saga)</p>
                </div>
            </div>
        </div>

    )
};

export default Tasks
