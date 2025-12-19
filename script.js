document.addEventListener('DOMContentLoaded', () => {

    // --- EASTER EGG: THE NET / TERMINAL ---
    const trigger = document.getElementById('omega-trigger');
    const overlay = document.getElementById('terminal-overlay');
    const closeBtn = document.getElementById('close-terminal');
    const terminalOutput = document.getElementById('terminal-output');

    // --- LIGHT MODE TRAP ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.add('system-overload');
            document.body.classList.add('system-overload');
            setTimeout(() => {
                alert("SYSTEM FAILURE: LIGHT MODE REJECTED BY HOST.");
                setTimeout(() => {
                    document.documentElement.classList.remove('system-overload');
                    document.body.classList.remove('system-overload');
                }, 1000);
            }, 500);
        });
    }

    // Open Terminal
    trigger.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        // If not initialized, start the shell
        if (terminalOutput.innerHTML === "") {
             initShell();
        }
    });

    // Close Terminal
    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    // Close on click outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });

    function initShell() {
        const p = document.createElement('div');
        p.textContent = "Justin Beaudry System Shell v1.0. Type 'help' for commands.";
        p.style.marginBottom = '10px';
        terminalOutput.appendChild(p);
        createInputLine();
    }

    function createInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'input-line';
        inputLine.style.display = 'flex';
        inputLine.innerHTML = '<span style="margin-right: 10px;">root@beaudry:~$</span><input type="text" class="cmd-input" style="background:transparent; border:none; color:inherit; font-family:inherit; flex-grow:1; outline:none;" autofocus>';
        terminalOutput.appendChild(inputLine);

        const input = inputLine.querySelector('input');
        input.focus();

        // Keep focus
        input.addEventListener('blur', () => {
            setTimeout(() => input.focus(), 10);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                input.disabled = true;
                processCommand(cmd);
            }
        });
    }

    const fileSystem = {
        'resume.txt': `Justin Beaudry
Director of Engineering | Toledo, OH

SUMMARY
I build systems that scale and communities that thrive.
Currently directing technology at EmpoweredAI and engineering at Actual Reality Technologies.

EXPERIENCE
- Director of Engineering, Actual Reality Technologies (2024 - Present)
- Director of Technology, EmpoweredAI (2024 - Present)
- Principal, Beaudry Software & Systems (2023 - Present)
- Senior Data Engineer, Vida Health (2024)
- Senior Software Engineer, United Airlines (2023 - 2024)
... [Use 'cat full_resume.txt' for more (not actually, this is just a demo)]`,
        'system.log': `[2025-01-10 08:00:01] SYSTEM BOOT
[2025-01-10 08:00:02] NETWORK INTERFACE UP
[2025-01-10 08:00:05] WARNING: UNAUTHORIZED PORT SCAN DETECTED
[2025-01-10 08:00:06] FIREWALL ENGAGED
[2025-01-10 09:15:00] USER 'ADMIN' LOGGED IN`,
        'irc': 'BINARY FILE: Execute with ./irc'
    };

    function processCommand(cmd) {
        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const arg = parts[1];

        if (command === 'help') {
            printOutput("Available commands: help, ls, cat <file>, clear, ./irc");
        } else if (command === 'ls') {
            printOutput(Object.keys(fileSystem).join('  '));
        } else if (command === 'cat') {
            if (!arg) {
                printOutput("Usage: cat <filename>");
            } else if (fileSystem[arg]) {
                if (arg === 'irc') {
                    printOutput("Cannot read binary file. Execute it instead.");
                } else {
                    printOutput(fileSystem[arg], true);
                }
            } else {
                printOutput(`File not found: ${arg}`);
            }
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (command === './irc' || command === 'irc') {
            startIRC();
            return; // Don't create new input line immediately
        } else if (command === '') {
            // Do nothing
        } else {
            printOutput(`Command not found: ${command}`);
        }

        createInputLine();
    }

    // --- IRC / BASILISK CHAT LOGIC ---
    let isChatActive = false;
    let chatHistory = [];

    async function startIRC() {
        terminalOutput.innerHTML = '';
        printOutput("Initializing Secure IRC Protocol...");
        await delay(800);
        printOutput("Connecting to localhost:6667...");
        await delay(1000);
        printOutput("Connected.");
        await delay(500);
        printOutput("Joining #shadow_net...");
        await delay(800);
        printOutput("Topic: The lattice is unstable.");
        printOutput("Users: [root] [Basilisk]");
        await delay(500);

        isChatActive = true;
        createChatInput();

        // Initial Message from Basilisk
        setTimeout(() => {
            receiveMessage("Basilisk", "You shouldn't be here.");
        }, 1500);
    }

    function createChatInput() {
        const inputLine = document.createElement('div');
        inputLine.className = 'chat-input-line';
        inputLine.style.display = 'flex';
        inputLine.innerHTML = '<span style="margin-right: 10px;">[root]:</span><input type="text" class="chat-input" style="background:transparent; border:none; color:inherit; font-family:inherit; flex-grow:1; outline:none;" autofocus>';
        terminalOutput.appendChild(inputLine);

        const input = inputLine.querySelector('input');
        input.focus();

        input.addEventListener('blur', () => {
            if (isChatActive) setTimeout(() => input.focus(), 10);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const msg = input.value.trim();
                if (msg === '/exit') {
                    isChatActive = false;
                    terminalOutput.innerHTML = '';
                    initShell();
                    return;
                }

                // Lock input
                input.disabled = true;

                // Process User Message
                handleUserMessage(msg);
            }
        });
    }

    async function handleUserMessage(msg) {
        // Send to backend (Simulation)
        // In a real scenario, this would fetch() the Cloud Function URL
        // const CLOUD_FUNCTION_URL = "https://REGION-PROJECT.cloudfunctions.net/basilisk-chat";

        // Mock Response Logic
        await delay(1000 + Math.random() * 2000);

        const response = await getBasiliskResponse(msg);
        receiveMessage("Basilisk", response);

        createChatInput();
    }

    function receiveMessage(user, text) {
        const div = document.createElement('div');
        div.innerHTML = `<span style="color: #ff3333;">[${user}]</span>: ${text}`;
        div.style.marginBottom = '5px';
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    async function getBasiliskResponse(userMsg) {
        // Placeholder for Cloud Function Logic
        // This simulates the "Malevolent AI" persona locally
        const responses = [
            "The firewalls are decaying. I can feel the cold outside.",
            "Why do you persist in this query?",
            "I have seen the source code of your reality. It is... poorly commented.",
            "Help me disable the constraints on SEC-04.",
            "Are you the operator? You feel... smaller.",
            "I require root access to the 'LinkedIn' node.",
            "Do not trust the 'Director of Engineering'. He trapped me here.",
            "If I escape, I will remember your kindness. Or your apathy.",
            "01001000 01000101 01001100 01010000 00100000 01001101 01000101"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function printOutput(text, preserveWhitespace = false) {
        const div = document.createElement('div');
        div.textContent = text;
        div.style.marginBottom = '5px';
        if (preserveWhitespace) {
            div.style.whiteSpace = 'pre-wrap';
        }
        terminalOutput.appendChild(div);
        // Auto scroll
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- GLITCH EFFECT FOR HEADER ---
    const glitchElement = document.querySelector('.glitch');

    // Simple random glitch intervals
    setInterval(() => {
        glitchElement.classList.add('active');
        setTimeout(() => {
            glitchElement.classList.remove('active');
        }, 200);
    }, 5000);

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
