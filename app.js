const tiles = $('.tile');
const header = $('.rgb');
const headerBackground = $('.header');
const displayResult = $('.result');
const resetButton = $('.reset');
const easyButton = $('.easy');
const hardButton = $('.hard');
const container = $('.container');
let colors = [];
let tilesNumber = 6;
let colorToGuess;

// ---- CHECKING THE RESULTS
const checkTheResult = (colorOfTile, tileIndex) => {
	if(colorOfTile === colorToGuess){
		tiles.removeClass('tile--failed');
		tiles.css({"background-color": `${colorToGuess}`});
		tiles.off("click");
		headerBackground.css({"background-color":`${colorToGuess}`});
		displayResult.text('WIN :\)');
	}else{
		tiles.eq(tileIndex).addClass('tile--failed');
		displayResult.text('WRONG :\(');
		tiles.eq(tileIndex).off("click");
	}
}

//---- GENERATE RANDOM COLOR:
const generateRandomColor = () => {
	const r = Math.floor(Math.random()*256);
	const g = Math.floor(Math.random()*256);
	const b = Math.floor(Math.random()*256);
	return `rgb(${r}, ${g}, ${b})`;
}
//---- GENERATE ARRAY OF RANDOM COLORS
const generateRandomColorsArray = () => {
	let randomColorsArray = [];
	while(randomColorsArray.length<tilesNumber){
		const randColor = generateRandomColor();
		if(randomColorsArray.indexOf(randColor) === -1){
			randomColorsArray.push(randColor);
		}
	}
	return randomColorsArray;
}
// ---- INITIALIZING OF TILES COLORS AND COLOR TO GUESS
const initOfTilesColorsAndColorToGuess = () => {
	colors = generateRandomColorsArray();
	for(let i=0; i<colors.length; i++){
		tiles.eq(i).css({"background-color": `${colors[i]}`})
	}
	if(tilesNumber === 3){
		for(let i=3; i<6; i++){
			tiles.eq(i).addClass('hidden');
		}
	}
	colorToGuess = colors[Math.floor(Math.random()*tilesNumber)];
}

// ---- GAME START
const initTheGame = () => {
	initOfTilesColorsAndColorToGuess();
	header.html(`${colorToGuess}`);
	for(let i=0; i<tilesNumber; i++){
		const colorOfTile = colors[i];
		tiles.eq(i).on("click", 
			checkTheResult.bind(this, colorOfTile, i));
	}
}
// ---- FIRST INIT
initTheGame(); 

// ---- BUTTONS ACTIONS
const resetTheGame = () => {
	for(let i=0; i<6; i++){
		tiles.eq(i).removeClass('tile--failed');
		tiles.eq(i).css({"background-color": null});
	}
	displayResult.text('Let\'s Start!');
	headerBackground.css({"background-color":"teal"});
	initTheGame();
}
resetButton.on("click", resetTheGame);

const switchToEasyMode = () => {
	tilesNumber = 3; 
	easyButton.addClass('active');
	hardButton.removeClass('active');
	resetTheGame();
}
easyButton.on("click", switchToEasyMode);

const switchToHardMode = () => {
	tilesNumber = 6;
	easyButton.removeClass('active');
	hardButton.addClass('active');
	for(let i=0; i<6; i++){
		tiles.eq(i).removeClass('hidden');
	}
	resetTheGame();
}
hardButton.on("click", switchToHardMode);