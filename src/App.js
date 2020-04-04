import React, {useState, useEffect} from 'react';

import {List, AddFolder, Tasks, FontAwesomeIcon, axios} from './components'


function App() {
    const [folders, setFolders] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeFolder, setActiveFolder] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
            setFolders(data)
        });
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data)
        });
    }, []);

    function onAddFolder(folder) {
        const newList = [...folders, folder];
        setFolders(newList)
    }

    function onAddTask(folderId, newTask) {
        const newList = folders.map(folder => {
            if (folder.id === folderId) {
                folder.tasks.push(newTask)
            }

            return folder
        });

        setFolders(newList)
    }

    function onSetNewFolderTitle(id, title) {
        const newList = folders.map(folder => {
            if (folder.id === id) {
                folder.name = title;
            }
            return folder
        });

        setFolders(newList)
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
                {
                    folders ? (<List
                        items={folders}
                        onRemove={(item) => {
                            setFolders(folders.filter(folder => folder.id !== item.id));
                            console.log(`${item.name} deleted... :)`)
                        }}
                        onFolderClick={(folder) => {
                            setActiveFolder(folder)
                        }}
                        activeFolder={activeFolder}
                        isRemoveable={true}
                    />) : ('Loading...')
                }
                <AddFolder onAdd={onAddFolder} colors={colors}/>
            </div>
            <div className="todo__tasks">
                {
                    folders && activeFolder &&
                    <Tasks folder={activeFolder}
                           onEditTitle={onSetNewFolderTitle}
                           onAddTask={onAddTask}
                    />
                }
            </div>
        </div>
    );
}


export default App;
