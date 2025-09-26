// PhyNetPy Interactive Demo Script with new Prism Editor

let pyodide = null;
let pyodideReady = false;
let editor = null; // Store editor instance

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

// Initialize Pyodide environment
async function initializePyodide() {
    try {
        updateLoadingStatus('Loading Python environment...', 'This may take 10-30 seconds on first load');
        
        if (typeof window.loadPyodide !== 'function') {
            throw new Error('Pyodide library not loaded');
        }
        
        pyodide = await window.loadPyodide();
        
        updateLoadingStatus('Installing packages...', 'Loading NumPy, NetworkX, and Matplotlib');
        await pyodide.loadPackage(['numpy', 'networkx', 'matplotlib']);
        
        pyodideReady = true;
        
        // Update the editor's output panel
        if (editor) {
            editor.setOutput('PhyNetPy environment ready! All packages loaded successfully.', 'success');
        }
        
    } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        pyodideReady = false;
        if (editor) {
            editor.setOutput('Python environment failed to load. You can still view and edit code.', 'error');
        }
    }
}

// Custom run handler for Pyodide
async function runPythonCode(code, outputElement) {
    if (!pyodideReady) {
        outputElement.textContent = 'Python environment is still loading. Please wait...';
        outputElement.className = 'output-panel error';
        return;
    }
    
    outputElement.textContent = '>>> Running Python code...\n\n';
    outputElement.className = 'output-panel';
    
    const startTime = performance.now();
    
    try {
        // Set up output capture
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
        `);
        
        // Run the code
        await pyodide.runPythonAsync(code);
        
        // Get output
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        
        // Reset streams
        pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `);
        
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);
        
        // Display results
        let output = '';
        if (stdout.trim()) {
            output += stdout;
        }
        if (stderr.trim()) {
            output += '\n' + stderr;
        }
        
        if (output.trim()) {
            outputElement.textContent = output;
            outputElement.className = 'output-panel success';
        } else {
            outputElement.textContent = '✓ Code executed successfully (no output)';
            outputElement.className = 'output-panel success';
        }
        
        // Add execution time
        outputElement.textContent += `\n\nExecuted in ${executionTime}ms`;
        
    } catch (error) {
        outputElement.textContent = `Error: ${error.message}`;
        outputElement.className = 'output-panel error';
    }
}

// Helper function to show loading status in editor
function updateLoadingStatus(message, details) {
    if (editor) {
        editor.setOutput(`${message}\n${details}`, 'normal');
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing PhyNetPy Demo...');
    
    // Create the editor with your custom examples
    editor = new PrismEditor({
        containerId: 'python-editor',
        language: 'python',
        examples: demoExamples,
        onRun: runPythonCode,  // Use our custom Pyodide runner
        onChange: function(code) {
            // Optional: Save to localStorage
            localStorage.setItem('phynetpy_code', code);
        }
    });
    
    // Load saved code if exists
    const savedCode = localStorage.getItem('phynetpy_code');
    if (savedCode) {
        editor.setCode(savedCode);
    }
    
    // Initialize Pyodide
    setTimeout(() => {
        if (typeof window.loadPyodide !== 'undefined') {
            initializePyodide();
        } else {
            console.warn('Pyodide not available');
            editor.setOutput('Python runtime not available. You can still edit code.', 'error');
        }
    }, 500);
});

