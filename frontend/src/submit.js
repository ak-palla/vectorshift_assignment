// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { AlertModal } from './alertModal';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalType, setModalType] = useState('success');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();

            setModalTitle('Pipeline Analysis');
            setModalContent(
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Number of Nodes:</span>
                        <strong style={{ color: 'var(--c-text-primary)' }}>{data.num_nodes}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Number of Edges:</span>
                        <strong style={{ color: 'var(--c-text-primary)' }}>{data.num_edges}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Is DAG:</span>
                        <strong style={{ color: 'var(--c-text-primary)' }}>{data.is_dag ? 'Yes' : 'No'}</strong>
                    </div>
                </div>
            );
            setModalType('success');
            setIsModalOpen(true);

        } catch (error) {
            setModalTitle('Error');
            setModalContent(
                <div style={{ color: '#ef4444' }}>
                    <p>{error.message}</p>
                    <p style={{ fontSize: '12px', marginTop: '8px', color: 'var(--c-text-secondary)' }}>Please make sure the backend server is running.</p>
                </div>
            );
            setModalType('error');
            setIsModalOpen(true);
        }
    };

    const [modalTitle, setModalTitle] = useState('');

    return (
        <>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <button type="submit" style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--c-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: '0 4px 6px -1px rgb(99 102 241 / 0.2)',
                    transition: 'all 0.2s'
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'var(--c-primary-hover)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'var(--c-primary)'}
                    onClick={handleSubmit}
                >
                    Run
                </button>
            </div>

            <AlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
                type={modalType}
            >
                {modalContent}
            </AlertModal>
        </>
    );
}

