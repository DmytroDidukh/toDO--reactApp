import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './AddList.scss'


const AddList = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(null);

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
                    <FontAwesomeIcon onClick={() => setVisiblePopup(false)} icon={'times-circle'}/>
                    <input className={'field'} type="text" placeholder={"Folder name"}/>
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
                    <button className={"button"}>ADD</button>
                </div>
            }
        </div>
    )
};

export default AddList;
