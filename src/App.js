import React from 'react';
import List from './components/List/index'
import AddList from "./components/AddList";

import dB from './assets/db'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function App() {
    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={[
                    {
                        icon: <FontAwesomeIcon icon={'stream'}/>,
                        name: 'All tasks',
                        active: false,

                    },
                ]}/>
                <List items={[
                    {
                        color: 'green',
                        name: 'To buy',
                        active: false,
                    },
                    {
                        color: 'pink',
                        name: 'To read',
                        active: true,
                    },
                    {
                        color: 'blue',
                        name: 'Frontend',
                        active: false,
                    },

                ]}
                      isRemoveable={true}
                />
                <AddList colors={dB.colors}/>
            </div>
            <div className="todo__tasks">

            </div>
        </div>
    );
}


export default App;
