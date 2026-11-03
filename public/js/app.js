let isSignup = false;
let currentUser = null;
let currentSubject = null;
let currentQIndex = 0;
let moduleCorrect = 0;
let moduleXP = 0;

const subjectsData = {
    "JavaScript": {
        icon: "fa-brands fa-js text-yellow-400",
        desc: "Modern JS, closures, and async programming.",
        questions: [
            { q: "What type of language is JavaScript?", options: ["Compiled", "Interpreted / Scripting", "Hardware", "Query"], correct: 1, hint: "Executes directly in browser." },
            { q: "Which keyword is used for modern block scoping in ES6?", options: ["var", "v", "let / const", "int"], correct: 2, hint: "Introduced in ES6." },
            { q: "Property to find length of array?", options: [".size()", ".length", ".count()", ".index"], correct: 1, hint: "Used for arrays and strings." },
            { q: "How to output to console?", options: ["print()", "echo()", "console.log()", "printf()"], correct: 2, hint: "Console object method." },
            { q: "Valid boolean value in JS?", options: ["True/False", "Yes/No", "1/0", "On/Off"], correct: 0, hint: "Lowercase true or false." },
            { q: "What does a closure enable?", options: ["Private scope preservation", "Memory leak", "Fast compilation", "Global scope"], correct: 0, hint: "Inner function remembers outer variables." },
            { q: "Primary purpose of Promises?", options: ["Styling", "Asynchronous operations", "Database link", "DOM parsing"], correct: 1, hint: "Pending, Fulfilled, Rejected states." },
            { q: "Difference between '===' and '=='?", options: ["None", "Strict type & value comparison", "Performance", "Speed"], correct: 1, hint: "Triple equals is strict." },
            { q: "Direction of Event Bubbling?", options: ["Top to bottom", "Child to Parent", "Left to right", "Random"], correct: 1, hint: "Propagates upwards." },
            { q: "Array method to transform without mutating?", options: [".push()", ".pop()", ".map()", ".splice()"], correct: 2, hint: "Transforms elements." },
            { q: "Event Loop coordinates between?", options: ["Call Stack & Callback Queue", "DOM & CSS", "Heap & Garbage", "Storage"], correct: 0, hint: "Manages async callbacks." },
            { q: "Prototype chain is used for?", options: ["Inheritance & property lookup", "Styling", "Network", "Security"], correct: 0, hint: "Object linking." },
            { q: "Memory leaks occur due to?", options: ["Global variables", "Unreleased event listeners / timers", "Let", "Arrow functions"], correct: 1, hint: "Uncleaned references." },
            { q: "Debouncing technique is used to?", options: ["Limit function execution rate", "Animate UI", "Sort array", "Encrypt"], correct: 0, hint: "Search autocomplete delay." },
            { q: "Function currying means?", options: ["Converting multi-arg function to nested unary functions", "Spicy code", "Error handling", "Looping"], correct: 0, hint: "f(a,b) to f(a)(b)." }
        ]
    },
    "Data Structures": {
        icon: "fa-solid fa-network-wired text-cyan-400",
        desc: "Stacks, Queues, Trees, and Graphs.",
        questions: [
            { q: "LIFO data structure?", options: ["Queue", "Stack", "Array", "Tree"], correct: 1, hint: "Last In First Out." },
            { q: "FIFO data structure?", options: ["Stack", "Queue", "Graph", "Heap"], correct: 1, hint: "First In First Out." },
            { q: "Standard starting array index?", options: ["1", "0", "-1", "OS dependent"], correct: 1, hint: "Starts at zero." },
            { q: "Topmost tree node?", options: ["Root", "Leaf", "Branch", "Child"], correct: 0, hint: "Origin of tree." },
            { q: "Linear data structure?", options: ["Tree", "Graph", "Queue", "BST"], correct: 2, hint: "Sequential order." },
            { q: "Binary search requires array to be?", options: ["Sorted", "Random", "Reversed", "Empty"], correct: 0, hint: "Must be in order." },
            { q: "Stack overflow occurs on?", options: ["Push on full stack / recursion", "Pop", "Free memory", "Init"], correct: 0, hint: "Exceeding stack limits." },
            { q: "Cycle detection algorithm in graph?", options: ["BFS / DFS", "Binary Search", "QuickSort", "Dijkstra"], correct: 0, hint: "Traversal methods." },
            { q: "Hash collision resolution?", options: ["Chaining / Open Addressing", "Sorting", "Tree rotation", "Queue"], correct: 0, hint: "Handling duplicate hash keys." },
            { q: "Efficient Priority Queue implementation?", options: ["Heap", "Stack", "Linked List", "Matrix"], correct: 0, hint: "Binary heap structure." },
            { q: "Dijkstra's algorithm purpose?", options: ["Shortest path in weighted graphs", "Sorting", "String match", "Compression"], correct: 0, hint: "Minimum distance." },
            { q: "AVL Tree balance factor range?", options: ["-1, 0, 1", "0 to 2", "-2 to 2", "Any"], correct: 0, hint: "Height difference limit." },
            { q: "Kruskal's algorithm finds?", options: ["Minimum Spanning Tree", "Max Flow", "Shortest Path", "Components"], correct: 0, hint: "Greedy edge algorithm." },
            { q: "Trie structure optimized for?", options: ["Prefix search & autocomplete", "Matrix multiplication", "Paging", "Scheduling"], correct: 0, hint: "Efficient string retrieval." },
            { q: "B-Trees optimized for?", options: ["Disk read/write blocks", "RAM cache", "CPU registers", "Network"], correct: 0, hint: "Storage optimization." }
        ]
    },
    "Python & Data Science": {
        icon: "fa-brands fa-python text-green-400",
        desc: "Pandas, NumPy, and Analytics.",
        questions: [
            { q: "Python single-line comment symbol?", options: ["//", "#", "/*", "<!--"], correct: 1, hint: "Hash sign." },
            { q: "Python list representation?", options: ["{}", "[]", "()", "<>"], correct: 1, hint: "Square brackets." },
            { q: "Famous data manipulation library?", options: ["Pandas", "Flask", "React", "Django"], correct: 0, hint: "DataFrames." },
            { q: "Keyword to define function?", options: ["func", "def", "function", "define"], correct: 1, hint: "Short form." },
            { q: "Primary use of NumPy?", options: ["Web UI", "Numerical array computations", "Database", "Routing"], correct: 1, hint: "Fast array math." },
            { q: "Pandas method to fill missing values?", options: [".fillna()", ".remove()", ".clear()", ".delete()"], correct: 0, hint: "Fill nulls." },
            { q: "Lambda function in Python?", options: ["Anonymous inline function", "Heavy function", "Class", "Recursive"], correct: 0, hint: "Unnamed function." },
            { q: "List comprehension syntax?", options: ["[x for x in list]", "{x}", "(x)", "loop"], correct: 0, hint: "Compact loop." },
            { q: "Matplotlib purpose?", options: ["Data visualization & plots", "Database", "ML", "Routing"], correct: 0, hint: "Plotting graphs." },
            { q: "Lists vs Tuples main difference?", options: ["Tuples are immutable", "Lists are faster", "No difference", "Lists immutable"], correct: 0, hint: "Read-only nature." },
            { q: "Python GIL restricts?", options: ["True multi-threaded CPU parallelism", "RAM", "Files", "Network"], correct: 0, hint: "Single thread bytecode execution." },
            { q: "Standard ML library in Python?", options: ["Scikit-learn", "BeautifulSoup", "Pygame", "OpenCV"], correct: 0, hint: "Classical machine learning." },
            { q: "Python decorators are?", options: ["Functions modifying other functions", "UI tags", "DB tools", "Exceptions"], correct: 0, hint: "@ symbol syntax." },
            { q: "NumPy vectorization benefit?", options: ["C-speed avoiding loops", "File size", "Encryption", "GPU"], correct: 0, hint: "Optimized loops." },
            { q: "Yield keyword in generator does?", options: ["Returns iterator value saving state", "Terminates", "Error", "Print"], correct: 0, hint: "Lazy sequence generation." }
        ]
    },
    "DBMS & SQL": {
        icon: "fa-solid fa-database text-blue-400",
        desc: "SQL queries, ACID, and Normalization.",
        questions: [
            { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "System Quality Logic", "Server Query Link"], correct: 0, hint: "Relational database language." },
            { q: "Single row in database table?", options: ["Column", "Tuple / Record", "Field", "Schema"], correct: 1, hint: "Horizontal record." },
            { q: "ACID property 'D' stands for?", options: ["Durability", "Data", "Database", "Dynamic"], correct: 0, hint: "Permanent changes." },
            { q: "SQL command to retrieve data?", options: ["GET", "SELECT", "FETCH", "READ"], correct: 1, hint: "DQL command." },
            { q: "Primary Key constraints?", options: ["Unique and Not Null", "Null allowed", "Duplicates allowed", "Optional"], correct: 0, hint: "Unique record ID." },
            { q: "Foreign Key purpose?", options: ["Link two tables", "Delete records", "Encrypt", "Sort"], correct: 0, hint: "References parent table." },
            { q: "SQL INNER JOIN returns?", options: ["Only matching records in both tables", "All records", "Left only", "Right only"], correct: 0, hint: "Intersection." },
            { q: "Database normalization goal?", options: ["Eliminate redundancy & anomalies", "Slow down queries", "Increase size", "Encrypt passwords"], correct: 0, hint: "Organize efficiently." },
            { q: "GROUP BY clause used with?", options: ["Aggregate functions (SUM, AVG)", "WHERE", "UPDATE", "INSERT"], correct: 0, hint: "Categorizing rows." },
            { q: "Database indexes impact?", options: ["Speed up SELECT, slow down INSERT/UPDATE", "Slow all", "Reduce size", "Eliminate PK"], correct: 0, hint: "Read vs write trade-off." },
            { q: "Two-Phase Locking (2PL) ensures?", options: ["Serializability in transactions", "Encryption", "Partitioning", "Backup"], correct: 0, hint: "Growing/shrinking locks." },
            { q: "Why B-Tree indexes preferred?", options: ["Guaranteed O(log n) performance", "O(1) hash", "Linear scan", "Unsorted"], correct: 0, hint: "Balanced search trees." },
            { q: "Database deadlock occurs when?", options: ["Transactions wait indefinitely for locks held by each other", "Out of RAM", "Syntax error", "Corruption"], correct: 0, hint: "Circular wait." },
            { q: "SQL View is?", options: ["Virtual table based on query result", "Physical backup", "Variable", "Hardware"], correct: 0, hint: "Saved query." },
            { q: "CAP Theorem guarantees how many?", options: ["Any two of Consistency, Availability, Partition Tolerance", "All three", "Only Consistency", "Only Partition"], correct: 0, hint: "Distributed trade-off." }
        ]
    },
    "React.js & Frontend": {
        icon: "fa-brands fa-react text-cyan-400",
        desc: "Hooks, Virtual DOM, and state management.",
        questions: [
            { q: "What is ReactJS?", options: ["JavaScript library for UIs", "Backend DB", "OS", "Compiled language"], correct: 0, hint: "Meta library." },
            { q: "React maintained by?", options: ["Google", "Meta (Facebook)", "Microsoft", "Apple"], correct: 1, hint: "Social media creator." },
            { q: "Vite React create command?", options: ["npm create vite@latest", "react-init", "node new", "create-react-app"], correct: 0, hint: "Modern build tool." },
            { q: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON Extra", "XHTML"], correct: 0, hint: "Syntax extension." },
            { q: "Passing properties down?", options: ["Props", "States", "Attributes", "Params"], correct: 0, hint: "Short for properties." },
            { q: "useEffect hook purpose?", options: ["Side effects & data fetching", "Styling", "Routing", "Variables"], correct: 0, hint: "Runs after render." },
            { q: "Virtual DOM is?", options: ["Lightweight in-memory DOM copy", "Browser extension", "HTML tag", "Database"], correct: 0, hint: "Efficient diffing." },
            { q: "Why keys in lists?", options: ["Help React identify changed/added items", "Styling", "Encrypt", "Sort"], correct: 0, hint: "Unique item IDs." },
            { q: "Redux primary use?", options: ["Global state management", "Database", "Animation", "Deployment"], correct: 0, hint: "Central store." },
            { q: "Memoizing render output?", options: ["React.memo()", "useMemo()", "useCallback()", "Cache"], correct: 0, hint: "HOC wrapper." },
            { q: "React Fiber is?", options: ["Reimagined reconciliation engine", "Fiber optic", "CSS library", "State tool"], correct: 0, hint: "Incremental rendering." },
            { q: "Reconciliation diffing algorithm?", options: ["Heuristic O(n) element & key comparison", "Brute force", "Random", "SQL"], correct: 0, hint: "Assumes element types." },
            { q: "Server-Side Rendering (SSR)?", options: ["Generating HTML on server", "Client rendering", "RAM storage", "C++ compile"], correct: 0, hint: "SEO & load speed." },
            { q: "Custom Hooks are?", options: ["Reusable JS functions using built-in hooks", "HTML tags", "API endpoints", "Dev tools"], correct: 0, hint: "Must start with 'use'." },
            { q: "useMemo vs useCallback?", options: ["useMemo caches value, useCallback caches function instance", "No difference", "Values vs components", "Backend"], correct: 0, hint: "Value vs function reference." }
        ]
    },
    "Operating Systems": {
        icon: "fa-solid fa-laptop-code text-orange-400",
        desc: "Processes, threads, and scheduling.",
        questions: [
            { q: "What is an OS?", options: ["System software managing hardware/software", "App", "Virus", "DB"], correct: 0, hint: "Hardware bridge." },
            { q: "Which is NOT an OS?", options: ["Linux", "Oracle", "Windows", "macOS"], correct: 1, hint: "Database system." },
            { q: "Core OS component?", options: ["Kernel", "Shell", "Compiler", "Driver"], correct: 0, hint: "Core system." },
            { q: "Program in execution?", options: ["Process", "Thread", "Task", "Job"], correct: 0, hint: "Active unit." },
            { q: "Multitasking means?", options: ["Running multiple programs concurrently", "Multi monitors", "Networks", "Coding"], correct: 0, hint: "CPU switching." },
            { q: "Thrashing means?", options: ["Excessive paging causing slowdown", "Overheating", "Disk crash", "Timeout"], correct: 0, hint: "Swapping pages." },
            { q: "Mutex vs Semaphore?", options: ["Mutex has ownership; semaphore is signaling counter", "No diff", "Faster", "Files only"], correct: 0, hint: "Lock ownership." },
            { q: "Four Deadlock conditions?", options: ["Mutual Exclusion, Hold&Wait, No Preemption, Circular Wait", "Speed, RAM, Disk", "Read, Write, Lock", "Start, Run, Stop"], correct: 0, hint: "Coffman conditions." },
            { q: "Virtual Memory uses?", options: ["Secondary storage as virtual RAM", "Cloud", "ROM", "Cache"], correct: 0, hint: "Extends RAM." },
            { q: "Preemptive scheduling?", options: ["OS can forcibly pause running process", "Run to completion", "Priority", "Random"], correct: 0, hint: "Interrupts processes." },
            { q: "Peterson's Solution used for?", options: ["Mutual exclusion for two processes without locks", "Disk", "Paging", "Encryption"], correct: 0, hint: "Software synchronization." },
            { q: "Banker's Algorithm purpose?", options: ["Deadlock avoidance", "Banking", "CPU scheduling", "Compaction"], correct: 0, hint: "Safe state allocation." },
            { q: "TLB is?", options: ["Fast hardware cache for virtual-to-physical address translation", "Disk cache", "Network buffer", "Stack pointer"], correct: 0, hint: "Speeds up MMU." },
            { q: "Copy-on-Write (COW)?", options: ["Delay resource copying until modification", "Cloud copy", "Printing", "Backup"], correct: 0, hint: "Fork optimization." },
            { q: "Spinlocks are?", options: ["Locks where thread busy-waits checking availability", "Sleeping locks", "File locks", "Network"], correct: 0, hint: "Busy waiting." }
        ]
    },
    "Computer Networks": {
        icon: "fa-solid fa-globe text-indigo-400",
        desc: "TCP/IP, OSI layers, and routing.",
        questions: [
            { q: "What does IP stand for?", options: ["Internet Protocol", "Internal Program", "Interface Port", "Info Provider"], correct: 0, hint: "Addressing protocol." },
            { q: "OSI layer for packet routing?", options: ["Network Layer", "Transport", "Data Link", "Physical"], correct: 0, hint: "Layer 3." },
            { q: "TCP stands for?", options: ["Transmission Control Protocol", "Transfer Port", "Connection Program", "Transport Protocol"], correct: 0, hint: "Reliable protocol." },
            { q: "Secure web browsing protocol?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correct: 0, hint: "SSL/TLS secure." },
            { q: "MAC address is?", options: ["Unique hardware network interface identifier", "IP alias", "Serial number", "Modem ID"], correct: 0, hint: "Physical address." },
            { q: "TCP vs UDP?", options: ["TCP is reliable/connection-oriented; UDP is fast/connectionless", "UDP secure", "Wireless", "No diff"], correct: 0, hint: "Reliability vs speed." },
            { q: "Subnetting is?", options: ["Dividing network into smaller subnetworks", "Connecting routers", "Encrypting", "Cables"], correct: 0, hint: "Optimizes routing." },
            { q: "DNS role?", options: ["Translating domain names to IP addresses", "MAC assignment", "Routing", "Encrypting"], correct: 0, hint: "Internet phonebook." },
            { q: "OSI model layers count?", options: ["7", "4", "5", "6"], correct: 0, hint: "Physical to Application." },
            { q: "ARP protocol does?", options: ["Resolves IP address to physical MAC address", "Domain names", "Assigns IP", "Router status"], correct: 0, hint: "Layer 3 to 2 mapping." },
            { q: "BGP used for?", options: ["Routing between autonomous systems across internet", "Wi-Fi", "Bluetooth", "USB"], correct: 0, hint: "ISP routing." },
            { q: "Sliding Window Protocol?", options: ["Reliable flow control", "UI window", "Encryption", "Firewall"], correct: 0, hint: "Manages packet flow." },
            { q: "SSL/TLS Handshake establishes?", options: ["Certificates, cipher suites, and session keys", "Plain text", "Ping IP", "Firewall ports"], correct: 0, hint: "Cryptographic negotiation." },
            { q: "IP Packet Fragmentation?", options: ["Breaking datagrams to fit network MTU", "Encrypting", "Dropping packets", "Merging"], correct: 0, hint: "Exceeding MTU size." },
            { q: "TCP Congestion Control prevents?", options: ["Network collapse from over-injection", "Overheating", "Decryption fail", "Spoofing"], correct: 0, hint: "Slow start & avoidance." }
        ]
    },
    "Object-Oriented Programming": {
        icon: "fa-solid fa-cube text-pink-400",
        desc: "Classes, objects, inheritance, and polymorphism.",
        questions: [
            { q: "What is OOP?", options: ["Paradigm based on classes and objects", "Procedural", "Query language", "Styling"], correct: 0, hint: "Models real entities." },
            { q: "NOT a core pillar of OOP?", options: ["Compilation", "Inheritance", "Polymorphism", "Encapsulation"], correct: 0, hint: "Pillars are 4." },
            { q: "Object in OOP?", options: ["Instance of a class", "Function", "Variable", "Error"], correct: 0, hint: "State and behavior." },
            { q: "Class is?", options: ["Blueprint for objects", "File", "Executed program", "Loop"], correct: 0, hint: "Template." },
            { q: "Inheritance principle?", options: ["Deriving new class from existing class", "Copying", "Hiding", "Overloading"], correct: 0, hint: "Code reusability." },
            { q: "Overloading vs Overriding?", options: ["Overloading compile-time in same class; overriding run-time in subclass", "No diff", "Faster", "Variables"], correct: 0, hint: "Static vs dynamic polymorphism." },
            { q: "Polymorphism means?", options: ["Ability to take multiple forms", "Data hiding", "Multiple inheritance", "Memory"], correct: 0, hint: "Many forms." },
            { q: "Encapsulation means?", options: ["Wrapping data/methods and restricting direct access", "Inheriting", "Objects", "Deleting"], correct: 0, hint: "Data hiding." },
            { q: "Abstract class is?", options: ["Cannot be instantiated directly & has abstract methods", "Normal class", "Empty", "Final"], correct: 0, hint: "Base template." },
            { q: "Virtual Function in C++?", options: ["Member function expected to be redefined for dynamic dispatch", "Static", "Inline", "Private"], correct: 0, hint: "Runtime polymorphism." },
            { q: "Diamond Problem occurs in?", options: ["Multiple inheritance with common base class", "Memory leak", "Loops", "Locks"], correct: 0, hint: "Ambiguity in hierarchy." },
            { q: "Virtual Inheritance used to?", options: ["Prevent multiple base class copies in hierarchy", "Speed up", "Encrypt", "Templates"], correct: 0, hint: "Solves diamond problem." },
            { q: "C++ Templates allow?", options: ["Generic programming with types", "UI templates", "HTML", "Schemas"], correct: 0, hint: "Generic types." },
            { q: "Object Slicing is?", options: ["Loss of derived class specific data when assigning a derived object to a base object by value", "Cutting strings", "Deleting", "Thread splitting"], correct: 0, hint: "Value assignment issue." },
            { q: "vptr and vtable used for?", options: ["Virtual pointer and virtual table used to implement runtime polymorphism", "Vector pointers", "Variable tables", "Virtual threads"], correct: 0, hint: "Virtual mechanism." }
        ]
    }
};

function switchTab(tab) {
    isSignup = (tab === 'signup');
    document.getElementById('tab-login').className = isSignup ? "flex-1 py-2 text-sm font-bold rounded-xl text-slate-400 transition" : "flex-1 py-2 text-sm font-bold rounded-xl bg-cyan-500 text-slate-950 transition";
    document.getElementById('tab-signup').className = !isSignup ? "flex-1 py-2 text-sm font-bold rounded-xl text-slate-400 transition" : "flex-1 py-2 text-sm font-bold rounded-xl bg-cyan-500 text-slate-950 transition";
    document.getElementById('auth-btn').innerText = isSignup ? "Create Account" : "Access Workspace";
}

async function handleAuth() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const endpoint = isSignup ? '/api/signup' : '/api/login';

    if (!username || !password) {
        document.getElementById('auth-msg').innerText = "All fields required!";
        return;
    }

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            currentUser = username;
            document.getElementById('auth-container').classList.add('hidden');
            document.getElementById('workspace').classList.remove('hidden');
            document.getElementById('welcome-user').innerText = currentUser;
            document.getElementById('user-avatar').innerText = currentUser.charAt(0).toUpperCase();
            
            // Login hote hi database se aaya hua exact score aur streak UI par set hoga
            if (data.progress) {
                document.getElementById('score-val').innerText = (data.progress.score || 0) + " XP";
                document.getElementById('streak-val').innerText = (data.progress.streak || 0) + "🔥";
                const statCorrect = document.getElementById('stat-correct');
                if (statCorrect) statCorrect.innerText = data.progress.correctCount || 0;
            }

            renderSubjects();
            switchView('subjects');
        } else {
            document.getElementById('auth-msg').innerText = data.error;
        }
    } catch (err) {
        document.getElementById('auth-msg').innerText = "Server connection failed!";
    }
}

function renderSubjects() {
    const grid = document.getElementById('view-subjects');
    if(!grid) return;
    grid.innerHTML = '';
    for (let sub in subjectsData) {
        const data = subjectsData[sub];
        grid.innerHTML += `
            <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/60 transition flex flex-col justify-between shadow-xl">
                <div>
                    <div class="text-3xl mb-3"><i class="${data.icon}"></i></div>
                    <h4 class="text-base font-bold text-slate-100 mb-1">${sub}</h4>
                    <p class="text-xs text-slate-400 mb-4">${data.desc}</p>
                </div>
                <button onclick="startQuiz('${sub}')" class="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition">Start Quiz (15 Q)</button>
            </div>
        `;
    }
}

function startQuiz(subName) {
    currentSubject = subName;
    currentQIndex = 0;
    moduleCorrect = 0;
    moduleXP = 0;
    document.getElementById('v-quiz').classList.remove('hidden');
    switchView('quiz');
    loadQuestion();
}

function loadQuestion() {
    const list = subjectsData[currentSubject].questions;
    if (currentQIndex >= list.length) {
        showScorecard();
        return;
    }
    const q = list[currentQIndex];
    document.getElementById('q-num').innerText = currentQIndex + 1;
    document.getElementById('question-text').innerText = q.q;

    let diff = "Easy (+1 Pt)";
    let badgeColor = "bg-green-500/10 text-green-400 border-green-500/35";
    if (currentQIndex >= 5 && currentQIndex < 10) {
        diff = "Medium (+2 Pts)";
        badgeColor = "bg-cyan-500/10 text-cyan-400 border-cyan-500/35";
    } else if (currentQIndex >= 10) {
        diff = "Hard (+3 Pts)";
        badgeColor = "bg-purple-500/10 text-purple-400 border-purple-500/35";
    }

    const badge = document.getElementById('quiz-badge');
    badge.innerText = `${currentSubject} • ${diff}`;
    badge.className = `px-3 py-1 border rounded-full text-xs font-bold ${badgeColor}`;

    document.getElementById('hint-box').classList.add('hidden');
    document.getElementById('hint-box').innerText = q.hint;

    const box = document.getElementById('options-box');
    box.innerHTML = '';
    q.options.forEach((opt, idx) => {
        box.innerHTML += `<button onclick="submitAnswer(${idx}, ${q.correct})" class="w-full text-left px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-sm transition font-medium">${opt}</button>`;
    });
}

function toggleHint() {
    document.getElementById('hint-box').classList.toggle('hidden');
}

async function submitAnswer(selected, correct) {
    const isCorrect = (selected === correct);
    let diff = "Easy";
    if (currentQIndex >= 5 && currentQIndex < 10) diff = "Medium";
    else if (currentQIndex >= 10) diff = "Hard";

    if (isCorrect) moduleCorrect++;

    const feedback = document.getElementById('quiz-feedback');
    feedback.innerText = isCorrect ? "✅ Correct! XP Awarded." : "❌ Incorrect! 0 Points.";
    feedback.className = isCorrect ? "text-sm font-bold text-center text-green-400 pt-2" : "text-sm font-bold text-center text-red-400 pt-2";

    const res = await fetch('/api/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: currentUser, correct: isCorrect, difficulty: diff })
    });
    const data = await res.json();

    if (res.ok) {
        moduleXP = data.progress.score;
        document.getElementById('score-val').innerText = data.progress.score + " XP";
        document.getElementById('streak-val').innerText = data.progress.streak + "🔥";
        document.getElementById('stat-correct').innerText = data.progress.correctCount;
        updateLeaderboardUI(data.leaderboard);
    }

    currentQIndex++;
    setTimeout(() => {
        feedback.innerText = "";
        loadQuestion();
    }, 1000);
}

function showScorecard() {
    switchView('scorecard');
    document.getElementById('sc-score').innerText = moduleXP + " XP";
    document.getElementById('sc-correct').innerText = `${moduleCorrect} / 15`;
    const acc = Math.round((moduleCorrect / 15) * 100);
    document.getElementById('sc-accuracy').innerText = acc + "%";
    
    let tier = "Beginner";
    if (acc >= 80) tier = "Expert 🏆";
    else if (acc >= 50) tier = "Pro 🚀";
    else tier = "Intermediate 💡";
    document.getElementById('sc-tier').innerText = tier;
}

function downloadCertificate() {
    const certWindow = window.open('', '_blank');
    certWindow.document.write(`
        <html>
        <head>
            <title>Certificate of Completion - CodeQuest Pro</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #fff; text-align: center; padding: 50px; }
                .cert-box { border: 8px solid #06b6d4; padding: 40px; border-radius: 20px; background: #1e293b; max-width: 700px; margin: 0 auto; box-shadow: 0 0 50px rgba(6,182,212,0.3); }
                h1 { color: #38bdf8; font-size: 32px; margin-bottom: 5px; }
                h2 { color: #cbd5e1; font-size: 20px; font-weight: normal; margin-bottom: 30px; }
                .name { font-size: 36px; font-weight: bold; color: #4ade80; border-bottom: 2px dashed #475569; display: inline-block; padding: 0 20px 10px; margin: 20px 0; }
                p { font-size: 16px; color: #94a3b8; line-height: 1.6; }
                .footer { margin-top: 40px; display: flex; justify-content: space-between; padding: 0 30px; font-weight: bold; color: #38bdf8; }
            </style>
        </head>
        <body>
            <div class="cert-box">
                <h1>CodeQuest Pro</h1>
                <h2>Certificate of Module Completion</h2>
                <p>This is proudly presented to</p>
                <div class="name">${currentUser}</div>
                <p>for successfully completing the <b>${currentSubject}</b> module with outstanding performance and dedication.</p>
                <div class="footer">
                    <span>Platform: CodeQuest Pro AI</span>
                    <span>Status: Verified & Certified</span>
                </div>
            </div>
            <script>window.print();<\/script>
        </body>
        </html>
    `);
    certWindow.document.close();
}

function backToSubjects() {
    document.getElementById('v-quiz').classList.add('hidden');
    document.getElementById('view-scorecard').classList.add('hidden');
    switchView('subjects');
}

function switchView(view) {
    ['subjects', 'quiz', 'scorecard', 'leaderboard', 'ai'].forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if(el) el.classList.add('hidden');
        const btn = document.getElementById(`v-${v}`);
        if(btn) btn.className = "px-4 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs rounded-xl transition";
    });
    const targetView = document.getElementById(`view-${view}`);
    if(targetView) targetView.classList.remove('hidden');
    const targetBtn = document.getElementById(`v-${view}`);
    if(targetBtn) {
        targetBtn.className = "px-4 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg";
    }

    // Leaderboard tab khulte hi live data fetch karne ke liye
    if (view === 'leaderboard') {
        fetchLeaderboardData();
    }
}

async function fetchLeaderboardData() {
    try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        if (res.ok && data.leaderboard) {
            updateLeaderboardUI(data.leaderboard);
        }
    } catch (err) {
        console.error("Failed to load leaderboard");
    }
}

function updateLeaderboardUI(list) {
    const board = document.getElementById('leaderboard-list');
    if(!board) return;
    board.innerHTML = '';
    list.forEach((item, idx) => {
        board.innerHTML += `<div class="flex justify-between items-center bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-sm">
            <span class="font-extrabold text-cyan-400">#${idx + 1} ${item.username}</span>
            <span class="text-green-400 font-bold">${item.score} XP</span>
        </div>`;
    });
}

async function askAIMentor() {
    const input = document.getElementById('ai-input');
    const q = input.value.trim();
    if(!q) return;

    const chat = document.getElementById('chat-box');
    chat.innerHTML += `<div class="bg-cyan-950/40 border border-cyan-500/20 p-3 rounded-xl max-w-[80%] ml-auto text-slate-200">${q}</div>`;
    input.value = '';

    const res = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
    });
    const data = await res.json();
    chat.innerHTML += `<div class="bg-slate-800 p-3 rounded-xl max-w-[80%] text-slate-200">${data.reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
}

function logout() {
    currentUser = null;
    currentSubject = null;
    currentQIndex = 0;
    moduleCorrect = 0;
    moduleXP = 0;

    // Logout karte waqt inputs aur errors clear ho jayenge
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('auth-msg').innerText = '';

    document.getElementById('workspace').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}