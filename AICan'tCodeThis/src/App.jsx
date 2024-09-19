import { useState, useEffect } from 'react'
import './App.css'
import ToggleControls from './components/toggleControls';

function App() {
  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    // Function to simulate API call
    const fetchData = () => {
      // Simulating API call
      const mockApiResponse = {
        "lvl2node1": {
          "lvl3node1": Math.floor(Math.random() * 5) + 1,
          "lvl3node2": Math.floor(Math.random() * 5) + 1
        },
        "lvl2node2": {
          "lvl3node1": Math.floor(Math.random() * 5) + 1,
          "lvl3node2": Math.floor(Math.random() * 5) + 1
        },
        "lvl2node3": {
          "lvl3node1": Math.floor(Math.random() * 5) + 1,
          "lvl3node2": Math.floor(Math.random() * 5) + 1
        }
      };
      setNetworkData(mockApiResponse);
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 15000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App" style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gridTemplateRows: '1fr 1fr', 
      height: '100vh' 
    }}>
      <div style={{ gridRow: '1 / span 2' }}>
        {networkData && <NeuralNetwork data={networkData} />}
      </div>
      <div style={{ padding: '20px' }}>
        <h2>Upper Right Section</h2>
        <ToggleControls/>
        {/* Add content for upper right section here */}
      </div>
      <div style={{ padding: '20px' }}>
        <h2>Lower Right Section</h2>
        {/* Add content for lower right section here */}
      </div>
    </div>
  );
}

function NeuralNetwork({ data }) {
  const layer2Nodes = Object.keys(data).length;
  const layer3Nodes = Object.keys(data[Object.keys(data)[0]]).length;
  const layer3Colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  const getDelay = (l2Index, i) => {
    if (l2Index === 1) {  // Middle node of 2nd layer
      return i * 0.2;  // Increased delay
    } else {
      return i * 0.2;  // Original delay for other nodes
    }
  };

  return (
    <svg width="800" height="800">
      {/* Layer 1 */}
      <circle cx="100" cy="200" r="20" fill="blue" />
      <text x="100" y="160" textAnchor="middle" fill="black" fontSize="16">Finsense</text>

      {/* Layer 2 */}
      {Array.from({ length: layer2Nodes }).map((_, i) => (
        <g key={`l2-${i}`}>
          <circle cx="400" cy={100 + i * 150} r="20" fill="green" />
          <text x="400" y={70 + i * 150} textAnchor="middle" fill="black" fontSize="14">
            {`Hidden ${i + 1}`}
          </text>
        </g>
      ))}
      <text x="400" y="40" textAnchor="middle" fill="black" fontSize="16">AA</text>

      {/* Layer 3 */}
      {Array.from({ length: layer3Nodes }).map((_, i) => (
        <g key={`l3-${i}`}>
          <circle cx="700" cy={150 + i * 200} r="20" fill={layer3Colors[i % layer3Colors.length]} />
          <text x="700" y={120 + i * 200} textAnchor="middle" fill="black" fontSize="14" >
            {`Output ${i + 1}`}
          </text>
        </g>
      ))}
      <text x="700" y="40" textAnchor="middle" fill="black" fontSize="16">FIP</text>

      {/* Animations */}
      {Object.entries(data).flatMap(([l2Node, l3Nodes], l2Index) =>
        Object.entries(l3Nodes).flatMap(([l3Node, count], l3Index) =>
          Array.from({ length: count }).map((_, i) => (
            <circle
              key={`bubble-${l2Node}-${l3Node}-${i}`}
              r="5"
              fill={layer3Colors[l3Index % layer3Colors.length]}>
              <animateMotion
                dur="1.5s"
                repeatCount="indefinite"
                path={`M100,200 L400,${100 + l2Index * 150} L700,${150 + l3Index * 200}`}
                begin={`${getDelay(l2Index, i)}s`}
              />
            </circle>
          ))
        )
      )}
    </svg>
  );
}

export default App
