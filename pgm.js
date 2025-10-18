/**
 * dsa.js
 * 
 * A complete JavaScript implementation of key DSA concepts:
 *  - Stack, Queue, Linked List
 *  - Binary Search Tree
 *  - Graph (BFS, DFS, Dijkstra)
 *  - Sorting (Bubble, Quick, Merge)
 *  - Searching (Linear, Binary)
 *  - Dynamic Programming (Fibonacci, Knapsack)
 */

// --------------------------------------------------------------
// 1️⃣ STACK & QUEUE
// --------------------------------------------------------------

class Stack {
  constructor() {
    this.items = [];
  }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  toString() { return `Stack(${this.items.join(', ')})`; }
}

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
  toString() { return `Queue(${this.items.join(', ')})`; }
}

// --------------------------------------------------------------
// 2️⃣ LINKED LIST
// --------------------------------------------------------------

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const node = new ListNode(data);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  display() {
    const vals = [];
    let cur = this.head;
    while (cur) {
      vals.push(cur.data);
      cur = cur.next;
    }
    return vals;
  }
}

// --------------------------------------------------------------
// 3️⃣ BINARY SEARCH TREE
// --------------------------------------------------------------

class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(key) {
    const insertRec = (node, key) => {
      if (!node) return new TreeNode(key);
      if (key < node.key) node.left = insertRec(node.left, key);
      else if (key > node.key) node.right = insertRec(node.right, key);
      return node;
    };
    this.root = insertRec(this.root, key);
  }

  inorder() {
    const res = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      res.push(node.key);
      traverse(node.right);
    };
    traverse(this.root);
    return res;
  }

  search(key) {
    let cur = this.root;
    while (cur) {
      if (cur.key === key) return true;
      cur = key < cur.key ? cur.left : cur.right;
    }
    return false;
  }
}

// --------------------------------------------------------------
// 4️⃣ GRAPH (Adjacency List + BFS + DFS + Dijkstra)
// --------------------------------------------------------------

class Graph {
  constructor() {
    this.adj = {};
  }

  addEdge(u, v, w = 1) {
    if (!this.adj[u]) this.adj[u] = [];
    if (!this.adj[v]) this.adj[v] = [];
    this.adj[u].push({ node: v, weight: w });
    this.adj[v].push({ node: u, weight: w }); // undirected
  }

  bfs(start) {
    const visited = new Set();
    const q = [start];
    const order = [];
    visited.add(start);

    while (q.length) {
      const node = q.shift();
      order.push(node);
      for (const { node: nbr } of this.adj[node] || []) {
        if (!visited.has(nbr)) {
          visited.add(nbr);
          q.push(nbr);
        }
      }
    }
    return order;
  }

  dfs(start) {
    const visited = new Set();
    const order = [];

    const dfsRec = (node) => {
      visited.add(node);
      order.push(node);
      for (const { node: nbr } of this.adj[node] || []) {
        if (!visited.has(nbr)) dfsRec(nbr);
      }
    };

    dfsRec(start);
    return order;
  }

  dijkstra(start) {
    const dist = {};
    const pq = new MinHeap();
    for (const node in this.adj) dist[node] = Infinity;
    dist[start] = 0;
    pq.push([0, start]);

    while (!pq.isEmpty()) {
      const [d, u] = pq.pop();
      if (d > dist[u]) continue;
      for (const { node: v, weight: w } of this.adj[u] || []) {
        const nd = d + w;
        if (nd < dist[v]) {
          dist[v] = nd;
          pq.push([nd, v]);
        }
      }
    }
    return dist;
  }
}

// Simple MinHeap for Dijkstra
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length <= 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] <= this.heap[idx][0]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];
      idx = parent;
    }
  }

  bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let left = 2 * idx + 1, right = 2 * idx + 2, smallest = idx;
      if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
      if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
  }

  isEmpty() { return this.heap.length === 0; }
}

// --------------------------------------------------------------
// 5️⃣ SORTING
// --------------------------------------------------------------

function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
    }
  }
  return a;
}

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const mid = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...mid, ...quickSort(right)];
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// --------------------------------------------------------------
// 6️⃣ SEARCHING
// --------------------------------------------------------------

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

// --------------------------------------------------------------
// 7️⃣ DYNAMIC PROGRAMMING
// --------------------------------------------------------------

function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

function knapsack(weights, values, capacity) {
  const n = values.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}

// --------------------------------------------------------------
// 8️⃣ DEMO
// --------------------------------------------------------------

function demo() {
  console.log("=== STACK & QUEUE ===");
  const s = new Stack();
  [1, 2, 3, 4].forEach(x => s.push(x));
  console.log(s.toString());
  console.log("Pop:", s.pop());

  const q = new Queue();
  ['A', 'B', 'C'].forEach(x => q.enqueue(x));
  console.log(q.toString());
  console.log("Dequeue:", q.dequeue());

  console.log("\n=== LINKED LIST ===");
  const ll = new LinkedList();
  [10, 20, 30].forEach(v => ll.append(v));
  console.log("LinkedList:", ll.display());

  console.log("\n=== BST ===");
  const bst = new BST();
  [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(x => bst.insert(x));
  console.log("Inorder:", bst.inorder());
  console.log("Search 7:", bst.search(7));

  console.log("\n=== GRAPH ===");
  const g = new Graph();
  g.addEdge('A', 'B', 4);
  g.addEdge('A', 'C', 2);
  g.addEdge('B', 'C', 5);
  g.addEdge('B', 'D', 10);
  g.addEdge('C', 'E', 3);
  g.addEdge('E', 'D', 4);
  console.log("BFS:", g.bfs('A'));
  console.log("DFS:", g.dfs('A'));
  console.log("Dijkstra from A:", g.dijkstra('A'));

  console.log("\n=== SORTING ===");
  const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50));
  console.log("Original:", arr);
  console.log("Bubble:", bubbleSort(arr));
  console.log("Quick:", quickSort(arr));
  console.log("Merge:", mergeSort(arr));

  console.log("\n=== SEARCHING ===");
  const sorted = mergeSort(arr);
  const target = sorted[3];
  console.log("Sorted:", sorted);
  console.log("Linear search:", linearSearch(sorted, target));
  console.log("Binary search:", binarySearch(sorted, target));

  console.log("\n=== DYNAMIC PROGRAMMING ===");
  console.log("Fibonacci(10):", fibonacci(10));
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 6];
  console.log("Knapsack (capacity=5):", knapsack(weights, values, 5));
}

// Run demo
demo();
