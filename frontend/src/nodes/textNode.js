// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import './nodeStyles.css';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Get text value from data, fallback to default
  const textValue = data.text !== undefined ? data.text : '{{input}}';

  // Parse text for variables in {{variableName}} format
  useEffect(() => {
    // Regex to match {{variableName}} where variableName is a valid JS identifier
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(textValue)) !== null) {
      matches.push(match[1]);
    }

    // Get unique variable names
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
  }, [textValue]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [textValue]);

  const handleChange = (e) => {
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <div className="vs-node text-node">
      <div className="vs-node-header">
        <span className="vs-node-title">Text</span>
      </div>

      <div className="vs-node-body">
        <label className="vs-node-field">
          <span className="vs-node-label">Text</span>
          <textarea
            ref={textareaRef}
            className="vs-node-textarea text-node-textarea"
            value={textValue}
            onChange={handleChange}
            rows={1}
          />
        </label>
      </div>

      {/* Dynamic target handles on the left for each variable */}
      {variables.map((variable, index) => {
        const topPosition = variables.length === 1
          ? '50%'
          : `${((index + 1) * 100) / (variables.length + 1)}%`;

        return (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ top: topPosition }}
            title={variable}
          />
        );
      })}

      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};

