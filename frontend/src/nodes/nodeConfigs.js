// nodeConfigs.js
// Central configuration for all node types rendered by BaseNode.

export const nodeConfigs = {
  customInput: {
    type: 'customInput',
    title: 'Input',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        inputType: 'text',
      },
      {
        name: 'inputType',
        label: 'Type',
        inputType: 'select',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ],
      },
    ],
    handles: [
      {
        id: 'value',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      inputType: 'Text',
    },
  },

  customOutput: {
    type: 'customOutput',
    title: 'Output',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        inputType: 'text',
      },
      {
        name: 'outputType',
        label: 'Type',
        inputType: 'select',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' },
        ],
      },
    ],
    handles: [
      {
        id: 'value',
        position: 'left',
        type: 'target',
      },
    ],
    defaults: {
      outputType: 'Text',
    },
  },

  llm: {
    type: 'llm',
    title: 'LLM',
    fields: [],
    handles: [
      {
        id: 'system',
        position: 'left',
        type: 'target',
        top: `${100 / 3}%`,
      },
      {
        id: 'prompt',
        position: 'left',
        type: 'target',
        top: `${200 / 3}%`,
      },
      {
        id: 'response',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {},
  },

  text: {
    type: 'text',
    title: 'Text',
    fields: [
      {
        name: 'text',
        label: 'Text',
        inputType: 'text',
      },
    ],
    handles: [
      {
        id: 'output',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      text: '{{input}}',
    },
  },

  // New example nodes
  mathAdd: {
    type: 'mathAdd',
    title: 'Math: Add',
    fields: [
      {
        name: 'a',
        label: 'A',
        inputType: 'number',
      },
      {
        name: 'b',
        label: 'B',
        inputType: 'number',
      },
    ],
    handles: [
      {
        id: 'inputA',
        position: 'left',
        type: 'target',
        top: '33%',
      },
      {
        id: 'inputB',
        position: 'left',
        type: 'target',
        top: '66%',
      },
      {
        id: 'sum',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      a: '',
      b: '',
    },
  },

  httpRequest: {
    type: 'httpRequest',
    title: 'HTTP Request',
    fields: [
      {
        name: 'url',
        label: 'URL',
        inputType: 'text',
      },
      {
        name: 'method',
        label: 'Method',
        inputType: 'select',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
    ],
    handles: [
      {
        id: 'auth',
        position: 'left',
        type: 'target',
      },
      {
        id: 'response',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      method: 'GET',
    },
  },

  promptTemplate: {
    type: 'promptTemplate',
    title: 'Prompt Template',
    fields: [
      {
        name: 'template',
        label: 'Template',
        inputType: 'textarea',
      },
    ],
    handles: [
      {
        id: 'variables',
        position: 'left',
        type: 'target',
      },
      {
        id: 'rendered',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      template: 'Hello [[name]]!',
    },
  },

  classifier: {
    type: 'classifier',
    title: 'Classifier',
    fields: [
      {
        name: 'model',
        label: 'Model',
        inputType: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
      },
      {
        name: 'threshold',
        label: 'Threshold',
        inputType: 'number',
      },
    ],
    handles: [
      {
        id: 'input',
        position: 'left',
        type: 'target',
      },
      {
        id: 'label',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      model: 'small',
      threshold: 0.5,
    },
  },

  imageGen: {
    type: 'imageGen',
    title: 'Image Gen',
    fields: [
      {
        name: 'prompt',
        label: 'Prompt',
        inputType: 'text',
      },
      {
        name: 'size',
        label: 'Size',
        inputType: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
      },
    ],
    handles: [
      {
        id: 'style',
        position: 'left',
        type: 'target',
      },
      {
        id: 'image',
        position: 'right',
        type: 'source',
      },
    ],
    defaults: {
      size: 'medium',
    },
  },
};


