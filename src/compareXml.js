

export function compareXmlNodes(node1, node2) {
  if (!node1 && node2) return annotate(node2, 'added');
  if (node1 && !node2) return annotate(node1, 'removed');

  if (node1.nodeName !== node2.nodeName) {
    return {
      name: node2.nodeName,
      type: 'element',
      diff: 'changed',
      children: [],
    };
  }

  const children1 = Array.from(node1.childNodes).filter(n => n.nodeType !== Node.COMMENT_NODE);
  const children2 = Array.from(node2.childNodes).filter(n => n.nodeType !== Node.COMMENT_NODE);

  const children = [];
  const max = Math.max(children1.length, children2.length);
  for (let i = 0; i < max; i++) {
    children.push(compareXmlNodes(children1[i], children2[i]));
  }

  return {
    name: node1.nodeName,
    type: 'element',
    diff: 'unchanged',
    children,
  };
}

function annotate(node, diffType) {
  if (node.nodeType === Node.TEXT_NODE) {
    return {
      type: 'text',
      textContent: node.textContent.trim(),
      diff: diffType,
    };
  }

  const children = Array.from(node.childNodes || []).map(c => annotate(c, diffType));
  return {
    name: node.nodeName,
    type: 'element',
    diff: diffType,
    children,
  };
}
