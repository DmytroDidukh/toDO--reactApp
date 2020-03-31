import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './AddList.scss'


const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');
    const [isVisibleError, setErrorVisibility] = useState(false);


    function addList() {
        if (!inputValue) {
            setErrorVisibility(true);
            return;
        }

        const color = colors.find(color => selectedColor === color.id).name;
        onAdd({id: Math.random(), name: inputValue, color: color,});

        clearPopup()
    }

    function clearPopup() {
        setErrorVisibility(false);
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id)
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
                        onClick={clearPopup}
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
                            className={"button"}>ADD
                    </button>
                    {isVisibleError && <div className={'error'}>Enter folder name, please</div>}
                </div>
            }
        </div>
    )
};

export default AddList;
