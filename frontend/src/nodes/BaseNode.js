// BaseNode.js
// Generic node renderer driven by configuration.

import { Handle, Position } from 'reactflow';
import './nodeStyles.css';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
};

export const BaseNode = ({ id, data = {}, config, onFieldChange }) => {
  const { title, fields = [], handles = [], defaults = {} } = config;

  const getFieldValue = (name) => {
    if (data[name] !== undefined) {
      return data[name];
    }
    if (defaults && defaults[name] !== undefined) {
      return defaults[name];
    }
    return '';
  };

  const handleChange = (name, eventOrValue) => {
    const value =
      eventOrValue && eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue;
    if (onFieldChange) {
      onFieldChange(name, value);
    }
  };

  return (
    <div className="vs-node">
      <div className="vs-node-header">
        <span className="vs-node-title">{title}</span>
      </div>

      <div className="vs-node-body">
        {fields.map((field) => {
          const value = getFieldValue(field.name);

          if (field.inputType === 'select') {
            return (
              <label key={field.name} className="vs-node-field">
                <span className="vs-node-label">{field.label}</span>
                <select
                  className="vs-node-input"
                  value={value}
                  onChange={(e) => handleChange(field.name, e)}
                >
                  {(field.options || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (field.inputType === 'textarea') {
            return (
              <label key={field.name} className="vs-node-field">
                <span className="vs-node-label">{field.label}</span>
                <textarea
                  className="vs-node-textarea"
                  value={value}
                  onChange={(e) => handleChange(field.name, e)}
                  rows={3}
                />
              </label>
            );
          }

          const inputType = field.inputType === 'number' ? 'number' : 'text';

          return (
            <label key={field.name} className="vs-node-field">
              <span className="vs-node-label">{field.label}</span>
              <input
                className="vs-node-input"
                type={inputType}
                value={value}
                onChange={(e) => handleChange(field.name, e)}
              />
            </label>
          );
        })}
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={positionMap[handle.position] || Position.Left}
          id={`${id}-${handle.id}`}
          style={handle.top ? { top: handle.top } : undefined}
        />
      ))}
    </div>
  );
};


