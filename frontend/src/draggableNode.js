// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#fff',
        border: '1px solid var(--c-border)',
        justifyContent: 'flex-start',
        padding: '0 12px',
        gap: '8px',
        flexDirection: 'row',
        color: 'var(--c-text-secondary)',
        transition: 'all 0.2s',
        boxSizing: 'border-box'
      }}
      draggable
    >
      {icon}
      <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
    </div>
  );
};

