const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

class Game {
	buttons;
	allowPlayer;
	
	constructor() {
		this.allowPlayer = false;

		const playerNameEl = document.querySelector('.player-name');
		playerNameEl.textContent = this.getPlayerName();
	}

	async pressButton(button) {
		const messageEl = document.querySelector(".message-text");
		if (this.allowPlayer) {
			this.allowPlayer = false;
			
			if (button.id === "correct") {
				messageEl.textContent = "CORRECT!";
				this.saveScore(25);
			} else {
				messageEl.textContent = "So close";
			}
		}
	}

	async begin() {
		this.allowPlayer = false;

		await this.ready();
		await this.set();
		await this.go();

		document.getElementById('riddle').style.color = "white";

		this.allowPlayer = true;

		this.broadcastEvent(this.getPlayerName(), GameStartEvent, {});
	}

	getPlayerName() {
		return localStorage.getItem('userName') ?? 'Mystery player';
	}

	updateScore(score) {
		const scoreEl = document.querySelector('#score');
		scoreEl.textContent = score;
	}

	async saveScore(score) {
		const userName = this.getPlayerName();
		const date = new Date().toLocaleDateString();
		const newScore = { name: userName, score: score, date: date };

		
		try {
			const response = await fetch('/api/score', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(newScore)
			});

			this.broadcastEvent(userName, GameEndEvent, newScore);

			const scores = await response.json();
			localStorage.setItem('scores', JSON.stringify(scores));
		} catch {
			this.updateScoresLocal(newScore);
		}
	}

	updateScoresLocal(newScore) {
		let scores = [];
		const scoresText = localStorage.getItem('scores');
		if (scoresText) {
			scores = JSON.parse(scoresText);
		}

		let found = false;
		for (const [i, prevScore] of scores.entries()) {
			if (newScore > prevScore.score) {
				scores.splice(i, 0, newScore);
				found = true;
				break;
			}
		}

		if (!found) {
			scores.push(newScore);
		}

		if (scores.length > 10) {
			scores.length = 10;
		}

		localStorage.setItem('scores', JSON.stringify(scores));
	}

	async ready() {
		const messageEl = document.querySelector('.message-text');
		return new Promise((resolve) => {
			setTimeout(() => {
				messageEl.textContent = "READY";
				resolve(true);
			}, 250);
		});
	}

	async set() {
		const messageEl = document.querySelector('.message-text');
		return new Promise((resolve) => {
			setTimeout(() => {
				messageEl.textContent = "SET";
				resolve(true);
			}, 1500);
		});
	}

	async go() {
		const messageEl = document.querySelector('.message-text');
		return new Promise((resolve) => {
			setTimeout(() => {
				messageEl.textContent = "GO!";
				resolve(true);
			}, 1500);
		});
	}

	configureWebSocket() {
		const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
		this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
		this.socket.onopen = (event) => {
			this.displayMsg('system', 'game', 'disconnected');
		};
		this.socket.onmessage = async (event) => {
			const msg = JSON.parse(await event.data.text());
			if (msg.type === GameEndEvent) {
				this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
			} else if (msg.type === GameStartEvent) {
				this.displayMsg('player', msg.from, `started a new game`);
			}
		};
	}

	displayMsg(cls, from, msg) {
		const chatText = document.querySelector('#player-messages');
		chatText.innerHTML = `<div class="event"><span class=${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
	}

	broadcastEvent(from, type, value) {
		const event = {
			from: from,
			type: type,
			value: value
		};
		this.socket.send(JSON.stringify(event));
	}
}

const game = new Game();
