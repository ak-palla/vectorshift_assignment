// llmNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const config = nodeConfigs.llm;

  return (
    <BaseNode
      id={id}
      data={data}
      config={config}
      onFieldChange={handleFieldChange}
    />
  );
};
