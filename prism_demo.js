// Prism Code Editor JavaScript

class PrismEditor {
    constructor(config = {}) {
        this.config = {
            containerId: config.containerId || 'editor-container',
            language: config.language || 'python',
            theme: config.theme || 'dark',
            initialCode: config.initialCode || '',
            onChange: config.onChange || null,
            onRun: config.onRun || null,
            examples: config.examples || this.getDefaultExamples()
        };

        this.elements = {};
        this.initialize();
    }

    getDefaultExamples() {
        return {
            hello: `# Hello World Example
print("Hello, World!")
print("Welcome to Python programming")

# Variables
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")`,

            functions: `# Function Examples
def greet(name="World"):
    """A simple greeting function"""
    return f"Hello, {name}!"

def calculate_factorial(n):
    """Calculate factorial recursively"""
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

# Using the functions
print(greet())
print(greet("Python"))
print(f"5! = {calculate_factorial(5)}")`,

            classes: `# Object-Oriented Programming
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Canine")
        self.breed = breed
    
    def speak(self):
        return f"{self.name} barks!"

# Create instances
my_dog = Dog("Max", "Golden Retriever")
print(my_dog.speak())
print(f"Breed: {my_dog.breed}")`,

            comprehension: `# List Comprehensions and Generators
import random

# Basic list comprehension
squares = [x**2 for x in range(10)]
print(f"Squares: {squares}")

# With condition
evens = [x for x in range(20) if x % 2 == 0]
print(f"Even numbers: {evens}")

# Nested comprehension
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
print("Matrix:")
for row in matrix:
    print(row)

# Generator expression
sum_of_squares = sum(x**2 for x in range(100))
print(f"Sum of squares (0-99): {sum_of_squares}")`
        };
    }

    initialize() {
        const container = document.getElementById(this.config.containerId);
        if (!container) {
            console.error(`Container with id '${this.config.containerId}' not found`);
            return;
        }

        // Create the HTML structure
        container.innerHTML = this.createHTML();

        // Get element references
        this.elements = {
            codeInput: document.getElementById('codeInput'),
            codeDisplay: document.getElementById('codeDisplay'),
            lineNumbers: document.getElementById('lineNumbers'),
            editorBody: document.getElementById('editorBody'),
            output: document.getElementById('output'),
            exampleSelect: document.getElementById('exampleSelect')
        };

        // Set up event listeners
        this.attachEventListeners();

        // Load initial code
        if (this.config.initialCode) {
            this.setCode(this.config.initialCode);
        } else {
            this.loadExample('hello');
        }
    }

    createHTML() {
        const exampleOptions = Object.keys(this.config.examples)
            .map(key => `<option value="${key}">${this.formatExampleName(key)}</option>`)
            .join('');

        return `
            <div class="editor-header">
                <span class="editor-title">Python Code Editor</span>
                <div class="editor-controls">
                    <select class="example-select" id="exampleSelect">
                        ${exampleOptions}
                    </select>
                    <button id="formatBtn">Format</button>
                    <button id="runBtn">Run ▶</button>
                    <button id="clearBtn">Clear</button>
                </div>
            </div>
            <div class="editor-wrapper">
                <div class="line-numbers" id="lineNumbers"></div>
                <div class="editor-body" id="editorBody">
                    <textarea class="editor-textarea" id="codeInput" spellcheck="false"></textarea>
                    <pre class="editor-pre"><code class="language-${this.config.language}" id="codeDisplay"></code></pre>
                </div>
            </div>
            <div class="output-panel" id="output">Ready to run ${this.config.language} code...</div>
        `;
    }

    formatExampleName(key) {
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    }

    attachEventListeners() {
        // Text input events
        this.elements.codeInput.addEventListener('input', () => this.updateDisplay());
        this.elements.codeInput.addEventListener('scroll', () => this.syncScroll());
        this.elements.codeInput.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Button events
        document.getElementById('formatBtn')?.addEventListener('click', () => this.formatCode());
        document.getElementById('runBtn')?.addEventListener('click', () => this.runCode());
        document.getElementById('clearBtn')?.addEventListener('click', () => this.clearAll());

        // Example selector
        this.elements.exampleSelect?.addEventListener('change', (e) => {
            this.loadExample(e.target.value);
        });
    }

    updateDisplay() {
        // Update syntax highlighting
        this.elements.codeDisplay.textContent = this.elements.codeInput.value || ' ';
        
        // Re-highlight with Prism
        if (window.Prism) {
            Prism.highlightElement(this.elements.codeDisplay);
        }

        // Update line numbers
        this.updateLineNumbers();

        // Trigger onChange callback if provided
        if (this.config.onChange) {
            this.config.onChange(this.elements.codeInput.value);
        }
    }

    updateLineNumbers() {
        const lines = (this.elements.codeInput.value || ' ').split('\n');
        const html = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
        this.elements.lineNumbers.innerHTML = html;
    }

    syncScroll() {
        // Sync line numbers scroll with editor
        this.elements.lineNumbers.scrollTop = this.elements.codeInput.scrollTop;
        
        // Sync highlighted code with textarea
        this.elements.codeDisplay.parentElement.scrollTop = this.elements.codeInput.scrollTop;
        this.elements.codeDisplay.parentElement.scrollLeft = this.elements.codeInput.scrollLeft;
    }

    handleKeydown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            this.insertTab();
        } else if (e.ctrlKey || e.metaKey) {
            // Shortcuts
            if (e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            } else if (e.key === 's') {
                e.preventDefault();
                this.formatCode();
            }
        }
    }

    insertTab() {
        const start = this.elements.codeInput.selectionStart;
        const end = this.elements.codeInput.selectionEnd;
        const spaces = '    ';
        
        this.elements.codeInput.value = 
            this.elements.codeInput.value.substring(0, start) + 
            spaces + 
            this.elements.codeInput.value.substring(end);
        
        this.elements.codeInput.selectionStart = 
        this.elements.codeInput.selectionEnd = start + spaces.length;
        
        this.updateDisplay();
    }

    loadExample(name) {
        const code = this.config.examples[name];
        if (code) {
            this.setCode(code);
        }
    }

    setCode(code) {
        this.elements.codeInput.value = code;
        this.updateDisplay();
    }

    getCode() {
        return this.elements.codeInput.value;
    }

    formatCode() {
        // Simple Python formatting
        const lines = this.elements.codeInput.value.split('\n');
        let indentLevel = 0;
        const formatted = [];
        
        for (let line of lines) {
            const trimmed = line.trim();
            
            // Decrease indent for these keywords
            if (trimmed.startsWith('elif') || trimmed.startsWith('else') || 
                trimmed.startsWith('except') || trimmed.startsWith('finally')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            // Add the formatted line
            if (trimmed) {
                formatted.push('    '.repeat(indentLevel) + trimmed);
            } else {
                formatted.push('');
            }
            
            // Increase indent if line ends with :
            if (trimmed.endsWith(':')) {
                indentLevel++;
            }
            
            // Decrease indent after return/break/continue/pass
            if (trimmed === 'return' || trimmed.startsWith('return ') ||
                trimmed === 'break' || trimmed === 'continue' || trimmed === 'pass') {
                indentLevel = Math.max(0, indentLevel - 1);
            }
        }
        
        this.setCode(formatted.join('\n'));
    }

    runCode() {
        const output = this.elements.output;
        
        // Check if custom run handler is provided
        if (this.config.onRun) {
            this.config.onRun(this.getCode(), output);
        } else {
            // Default simulation
            output.className = 'output-panel';
            output.textContent = '>>> Running Python code...\n\n';
            
            setTimeout(() => {
                output.textContent += 'Note: This is a demo. To actually run Python code,\n';
                output.textContent += 'integrate with Pyodide or a backend Python service.\n\n';
                
                if (this.elements.codeInput.value.includes('print(')) {
                    output.textContent += '✓ Your code contains print statements that would display output here.';
                    output.className = 'output-panel success';
                } else {
                    output.textContent += '⚠ Add print() statements to see output.';
                }
            }, 500);
        }
    }

    clearAll() {
        this.setCode('');
        this.elements.output.textContent = `Ready to run ${this.config.language} code...`;
        this.elements.output.className = 'output-panel';
    }

    setOutput(content, type = 'normal') {
        this.elements.output.textContent = content;
        this.elements.output.className = `output-panel ${type}`;
    }

    appendOutput(content) {
        this.elements.output.textContent += content;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrismEditor;
}