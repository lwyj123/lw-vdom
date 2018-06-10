function h(type, props, ...children) {
  return { type, props, children };
}

function createElement(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node)
  }
  const $el = document.createElement(node.type);
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el));
  return $el;
}

function updateElement($parent, newNode, oldNode, index = 0) {
  if(!oldNode) {
    $parent.appendChild(
      createElement(node)
    )
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    )
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    )
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    // 递归遍历子节点
    for(let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}

function changed(vnode1, vnode2) {
  return typeof vnode1 !== typeof vnode2 ||
         typeof vnode1 === 'string' && vnode1 !== vnode2 ||
         vnode1.type !== vnode2.type
}