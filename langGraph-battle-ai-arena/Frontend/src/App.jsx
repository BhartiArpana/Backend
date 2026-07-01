import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const MOCK_DATA = {
    problem: "write a code for find factorial in js ",
    solution_1: `# JavaScript Factorial Function\n\nHere are several ways to calculate the factorial of a number in JavaScript:\n\n## 1. Using Iteration (for loop)\n\`\`\`javascript\nfunction factorialIterative(n) {\n    if (n < 0) return NaN; // Factorial of negative numbers is undefined\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\nconsole.log(factorialIterative(5)); // Output: 120\n\`\`\`\n\n## 2. Using Recursion\n\`\`\`javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return NaN;\n    if (n === 0 || n === 1) return 1;\n    return n * factorialRecursive(n - 1);\n}\n\nconsole.log(factorialRecursive(5)); // Output: 120\n\`\`\`\n\n## 3. Using Reduce (Functional Approach)\n\`\`\`javascript\nfunction factorialReduce(n) {\n    if (n < 0) return NaN;\n    return Array.from({length: n}, (_, i) => i + 1)\n                .reduce((acc, val) => acc * val, 1);\n}\n\nconsole.log(factorialReduce(5)); // Output: 120\n\`\`\`\n\n## 4. Using Memoization (Caching for better performance with repeated calls)\n\`\`\`javascript\nconst factorialMemo = (() => {\n    const cache = {0: 1, 1: 1};\n\n    return function(n) {\n        if (n < 0) return NaN;\n        if (cache[n] !== undefined) return cache[n];\n\n        let result = 1;\n        for (let i = 2; i <= n; i++) {\n            if (cache[i] === undefined) {\n                result *= i;\n                cache[i] = result;\n            } else {\n                result = cache[i];\n            }\n        }\n        return result;\n    };\n})();\n\nconsole.log(factorialMemo(5)); // Output: 120\nconsole.log(factorialMemo(7)); // Output: 5040 (uses cached values)\n\`\`\`\n\n## Notes:\n- Factorial of 0 is 1 (0! = 1)\n- Factorial of negative numbers is undefined (returns NaN in these examples)\n- For very large numbers, you might want to use BigInt to avoid integer overflow\n- The iterative approach is generally more efficient than recursion for large numbers in JavaScript\n\nWould you like me to explain any of these approaches in more detail?`,
    solution_2: `Certainly! Below is a simple JavaScript function to calculate the factorial of a given number using both iterative and recursive approaches.\n\n### Iterative Approach:\n\`\`\`javascript\nfunction factorialIterative(n) {\n    if (n < 0) return "Factorial is not defined for negative numbers.";\n    if (n === 0 || n === 1) return 1;\n\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n\`\`\`\n\n### Recursive Approach:\n\`\`\`javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return "Factorial is not defined for negative numbers.";\n    if (n === 0 || n === 1) return 1;\n\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n\`\`\`\n\n### Explanation:\n- **Iterative Approach**: This method uses a loop to multiply numbers from 2 up to \`n\`. It's generally more efficient in terms of memory usage since it doesn't involve the overhead of recursive function calls.\n  \n- **Recursive Approach**: This method calls itself with a decremented value of \`n\` until it reaches the base case (\`n === 0\` or \`n === 1\`). It's more elegant and easier to understand but can lead to a stack overflow for large values of \`n\`.\n\nBoth functions include a check for negative numbers, as the factorial is not defined for negative values.\n\nFeel free to use either approach based on your needs!`,
    judge: {
        solution_1_score: 10,
        solution_2_score: 8,
        solution_1_reasoning: "Solution 1 is exceptionally comprehensive. It provides four distinct approaches (Iterative, Recursive, Functional/Reduce, and Memoization), which covers the spectrum from beginner to advanced JavaScript. It also correctly returns NaN for negative inputs, which is more standard for mathematical functions than returning a string message. Additionally, it provides a crucial note about using BigInt for large numbers, which is necessary for factorials exceeding 170 in JavaScript.",
        solution_2_reasoning: "Solution 2 provides the two most common methods (Iterative and Recursive) with clear explanations. However, it returns a string message when the input is negative; this is generally considered a poor practice in utility functions because it changes the return type from a Number to a String, which can cause runtime errors in calling code. It also lacks the functional and memoized approaches provided in Solution 1."
    }
};

const FormattedText = ({ text }) => {
    if (!text) return null;
    // Basic text formatting to handle markdown-like syntax for code blocks
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent = [];
    const elements = [];
    
    let key = 0;
    
    lines.forEach((line) => {
        if (line.startsWith('\`\`\`')) {
            if (inCodeBlock) {
                // End of code block
                elements.push(
                    <div className="code-block" key={key++}>
                        <div className="code-header">
                            <span className="code-lang">JavaScript</span>
                            <button className="code-btn">
                                <span className="icon">▶</span> Run
                            </button>
                            <button className="code-btn">
                                <span className="icon">📋</span> Copy
                            </button>
                        </div>
                        <pre><code>{codeContent.join('\n')}</code></pre>
                    </div>
                );
                codeContent = [];
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
            }
            return;
        }
        
        if (inCodeBlock) {
            codeContent.push(line);
        } else {
            if (line.startsWith('##') || line.startsWith('###')) {
                elements.push(<h3 className="section-title" key={key++}>{line.replace(/#/g, '').trim()}</h3>);
            } else if (line.startsWith('- ')) {
                elements.push(<li key={key++}>{line.substring(2)}</li>);
            } else if (line.trim() === '') {
                elements.push(<div className="spacer" key={key++}></div>);
            } else {
                // simple bold parsing
                const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={idx} style={{color: 'var(--text-primary)'}}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                });
                elements.push(<p className="text-line" key={key++}>{formattedLine}</p>);
            }
        }
    });

    return <div className="formatted-text">{elements}</div>;
};

function App() {
    const [message, setMessage] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;
        
        const currentMessage = message;
        setUserPrompt(currentMessage);
        setHasSubmitted(true);
        setIsLoading(true);
        setMessage('');
        setData(null);

        try {
            const response = await axios.post('http://localhost:3000/invoke', {message: currentMessage});
            console.log(response.data.result);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const model1Score = data?.result?.judge.solution_1_score;
    const model2Score = data?.result?.judge.solution_2_score;
    let winnerName = "Tie";
    if (model1Score > model2Score) winnerName = "Model A";
    if (model2Score > model1Score) winnerName = "Model B";

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">🤖 AI Arena</div>
                <div className="nav-links">
                    <span>Rankings</span>
                    <span className="active">Battle</span>
                    <span>About</span>
                </div>
            </header>

            <div className="layout-body">
                {/* Left sidechat section */}
                <aside className="sidechat">
                    <div className="chat-history">
                        {hasSubmitted ? (
                            <>
                                <div className="chat-bubble user">
                                    <div className="bubble-avatar">U</div>
                                    <div className="bubble-text">
                                        {userPrompt}
                                    </div>
                                </div>
                                {isLoading ? (
                                    <div className="chat-bubble ai">
                                        <div className="bubble-avatar ai-avatar">🤖</div>
                                        <div className="bubble-text">
                                            <div className="typing-indicator">
                                                <div className="typing-dot"></div>
                                                <div className="typing-dot"></div>
                                                <div className="typing-dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : data && data.result ? (
                                    <div className="chat-bubble ai">
                                        <div className="bubble-avatar ai-avatar">🤖</div>
                                        <div className="bubble-text">
                                            I've generated two solutions for you! Check the right panel for the responses and the winner.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="chat-bubble ai">
                                        <div className="bubble-avatar ai-avatar">🤖</div>
                                        <div className="bubble-text" style={{ color: 'var(--error-color)' }}>
                                            There was an error generating the solutions. Please try again.
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center', opacity: 0.7 }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                                <h3>Welcome to AI Arena</h3>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Type a prompt below to see different models battle it out!</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="chat-input-wrapper">
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={isLoading ? "Please wait..." : "Send a new prompt..."}
                            className="chat-input"
                            disabled={isLoading}
                        />
                        <button 
                            className="send-btn" 
                            onClick={handleSend}
                            disabled={isLoading}
                            style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        >↑</button>
                    </div>
                </aside>

                {/* Right side response and judge layout */}
                <main className="main-content">
                    {hasSubmitted ? (
                        isLoading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                                <h2>AI is processing...</h2>
                                <p>Generating and evaluating combatants...</p>
                            </div>
                        ) : data && data.result ? (
                            <>
                                <div className="solutions-container">
                                    <div className="solution-panel panel-left">
                                        <div className="panel-header">
                                            <div className="header-info">
                                                <div className="model-name">Model A</div>
                                                <span className="tag">Solution 1</span>
                                            </div>
                                            {winnerName === "Model A" && <span className="winner-tag">🏆 Winner</span>}
                                        </div>
                                        <div className="panel-body">
                                            <FormattedText text={data?.result?.solution_1} />
                                        </div>
                                    </div>

                                    <div className="solution-panel panel-right">
                                        <div className="panel-header" style={{borderBottomColor: 'rgba(255, 99, 132, 0.2)'}}>
                                            <div className="header-info">
                                                <div className="model-name" style={{color: '#ff716c'}}>Model B</div>
                                                <span className="tag" style={{background: 'rgba(255, 113, 108, 0.1)', color: '#ff716c', border: '1px solid rgba(255, 113, 108, 0.2)'}}>Solution 2</span>
                                            </div>
                                            {winnerName === "Model B" && <span className="winner-tag">🏆 Winner</span>}
                                        </div>
                                        <div className="panel-body">
                                            <FormattedText text={data?.result?.solution_2} />
                                        </div>
                                    </div>
                                </div>

                                {/* Winner and Reasoning section */}
                                <div className="judge-section">
                                    <div className="winner-banner">
                                        <div className="trophy-icon">🏆</div>
                                        <div className="winner-text">
                                            <div className="winner-label">Winner</div>
                                            <h2>{winnerName}</h2>
                                        </div>
                                    </div>
                                    
                                    <div className="judge-reasoning">
                                        <div className="reasoning-card primary-border">
                                            <h3>Why Model A? <span className="score-badge">{model1Score}/10</span></h3>
                                            <p>{data?.result?.judge.solution_1_reasoning}</p>
                                        </div>
                                        <div className="reasoning-card secondary-border">
                                            <h3>Why Model B? <span className="score-badge error">{model2Score}/10</span></h3>
                                            <p>{data?.result?.judge.solution_2_reasoning}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--error-color)' }}>
                                <h2>Failed to load response</h2>
                            </div>
                        )
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.5 }}>⚔️</div>
                            <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Awaiting Combatants</h2>
                            <p style={{ maxWidth: '400px', lineHeight: '1.6' }}>Enter a problem prompt on the left chat pane to summon the AI models and see their solutions compared side-by-side.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
