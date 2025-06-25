import React from 'react';

function XmlTree({ node, diffType }) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (!text) return null;
    return (
      <span style={{ color: diffType === 'added' ? 'green' : diffType === 'removed' ? 'red' : 'black' }}>
        {text}
      </span>
    );
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tagName = node.nodeName;
  const children = Array.from(node.childNodes);

  const style = {
    backgroundColor: diffType === 'added' ? '#d4edda' : diffType === 'removed' ? '#f8d7da' : 'transparent',
    borderLeft: '2px solid #ccc',
    paddingLeft: '0.5rem',
    marginBottom: '0.3rem',
  };

  return (
    <div style={style}>
      <div style={{ fontWeight: 'bold' }}>&lt;{tagName}&gt;</div>
      <div style={{ paddingLeft: '1rem' }}>
        {children.map((child, idx) => (
          <XmlTree key={idx} node={child} diffType={diffType} />
        ))}
      </div>
      <div>&lt;/{tagName}&gt;</div>
    </div>
  );
}

export default XmlTree;
