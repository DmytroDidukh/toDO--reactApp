import React from 'react';
import List from './components/List/index'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function App() {
    return (
    <div className="todo">
        <div className="todo__sidebar">
      <List items={[
          {
              icon: <FontAwesomeIcon icon={'stream'}/>,
              name: 'All tasks',
              active: true,

          },
      ]} />
            <List items={[
          {
              color: 'green',
              name: 'To buy',
              active: false,
          },
          {
              color: 'pink',
              name: 'To read',
              active: false,
          },
          {
              color: 'blue',
              name: 'Frontend',
              active: false,
          },

      ]} />
        </div>
        <div className="todo__tasks">

        </div>
    </div>
    );
}


export default App;
