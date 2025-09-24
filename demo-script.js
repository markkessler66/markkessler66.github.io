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

// Clean any HTML from textarea
function cleanTextareaContent() {
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor && codeEditor.value) {
        // Check if there's HTML in the content
        if (codeEditor.value.includes('<') || codeEditor.value.includes('>')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = codeEditor.value;
            const cleanText = tempDiv.textContent || tempDiv.innerText || '';
            
            // Only update if there were actually HTML tags to clean
            if (cleanText !== codeEditor.value && cleanText.trim()) {
                codeEditor.value = cleanText;
            }
        }
    }
}

// Initialize Pyodide environment
async function initializePyodide() {
    const outputElement = document.getElementById('output-content');
    
    try {
        updateLoadingStatus('Loading Python environment...', 'This may take 10-30 seconds on first load');
        
        // Set a timeout for Pyodide loading
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Pyodide loading timeout')), 30000);
        });
        
        // Race between loading and timeout
        pyodide = await Promise.race([
            loadPyodide(),
            timeoutPromise
        ]);
        
        updateLoadingStatus('Installing packages...', 'Loading NumPy, NetworkX, and Matplotlib');
        
        await pyodide.loadPackage(['numpy', 'networkx', 'matplotlib']);
        
        pyodideReady = true;
        showSuccess('PhyNetPy environment ready!', 'All packages loaded successfully. Select an example and click "Run Code" to get started.');
        
    } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        pyodideReady = false;
        showError('Python environment failed to load', 
                 'The Python runtime could not be initialized. You can still view and edit code, but cannot run it.');
    } finally {
        // Always load the example, regardless of Pyodide status
        setTimeout(() => {
            cleanTextareaContent();  // Clean first
            loadExample('basic');     // Then load
            updateLineNumbers();      // Then update display
            updateSyntaxHighlighting();
        }, 100);
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
    
    if (example && codeEditor) {
        // CRITICAL: Ensure we're working with plain text
        let plainTextExample = example;
        
        // If somehow HTML got into the example, strip it
        if (typeof example === 'string' && example.includes('<')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = example;
            plainTextExample = tempDiv.textContent || tempDiv.innerText || '';
        }
        
        // Set ONLY plain text in textarea
        codeEditor.value = plainTextExample;
        
        // Update the visual elements
        setTimeout(() => {
            updateLineNumbers();
            updateSyntaxHighlighting();
        }, 10);
    }
}

// Reset code to original example
function resetCode() {
    const exampleSelect = document.getElementById('example-select');
    const currentExample = exampleSelect.value;
    demoExamples[currentExample] = originalExamples[currentExample];
    loadExample(currentExample);
}

// Python syntax highlighting function
function highlightPythonSyntax(code) {
    // Python keywords, builtins, and operators
    const keywords = ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'is', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'return', 'yield', 'break', 'continue', 'pass', 'global', 'nonlocal', 'async', 'await'];
    const constants = ['True', 'False', 'None'];
    const builtins = ['print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'sum', 'max', 'min', 'sorted', 'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'open', 'abs', 'all', 'any', 'bin', 'chr', 'dir', 'divmod', 'hex', 'id', 'input', 'iter', 'next', 'oct', 'ord', 'pow', 'repr', 'round', 'slice', 'super', 'vars'];
    const methods = ['append', 'extend', 'insert', 'remove', 'pop', 'clear', 'index', 'count', 'sort', 'reverse', 'copy', 'keys', 'values', 'items', 'get', 'update', 'split', 'join', 'strip', 'replace', 'upper', 'lower', 'format', 'startswith', 'endswith', 'find', 'rfind', 'isdigit', 'isalpha', 'isalnum', 'add', 'discard', 'union', 'intersection', 'difference'];
    const modules = ['numpy', 'np', 'networkx', 'nx', 'matplotlib', 'plt', 'pandas', 'pd', 'scipy', 'sklearn', 'json', 'os', 'sys', 'math', 'random', 'time', 'datetime', 'collections', 'itertools', 'functools'];

    // Escape HTML entities
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Highlight strings (single and double quotes, including triple quotes and f-strings)
    code = code.replace(/(f"""[\s\S]*?"""|f'''[\s\S]*?'''|f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*'|"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="string">$1</span>');
    
    // Highlight comments
    code = code.replace(/(#.*$)/gm, '<span class="comment">$1</span>');
    
    // Highlight numbers (integers, floats, scientific notation, hex, binary, octal)
    code = code.replace(/\b(0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, '<span class="number">$1</span>');
    
    // Highlight constants (True, False, None)
    const constantPattern = new RegExp('\\b(' + constants.join('|') + ')\\b', 'g');
    code = code.replace(constantPattern, '<span class="constant">$1</span>');
    
    // Highlight keywords
    const keywordPattern = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
    code = code.replace(keywordPattern, '<span class="keyword">$1</span>');
    
    // Highlight built-in functions
    const builtinPattern = new RegExp('\\b(' + builtins.join('|') + ')(?=\\s*\\()', 'g');
    code = code.replace(builtinPattern, '<span class="builtin">$1</span>');
    
    // Highlight module names after import
    const modulePattern = new RegExp('\\b(import|from)\\s+(' + modules.join('|') + ')\\b', 'g');
    code = code.replace(modulePattern, '<span class="import">$1</span> <span class="module">$2</span>');
    
    // Highlight common methods
    const methodPattern = new RegExp('\\.(' + methods.join('|') + ')(?=\\s*\\()', 'g');
    code = code.replace(methodPattern, '.<span class="method">$1</span>');
    
    // Highlight function definitions
    code = code.replace(/\b(def)\s+(\w+)/g, '<span class="keyword">$1</span> <span class="function">$2</span>');
    
    // Highlight class definitions
    code = code.replace(/\b(class)\s+(\w+)/g, '<span class="keyword">$1</span> <span class="class">$2</span>');
    
    // Highlight function parameters
    code = code.replace(/\bdef\s+\w+\s*\(\s*([^)]*)\)/g, function(match, params) {
        const highlightedParams = params.replace(/\b(\w+)(?=\s*[,=)])/g, '<span class="parameter">$1</span>');
        return match.replace(params, highlightedParams);
    });
    
    // Highlight decorators
    code = code.replace(/(@\w+)/g, '<span class="decorator">$1</span>');
    
    // Highlight operators
    code = code.replace(/([+\-*/%=<>!&|^~]|==|!=|<=|>=|\/\/|\*\*|<<|>>|\+=|\-=|\*=|\/=|%=|&=|\|=|\^=|<<=|>>=)/g, '<span class="operator">$1</span>');
    
    // Highlight remaining import statements
    code = code.replace(/\b(import|from|as)\b/g, '<span class="import">$1</span>');
    
    return code;
}

// Update syntax highlighting - FIXED VERSION
function updateSyntaxHighlighting() {
    const codeEditor = document.getElementById('code-editor');
    const syntaxOverlay = document.getElementById('syntax-overlay');
    
    if (!codeEditor || !syntaxOverlay) return;
    
    // Store the current cursor position and value
    const cursorPos = codeEditor.selectionStart;
    const originalValue = codeEditor.value;
    
    // Get the PLAIN TEXT from textarea
    const code = originalValue || '';
    
    // CRITICAL: Check if HTML has contaminated the textarea
    if (code.includes('<span') || code.includes('</span>') || code.includes('class=')) {
        // HTML has gotten into the textarea! Clean it immediately
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = code;
        const cleanText = tempDiv.textContent || tempDiv.innerText || '';
        
        // Restore clean text to textarea
        codeEditor.value = cleanText;
        
        // Restore cursor position
        if (codeEditor.setSelectionRange) {
            const newPos = Math.min(cursorPos, cleanText.length);
            codeEditor.setSelectionRange(newPos, newPos);
        }
        
        // Use the clean text for highlighting
        const highlightedCode = highlightPythonSyntax(cleanText);
        syntaxOverlay.textContent = ""; // clear old
        syntaxOverlay.innerHTML = highlightedCode;
    } else {
        // No contamination, proceed normally
        if (code && code.trim()) {
            const highlightedCode = highlightPythonSyntax(code);
            syntaxOverlay.textContent = ""; // clear old
            syntaxOverlay.innerHTML = highlightedCode;
        } else {
            syntaxOverlay.innerHTML = '';
        }
    }
    
    // Sync scroll position
    syntaxOverlay.scrollTop = codeEditor.scrollTop;
    syntaxOverlay.scrollLeft = codeEditor.scrollLeft;
}

// Update line numbers - FIXED: Don't call updateSyntaxHighlighting from here
function updateLineNumbers() {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    
    if (!lineNumbers || !codeEditor) return;
    
    // Get the actual content and split by newlines
    const content = codeEditor.value || '';
    const lines = content.split('\n');
    const lineCount = lines.length;
    
    // Clear existing line numbers
    lineNumbers.innerHTML = '';
    
    // Detect browser for specific handling
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Create a test element that exactly mimics the textarea
    const testElement = document.createElement('div');
    const computedStyle = window.getComputedStyle(codeEditor);
    
    // Copy all relevant styles to match textarea exactly
    testElement.style.fontFamily = computedStyle.fontFamily;
    testElement.style.fontSize = computedStyle.fontSize;
    testElement.style.fontWeight = computedStyle.fontWeight;
    testElement.style.lineHeight = computedStyle.lineHeight;
    testElement.style.letterSpacing = computedStyle.letterSpacing;
    testElement.style.wordSpacing = computedStyle.wordSpacing;
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    testElement.style.top = '-9999px';
    testElement.style.left = '-9999px';
    testElement.style.whiteSpace = 'pre';
    testElement.style.padding = '0';
    testElement.style.margin = '0';
    testElement.style.border = 'none';
    testElement.style.width = 'auto';
    testElement.style.height = 'auto';
    
    // Add test content with multiple lines to measure line height accurately
    testElement.textContent = 'M\nM';
    document.body.appendChild(testElement);
    
    // Measure the height of two lines to get accurate line height
    const totalHeight = testElement.offsetHeight;
    const singleLineHeight = totalHeight / 2;
    
    document.body.removeChild(testElement);
    
    // Browser-specific adjustments
    let adjustedLineHeight = singleLineHeight;
    if (isSafari) {
        adjustedLineHeight = Math.round(singleLineHeight * 1.001);
    } else if (isFirefox) {
        adjustedLineHeight = Math.ceil(singleLineHeight);
    }
    
    // Create individual div elements for each line number
    for (let i = 1; i <= lineCount; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = i;
        lineDiv.className = 'line-number';
        
        // Apply browser-specific styles
        lineDiv.style.height = adjustedLineHeight + 'px';
        lineDiv.style.lineHeight = adjustedLineHeight + 'px';
        lineDiv.style.fontSize = computedStyle.fontSize;
        lineDiv.style.fontFamily = computedStyle.fontFamily;
        lineDiv.style.fontWeight = computedStyle.fontWeight;
        lineDiv.style.boxSizing = 'border-box';
        lineDiv.style.margin = '0';
        lineDiv.style.padding = '0';
        
        lineNumbers.appendChild(lineDiv);
    }
    
    // Sync scroll position
    lineNumbers.scrollTop = codeEditor.scrollTop;
    
    // DON'T call updateSyntaxHighlighting here - it creates a circular dependency
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
    // Clean any existing HTML contamination first
    cleanTextareaContent();
    
    const codeEditor = document.getElementById('code-editor');
    const exampleSelect = document.getElementById('example-select');
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const resetButton = document.getElementById('reset-button');
    const copyCodeBtn = document.getElementById('copy-code');
    const copyOutputBtn = document.getElementById('copy-output');
    const downloadCodeBtn = document.getElementById('download-code');
    
    // Example selection
    if (exampleSelect) {
        exampleSelect.addEventListener('change', (e) => {
            loadExample(e.target.value);
        });
    }
    
    // Button event listeners
    if (runButton) runButton.addEventListener('click', runPythonCode);
    if (clearButton) clearButton.addEventListener('click', clearOutput);
    if (resetButton) resetButton.addEventListener('click', resetCode);
    if (copyCodeBtn) copyCodeBtn.addEventListener('click', copyCode);
    if (copyOutputBtn) copyOutputBtn.addEventListener('click', copyOutput);
    if (downloadCodeBtn) downloadCodeBtn.addEventListener('click', downloadCode);
    
    // Code editor event listeners - FIXED: Only one input listener
    if (codeEditor) {
        // Prevent any modification of textarea value during input
        let isUpdating = false;
        
        codeEditor.addEventListener('input', () => {
            if (isUpdating) return; // Prevent recursive updates
            
            isUpdating = true;
            
            // Store current state
            const cursorPos = codeEditor.selectionStart;
            const currentValue = codeEditor.value;
            
            // Check for HTML contamination
            if (currentValue.includes('<') && currentValue.includes('>')) {
                // Clean the HTML immediately
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = currentValue;
                const cleanText = tempDiv.textContent || tempDiv.innerText || '';
                
                // Only update if actually contaminated
                if (cleanText !== currentValue) {
                    codeEditor.value = cleanText;
                    // Restore cursor position
                    const newPos = Math.min(cursorPos, cleanText.length);
                    codeEditor.setSelectionRange(newPos, newPos);
                }
            }
            
            // Update display elements
            updateLineNumbers();
            updateSyntaxHighlighting();
            
            isUpdating = false;
        });
        
        // Also add a safety check on focus
        codeEditor.addEventListener('focus', () => {
            const currentValue = codeEditor.value;
            if (currentValue.includes('<span') || currentValue.includes('class=')) {
                // Clean on focus if contaminated
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = currentValue;
                codeEditor.value = tempDiv.textContent || tempDiv.innerText || '';
                updateSyntaxHighlighting();
            }
        });
        
        // Handle paste events to clean HTML
        codeEditor.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            
            // Insert plain text at cursor position
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            const before = codeEditor.value.substring(0, start);
            const after = codeEditor.value.substring(end);
            
            codeEditor.value = before + text + after;
            codeEditor.selectionStart = codeEditor.selectionEnd = start + text.length;
            
            updateLineNumbers();
            updateSyntaxHighlighting();
        });
        
        // Scroll sync
        codeEditor.addEventListener('scroll', () => {
            const lineNumbers = document.getElementById('line-numbers');
            const syntaxOverlay = document.getElementById('syntax-overlay');
            if (lineNumbers) lineNumbers.scrollTop = codeEditor.scrollTop;
            if (syntaxOverlay) {
                syntaxOverlay.scrollTop = codeEditor.scrollTop;
                syntaxOverlay.scrollLeft = codeEditor.scrollLeft;
            }
        });
        
        // Tab handling
        codeEditor.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = codeEditor.selectionStart;
                const end = codeEditor.selectionEnd;
                codeEditor.value = codeEditor.value.substring(0, start) + 
                    '    ' + codeEditor.value.substring(end);
                codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
                updateLineNumbers();
                updateSyntaxHighlighting();
            }
        });
    }
    
    // Try to initialize Pyodide, but don't let it block the editor
    if (typeof loadPyodide !== 'undefined') {
        initializePyodide().catch(error => {
            console.error('Pyodide failed to load:', error);
            // Still make the editor work even if Pyodide fails
            showError('Python environment unavailable', 
                     'The Python runtime failed to load, but you can still view and edit code.');
            // Load the default example anyway
            setTimeout(() => {
                loadExample('basic');
            }, 100);
        });
    } else {
        // No Pyodide available, but still load the editor
        showError('Python environment not available', 
                 'Pyodide library not found. Code editing is still available.');
        setTimeout(() => {
            loadExample('basic');
        }, 100);
    }
});
