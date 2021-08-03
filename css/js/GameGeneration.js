/*jshint esversion: 6 */

var divMap = document.createElement("div");
divMap.setAttribute("id", "map");

document.body.appendChild(divMap);

var idPart2 = -1;
var idPart4 = -1;

document.addEventListener("DOMContentLoaded", creatingMap);

/*Because we loaded SokobanBase.js in the html file before this file, we can access its content directly.*/
function creatingMap()
{ 
    for(let i = 0; i < tileMap01.height; i++)
    {
        for(let j = 0; j < tileMap01.width; j++)
        {
            let whichBlock = checkForObjectsInMapArray(i, j);

            let div = document.createElement("div");
            div = generateIds(div);

            if(whichBlock !== null)
            {
                div = generateClass(div, whichBlock);
            }
            else
            {
                div = generateClass(div, "Space");
            }

            divMap.appendChild(div);
        }
    }
}


function checkForObjectsInMapArray(x, y)
{
    let whichBlockFound = null;

    if(tileMap01.mapGrid[x][y] === "W")
    {
        whichBlockFound = "W";
    }
    else if(tileMap01.mapGrid[x][y] === "B")
    {
        whichBlockFound = "B";
    }
    else if(tileMap01.mapGrid[x][y] === "G")
    {
        whichBlockFound = "G";
    }
    else if(tileMap01.mapGrid[x][y] === "P")
    {
        whichBlockFound = "P";
    }

    return whichBlockFound;
}

function generateIds(tile)
{
    let idPart1 = "x";
    let idPart3 = "y";

    if(idPart2 < mapMaxWidth){
        idPart2++;
    }
    if(idPart4 < mapMaxHeight){
        idPart2++;
    }


    let fullId  = idPart1 + idPart2 + idPart3 + idPart4;

    tile.setAttribute("id", fullId);

    return tile;
}

function generateClass(div, whichBlock)
{
    let className = null;

    switch(whichBlock)
    {
        case "W":
            className = Tiles.Wall;
            break;
        case "B":
            className = Entities.Block;
            break;
        case "P":
            className = Entities.Character;
            break;
        case "G":
            className = Tiles.Goal;
            break;
        case "Space":
            className = Tiles.Space;
            break;
        default:
            break;
    }

    if(className !== null)
        div.generateClass(className); 

    return div;
}