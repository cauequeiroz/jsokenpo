(function() {
	var game = {
		score: [0, 0],
		user: '',
		computer: '',
		winner: '',

		start: function() {
			if ( game.winner !== '' ) {
				document.querySelector('.loader').classList.remove('start');
				document.querySelector('.choice-board').classList.remove('show');
				document.querySelector('.result').setAttribute('class', 'result');
			}

			game.events.playerChoice(true);
		},
		userChoice: function() {
			this.classList.add('selected');

			game.user = this.getAttribute('value');
			game.events.playerChoice(false);
			game.computerChoice();
		},
		computerChoice: function() {
			var n = Math.floor(1 + Math.random() * (3 - 1 + 1)),
				choice = {
					'1': 'rock',
					'2': 'paper',
					'3': 'scissor' 
				};				

			game.computer = choice[n];
			game.compareChoice();
		},
		compareChoice: function() {
			document.querySelector('.choice-board strong').innerHTML = game.computer;
			document.querySelector('.choice-board').classList.add('show');

			if ( game.user === game.computer ) {
				game.winner = 'tie';
			} else {
				var wins = {
					'rock': 'scissor',
					'scissor': 'paper',
					'paper': 'rock'
				};
				game.winner = (wins[game.user] === game.computer) ? 'user' : 'computer';
			}

			game.showResult();
		},
		showResult: function() {
			var elem = document.querySelector('.result'),
				text = '';

			if ( game.winner === 'user' ) {
				text = 'You win! :)';
			} 
			else if ( game.winner === 'computer' ) {
				text = 'Computer wins :(';
			}
			else {
				text = 'Tie.';
			}				

			elem.innerHTML = text;
			elem.classList.add(game.winner, 'show');

			document.querySelector('.loader').classList.add('start');

			setTimeout(function() {
				game.updateScore();
				game.start();	
			}, 3000);
		},
		updateScore: function() {
			if ( game.winner === 'user' ) {
				game.score[0]++;
			}
			else if ( game.winner === 'computer' ) {
				game.score[1]++;
			}

			var	elem  = document.querySelectorAll('.score'),
				score = 0;
				
			for (var i=0; i<2; i++) {
				if ( game.score[i] < 10 ) {
					score = '0'+game.score[i];
				} else {
					score = game.score[i];
				}

				elem[i].innerHTML = score;
			}
		},

		events: {
			playerChoice: function(allow) {
				var elem = document.querySelectorAll('.user-choice li'),
					size = elem.length;

				for ( var i=0; i<size; i++) {
					if ( allow ) {
						elem[i].classList.remove('selected');
						elem[i].addEventListener('click', game.userChoice, false);
					} else {
						elem[i].removeEventListener('click', game.userChoice, false);
					}
				}
			}
		}
	}
	game.start();
})();

