
export function compareXmlSideBySide(node1, node2) {
  if (!node1 && node2) {
    return [null, annotate(node2, 'added')];
  }
  if (node1 && !node2) {
    return [annotate(node1, 'removed'), null];
  }

  const name1 = node1.nodeName;
  const name2 = node2.nodeName;

  if (name1 !== name2) {
    return [
      annotate(node1, 'removed'),
      annotate(node2, 'added'),
    ];
  }

  const children1 = Array.from(node1.childNodes).filter(n => n.nodeType !== Node.COMMENT_NODE);
  const children2 = Array.from(node2.childNodes).filter(n => n.nodeType !== Node.COMMENT_NODE);

  const maxLen = Math.max(children1.length, children2.length);
  const leftChildren = [];
  const rightChildren = [];

  for (let i = 0; i < maxLen; i++) {
    const [l, r] = compareXmlSideBySide(children1[i], children2[i]);
    leftChildren.push(l);
    rightChildren.push(r);
  }

  return [
    {
      name: name1,
      type: 'element',
      diff: 'unchanged',
      children: leftChildren,
    },
    {
      name: name2,
      type: 'element',
      diff: 'unchanged',
      children: rightChildren,
    },
  ];
}

function annotate(node, diff) {
  if (!node) return null;

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    if (!text) return null;
    return {
      type: 'text',
      textContent: text,
      diff,
    };
  }

  const attrs = {};
  if (node.attributes) {
    for (const attr of Array.from(node.attributes)) {
      attrs[attr.name] = attr.value;
    }
  }

  const children = Array.from(node.childNodes || [])
    .map(c => annotate(c, diff))
    .filter(Boolean);

  return {
    name: node.nodeName,
    type: 'element',
    diff,
    attributes: attrs,
    children,
  };
}
