// XmlTree.js
import React from 'react';

function XmlTree({ node, depth = 0 }) {


  if (!node) return null;

    console.log( node.attributes);


  const indent = '  '.repeat(depth);
  const style = {
    backgroundColor:
      node.diff === 'added' ? '#d4edda' :
      node.diff === 'removed' ? '#f8d7da' :
      node.diff === 'changed' ? '#fff3cd' :
      'transparent',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    whiteSpace: 'pre',
    paddingLeft: '0.5rem',
    borderLeft: '2px solid #ccc',
  };


  if (node.name === '#text') {
    return (
      <div style={style}>
        {indent}{node.textContent}
      </div>
    );
  }

  // Attribut-Darstellung
  const attrString = node.attributes
    ? Object.entries(node.attributes)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ')
    : '';

  const openTag = `<${node.name}${attrString ? ' ' + attrString : ''}>`;
  const closeTag = `</${node.name}>`;

  return (
    <div style={style}>
      {indent}{openTag}
      {node.children?.length > 0 ? (
        node.children.map((child, i) => (
          <XmlTree key={i} node={child} depth={depth + 1} />
        ))
      ) : null}
      {node.children?.length > 0 ? indent : ''}
      {closeTag}
    </div>
  );
}

export default XmlTree;
