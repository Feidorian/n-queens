let matrix, blackQueen, whiteQueen;

function preload() {
	blackQueen = loadImage("assets/black-queen.svg");
	whiteQueen = loadImage("assets/white-queen.svg");
}

function setup() {
	// frameRate(1)
	imageMode(CENTER);
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	angleMode(DEGREES);
	matrix = new NQueens();
	matrix.setup();;
	// noLoop();
}

function draw() {
	print("running");
	matrix.displayBoard();
	// matrix.displayMatrix();
	// let choice = random(matrix.array());
	// if (matrix.isValidChoice(choice)) matrix.chooseCell(choice);
}

function Cell(config, hasQueen = false) {
	const {loc, size, isBlackCell, isBlackQueen} = config;
	this.dim = config.dim;
	this.hasQueen = hasQueen;
	this.queenCanAttack = other => {
		let {x: thisRow, y: thisCol} = this.dim;
		let {x: otherRow, y: otherCol} = other.dim;
		return thisRow === otherRow || thisCol === otherCol || abs(thisRow - otherRow) === abs(thisCol - otherCol);
	};

	const drawQueen = () => {
		if (!this.hasQueen) return;
		const ratio = 0.5;
		const {x, y} = {x: loc.x + size.x / 2, y: loc.y + size.y / 2};
		const [sizeX, sizeY] = [size.x * ratio, size.y * ratio];
		const img = isBlackQueen ? blackQueen : whiteQueen;
		image(img, x, y, sizeX, sizeY);
	};

	this.drawCell = () => {
		push();
		fill(isBlackCell ? 0 : 255);
		const {x, y} = loc;
		const {x: sizeX, y: sizeY} = size;
		rect(x, y, sizeX, sizeY);
		drawQueen();
		pop();
	};

	this.copy = () => new Cell(config, true);
}

function NQueens() {
	let n = 7;
	const maxDim = 7;
	const minDim = 1;
	let size = createVector(width / n, height / n);
	let board = [];
	let result = [];
	let resultChoice = 0;

	this.array = () => board;

	this.setup = () => {
		setUpControls();
		setUpBoard();
	};

	const setUpControls = () => {
		controls = QuickSettings.create(10, 10, "NQueens: Controls (Drag to Move)");
		controls.addRange("Dimension", minDim, maxDim, n, 1, x => {
			n = x;
			size = createVector(width / x, height / x);
			result = [];
			setUpBoard();
			redraw();
		});
		controls.addButton("Find Solutions", () => {
			result = [];
			setUpBoard()
			solve();
			// redraw();
			controls.setValue("Current Number of Solutions",result.length)
			resultChoice = 0;
			controls.addDropDown("Select a Solution", result.map((c,i)=>`solution ${i+1}`), ({index}) => {
				resultChoice = index;
				// redraw()
			});
			print(result);
		});
		controls.addHTML("Current Number of Solutions", 0);
	};

	const setUpBoard = () => {
		result = [];
		for (let row = 0; row < n; row++) {
			for (let col = 0; col < n; col++) {
				let x = map(row, 0, n, 0, width);
				let y = map(col, 0, n, 0, height);
				let loc = createVector(x, y);
				let isBlackCell = (row + col) % 2 === 0;
				let isBlackQueen = !isBlackCell;
				let dim = createVector(row, col);
				board.push(new Cell({loc, dim, size, isBlackCell, isBlackQueen}));
			}
		}
	};

	async function solve(solution = [], solutionTracker = []) {
		if (solution.length === n) {
			print(solution.length)
			result.push(solution.map(piece => {
				let {x,y} = piece.dim;
				solutionTracker[`${x}${y}`] = true;
				return piece.copy()
			}));
		} else {
			for (let cell of board) {
				let {x,y} = cell.dim;
				if (!cell.hasQueen && !solutionTracker[`${x}${y}`] && solution.every(piece => !cell.queenCanAttack(piece))) {
					solution.push(cell);
					cell.hasQueen = true;
					solve(solution, solutionTracker);
					cell.hasQueen = false;
					solution.pop();
				}
			}
		}
		return false;
	}
	// this.init = () => {
	// 	for (let col = 0; col < n; col++) {
	// 		for (let row = 0; row < n; row++) {
	// 			let x = map(row, 0, n, 0, width);
	// 			let y = map(col, 0, n, 0, height);
	// 			let isBlackCell = (row + col) % 2 === 0;
	// 			let isBlackQueen = !isBlackCell;
	// 			let config = {loc: {x, y}, dim: {col, row}, size, isBlackCell, isBlackQueen};
	// 			matrix.push(new Cell(config));
	// 		}
	// 	}
	// };

	this.displayBoard = () => {
		for (let vector of board) vector.drawCell();
		if(result.length > 0) {
		for (let vector of result[resultChoice] || []) vector.drawCell();
		}
	};
}
