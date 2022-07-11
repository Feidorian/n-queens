
function Cell() {
	this.hasQueen;
	this.windowLoc; // location on window without taking board into account {x,y}
	this.boardLoc; // location on board {r,c}
	this.dim; // cell dimension {w,h}
	this.queenLoc; // location of the queen object on the board {qx,qy}
	this.queenDim; // dimension of the queen object on the board {qw,qh}
	this.isBlackCell; // determines if the cell is colored black or white
	this.hasBlackQueen; // determines if a black queen goes on the cell
  this.currentQueen;  //{queen, cellColor}
  this.redQueen;
  this.blackQueen;
  this.blueQueen;
  this.whiteQueen;
	this.isLockedCell = false;

	this.draw = () => {
		let {x, y} = this.windowLoc;
		let {w, h} = this.dim;
		let {qx, qy} = this.queenLoc;
		let {qw, qh} = this.queenDim;
    let {queen, cellColor} = this.currentQueen;
		push();
		fill(cellColor);
		rect(x, y, w, h);
		if (this.hasQueen) {
			image(queen, qx, qy, qw, qh);
		}
		pop();
	};

	this.queenCanAttack = other => {
		let {r: x1, c: y1} = this.boardLoc;
		let {r: x2, c: y2} = other.boardLoc;
		return x1 === x2 || y1 === y2 || abs(x2 - x1) === abs(y2 - y1);
	};
}
