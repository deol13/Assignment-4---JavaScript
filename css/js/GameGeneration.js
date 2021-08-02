var divMap = document.createElement("div", );
divMap.setAttribute("id", "map")

var mapMaxHeight = 16;
var mapMaxWidth = 19;
var idPart2 = -1;
var idPart4 = -1;

document.addEventListener("DOMContentLoaded", creatingMap);

function creatingMap()
{
    for(let i = 0; i < mapMaxHeight; i++)
    {
        for(let j = 0; j < mapMaxWidth; j++)
        {
            let div = document.createElement("div")

            div = generateIds(div);

            divMap.appendChild(div);
        }
    }
    
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