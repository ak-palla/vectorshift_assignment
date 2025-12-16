// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='mathAdd' label='Math Add' />
                <DraggableNode type='httpRequest' label='HTTP' />
                <DraggableNode type='promptTemplate' label='Prompt' />
                <DraggableNode type='classifier' label='Classifier' />
                <DraggableNode type='imageGen' label='Image Gen' />
            </div>
        </div>
    );
};
