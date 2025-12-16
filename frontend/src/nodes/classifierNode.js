// classifierNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { useStore } from '../store';

export const ClassifierNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const config = nodeConfigs.classifier;

  const derivedData = {
    ...config.defaults,
    ...data,
  };

  return (
    <BaseNode
      id={id}
      data={derivedData}
      config={config}
      onFieldChange={handleFieldChange}
    />
  );
};


