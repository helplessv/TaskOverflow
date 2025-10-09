import { useState, useEffect, useRef } from "react";
import "./category.css";

export default function CategorySelector({ onSelect }) {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem("categories");
        if (saved) {
            const parsed = JSON.parse(saved);
            setOptions(parsed);
            setSelectedValue(parsed[0]);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(options));
    }, [options]);
    

    useEffect(() => {
        onSelect(selectedValue);
    }, [onSelect, selectedValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        if (value === "addnew") {
            handleAddCategory();
        } else {
            setSelectedValue(value);
            onSelect(value);
        }
        setIsOpen(false);
    };

    const handleDeleteCategory = (categoryToDelete, event) => {
        event.stopPropagation();
        
        if (window.confirm(`Удалить категорию "${categoryToDelete}"?`)) {
            const updatedOptions = options.filter(opt => opt !== categoryToDelete);
            setOptions(updatedOptions);
            
            if (selectedValue === categoryToDelete) {
                const newSelected = updatedOptions.length > 0 ? updatedOptions[0] : "";
                setSelectedValue(newSelected);
                onSelect(newSelected);
            }
        }
    };

    const handleAddCategory = () => {
        let newCategory = prompt("Enter new category:");
        if (newCategory === null || newCategory === "") { return; }
        newCategory = newCategory.length > 10 ? newCategory.slice(0, 10) + "..." : newCategory;
        const updatedOptions = [...options, newCategory];

        setOptions(updatedOptions);
        setSelectedValue(newCategory);
        onSelect(newCategory);
    };

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div 
                className="dropdown-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedValue || "Choose category"}</span>
                <span className="dropdown-arrow">▼</span>
            </div>
            
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((opt, index) => (
                        <div 
                            key={index} 
                            className={`dropdown-item ${selectedValue === opt ? 'selected' : ''}`}
                            onClick={() => handleSelect(opt)}
                        >
                            <span className="item-text">{opt}</span>
                            {opt && (
                                <button 
                                    className="delete-btn"
                                    onClick={(e) => handleDeleteCategory(opt, e)}
                                    title="Delete category"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <div 
                        className="dropdown-item add-new"
                        onClick={() => handleSelect("addnew")}
                    >
                        + Add...
                    </div>
                </div>
            )}
        </div>
    );
}