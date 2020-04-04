import React, {useState, useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom'

import {List, AddFolder, Tasks, FontAwesomeIcon, axios} from './components'


function App() {
    const [folders, setFolders] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeFolder, setActiveFolder] = useState(null);

    let history = useHistory();


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


    useEffect(() => {
        if (folders) {
            const id = history.location.pathname.match(/\d+$|\/$/).join('');
            setActiveFolder(folders.find( folder => folder.id === +id))
        }
    }, [folders, history.location.pathname]);


    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    onFolderClick={() => history.push('/')}
                    items={[
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
                            history.push(`/lists/${folder.id}`);
                        }}
                        activeFolder={activeFolder}
                        isRemoveable={true}
                    />) : ('Loading...')
                }
                <AddFolder onAdd={onAddFolder} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Route exact path="/">
                    {folders && folders.map(folder => {
                        return (<Tasks folder={folder}
                                       key={folder.id}
                                       onEditTitle={onSetNewFolderTitle}
                                       onAddTask={onAddTask}
                                       withoutEmpty
                        />)
                    })}
                </Route>

                <Route path="/lists/:id">
                    {
                        folders && activeFolder &&
                        <Tasks folder={activeFolder}
                               onEditTitle={onSetNewFolderTitle}
                               onAddTask={onAddTask}
                        />
                    }
                </Route>
            </div>
        </div>
    );
}


export default App;
