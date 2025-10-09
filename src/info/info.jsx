import './info.css'
import Component from './component.jsx';

export default function Info({ completedTasks = [] }) {
    const getTodayCompletedCount = () => {
        const today = new Date().toDateString();
        return completedTasks.filter(task => 
            new Date(task.completedAt).toDateString() === today
        ).length;
    };

    const getTotalCompletedCount = () => {
        return completedTasks.length;
    };

    const todayCompletedTasksCount = getTodayCompletedCount();
    const completedTasksCount = getTotalCompletedCount();

    return (
      <>
            <h1 className='title'>Stay on top of your tasks</h1>
            <p className='subtitle'>Get a clear overview of your tasks and boost your productivity</p>

            <div className='infoComponents'>
                <Component progress={todayCompletedTasksCount} mean={'tasks today'} />
                <Component progress={completedTasksCount} mean={'tasks completed'} />
                <Component progress={'100%'} mean={'goal progress'}/>
            </div>
      </>
  );
}
