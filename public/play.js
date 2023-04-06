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
	}

	getPlayerName() {
		return localStorage.getItem('userName') ?? 'Mystery player';
	}

	saveScore(score) {
		const userName = this.getPlayerName();
		let scores = [];
		const scoresText = localStorage.getItem('scores');
		if (scoresText) {
			scores = JSON.parse(scoresText);
		}
		scores = this.updateScores(userName, score, scores);
		localStorage.setItem('scores', JSON.stringify(scores));
	}

	updateScores(userName, score, scores) {
		const date = new Date().toLocaleDateString();
		let j = 0;
		
		let found = false;
		for (const [i, prevScore] of scores.entries()) {
			if (userName === prevScore.name) {
				const oldScore = prevScore.score;
				prevScore.score = oldScore + score;
				prevScore.date = date;
				found = true;
				j = i;
				break;
			}
		}

		let increased = {};
		if (found) {
			increased = scores.pop(j);
		} else {
			increased = { name: userName, score: score, date: date };
		}

		let added = false;
		for (const [i, prevScore] of scores.entries()) {
			if (increased.score > prevScore.score) {
				scores.splice(i, 0, increased);
				added = true;
				break;
			}
		}

		if (!added) {
			scores.push(increased);
		}

		if (scores.length > 10) {
			scores.length = 10;
		}

		return scores;
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
}

const game = new Game();
