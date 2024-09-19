import React, { useState } from 'react';

const Gauge = ({ value, onChange }) => (
  <input
    type="range"
    min="0"
    max="100"
    value={value}
    onChange={(e) => onChange(parseInt(e.target.value))}
  />
);

const Level3Node = ({ name, value, onChange }) => (
  <div>
    <label>{name}: </label>
    <Gauge value={value} onChange={onChange} />
    <span>{value}</span>
  </div>
);

const Level2Node = ({ name, data, onChange }) => (
  <div>
    <h3>{name}</h3>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px'}}>

    {Object.entries(data).map(([key, value]) => (
      <Level3Node
        key={key}
        name={key}
        value={value}
        onChange={(newValue) => onChange(name, key, newValue)}
      />
    ))}
    </div>
  </div>
);

const ToggleControls = () => {
  const [data, setData] = useState({
    lvl2node1: { lvl3node1: 10, lvl3node2: 100 },
    lvl2node2: { lvl3node1: 90, lvl3node2: 12 },
    lvl2node3: { lvl3node1: 2, lvl3node2: 100 }
  });

  const handleChange = (lvl2Key, lvl3Key, newValue) => {
    setData(prevData => ({
      ...prevData,
      [lvl2Key]: {
        ...prevData[lvl2Key],
        [lvl3Key]: newValue
      }
    }));
  };

  return (
    <div>
      <h2>Toggle Controls</h2>
      {Object.entries(data).map(([key, value]) => (
        <Level2Node
          key={key}
          name={key}
          data={value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default ToggleControls;
