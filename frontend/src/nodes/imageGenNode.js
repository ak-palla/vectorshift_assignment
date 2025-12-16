// imageGenNode.js

import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';
import { useStore } from '../store';

export const ImageGenNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const config = nodeConfigs.imageGen;

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


