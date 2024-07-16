import { allSubdirectories } from './data.js';

const gamename = document.querySelector('.title').innerHTML;

const gamedata = allSubdirectories.filter(game => game.name.includes(gamename));

const gamecategory = gamedata.slice();

console.log(gamecategory);

