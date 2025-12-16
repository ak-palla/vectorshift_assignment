
// toolbar.js
import { DraggableNode } from './draggableNode';
import {
    Type,
    BrainCircuit,
    FileOutput,
    Calculator,
    Globe,
    FileText,
    Split,
    Image as ImageIcon,
    MessageSquare
} from 'lucide-react';

const TOOLS = [
    { type: 'customInput', label: 'Input', icon: <Type size={16} /> },
    { type: 'llm', label: 'LLM', icon: <BrainCircuit size={16} /> },
    { type: 'customOutput', label: 'Output', icon: <FileOutput size={16} /> },
    { type: 'text', label: 'Text', icon: <FileText size={16} /> },
    { type: 'mathAdd', label: 'Math', icon: <Calculator size={16} /> },
    { type: 'httpRequest', label: 'HTTP', icon: <Globe size={16} /> },
    { type: 'promptTemplate', label: 'Prompt', icon: <MessageSquare size={16} /> },
    { type: 'classifier', label: 'Classifier', icon: <Split size={16} /> },
    { type: 'imageGen', label: 'Image', icon: <ImageIcon size={16} /> },
];

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--c-text-primary)',
                marginBottom: '16px'
            }}>
                Toolbox
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {TOOLS.map((tool) => (
                    <DraggableNode
                        key={tool.type}
                        type={tool.type}
                        label={tool.label}
                        icon={tool.icon}
                    />
                ))}
            </div>
        </div>
    );
};

