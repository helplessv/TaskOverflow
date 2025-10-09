import { useState, useEffect } from "react";
import {styled} from "styled-components";
import edit from "./edit.svg";
import Listcomp from "./listcomp.jsx";
import Mark from "./mark.jsx";
import deletetask from "./deletetask.svg";
import completetask from "./completetask.svg"

const StyledList = styled.div`
        flex-direction: column;
        margin-top: 33px;
        justify-content: center;
        width: 700px;
        background-color: white;
        border-radius: 10px;
        height: 500px;
        .Title {
            display: flex;
            justify-content: space-between; 
            padding-top: 1px;
            padding-left: 20px;
            padding-right: 20px;    
            h1{
                font-size: 24px;
                font-weight: 200;
            }
            .edit{
                display: flex;
                width: 150px;
                justify-content: right;
            }
            button{
                img{
                    height: 32px;
                }
            }
        }
        hr{
            margin: 0px;
            border: 1px solid gray;
        }
        button{
            border: none;
            background-color: white;
            cursor: pointer;
        }
        .checked{
            background-color:rgb(240, 10, 10);
            opacity: 0.5;
        }
            .List {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 420px;
        }
        .deletebutton {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .deletebutton.visible {
            opacity: 1;
            visibility: visible;
        }

        .task-fade-out {
            animation: fadeOutSlide 0.5s ease-in-out forwards;
        }

        @keyframes fadeOutSlide {
            0% {
                opacity: 1;
                transform: translateX(0);
                max-height: 60px;
            }
            50% {
                opacity: 0.3;
                transform: translateX(-20px);
            }
            100% {
                opacity: 0;
                transform: translateX(-100%);
                max-height: 0;
                padding: 0;
                margin: 0;
            }
        }

        .hr-fade-out {
            animation: fadeOut 0.5s ease-in-out forwards;
        }

        @keyframes fadeOut {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        .completing {
            animation: pulse 0.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        button:disabled img {
            filter: grayscale(50%);
        }
`;

export default function List({ tasks = [], onDeleteTasks, onCompleteTasks }) {

    const [checkedTasks, setCheckedTasks] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [animatingTasks, setAnimatingTasks] = useState([]);
    const [isCompleting, setIsCompleting] = useState(false);
    

    const handleEdit = () => {
        setShowDelete(prev => !prev);
    };

    const handleDelete = () => {
        if(checkedTasks.length === 0) return;
        
        if(window.confirm("Are you sure?")){
            const tasksToDelete = tasks.filter(task => checkedTasks.includes(task.id));
            onDeleteTasks(tasksToDelete);
            setCheckedTasks([]);
        }
    };

    const handleComplete = () => {
        if(checkedTasks.length === 0) return;
        
        setIsCompleting(true);
        setAnimatingTasks(checkedTasks);
        
        setTimeout(() => {
            const tasksToComplete = tasks.filter(task => checkedTasks.includes(task.id));
            onCompleteTasks(tasksToComplete);
            setCheckedTasks([]);
            setAnimatingTasks([]);
            setIsCompleting(false);
        }, 500);

    }
      

    return (
        <StyledList>
            <div className="Title">
                <h1>Task List</h1>
                <div className="edit">
                    <button
                        onClick={handleComplete}
                        name="completetesk"
                        className={`deletebutton ${showDelete ? "visible" : ""} ${isCompleting ? "completing" : ""}`}
                        disabled={isCompleting}
                    >
                        <img src={completetask} />
                    </button>


                    <button
                        onClick={handleDelete}
                        name="deletetask"
                        className={`deletebutton ${showDelete ? "visible" : ""}`}
                    >
                        <img src={deletetask} />
                    </button>

                    <button onClick={handleEdit}><img src={edit}/></button>
                </div>
            </div>
            <hr></hr>
            <div className="List">
                <Listcomp key={0} items = {['Task', 'Category', 'Due Date', 'Status']}/>
                {tasks.map((task, index) => {
                    const isAnimating = animatingTasks.includes(task.id);
                    return (
                        <div key={task.id}>
                            <div className={isAnimating ? "task-fade-out" : ""}>
                                <Listcomp
                                    items={[
                                        task.text,
                                        task.category,
                                        'September 29',
                                        <Mark
                                            taskId={task.id}
                                            checked={checkedTasks.includes(task.id)}
                                        onCheck={(isChecked) => {
                                            setCheckedTasks((prev) => {
                                                const newChecked = isChecked ? [...prev, task.id] : prev.filter((id) => id !== task.id);
                                                return newChecked;
                                            });
                                        }}
                                        />
                                    ]}
                                />
                            </div>
                        </div>
                    );
                })}

            </div>
        </StyledList>
    );
}
