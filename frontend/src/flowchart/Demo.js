import React, { useEffect, useCallback, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

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
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const [nodeName, setNodeName] = useState("");
  // This state is to store the data of the first node
  const [firstNodeData, setFirstNodeData] = useState(null);
  const [newNode, setNewNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    // fetchNodesFromApi();
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "0") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
          // Update the firstNodeData with the new data for the first node
          setFirstNodeData(node.data);
        }

        return node;
      })
    );
  }, [nodeName, setNodes, setEdges]);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const nodeName = prompt("Enter node name:");
        if (nodeName) {
          const newNode = {
            id: `node-${id}`,
            data: { label: nodeName },
            position: project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
          };

          setNodes((nds) => nds.concat(newNode));
          setEdges(
            (eds) =>
              eds.concat({
                id,
                source: connectingNodeId.current,
                target: `node-${id}`,
              }) // Updated target to `node-${id}`
          );
          setNewNode(newNode);
             // Log the position of the newly added node
        console.log("New Node Position:", newNode.position);
        }
      }
    },
    [project]
  );

  // const submitToDatabase = () => {
  //   if (nodes.length > 0) {
  //     const NodeData = nodes[0].data;
  //     axios
  //       .post("http://localhost:5000/api/v1/flowchart/insert", {
  //         data: NodeData.data,
  //         position: NodeData.position,
  //         label: NodeData.label,
  //         x: NodeData.x,
  //         y: NodeData.y,
  //       })
  //       console.log("nodeData=====>",NodeData)
  //       .then((response) => {

  //         console.log("res====>",response);
  //         // Handle the response here, e.g., show a success message to the user.
  //       })
  //       .catch((error) => {  
  //         console.error("Error submitting to database:", error);
  //         // Handle the error here, e.g., show an error message to the user.
  //       });
  //   }
  // };
  const submitToDatabase = () => {
    if (nodes.length > 0) {
      const nodeDataList = nodes.map((node) => ({
        
        // data: node.data.data,
        // position: node.position,
        label: node.data.label,
        x: node.position.x,
        y: node.position.y,
      }));
      console.log("nodelist====>",nodeDataList)
  
      axios
        .post("http://localhost:5000/api/v1/flowchart/insert", {
          data: nodeDataList,
        })
        .then((response) => {
          console.log("res====>", response);
          // Handle the response here, e.g., show a success message to the user.
        })
        .catch((error) => {
          console.error("Error submitting to database:", error);
          // Handle the error here, e.g., show an error message to the user.
        });
    }
  };
  

  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: '100vh' }}>
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
      />
      <div className="updatenode__controls">
        <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
        <button onClick={submitToDatabase}>Submit</button>
        
      </div>
    </div>
  );
};

const Demo = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);

export default Demo;
