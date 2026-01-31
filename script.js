const game = document.getElementById("game");

/* ===== НАЙДИ ПАРУ (16 КАРТОЧЕК) ===== */

function showPairs() {
    game.innerHTML = "<h2>🧠 Найди пару</h2>";

    const characters = [
        "🐻 Винни", "🐻 Винни",
        "🐊 Гена", "🐊 Гена",
        "🔵 Крош", "🔵 Крош",
        "🦔 Ёжик", "🦔 Ёжик",
        "🐰 Нюша", "🐰 Нюша",
        "🔧 Нолик", "🔧 Нолик",
        "⚙️ Симка", "⚙️ Симка",
        "🧠 Пин", "🧠 Пин"
    ];

    characters.sort(() => 0.5 - Math.random());

    let firstCard = null;
    let lock = false;
    let foundPairs = 0;

    characters.forEach(char => {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = "❓";

        card.onclick = () => {
            if (lock || card.textContent !== "❓") return;

            card.textContent = char;

            if (!firstCard) {
                firstCard = card;
            } else {
                if (firstCard.textContent !== card.textContent) {
                    lock = true;
                    setTimeout(() => {
                        card.textContent = "❓";
                        firstCard.textContent = "❓";
                        firstCard = null;
                        lock = false;
                    }, 800);
                } else {
                    firstCard = null;
                    foundPairs++;

                    if (foundPairs === characters.length / 2) {
                        setTimeout(() => {
                            alert("🎉 Молодец! Все пары найдены!");
                        }, 300);
                    }
                }
            }
        };

        game.appendChild(card);
    });
}

/* ===== ЛАБИРИНТ ===== */

const mazeMap = [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,2,1],
    [1,1,1,1,1]
];

let player = { x: 1, y: 1 };

function showMaze() {
    game.innerHTML = `
        <p>Используй кнопки</p>
        <div id="maze"></div>
        <br>
        <button onclick="move('up')">↑</button><br>
        <button onclick="move('left')">←</button>
        <button onclick="move('right')">→</button><br>
        <button onclick="move('down')">↓</button>
    `;
    drawMaze();
}

function drawMaze() {
    const maze = document.getElementById("maze");
    maze.innerHTML = "";

    mazeMap.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement("div");
            div.className = "cell";

            if (cell === 1) div.classList.add("wall");
            if (cell === 2) div.classList.add("finish");
            if (player.x === x && player.y === y) div.classList.add("player");

            maze.appendChild(div);
        });
        maze.appendChild(document.createElement("br"));
    });
}

function move(dir) {
    let x = player.x;
    let y = player.y;

    if (dir === "up") y--;
    if (dir === "down") y++;
    if (dir === "left") x--;
    if (dir === "right") x++;

    if (mazeMap[y][x] !== 1) {
        player = { x, y };
        drawMaze();

        if (mazeMap[y][x] === 2) {
            alert("🎉 Ты вышел из лабиринта!");
        }
    }
}
