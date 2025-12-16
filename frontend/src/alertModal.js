// alertModal.js
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const AlertModal = ({ isOpen, onClose, title, children, type = 'success' }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(2px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: '#fff',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                width: '400px',
                maxWidth: '90vw',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                animation: 'fadeIn 0.2s ease-out'
            }} onClick={e => e.stopPropagation()}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    {type === 'success' ? (
                        <div style={{ color: 'var(--c-primary)', display: 'flex' }}>
                            <CheckCircle2 size={24} />
                        </div>
                    ) : (
                        <div style={{ color: '#ef4444', display: 'flex' }}>
                            <AlertCircle size={24} />
                        </div>
                    )}
                    <h2 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'var(--c-text-primary)'
                    }}>
                        {title}
                    </h2>
                </div>

                <div style={{
                    color: 'var(--c-text-secondary)',
                    fontSize: '14px',
                    lineHeight: '1.6'
                }}>
                    {children}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: 'var(--c-primary)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'backgroundColor 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'var(--c-primary-hover)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'var(--c-primary)'}
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};
