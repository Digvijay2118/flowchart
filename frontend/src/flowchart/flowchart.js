import React, {useEffect, useCallback, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

// import "./index.css";

import initialedges  from "../../src/flowchart/edges"

const initialNodes = [
  {
    id: "0",
    type: "input",  
    data: { label: "Node" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);
  const [nodeName, setNodeName] = useState('Node');
  const { project } = useReactFlow();
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  
 // Function to fetch nodes from the API
const fetchNodesFromApi = async () => {
  try {
  
    const response = await fetch("http://localhost:5000/api/v1/flowchart", {
    
 
    });

    if (!response.ok) {

      throw new Error("Failed to fetch nodes from API");
    }

    const data = await response.json();
    console.log("data===>",data)
 const updatedNodes = data.map((node) => {
  const nodeId = node.Id != null ? node.Id.toString() : getId(); // Ensure id is a string or generate a new one
  return {
    id: nodeId,
    type: "input",
    data: { label: node.label
    }, // Use the 'name' property as the label
    // position: { x: 0, y: 50 },
    position: node.position ? { x: node.x, y: node.y } : { x: 0, y: 50 }, // Use the position from the API if available, otherwise use default position
    // edges:node.edges  
    // {source:node.edges.sourse, target:node.edges.target}:{source:1, y:2},
   
    
  };
});
    setNodes(updatedNodes);
    console.log("updatedNodes===>",updatedNodes) // Update the nodes state with data received from the API
  } catch (error) {
    console.error("Error fetching nodes from API:", error);
  }
};


  useEffect(() => {
    fetchNodesFromApi();
    // setNodes((nds) =>
    //   nds.map((node) => {
    //     if (node.id === '0') {
    //       // it's important that you create a new object here
    //       // in order to notify react flow about the change
    //       node.data = {
    //         ...node.data,
    //         label: nodeName,
    //       };
    //     }

    //     return node;
    //   })
    // );
  }, [nodeName, setNodes,setEdges]);



  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        //     const nodeName = prompt("Enter node name:"); // Prompt user for node name
        //     const newNode = {
        //       id,
        //       data: { label: nodeName }, // Set the label property with the user input
        //       // we are removing the half of the node width (75) to center the new node
        //       position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
        //       // data: { label: `Node ${id}` },
        //     };

        //     setNodes((nds) => nds.concat(newNode));
        //     setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
        //   }
        // },
        const nodeName = prompt("Enter node name:");
        if (nodeName) {
          // Only create a new node if a name is provided 
          const newNode = {
            id,
            data: { label: nodeName },

            position: project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
          };
          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) =>
            eds.concat({ id, source: connectingNodeId.current, target: id })
          );
        }
      }
    },
    [project]
  );




  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        snapToGrid={true}
        fitView
        fitViewOptions={fitViewOptions}
        attributionPosition="top-right"
      >
        
             <div className="updatenode__controls">
        <label>label:</label>
        <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
        </div>
   
        {nodes.map((node) => (
          <div
            key={node.id}
            className="node"
            style={{
              position: "absolute",
              left: node.position.x,
              top: node.position.y,
            }}
          >
             
            <div>{node.name}</div>
 
          </div>
        ))}
        
      </ReactFlow>
    </div>
  );
};

const Flowchart = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

export default Flowchart;
