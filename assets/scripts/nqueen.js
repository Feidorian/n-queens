function NQueen() {
	let board;
	this.iterator;
	this.controls;
	this.N = 4;
	let blackQueen, whiteQueen, redQueen, blueQueen;

	this.createBoard = () => {
		for (let col = 0; col < this.N; col++) {
			for (let row = 0; row < this.N; row++) {
				let x = map(row, 0, this.N, 0, width);
				let y = map(col, 0, this.N, 0, height);

				let isBlackCell = (row + col) % 2 === 0;
				let cell = new Cell(p5);
				cell.windowLoc = {x, y};
				cell.boardLoc = {r: row, c: col};
				cell.dim = {w: width / this.N, h: height / this.N};
				cell.queenLoc = {qx: x + cell.dim.w / 2, qy: y + cell.dim.h / 2};
				cell.queenDim = {qw: cell.dim.w * 0.5, qh: cell.dim.h * 0.5};
				cell.hasQueen = true;
				cell.blackQueen = {queen: blackQueen, cellColor: "white"};
				cell.whiteQueen = {queen: whiteQueen, cellColor: "black"};
				cell.blueQueen = {queen: blueQueen, cellColor: "white"};
				cell.redQueen = {queen: redQueen, cellColor: "white"};
				cell.currentQueen = isBlackCell ? cell.whiteQueen : cell.blackQueen;
				board.push(cell);
				cell.draw();
			}
		}
	};

	this.displayBoard = function () {
		for (let cell of board) {
			cell.draw();
			// yield;
		}
	};

	this.preload = () => {
		blackQueen = loadImage("assets/images/black-queen.svg");
		whiteQueen = loadImage("assets/images/white-queen.svg");
    redQueen = loadImage("assets/images/red-queen.svg");
    blueQueen = loadImage("assets/images/blue-queen.svg");
	};

	this.setup = () => {
		imageMode(CENTER);

		board = [];
		this.controls = this.controls ?? new Controls(this);
		this.createBoard();
		this.iterator = this.displayBoard();
	};

	this.displayBoard = function* () {
		for (let cell of board) {
		cell.draw();
		yield;
		}
	};

	this.clearBoard = () => {
		board.forEach(cell => {
			cell.hasQueen = false;
		});
		this.iterator = this.displayBoard();
	};

	this.draw = () => {
		this.iterator?.next();
    
	};

  this.keyPressed = () => {
      switch (keyCode) {
        case 72:
          return void this.controls.toggleVisibility();
        case 67:
          return void this.controls.toggleCollapsed();
        default:
      }
  }

	this.windowResized = () => {
		resizeCanvas(windowWidth, windowHeight);
		this.setup()
	};
}
