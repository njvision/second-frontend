import { useState } from 'react';
import "./DropdownNavField.css";

function DropdownNavField({ name, label, options, defaultValue = 'All' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="character-box dropdown">
      <label htmlFor={name} className="character-label">
        {label}
      </label>

      <input type="hidden" name={name} value={selected} />

      <div
        className="dropdown-field character-input" 
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        tabIndex={0}
      >
        <span className="dropdown-selected">{selected}</span>
        <span className="dropdown-arrow">▾</span>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdown-option ${option === selected ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownNavField;
