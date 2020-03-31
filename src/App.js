import React, {useState} from 'react';
import List from './components/List/index'
import AddList from "./components/AddList";
import Tasks from "./components/Tasks";

import dataBase from './assets/db'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function App() {
    const [lists, setLists] = useState(
        dataBase.lists.map(list => {
            list.color = dataBase.colors.find(color => color.id === list.colorId).name;
            return list
        }));

    function onAddLists (obj) {
        const newList = [...lists, obj];
        setLists(newList)
    }



    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={[
                    {
                        icon: <FontAwesomeIcon icon={'stream'}/>,
                        name: 'All tasks',
                        active: true,

                    },
                ]}/>
                <List
                    items={lists}
                    onRemove={(item) => console.log(item)}
                    isRemoveable={true}
                />
                <AddList onAdd={onAddLists} colors={dataBase.colors}/>
            </div>
            <div className="todo__tasks">
               <Tasks/>
            </div>
        </div>
    );
}


export default App;
