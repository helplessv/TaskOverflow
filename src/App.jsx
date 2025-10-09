import { useState, useEffect } from 'react';
import Header from './header/header.jsx';
import Info from './info/info.jsx';
import Adder from './adder/adder.jsx';
import List from './list/list.jsx';

export default function App() {
    const saved = localStorage.getItem("tasks");
    const savedCompleted = localStorage.getItem("completedTasks");
    const [tasks, setTasks] = useState(JSON.parse(saved) ?? []);
    const [completedTasks, setCompletedTasks] = useState(JSON.parse(savedCompleted) ?? []);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }, [completedTasks]);

    const addTask = (taskData) => {
        setTasks(prevTasks => [...prevTasks, taskData]);
    };

    const deleteTasks = (tasksToDelete) => {
        const idsToDelete = tasksToDelete.map(task => task.id);
        setTasks(prevTasks => prevTasks.filter(task => !idsToDelete.includes(task.id)));
    };

    const completeTasks = (tasksToComplete) => {
        const completedWithDate = tasksToComplete.map(task => ({
            ...task,
            completedAt: new Date().toISOString()
        }));
        
        setCompletedTasks(prev => [...prev, ...completedWithDate]);
        
        const idsToDelete = tasksToComplete.map(task => task.id);
        setTasks(prevTasks => prevTasks.filter(task => !idsToDelete.includes(task.id)));
    };

    return (
        <>
            <Header />
            <Info completedTasks={completedTasks} />
            <Adder onAddTask={addTask} />
            <List tasks={tasks} onDeleteTasks={deleteTasks} onCompleteTasks={completeTasks} />
        </>
    );
}
