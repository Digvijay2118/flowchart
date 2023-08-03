import React, { useEffect, useCallback, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';



const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node' },
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
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    // fetchNodesFromApi();
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '0') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes, setEdges]);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((event) => {
    const targetIsPane = event.target.classList.contains('react-flow__pane');

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
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: `node-${id}` }) // Updated target to `node-${id}`
        );
      }
    }
}, [project]);


  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ height: 500 }} >
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
        <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
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