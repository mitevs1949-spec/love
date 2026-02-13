
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("💘 Love Lab Main JS Loaded v4.1 - Debug Mode");
        initHearts();
        initTabs();
        initCalculator();
        initDateIdeas();
        initCountdown();
        initQuotes();
    } catch (e) {
        console.error("Critical Error in Main JS Initialization:", e);
    }
});

// --- Tab System ---
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tab-content');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log("Tab Clicked:", tab.innerText);
            // Remove active classes from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all sections
            sections.forEach(s => s.classList.add('hidden'));

            // Add active class to clicked tab and show target content
            tab.classList.add('active');
            const targetId = tab.dataset.target;
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        });
    });
}

// --- Background Animation ---
function initHearts() {
    const container = document.querySelector('.heart-bg');
    if (!container) return;

    const heartSymbols = ['❤️', '💖', '💘', '💝', '💕'];

    // Create initial batch
    for (let i = 0; i < 30; i++) {
        createHeart(container, heartSymbols);
    }
}

function createHeart(container, symbols) {
    const h = document.createElement('div');
    h.classList.add('heart');
    h.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.top = Math.random() * 100 + 'vh';
    h.style.fontSize = Math.random() * 20 + 10 + 'px';
    h.style.animationDuration = Math.random() * 5 + 5 + 's';
    h.style.opacity = Math.random() * 0.5 + 0.1;

    container.appendChild(h);

    // Reset loop
    h.addEventListener('animationiteration', () => {
        h.style.left = Math.random() * 100 + 'vw';
        h.style.top = '105vh';
    });
}

// --- Countdown Timer ---
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
        const now = new Date();
        const currentYear = now.getFullYear();
        // Target: Feb 14th
        let valentine = new Date(`February 14, ${currentYear} 00:00:00`);

        // If Feb 14 has passed this year, target next year
        if (now > valentine) {
            valentine = new Date(`February 14, ${currentYear + 1} 00:00:00`);
        }

        const diff = valentine - now;

        const d = Math.floor(diff / 1000 / 60 / 60 / 24);
        const h = Math.floor((diff / 1000 / 60 / 60) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        daysEl.innerText = d < 10 ? '0' + d : d;
        hoursEl.innerText = h < 10 ? '0' + h : h;
        minutesEl.innerText = m < 10 ? '0' + m : m;
        secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// --- Quotes System ---
function initQuotes() {
    const quotes = [
        { text: "Love is not finding someone to live with; it's finding someone you can't live without.", author: "Rafael Ortiz" },
        { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle" },
        { text: "My heart is and always will be yours.", author: "Jane Austen" },
        { text: "Love is a friendship set to music.", author: "Joseph Campbell" },
        { text: "I look at you and see the rest of my life in front of my eyes.", author: "Unknown" },
        { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
        { text: "Every love story is beautiful, but ours is my favorite.", author: "Unknown" },
        { text: "You are the finest, loveliest, tenderest, and most beautiful person I have known.", author: "F. Scott Fitzgerald" }
    ];

    const quoteEl = document.getElementById('daily-quote');
    const authorEl = document.getElementById('quote-author');

    if (quoteEl && authorEl) {
        // Pick random quote on load
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteEl.innerText = `"${random.text}"`;
        authorEl.innerText = `- ${random.author}`;
    }
}


// --- Love Calculator & FLAMES Logic ---
function initCalculator() {
    console.log("Initializing Calculator...");
    const calculateBtn = document.getElementById('calc-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            console.log("Calculate Button Clicked");
            try {
                // Get active mode
                const activeTab = document.querySelector('.tab-btn.active');
                const mode = activeTab ? (activeTab.dataset.mode || 'percentage') : 'percentage';
                console.log("Selected Mode:", mode);

                const name1 = document.getElementById('name1').value.trim();
                const name2 = document.getElementById('name2').value.trim();
                console.log("Names Input:", name1, name2);

                if (!name1 || !name2) {
                    alert("Please enter both names to calculate destiny! 🥺");
                    console.warn("Input validation failed: One or both names missing.");
                    return;
                }

                // UI Feedback
                calculateBtn.disabled = true;
                calculateBtn.innerHTML = "Calculating... ⏳";

                // Switch to Result View
                const inputArea = document.getElementById('input-area');
                const resultArea = document.getElementById('result-area');
                const msgEl = document.getElementById('result-msg');
                const scoreEl = document.getElementById('result-score');

                if (inputArea) inputArea.classList.add('hidden');
                if (resultArea) resultArea.classList.remove('hidden');

                // Preliminary Message
                if (msgEl) msgEl.innerText = "Analyzing stars... ✨";
                if (scoreEl) scoreEl.innerText = "...";

                // Processing Delay
                setTimeout(() => {
                    if (mode === 'flames') {
                        runFlames(name1, name2);
                    } else {
                        runPercentage(name1, name2);
                    }

                    // Reset Button State
                    calculateBtn.disabled = false;
                    calculateBtn.innerHTML = "Calculate Destiny 💘";
                }, 1500); // Slightly longer delay for suspense

            } catch (err) {
                console.error("Calculation Error Stack:", err);
                alert("Something went wrong. Please try again!");
                calculateBtn.disabled = false;
                calculateBtn.innerHTML = "Calculate Destiny 💘";
            }
        });
    } else {
        console.error("Calculate Button element not found!");
    }

    // Reset Button Logic
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            console.log("Reset Button Clicked");
            const inputArea = document.getElementById('input-area');
            const resultArea = document.getElementById('result-area');

            if (inputArea) inputArea.classList.remove('hidden');
            if (resultArea) resultArea.classList.add('hidden');

            document.getElementById('name1').value = '';
            document.getElementById('name2').value = '';
        });
    }
}

function runFlames(name1, name2) {
    console.log("Running FLAMES Logic for:", name1, name2);
    // 1. Remove spaces and convert to lowercase
    let n1 = name1.toLowerCase().replace(/[^a-z]/g, '').split('');
    let n2 = name2.toLowerCase().replace(/[^a-z]/g, '').split('');
    console.log("Normalized Arrays:", n1, n2);

    // 2. Cancel out common characters
    for (let i = 0; i < n1.length; i++) {
        const index = n2.indexOf(n1[i]);
        if (index > -1) {
            console.log(`Matched '${n1[i]}' at n2 index ${index}`);
            n1[i] = '*'; // Mark as cancelled
            n2[index] = '*';
        }
    }

    // 3. Count remaining characters
    const remainingCount = n1.filter(c => c !== '*').length + n2.filter(c => c !== '*').length;
    console.log("Remaining Characters Count:", remainingCount);

    // 4. ELimination Game
    const flames = ["Friends", "Lovers", "Affection", "Marriage", "Enemies", "Siblings"];
    let flamesCopy = [...flames];

    // Position starts at 0
    let pos = 0;

    // While more than 1 item remains
    while (flamesCopy.length > 1) {
        // The index to remove is (current_pos + count - 1) % length
        // We do -1 because we count starting from current_pos
        let removeIndex = (pos + remainingCount - 1) % flamesCopy.length;

        console.log(`Eliminating: ${flamesCopy[removeIndex]} at index ${removeIndex} (pos: ${pos})`);
        flamesCopy.splice(removeIndex, 1);

        // New position is the same index (elements shifted)
        pos = removeIndex;
        if (pos >= flamesCopy.length) pos = 0; // Fix wrap around safety though modulo handles it usually
    }

    const result = flamesCopy[0];
    console.log("Final Result:", result);

    const emojiMap = {
        "Friends": "🤝",
        "Lovers": "❤️",
        "Affection": "🥰",
        "Marriage": "💍",
        "Enemies": "⚔️",
        "Siblings": "👯"
    };

    const scoreEl = document.getElementById('result-score');
    const msgEl = document.getElementById('result-msg');

    if (scoreEl) scoreEl.innerText = emojiMap[result];
    if (msgEl) msgEl.innerHTML = `Your destiny is: <br><strong style="font-size:2rem; color:#ffcc00">${result}</strong>`;
}

function runPercentage(n1, n2) {
    console.log("Running Percentage Logic for:", n1, n2);
    // Deterministic Hash for consistent results
    // We want the same names to always give the same score
    let combined = (n1 + n2).toLowerCase().replace(/[^a-z0-9]/g, '');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Normalize to 0-100, but skew towards higher numbers for "Love" website ;)
    let baseScore = Math.abs(hash % 101);

    // Bonus logic: If names contain "love", boost it
    if (combined.includes("love")) baseScore += 10;
    if (baseScore > 100) baseScore = 100;

    // Ensure it's never 0 for user happiness
    if (baseScore < 10) baseScore = 15;

    console.log("Calculated Score:", baseScore);

    const scoreEl = document.getElementById('result-score');
    const msgEl = document.getElementById('result-msg');

    let current = 0;
    const timer = setInterval(() => {
        if (scoreEl) scoreEl.innerText = current + '%';
        if (current >= baseScore) {
            clearInterval(timer);
            showFinalMessage(baseScore, msgEl);
        }
        // Speed up as we go
        current += Math.ceil((baseScore - current) / 10) || 1;
    }, 50);
}

function showFinalMessage(score, msgEl) {
    if (!msgEl) return;
    let msg = "";
    if (score > 90) msg = "🔥 Soulmates! It's destiny!";
    else if (score > 80) msg = "💕 Perfect Match!";
    else if (score > 60) msg = "🙂 Very Compatible!";
    else if (score > 40) msg = "🤔 Good chance, give it time.";
    else msg = "😬 Opposites attract?";
    msgEl.innerText = msg;
}

// --- Date Ideas ---
function initDateIdeas() {
    const ideas = [
        "Cook a fancy dinner together at home 🍝",
        "Stargazing picnic in the park 🌌",
        "Recreate your first date 💑",
        "Pottery or painting class 🎨",
        "Movie marathon with blanket fort 🎬",
        "Sunset beach walk 🏖️",
        "Board game night with wine 🍷",
        "Visit a botanical garden 🌸",
        "Salsa dancing lessons 💃",
        "Rent a cabin for the weekend 🏡",
        "Go for a long drive with no destination 🚗",
        "Visit an arcade and play retro games 🕹️",
        "Make homemade pizza with crazy toppings 🍕",
        "Write love letters to each other 💌",
        "Go to a karaoke bar and sing duets 🎤",
        "Volunteer at a local animal shelter 🐶",
        "Have a spa night at home 🧖‍♀️"
    ];

    const btn = document.getElementById('generate-date-btn');
    const display = document.getElementById('date-idea-display');

    if (btn && display) {
        btn.addEventListener('click', () => {
            const random = ideas[Math.floor(Math.random() * ideas.length)];
            display.style.opacity = 0;
            display.style.transform = "translateY(10px)";

            setTimeout(() => {
                display.innerText = random;
                display.style.opacity = 1;
                display.style.transform = "translateY(0)";
            }, 300);
        });
    }
}
