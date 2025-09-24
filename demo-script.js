// PhyNetPy Interactive Demo Script

let pyodide = null;
let pyodideReady = false;

// Demo examples with more sophisticated code
const demoExamples = {
    basic: `# Basic Network Analysis with NetworkX
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt

# Create a simple network
G = nx.Graph()
G.add_edges_from([
    ('A', 'B'), ('B', 'C'), ('C', 'D'), 
    ('D', 'A'), ('A', 'C'), ('B', 'D')
])

print("=== Basic Network Analysis ===")
print(f"Number of nodes: {G.number_of_nodes()}")
print(f"Number of edges: {G.number_of_edges()}")
print(f"Nodes: {list(G.nodes())}")
print(f"Edges: {list(G.edges())}")

# Calculate basic metrics
density = nx.density(G)
avg_clustering = nx.average_clustering(G)
print(f"\\nNetwork Metrics:")
print(f"- Density: {density:.3f}")
print(f"- Average clustering: {avg_clustering:.3f}")

# Degree analysis
degrees = dict(G.degree())
print(f"\\nDegree sequence: {list(degrees.values())}")
print(f"Average degree: {sum(degrees.values()) / len(degrees):.2f}")`,

    community: `# Community Detection Example
import numpy as np
import networkx as nx
from networkx.algorithms import community

# Create Zachary's Karate Club network
G = nx.karate_club_graph()

print("=== Zachary's Karate Club Analysis ===")
print(f"Nodes: {G.number_of_nodes()}")
print(f"Edges: {G.number_of_edges()}")

# Basic network properties
print(f"\\nNetwork Properties:")
print(f"- Density: {nx.density(G):.3f}")
print(f"- Average clustering: {nx.average_clustering(G):.3f}")
print(f"- Transitivity: {nx.transitivity(G):.3f}")

# Community detection using different algorithms
print("\\n=== Community Detection ===")

# Greedy modularity optimization
communities_greedy = community.greedy_modularity_communities(G)
modularity_greedy = community.modularity(G, communities_greedy)

print(f"Greedy Modularity Communities:")
print(f"- Number of communities: {len(communities_greedy)}")
print(f"- Modularity score: {modularity_greedy:.3f}")

for i, comm in enumerate(communities_greedy):
    print(f"  Community {i+1}: {sorted(comm)} (size: {len(comm)})")

# Label propagation algorithm
communities_label = community.label_propagation_communities(G)
print(f"\\nLabel Propagation Communities:")
print(f"- Number of communities: {len(communities_label)}")

for i, comm in enumerate(communities_label):
    print(f"  Community {i+1}: {sorted(comm)} (size: {len(comm)})")`,

    metrics: `# Advanced Network Metrics Analysis
import numpy as np
import networkx as nx

# Create a more complex network - Barabási-Albert preferential attachment
print("=== Barabási-Albert Network Analysis ===")
G = nx.barabasi_albert_graph(50, 3, seed=42)

print(f"Network: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")

# Centrality measures
print("\\n=== Centrality Analysis ===")

# Calculate different centrality measures
degree_cent = nx.degree_centrality(G)
betweenness_cent = nx.betweenness_centrality(G)
closeness_cent = nx.closeness_centrality(G)
eigenvector_cent = nx.eigenvector_centrality(G)

# Find top 5 nodes by each centrality measure
print("Top 5 nodes by Degree Centrality:")
top_degree = sorted(degree_cent.items(), key=lambda x: x[1], reverse=True)[:5]
for node, cent in top_degree:
    print(f"  Node {node}: {cent:.3f}")

print("\\nTop 5 nodes by Betweenness Centrality:")
top_betweenness = sorted(betweenness_cent.items(), key=lambda x: x[1], reverse=True)[:5]
for node, cent in top_betweenness:
    print(f"  Node {node}: {cent:.3f}")

print("\\nTop 5 nodes by Closeness Centrality:")
top_closeness = sorted(closeness_cent.items(), key=lambda x: x[1], reverse=True)[:5]
for node, cent in top_closeness:
    print(f"  Node {node}: {cent:.3f}")

# Network structure analysis
print("\\n=== Network Structure ===")
print(f"Average path length: {nx.average_shortest_path_length(G):.3f}")
print(f"Diameter: {nx.diameter(G)}")
print(f"Radius: {nx.radius(G)}")
print(f"Global clustering coefficient: {nx.transitivity(G):.3f}")

# Degree distribution analysis
degrees = [d for n, d in G.degree()]
print(f"\\n=== Degree Distribution ===")
print(f"Average degree: {np.mean(degrees):.2f}")
print(f"Degree std deviation: {np.std(degrees):.2f}")
print(f"Min degree: {min(degrees)}")
print(f"Max degree: {max(degrees)}")`,

    custom: `# Your Custom PhyNetPy Code
# Replace this with your own network analysis experiments!

import numpy as np
import networkx as nx

print("=== Welcome to PhyNetPy Demo! ===")
print("This is where you can experiment with your own code.")
print("\\nTry creating your own networks and running analyses!")

# Example: Create a custom network
print("\\n=== Custom Network Example ===")

# Create a small-world network
G = nx.watts_strogatz_graph(20, 4, 0.3, seed=42)

print(f"Small-world network: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
print(f"Average clustering: {nx.average_clustering(G):.3f}")
print(f"Average path length: {nx.average_shortest_path_length(G):.3f}")

# Compare with random and regular networks
G_random = nx.erdos_renyi_graph(20, 0.2, seed=42)
G_regular = nx.k_regular_graph(4, 20)

print("\\nComparison with other network types:")
print(f"Random network - Clustering: {nx.average_clustering(G_random):.3f}, Path length: {nx.average_shortest_path_length(G_random):.3f}")
print(f"Regular network - Clustering: {nx.average_clustering(G_regular):.3f}, Path length: {nx.average_shortest_path_length(G_regular):.3f}")

print("\\n--- Add your own code below this line ---")
# Your code here!`
};

// Store original examples for reset functionality
const originalExamples = { ...demoExamples };

// Initialize Pyodide environment
async function initializePyodide() {
    const outputElement = document.getElementById('output-content');
    
    try {
        updateLoadingStatus('Loading Python environment...', 'This may take 10-30 seconds on first load');
        
        // Load Pyodide
        pyodide = await loadPyodide();
        
        updateLoadingStatus('Installing packages...', 'Loading NumPy, NetworkX, and Matplotlib');
        
        // Install core packages
        await pyodide.loadPackage(['numpy', 'networkx', 'matplotlib']);
        
        // Try to install PhyNetPy if available
        try {
            await pyodide.runPython(`
import micropip
await micropip.install('phynetpy')
            `);
        showSuccess('PhyNetPy environment ready!', 'All packages loaded successfully. Select an example and click "Run Code" to get started.');
        } catch (error) {
            console.log('PhyNetPy not available on PyPI, using core packages');
            showSuccess('Python environment ready!', 'Core packages loaded. PhyNetPy features may need manual implementation.');
        }
        
        pyodideReady = true;
        
        // Load the default example
        loadExample('basic');
        updateLineNumbers();
        
    } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        showError('Failed to load Python environment', `Error: ${error.message}\\n\\nPlease refresh the page and try again.`);
    }
}

// Update loading status
function updateLoadingStatus(message, details) {
    const outputElement = document.getElementById('output-content');
    outputElement.innerHTML = `
        <div class="demo-placeholder">
            <p>${message}</p>
            <div class="loading-spinner"></div>
            <p class="loading-details">${details}</p>
        </div>
    `;
}

// Show success message
function showSuccess(title, message) {
    const outputElement = document.getElementById('output-content');
    outputElement.innerHTML = `
        <div class="demo-placeholder">
            <p class="output-success">${title}</p>
            <p>${message}</p>
        </div>
    `;
}

// Show error message
function showError(title, message) {
    const outputElement = document.getElementById('output-content');
    outputElement.innerHTML = `<div class="output-error">${title}\\n\\n${message}</div>`;
}

// Load example code
function loadExample(exampleKey) {
    const codeEditor = document.getElementById('code-editor');
    const example = demoExamples[exampleKey];
    if (example) {
        codeEditor.value = example;
        updateLineNumbers();
    }
}

// Reset code to original example
function resetCode() {
    const exampleSelect = document.getElementById('example-select');
    const currentExample = exampleSelect.value;
    demoExamples[currentExample] = originalExamples[currentExample];
    loadExample(currentExample);
}

// Update line numbers - Safari compatible with individual elements
function updateLineNumbers() {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    
    if (!lineNumbers || !codeEditor) return;
    
    const lines = codeEditor.value.split('\\n');
    const lineCount = Math.max(lines.length, 1);
    
    // Clear existing line numbers
    lineNumbers.innerHTML = '';
    
    // Create individual div elements for each line number
    for (let i = 1; i <= lineCount; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = i;
        lineDiv.className = 'line-number';
        lineNumbers.appendChild(lineDiv);
    }
    
    // Sync scroll position
    lineNumbers.scrollTop = codeEditor.scrollTop;
}

// Run Python code
async function runPythonCode() {
    if (!pyodideReady) {
        alert('Python environment is still loading. Please wait...');
        return;
    }
    
    const codeEditor = document.getElementById('code-editor');
    const outputElement = document.getElementById('output-content');
    const runButton = document.getElementById('run-button');
    const runText = document.getElementById('run-text');
    const loadingText = document.getElementById('loading-text');
    const executionTime = document.getElementById('execution-time');
    
    const code = codeEditor.value.trim();
    if (!code) {
        showError('No code to run', 'Please enter some Python code to execute.');
        return;
    }
    
    // Show loading state
    runButton.disabled = true;
    runText.style.display = 'none';
    loadingText.style.display = 'inline';
    
    const startTime = performance.now();
    
    try {
        // Capture stdout and stderr
        pyodide.runPython(`
import sys
from io import StringIO
import traceback

# Capture both stdout and stderr
sys.stdout = StringIO()
sys.stderr = StringIO()
        `);
        
        // Run the user code
        await pyodide.runPythonAsync(code);
        
        // Get the output
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        
        // Reset stdout and stderr
        pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `);
        
        const endTime = performance.now();
        const executionTimeMs = (endTime - startTime).toFixed(2);
        
        // Display output
        let output = '';
        if (stdout.trim()) {
            output += stdout;
        }
        if (stderr.trim()) {
            output += '\\n' + stderr;
        }
        
        if (output.trim()) {
            outputElement.innerHTML = `<pre class="output-success">${output}</pre>`;
        } else {
            outputElement.innerHTML = '<div class="output-info">✓ Code executed successfully (no output)</div>';
        }
        
        // Update execution time
        if (executionTime) {
            executionTime.textContent = `Executed in ${executionTimeMs}ms`;
        }
        
    } catch (error) {
        const endTime = performance.now();
        const executionTimeMs = (endTime - startTime).toFixed(2);
        
        console.error('Python execution error:', error);
        showError('Execution Error', error.message);
        
        if (executionTime) {
            executionTime.textContent = `Failed after ${executionTimeMs}ms`;
        }
        
    } finally {
        // Reset button state
        runButton.disabled = false;
        runText.style.display = 'inline';
        loadingText.style.display = 'none';
    }
}

// Clear output
function clearOutput() {
    const outputElement = document.getElementById('output-content');
    const executionTime = document.getElementById('execution-time');
    
    outputElement.innerHTML = '<div class="demo-placeholder"><p>Output cleared. Run some code to see results here.</p></div>';
    
    if (executionTime) {
        executionTime.textContent = '';
    }
}

// Copy code to clipboard
async function copyCode() {
    const codeEditor = document.getElementById('code-editor');
    try {
        await navigator.clipboard.writeText(codeEditor.value);
        showToast('Code copied to clipboard!');
    } catch (error) {
        console.error('Failed to copy code:', error);
        showToast('Failed to copy code', 'error');
    }
}

// Copy output to clipboard
async function copyOutput() {
    const outputElement = document.getElementById('output-content');
    const text = outputElement.textContent || outputElement.innerText;
    try {
        await navigator.clipboard.writeText(text);
        showToast('Output copied to clipboard!');
    } catch (error) {
        console.error('Failed to copy output:', error);
        showToast('Failed to copy output', 'error');
    }
}

// Download code as Python file
function downloadCode() {
    const codeEditor = document.getElementById('code-editor');
    const exampleSelect = document.getElementById('example-select');
    
    const code = codeEditor.value;
    const filename = `phynetpy_${exampleSelect.value}_demo.py`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles if not already present
    if (!document.querySelector('style[data-toast]')) {
        const style = document.createElement('style');
        style.setAttribute('data-toast', 'true');
        style.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            }
            .toast-success { background-color: #51cf66; }
            .toast-error { background-color: #ff6b6b; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize demo when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    const exampleSelect = document.getElementById('example-select');
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const resetButton = document.getElementById('reset-button');
    const copyCodeBtn = document.getElementById('copy-code');
    const copyOutputBtn = document.getElementById('copy-output');
    const downloadCodeBtn = document.getElementById('download-code');
    const codeEditor = document.getElementById('code-editor');
    
    // Example selection
    if (exampleSelect) {
        exampleSelect.addEventListener('change', (e) => {
            loadExample(e.target.value);
        });
    }
    
    // Button event listeners
    if (runButton) {
        runButton.addEventListener('click', runPythonCode);
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearOutput);
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', resetCode);
    }
    
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', copyCode);
    }
    
    if (copyOutputBtn) {
        copyOutputBtn.addEventListener('click', copyOutput);
    }
    
    if (downloadCodeBtn) {
        downloadCodeBtn.addEventListener('click', downloadCode);
    }
    
        // Code editor event listeners
        if (codeEditor) {
            codeEditor.addEventListener('input', updateLineNumbers);
            codeEditor.addEventListener('scroll', () => {
                const lineNumbers = document.getElementById('line-numbers');
                if (lineNumbers) {
                    lineNumbers.scrollTop = codeEditor.scrollTop;
                }
            });
            
            // Allow tab key in textarea
            codeEditor.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = codeEditor.selectionStart;
                    const end = codeEditor.selectionEnd;
                    codeEditor.value = codeEditor.value.substring(0, start) + 
                        '    ' + codeEditor.value.substring(end);
                    codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
                    updateLineNumbers();
                }
            });
            
            // Force initial line number update after a small delay
            setTimeout(() => {
                updateLineNumbers();
            }, 100);
        }
    
    // Initialize Pyodide
    if (typeof loadPyodide !== 'undefined') {
        initializePyodide();
    } else {
        showError('Python environment not available', 'Pyodide library failed to load. Please check your internet connection and refresh the page.');
    }
});
