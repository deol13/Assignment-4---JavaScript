/*jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", creatingMap, false);

/*Because we loaded SokobanBase.js in the html file before this file, we can access its content directly.*/
function creatingMap()
{ 
    var divMap = document.createElement("div");
    divMap.setAttribute("id", "map");
    document.body.appendChild(divMap);
    let idPart2 = -1;
    let idPart4 = -1;

    for(let i = 0; i < tileMap01.height; i++)
    {
        for(let j = 0; j < tileMap01.width; j++)
        {
            let div = document.createElement("div");
            div = generateIds(div, idPart2, idPart4);

            let className = getRightClassName(div, i, j);

            if(className !== null)
                div.setAttribute("class", className); 

            divMap.appendChild(div);
        }
    }
}

function getRightClassName(div, x, y)
{
    let className = null;

    if(tileMap01.mapGrid[x][y].toString() === "W")
    {
        className = Tiles.Wall;
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "B")
    {
        className = Entities.Block;
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "G")
    {
        className = Tiles.Goal;
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "P")
    {
        className = Entities.Character;
    }
    else
    {
        className = Tiles.Space;
    }

    return div;
}

function generateIds(tile, idPart2, idPart4)
{
    let idPart1 = "x";
    let idPart3 = "y";

    if(idPart4 < tileMap01.width){
        idPart4++;
    }
    if(idPart2 < tileMap01.height){
        idPart2++;
    }

    let fullId  = idPart1 + idPart2 + idPart3 + idPart4;

    tile.setAttribute("id", fullId);

    return tile;
}