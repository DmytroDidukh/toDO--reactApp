import React from 'react';
import classNames from 'classnames';


import {Badge, FontAwesomeIcon, axios} from '../../components'

import './List.scss'


const List = ({items, isRemoveable, onAddFolder, onRemove, onFolderClick, activeFolder}) => {

    function removeList(list) {
        if (window.confirm('Delete folder?')) {
            axios.delete('http://localhost:3001/lists/' + list.id)
                .then(() => {
                    onRemove(list)
                });
        }
    }

    return (
        <ul onClick={onAddFolder} className="list">
            {
                items.map((item, index) => (
                    <li key={index}
                        className={classNames(item.className, {
                            'active': item.active ? item.active : activeFolder && activeFolder.id === item.id})}
                        onClick={onFolderClick ? () => onFolderClick(item) : null}
                    >
                        <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
                        <span>{item.name} {item.tasks && <span> ({item.tasks.length})</span>}</span>
                        {isRemoveable && <FontAwesomeIcon onClick={() => removeList(item)} icon={'trash-alt'}/>}
                    </li>
                ))
            }
        </ul>
    )
};

export default List;
