// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathAddNode } from './nodes/mathAddNode';
import { HttpRequestNode } from './nodes/httpRequestNode';
import { PromptTemplateNode } from './nodes/promptTemplateNode';
import { ClassifierNode } from './nodes/classifierNode';
import { ImageGenNode } from './nodes/imageGenNode';
import { nodeConfigs } from './nodes/nodeConfigs';
import { PipelineToolbar } from './toolbar';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  mathAdd: MathAddNode,
  httpRequest: HttpRequestNode,
  promptTemplate: PromptTemplateNode,
  classifier: ClassifierNode,
  imageGen: ImageGenNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    const baseData = { id: nodeID, nodeType: `${type}` };
    const config = nodeConfigs[type];
    if (config && config.defaults) {
      return { ...config.defaults, ...baseData };
    }
    return baseData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      {/* Sidebar on the Left */}
      <div style={{
        width: '260px',
        borderRight: '1px solid var(--c-border)',
        background: 'var(--c-bg-card)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <PipelineToolbar />
      </div>

      {/* Canvas Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#94a3b8" gap={gridSize} size={1} />
          <Controls style={{ display: 'flex', flexDirection: 'row', gap: '4px', padding: '4px' }} />
          <MiniMap style={{ borderRadius: '8px', border: '1px solid var(--c-border)' }} zoomable pannable />
        </ReactFlow>
      </div>
    </div>
  )
}
