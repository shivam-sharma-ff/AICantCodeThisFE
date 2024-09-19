import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [networkData, setNetworkData] = useState(null);

  useEffect(() => {
    // Simulating API call
    const mockApiResponse = {
      "lvl2node1": {
        "lvl3node1": 3,
        "lvl3node2": 0
      },
      "lvl2node2": {
        "lvl3node1": 3,
        "lvl3node2": 2
      },
      "lvl2node3": {
        "lvl3node1": 0,
        "lvl3node2": 2,
      }
    };
    setNetworkData(mockApiResponse);
  }, []);

  return (
    <div className="App">
      {networkData && <NeuralNetwork data={networkData} />}
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

      {/* Layer 2 */}
      {Array.from({ length: layer2Nodes }).map((_, i) => (
        <circle key={`l2-${i}`} cx="400" cy={100 + i * 150} r="20" fill="green" />
      ))}

      {/* Layer 3 */}
      {Array.from({ length: layer3Nodes }).map((_, i) => (
        <circle key={`l3-${i}`} cx="700" cy={150 + i * 200} r="20" fill={layer3Colors[i % layer3Colors.length]} />
      ))}

      {/* Animations */}
      {Object.entries(data).flatMap(([l2Node, l3Nodes], l2Index) =>
        Object.entries(l3Nodes).flatMap(([l3Node, count], l3Index) =>
          Array.from({ length: count }).map((_, i) => (
            <circle
              key={`bubble-${l2Node}-${l3Node}-${i}`}
              r="5"
              fill={layer3Colors[l3Index % layer3Colors.length]}>
              <animateMotion
                dur="3s"
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
