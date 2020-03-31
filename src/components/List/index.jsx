import React from 'react';
import classNames from 'classnames';

import Badge from '../Badge'

import './List.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const List = ({items, isRemoveable, onClick, onRemove}) => {

    function removeList(list) {
        if (window.confirm('Delete folder?')) {
            onRemove(list)
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <i>{item.icon ? item.icon : <Badge color={item.color}/>}</i>
                        <span>{item.name}</span>
                        {isRemoveable && <FontAwesomeIcon onClick={() => removeList(item)} icon={'trash-alt'}/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;
