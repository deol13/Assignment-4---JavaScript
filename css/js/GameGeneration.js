/*jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", creatingMap, false);



/*
for(let i = 0; i < tileMap01.height; i++)
{
    for(let j = 0; j < tileMap01.width; j++)
    {
        var asd = checkForObjectsInMapArray(i, j);
        console.log(i + "," + j + ": " + asd);
    }
}
*/





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
            let whichBlock = checkForObjectsInMapArray(i, j);

            let div = document.createElement("div");
            div = generateIds(div, idPart2, idPart4);

            console.log(i + "," + j + ": " + whichBlock);
            
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

    //console.log(tileMap01.mapGrid[x][y].toString());

    if(tileMap01.mapGrid[x][y].toString() === "W")
    {
        whichBlockFound = "W";
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "B")
    {
        whichBlockFound = "B";
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "G")
    {
        whichBlockFound = "G";
    }
    else if(tileMap01.mapGrid[x][y].toString()  === "P")
    {
        whichBlockFound = "P";
    }

    

    return whichBlockFound;
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
        div.setAttribute("class", className); 

    return div;
}