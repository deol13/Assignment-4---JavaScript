"use strict"

document.addEventListener('keydown', (e) => {
    let key = e;

    //If I use e as "key" inside the switch then it's inheirited funtions such as preventDefault are hidden
    switch (key) {
        case "ArrowUp":
            e.preventDefault();
            checkCollison(0, 1);
            break;
        case "ArrowDown":
            e.preventDefault();
            checkCollison(0, -1);
            break;
        case "ArrowLeft":
            e.preventDefault();
            checkCollison(-1, 0);
            break;
        case "ArrowRight":
            e.preventDefault();
            checkCollison(1, 0);
            break;
        default:
            break;
    }
});

function checkCollison(changeInX, changeInY)
{
    newPosId = getId(playerPosX + changeInX, playerPosY + changeInY)

    var element = document.getElementById(newPosId);

    if(element.contains(Tiles.Space) || element.contains(Tiles.Goal))
    {

    }
    else if(element.contains(Entities.Block))
    {
        
    }
    //The last one is Wall but then nothing should happen.
}

function moveObject(changeInX, changeInY, currentX, currentY, ClassName)
{
    var oldId = getId(currentX, currentY);
    changeClass(oldId, ClassName, false)

    newX = currentX + changeInX;
    newY = currentY + changeInY;

    var newId = getId(newX, newY);
    changeClass(newId, ClassName, true);
}
/*
function movePlayer(changeInX, changeInY, currentX, currentY)
{
    var oldId = getId(playerPosX, playerPosY);
    changeClass(oldId ,Entities.Character, false)

    playerPosX += changeInX;
    playerPosY += changeInY;

    var newId = getId(playerPosX, playerPosY);
    changeClass(newId, Entities.Character, true);
    
    console.log(playerPosX);
    console.log(playerPosY);
}
*/


function changeClass(id, className, addName)
{
    var element = document.getElementById(id);

    if(addName)
        element.item().classList.add(className);
    else
        element.item().classList.remove(className);

    return newElement;
}

function getId(x, y)
{
    return "x" + x + "y" + y;
}