import { useState, useEffect } from 'react';
import champions from '../data/champions.json';
import './dropdown.css';

function Dropdown({ onSelect, resetCounter, disabled }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (champion) => {
    setSelected(champion);
    setOpen(false);
    onSelect(champion);
  };

  useEffect(() => {
    setSelected(null);
  }, [resetCounter]);

  return (
    <div className={`dropdown ${disabled ? 'disabled' : ''}`}>
      <div className="dropdown-btn" onClick={() => {
          if (!disabled) setOpen(!open);
        }}>
        {selected ? selected.name : 'Select Champion'}
        <span>▼</span>
      </div>

      {open && (
        <div className="dropdown-content">
          {[...champions]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((champion, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(champion)}
              >
                <img src={champion.image} alt={champion.name} />
                {champion.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;