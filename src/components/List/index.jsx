import React from 'react';
import classNames from 'classnames';
import axios from 'axios'

import {Badge, FontAwesomeIcon} from '../../components'

import './List.scss'


const List = ({items, isRemoveable, onClick, onRemove}) => {

    function removeList(list) {
        if (window.confirm('Delete folder?')) {
            axios.delete('http://localhost:3001/lists/' + list.id)
                .then(() => {
                    onRemove(list)
                });
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
                        <span>{item.name}</span>
                        {isRemoveable && <FontAwesomeIcon onClick={() => removeList(item)} icon={'trash-alt'}/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;
