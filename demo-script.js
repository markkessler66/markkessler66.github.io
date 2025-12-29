// PhyNetPy Interactive Demo Script with new Prism Editor

let pyodide = null;
let pyodideReady = false;
let editor = null; // Store editor instance
let packageStatus = {
    numpy: false,
    networkx: false,
    matplotlib: false,
    scipy: false,
    biopython: false,
    phynetpy: false
};

// Demo examples with more sophisticated code
const demoExamples = {
    basic: `# Basic PhyNetPy Network Analysis
import numpy as np

# Try importing PhyNetPy
try:
    from PhyNetPy.Network import Network, Node, Edge
    USE_PHYNETPY = True
    print("=== Using PhyNetPy ===")
    print("✓ PhyNetPy imported successfully!")
except ImportError as e:
    USE_PHYNETPY = False
    print("=== PhyNetPy Not Available ===")
    print(f"Import error: {e}")
    print("\\nPhyNetPy is still installing or not available.")
    print("This example requires PhyNetPy to run.")

if USE_PHYNETPY:
    # Create a simple phylogenetic network
    print("\\n=== Creating a Simple Phylogenetic Network ===")
    
    # Create nodes
    root = Node(label="root", is_root=True)
    internal1 = Node(label="internal1")
    internal2 = Node(label="internal2")
    leaf1 = Node(label="A", is_leaf=True)
    leaf2 = Node(label="B", is_leaf=True)
    leaf3 = Node(label="C", is_leaf=True)
    
    # Create edges
    edges = [
        Edge(root, internal1),
        Edge(root, internal2),
        Edge(internal1, leaf1),
        Edge(internal1, leaf2),
        Edge(internal2, leaf3)
    ]
    
    # Create network
    network = Network(edges=edges)
    
    print(f"\\nNetwork Properties:")
    print(f"- Number of nodes: {len(network.V())}")
    print(f"- Number of edges: {len(network.E())}")
    print(f"- Leaves: {[leaf.label for leaf in network.get_leaves()]}")
    print(f"- Root: {network.get_root().label if network.get_root() else 'None'}")
    
    print("\\n=== Network Structure ===")
    print("This is a basic phylogenetic tree structure.")
    print("PhyNetPy can handle more complex phylogenetic networks")
    print("with hybridization events and reticulate evolution.")`,

    community: `# Community Detection with PhyNetPy and NetworkX
import numpy as np
import networkx as nx
from networkx.algorithms import community

# Try importing PhyNetPy
try:
    import phynetpy as pnp
    USE_PHYNETPY = True
except ImportError:
    USE_PHYNETPY = False
    print("Note: PhyNetPy not available, using NetworkX only")

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

# Community detection using NetworkX algorithms
print("\\n=== Community Detection (NetworkX) ===")

# Greedy modularity optimization
communities_greedy = community.greedy_modularity_communities(G)
modularity_greedy = community.modularity(G, communities_greedy)

print(f"Greedy Modularity Communities:")
print(f"- Number of communities: {len(communities_greedy)}")
print(f"- Modularity score: {modularity_greedy:.3f}")

for i, comm in enumerate(communities_greedy[:3]):  # Show first 3
    print(f"  Community {i+1}: {sorted(comm)[:10]}... (size: {len(comm)})")

# If PhyNetPy is available, show additional capabilities
if USE_PHYNETPY:
    print("\\n=== PhyNetPy Advanced Features ===")
    print("PhyNetPy provides additional community detection algorithms")
    print("and physics-inspired network analysis methods.")
    print("\\nExample: Use PhyNetPy for spectral clustering,")
    print("statistical inference, and Bayesian network analysis.")`,

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

    phynetpy: `# PhyNetPy Phylogenetic Network Example
# Demonstrates PhyNetPy's core functionality for phylogenetic analysis

import numpy as np

# Try importing PhyNetPy modules
try:
    from PhyNetPy.Network import Network, Node, Edge
    from PhyNetPy.GraphUtils import GraphUtils
    USE_PHYNETPY = True
    print("=== PhyNetPy Example ===")
    print("✓ PhyNetPy imported successfully!")
except ImportError as e:
    USE_PHYNETPY = False
    print("=== PhyNetPy Example ===")
    print("⚠ PhyNetPy is not available")
    print(f"Error: {e}")
    print("\\nThis example requires PhyNetPy to be installed.")
    print("Please wait for the installation to complete, then try again.")

if USE_PHYNETPY:
    print("\\n=== PhyNetPy Capabilities ===")
    print("PhyNetPy is a library for phylogenetic network analysis:")
    print("\\n1. Network Construction & Manipulation")
    print("   - Build phylogenetic networks with nodes and edges")
    print("   - Handle hybridization events and reticulate evolution")
    print("\\n2. Network Parsing")
    print("   - Parse Nexus files and Newick strings")
    print("   - NetworkParser for file I/O")
    print("\\n3. Simulation")
    print("   - BirthDeath processes (Yule, CBDP)")
    print("   - Network topology simulation")
    print("\\n4. Analysis Tools")
    print("   - GraphUtils for topology analysis")
    print("   - NetworkMoves for topology modification")
    print("   - GeneTrees for consensus tree construction")
    
    # Create a phylogenetic network example
    print("\\n=== Creating a Phylogenetic Network ===")
    
    # Create nodes for a simple tree
    root = Node(label="root", is_root=True)
    internal = Node(label="internal")
    leaf1 = Node(label="Species_A", is_leaf=True)
    leaf2 = Node(label="Species_B", is_leaf=True)
    leaf3 = Node(label="Species_C", is_leaf=True)
    
    # Create edges
    edges = [
        Edge(root, internal),
        Edge(internal, leaf1),
        Edge(internal, leaf2),
        Edge(root, leaf3)
    ]
    
    # Build network
    network = Network(edges=edges)
    
    print(f"\\nNetwork created:")
    print(f"- Nodes: {len(network.V())}")
    print(f"- Edges: {len(network.E())}")
    print(f"- Leaves: {[leaf.label for leaf in network.get_leaves()]}")
    
    print("\\n=== Next Steps ===")
    print("You can now:")
    print("- Parse networks from Nexus files using NetworkParser")
    print("- Analyze network topology with GraphUtils")
    print("- Simulate networks with BirthDeath module")
    print("- Work with multiple sequence alignments using MSA")
    print("\\nSee documentation: https://phylogenomics.rice.edu/html/phynetpy-docs/")`,

    custom: `# Your Custom PhyNetPy Code
# Experiment with PhyNetPy for phylogenetic network analysis!

import numpy as np

# Try importing PhyNetPy
try:
    from PhyNetPy.Network import Network, Node, Edge
    from PhyNetPy.NetworkParser import NetworkParser
    from PhyNetPy.GraphUtils import GraphUtils
    USE_PHYNETPY = True
    print("=== Welcome to PhyNetPy Demo! ===")
    print("✓ PhyNetPy is available and ready to use!")
except ImportError as e:
    USE_PHYNETPY = False
    print("=== Welcome to PhyNetPy Demo! ===")
    print("⚠ PhyNetPy not available")
    print(f"Error: {e}")
    print("(PhyNetPy installation may still be in progress)")

print("\\nThis is where you can experiment with your own PhyNetPy code.")
print("Try creating phylogenetic networks and running analyses!")

if USE_PHYNETPY:
    # Example: Create a custom phylogenetic network
    print("\\n=== Custom Phylogenetic Network Example ===")
    
    # Create a simple tree structure
    root = Node(label="root", is_root=True)
    node1 = Node(label="node1")
    node2 = Node(label="node2")
    leaf1 = Node(label="Taxon1", is_leaf=True)
    leaf2 = Node(label="Taxon2", is_leaf=True)
    leaf3 = Node(label="Taxon3", is_leaf=True)
    leaf4 = Node(label="Taxon4", is_leaf=True)
    
    # Build a tree
    edges = [
        Edge(root, node1),
        Edge(root, node2),
        Edge(node1, leaf1),
        Edge(node1, leaf2),
        Edge(node2, leaf3),
        Edge(node2, leaf4)
    ]
    
    network = Network(edges=edges)
    
    print(f"Created network:")
    print(f"- Nodes: {len(network.V())}")
    print(f"- Edges: {len(network.E())}")
    print(f"- Leaves: {[leaf.label for leaf in network.get_leaves()]}")
    
    print("\\n=== PhyNetPy Modules Available ===")
    print("You can use these PhyNetPy modules:")
    print("- Network: Core network data structures")
    print("- NetworkParser: Parse Nexus files")
    print("- GraphUtils: Network topology utilities")
    print("- BirthDeath: Network simulation")
    print("- MSA: Multiple sequence alignment")
    print("- GTR: Substitution models")
    print("- GeneTrees: Gene tree analysis")
    print("\\nSee full documentation:")
    print("https://phylogenomics.rice.edu/html/phynetpy-docs/")
else:
    print("\\n=== Waiting for PhyNetPy ===")
    print("Once PhyNetPy is installed, you can:")
    print("- Create phylogenetic networks")
    print("- Parse Nexus files")
    print("- Analyze network topologies")
    print("- Simulate evolutionary processes")

print("\\n--- Add your own PhyNetPy code below this line ---")
# Your code here!
# Example:
# from PhyNetPy.Network import Network, Node, Edge
# network = Network(edges=[...])
# print(f"Network has {len(network.V())} nodes")`
};

// Initialize Pyodide environment
async function initializePyodide() {
    try {
        updateLoadingStatus('Loading Python environment...', 'This may take 10-30 seconds on first load');
        
        if (typeof window.loadPyodide !== 'function') {
            throw new Error('Pyodide library not loaded');
        }
        
        pyodide = await window.loadPyodide();
        
        // Install pre-built Pyodide packages
        updateLoadingStatus('Installing core packages...', 'Loading NumPy, NetworkX, Matplotlib, and SciPy');
        try {
            await pyodide.loadPackage(['numpy', 'networkx', 'matplotlib', 'scipy']);
            packageStatus.numpy = true;
            packageStatus.networkx = true;
            packageStatus.matplotlib = true;
            packageStatus.scipy = true;
        } catch (error) {
            console.error('Error loading pre-built packages:', error);
            updateLoadingStatus('Some packages failed to load', 'Continuing with available packages...');
        }
        
        // Install BioPython via micropip
        updateLoadingStatus('Installing BioPython...', 'This may take a moment');
        try {
            await pyodide.loadPackage('micropip');
            const micropip = pyodide.pyimport('micropip');
            await micropip.install('biopython');
            packageStatus.biopython = true;
            updateLoadingStatus('BioPython installed successfully', 'Installing PhyNetPy...');
        } catch (error) {
            console.error('Error installing BioPython:', error);
            updateLoadingStatus('BioPython installation failed', 'Some features may be limited');
        }
        
        // Install PhyNetPy via micropip
        updateLoadingStatus('Installing PhyNetPy...', 'This may take 30-60 seconds');
        try {
            const micropip = pyodide.pyimport('micropip');
            await micropip.install('phynetpy');
            
            // Verify PhyNetPy can be imported
            try {
                pyodide.runPython('import phynetpy');
                packageStatus.phynetpy = true;
                updateLoadingStatus('PhyNetPy installed successfully!', 'Verifying installation...');
            } catch (importError) {
                console.error('PhyNetPy installed but import failed:', importError);
                updateLoadingStatus('PhyNetPy installation may be incomplete', 'Check console for details');
            }
        } catch (error) {
            console.error('Error installing PhyNetPy:', error);
            updateLoadingStatus('PhyNetPy installation failed', 'You can still use NetworkX and other packages');
        }
        
        pyodideReady = true;
        
        // Generate status message
        const installedPackages = Object.entries(packageStatus)
            .filter(([_, status]) => status)
            .map(([name, _]) => name)
            .join(', ');
        
        const failedPackages = Object.entries(packageStatus)
            .filter(([_, status]) => !status)
            .map(([name, _]) => name)
            .join(', ');
        
        let statusMessage = `Environment ready!\n\nInstalled: ${installedPackages || 'none'}`;
        if (failedPackages) {
            statusMessage += `\n\nFailed: ${failedPackages}`;
        }
        
        if (packageStatus.phynetpy) {
            statusMessage += '\n\n✓ PhyNetPy is ready to use!';
        } else {
            statusMessage += '\n\n⚠ PhyNetPy is not available. Using NetworkX instead.';
        }
        
        // Update the editor's output panel
        if (editor) {
            editor.setOutput(statusMessage, packageStatus.phynetpy ? 'success' : 'normal');
        }
        
    } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        pyodideReady = false;
        if (editor) {
            editor.setOutput('Python environment failed to load. You can still view and edit code.', 'error');
        }
    }
}

// Helper function to check if a package is available
function isPackageAvailable(packageName) {
    return packageStatus[packageName.toLowerCase()] || false;
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
        let errorMessage = `Error: ${error.message}`;
        
        // Provide helpful error messages for common issues
        if (error.message.includes('PhyNetPy') || error.message.includes('phynetpy')) {
            if (!packageStatus.phynetpy) {
                errorMessage += '\n\n⚠ PhyNetPy is not installed or still loading.';
                errorMessage += '\nPlease wait for the installation to complete.';
                errorMessage += '\nYou can check the status in the output panel above.';
            } else {
                errorMessage += '\n\nNote: PhyNetPy uses module imports like:';
                errorMessage += '\n  from PhyNetPy.Network import Network, Node, Edge';
                errorMessage += '\n  from PhyNetPy.NetworkParser import NetworkParser';
                errorMessage += '\nSee docs: https://phylogenomics.rice.edu/html/phynetpy-docs/';
            }
        } else if (error.message.includes('ImportError') || error.message.includes('ModuleNotFoundError')) {
            const missingModule = error.message.match(/No module named ['"]([^'"]+)['"]/);
            if (missingModule) {
                errorMessage += `\n\nModule '${missingModule[1]}' is not available.`;
                if (missingModule[1] === 'PhyNetPy' || missingModule[1].includes('PhyNetPy')) {
                    errorMessage += '\nPhyNetPy installation may still be in progress.';
                    errorMessage += '\nUse: from PhyNetPy.ModuleName import ClassName';
                }
            }
        }
        
        outputElement.textContent = errorMessage;
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
    
    // Connect HTML example selector to editor
    const htmlExampleSelect = document.getElementById('example-select');
    if (htmlExampleSelect && editor) {
        htmlExampleSelect.addEventListener('change', (e) => {
            const selectedExample = e.target.value;
            if (demoExamples[selectedExample]) {
                editor.loadExample(selectedExample);
            }
        });
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

