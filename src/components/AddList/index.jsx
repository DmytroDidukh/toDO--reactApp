import React, {useState, useEffect} from "react";
import axios from 'axios'

import {List, Badge, FontAwesomeIcon} from '../../components'

import './AddList.scss'


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(1);
    const [inputValue, setInputValue] = useState('');

    const [isVisibleError, setErrorVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) selectColor(colors[0].id)
    }, [colors]);


    function addList() {
        if (!inputValue) {
            setErrorVisibility(true);
            return;
        }

        setIsLoading(true);

        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor,
            })
            .then(({data}) => {
                const color = colors.find(color => selectedColor === color.id).name;
                const listObj = {...data, color : {name: color}};
                onAdd(listObj);
                onClose()
            }).finally( () => setIsLoading(false));
    }

    function onClose() {
        setErrorVisibility(false);
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: "list__add-btn",
                        icon: <FontAwesomeIcon icon={'plus'}/>,
                        name: 'Add folder',
                        active: false,
                    },
                ]}
            />
            {
                visiblePopup && <div className="add-list__popup">
                    <FontAwesomeIcon
                        onClick={onClose}
                        icon={'times-circle'}
                    />
                    <input value={inputValue} className={'field'}
                           type="text" placeholder={"Folder name"}
                           onChange={event => setInputValue(event.target.value)}
                        // maxlength="40"
                    />
                    <div className="add-list__popup-colors">
                        {
                            colors.map(color => (
                                    <Badge
                                        onClick={() => selectColor(color.id)}
                                        key={color.id}
                                        color={color.name}
                                        className={selectedColor === color.id && 'active'}
                                    />
                                )
                            )
                        }
                    </div>
                    <button onClick={addList}
                            className={"button"}>
                        {!isLoading ? 'ADD' : 'Adding...'}
                    </button>
                    {isVisibleError && <div className={'error'}>Enter folder name, please</div>}
                </div>
            }
        </div>
    )
};

export default AddList;
