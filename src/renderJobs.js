export default function renderJobs({jobs, dependencies}) {
  const color = status => {
    switch (status) {
      case "Succeeded": return "green"
      case "Failed": return "red"
      default: return "gray"
    }
  }
  const boxes = jobs.map(job => ({
    ...job,
    width: 50 + 10*job.name.length,
    height: 100,
    color: color(job.status)
  }))
  const layers = []
  traverse(treeOf(dependencies), (i, depth) =>
    layers[depth] = (layers[depth] || []).concat(boxes[i])
  )
  boxes.forEach(box => layers.some(layer => layer.includes(box)) || layers[0].push(box))
  let x = 150;
  for (let depth = 0; depth < layers.length; ++depth) {
    for (let i = 0; i < layers[depth].length; ++i) {
      layers[depth][i].x = x
      layers[depth][i].y = 600/(layers[depth].length + 1) * (i + 1)
    }
    x += Math.max(...(layers[depth].map(box => box.width))) + 50
  }
  const arrows = dependencies.map(({from, to}) => ({
    from: {
      x: boxes[to].x + boxes[to].width,
      y: boxes[to].y + boxes[to].height / 2
    },
    to: {
      x: boxes[from].x,
      y: boxes[from].y + boxes[from].height / 2
    }
  }))
  return { boxes, arrows }
}

function treeOf(dependencies) {
  const tree = []
  for (const dependency of dependencies) {
    const node = inTree(dependency.from, tree) || {value: dependency.from, subtree: []}
    const parent = inTree(dependency.to, tree)
    if (parent) {
      parent.subtree.push(node)
    } else {
      tree.push({value: dependency.to, subtree: [node]})
    }
  }
  return tree
}

function inTree(value, tree) {
  for (const node of tree) {
    if (value === node.value) {
      return node
    }
    const inSubtree = inTree(value, node.subtree)
    if (inSubtree) return inSubtree
  }
}

function traverse(tree, f, currentDepth = 0) {
  return tree.map(({value, subtree}) => ({
    value: f(value, currentDepth),
    subtree: traverse(subtree, f, currentDepth + 1)
  }))
}
