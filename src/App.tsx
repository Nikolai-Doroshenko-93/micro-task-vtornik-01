
import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = {
    id: string, title: string, filter: FilterValuesType
}
function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(id: string, todoListId: string) {
        let copyTasks = {...tasks}
        copyTasks[todoListId] = copyTasks[todoListId].filter(t => t.id != id);

        setTasks(copyTasks);
    }

    function addTask(title: string, todoListId: string) {
        let newTasks = {id: v1(), title: title, isDone: false};

        setTasks({...tasks, [todoListId]:[newTasks , ...tasks[todoListId]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let copyTasks = tasks[todoListId]
        let task = copyTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    const getFilteredTasks = ( t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodolist = t;

        if (f === "active") {
            tasksForTodolist = t.filter(t => t.isDone === false);
        }
        if (f === "completed") {
            tasksForTodolist = t.filter(t => t.isDone === true);
        }
        return tasksForTodolist
    }


    function changeFilter(filter: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter}: tl))
    }

    const todoListsComponents = todolists.map(tl =>
        <Todolist key={tl.id}
                  title={tl.title}
                  //@ts-ignore
                  tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={tl.filter}
                  todoListId={tl.id}/>
    )
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
