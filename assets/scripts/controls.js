function Controls(nQueen) {
	this.iterationSpeed;
	let controls = QuickSettings.create(10, 10, "BackTracking: N-Queens");
	this.toggleVisibility = () => void controls.toggleVisibility();
	controls.setCollapsible(true);
	this.toggleCollapsed = () => void controls.toggleCollapsed();

	controls.setWidth("230");
	controls.overrideStyle("BackTracking: N-Queens", "color", "red");

	controls.addHTML("img", queenImages());
	controls.hideTitle("img");

	controls.addHTML("readme", ReadMe());
	controls.hideTitle("readme");

	controls.addRange("Dimension", 4, 16, nQueen.N, 1, newN => {
		nQueen.N = newN;
		nQueen.createBoard();
		nQueen.iterator = nQueen.displayBoard();
	});

	controls.addDropDown("Select Mode", ["Find Solution", "Verify Solution"], ({index, label, value}) => {});
	controls.addButton("Find Solution", () => {});
	controls.addButton("Clear Board", () => {
		nQueen.clearBoard();
	});
	// controls.overrideStyle("Clear Board", "color", "red");
	// controls.overrideStyle("Clear Board", "borderColor", "red");
	// controls.overrideStyle("Clear Board", "width", "unset");
	// controls.overrideStyle("Clear Board", "borderRadius", "unset");
	// controls.overrideStyle("Clear Board", "height", "24px");
	// controls.overrideStyle("Clear Board", "marginLeft", "auto");

	let content = document.querySelector(".qs_content");
	let newContainer = document.createElement("div");
	newContainer.className = "qs_container";

  let clearButton = content.children[5];
	clearButton.remove();
  clearButton.style.borderRadius = '8px'
	let findSolutionButton = content.children[4];
  findSolutionButton.style.borderRadius = '8px';
	findSolutionButton.remove();

	newContainer.append(findSolutionButton);
	newContainer.append(clearButton);
	content.append(newContainer);

  newContainer.style.display = 'flex'

	// console.log(clearButton)
	// newContainer.append(clearButton.children[0]);
	// content.append(newContainer);

	//  controls.saveInLocalStorage("N-Queens Control Settings");
}

const ReadMe = () => {
	return `<details>
     <summary>
       <p>ReadMe</p>
     </summary>
     <ol>
       <li>
         <b>Drag</b> the Menu Title to move the Menu Panel.
       </li>
       <li>
         <b>Keyboard Shortcuts</b>
         <ol type='i'>
           <li>
             <b>C</b> to collapse or expand the Menu Panel.
           </li>
           <li>
             <b>H</b> to completely Hide or Unhide the Menu Panel.
           </li>
         </ol>
       </li>
       <li>
         <b>Dimension</b> specifies the number of rows and columns; (NxN).
       </li>
       <li>
         <b>Clear Board Button</b> Removes all Queens from the board.
       </li>
       <li>
         <b>Find Solution Mode:</b>
         <br /> Select to find a solution for the provided dimension.
       </li>
       <li>
         <b>Verify Solution Mode:</b>
         <br /> Select to verify that a solution is correct.
         <ul>
           <li>
             <b>Click</b> on a board cell to select or deselect the cell.
           </li>
           <li>
             <b>Only N</b> selections can be made. After which the selected cell colors changes.
           </li>
           <li>
             A <b>Red</b> color means the solution is wrong.
           </li>
           <li>
             A <b>Blue</b> color means the solution is correct.
           </li>
         </ul>
       </li>
     </ol>
   </details>`;
};

const queenImages = () => {
	return `<div class="image-container">
    <img src="/assets/images/black-queen.svg" height="60px" alt="black-queen"/>
    <img src="/assets/images/white-queen.svg" height="60px" alt="white-queen"/>
    <img src="/assets/images/blue-queen.svg" height="60px" alt="blue-queen"/>
    <img src="/assets/images/red-queen.svg" height="60px" alt="red-queen"/>
  </div>`;
};
