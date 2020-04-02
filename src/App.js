import React, {useState, useEffect} from 'react';
import axios from 'axios'

import {List, AddList, Tasks, FontAwesomeIcon} from './components'


function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data)
        });
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data)
        });
    }, []);

    function onAddLists(obj) {
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
                {lists ? (<List
                    items={lists}
                    onRemove={(item) => {
                        setLists(lists.filter(list => list.id !== item.id));
                        console.log(`${item.name} deleted... :)`)
                    }}
                    isRemoveable={true}
                />) : ('Loading...')}
                <AddList onAdd={onAddLists} colors={colors}/>
            </div>
            <div className="todo__tasks">
                {lists && <Tasks list={lists[1]}/>}
            </div>
        </div>
    );
}


export default App;
