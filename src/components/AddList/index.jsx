import React, {useState} from "react";
import List from "../List";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './AddButtonList.scss'


const AddListButton = () => {
    const [visiblePopup, setVisiblePopup] = useState();


    return (
        <div className="add-list">
            <List items={[
                {
                    className: "list__add-btn",
                    icon: <FontAwesomeIcon icon={'plus'}/>,
                    name: 'Add folder',
                    active: false,
                },
            ]}
            />
            {visiblePopup && <div className="add-list__popup">d</div>}
        </div>
    )
};

export default AddListButton;
