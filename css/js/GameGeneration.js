"use strict";

document.addEventListener("DOMContentLoaded", creatingMap, false);

let idPart2 = -1;
let idPart4 = -1;

/*Because we loaded SokobanBase.js in the html file before this file, we can access its content directly.*/
function creatingMap()
{ 
    var divMap = document.createElement("div");

    divMap.id = "map";
    document.body.appendChild(divMap);
    

    for(let i = 0; i < tileMap01.height; i++) //Y
    {
        idPart4++;

        for(let j = 0; j < tileMap01.width; j++) //X
        {
            idPart2++;

            let newDiv = document.createElement("div");
            newDiv = generateIds(newDiv);
            newDiv = getRightClassName(tileMap01.mapGrid[i][j][0], newDiv);

            if(newDiv.classList.contains("Entities.Character"))
            {
                playerPosX = j;
                playerPosY = i;
                console.log("x: " + j + ", y: " + i)
            }

            console.log(newDiv.classList.toString());

            divMap.appendChild(newDiv);
        }
        idPart2 = -1;
    }
}

//BlockDone: "entity-block-goal" should be set to blocks  that are inside a goal and change their color. You can still move them.

//Remake to switch, send in tileMap01.mapGrid[y][x][0] as an argument so I only have content as parameter
//key = content which should contain a string
function getRightClassName(typeOfBlock, element)
{
    let className = null;
    let className2 = null;

    switch (typeOfBlock) {
        case 'W':
            className = Tiles.Wall;
            break;
        case 'B':
            className = Entities.Block;
            className2 = Tiles.Space;
            break;
        case 'G':
            className = Tiles.Goal;
            break;
        case 'P':
            className = Entities.Character;
            className2 = Tiles.Space;
            break;
        case ' ':
            className = Tiles.Space;
            break;
        default:
            break;
    }

    element.classList.add(className);
    if(className2 !== null)
        element.classList.add(className2);

    return element;
}

function generateIds(tile)
{
    let idPart1 = "x";
    let idPart3 = "y";

    let fullId  = idPart1 + idPart2 + idPart3 + idPart4;

    tile.id = fullId;

    return tile;
}