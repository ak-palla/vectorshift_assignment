// outputNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const config = nodeConfigs.customOutput;

  const derivedData = {
    ...config.defaults,
    ...data,
  };

  if (!derivedData.outputName) {
    derivedData.outputName = id.replace('customOutput-', 'output_');
  }

  return (
    <BaseNode
      id={id}
      data={derivedData}
      config={config}
      onFieldChange={handleFieldChange}
    />
  );
};
