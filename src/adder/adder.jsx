import "./adder.css";
import { useState } from "react";
import CategorySelector from "./category";

export default function Adder({ onAddTask }) {
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {

            const trimmedInputValue = inputValue.length > 11 ? inputValue.slice(0, 11) + "..." : inputValue;
            const safeCategory = selectedCategory ?? "";
            const trimmedCategory = safeCategory.length > 11 ? safeCategory.slice(0, 11) + "..." : safeCategory;
            const taskData = {
                id: Date.now(),
                text: trimmedInputValue,
                category: trimmedCategory
            };
            onAddTask(taskData);
            setInputValue("");
        }
    };


    return (
        <div className="addTask">
            <form onSubmit={handleSubmit}>
                <div><input type="text" placeholder="Add a new Task" className="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} /></div>
                <div><CategorySelector onSelect={setSelectedCategory} /></div>
                <div><button type="submit" className="submit">Add Task</button></div>
            </form>
        </div>
    );
}
