export function filterTree(tree, func) {
  return tree.filter(node => {
    let flag = func(node)
    if (flag && node.children && node.children.length > 0) {
      node.children = filterTree(node.children, func)
    }
    return flag
  })
}

export function mapTree(tree, func, parentNodes = []) {
  return tree.map(node => {
    let newNode = func(node, parentNodes)
    if (newNode.children && newNode.children.length > 0) {
      newNode.children = mapTree(newNode.children, func, [...parentNodes, newNode])
    }
    return newNode
  })
}
