"use strict"

document.addEventListener('keydown', (e) => {
    let key = e;
    console.log(key.key);

    //If I use e as "key" inside the switch then it's inheirited funtions such as preventDefault are hidden
    switch (key.key) {
        case "ArrowUp":
            console.log(0, -1);
            e.preventDefault();
            checkCollison(0, -1);
            break;
        case "ArrowDown":
            console.log(0, 1);
            e.preventDefault();
            checkCollison(0, 1);
            break;
        case "ArrowLeft":
            console.log(-1, 0);
            e.preventDefault();
            checkCollison(-1, 0);
            break;
        case "ArrowRight":
            console.log(1, 0);
            e.preventDefault();
            checkCollison(1, 0);
            break;
        default:
            break;
    }
});

function checkCollison(changeInX, changeInY)
{
    var newPosId = getId(playerPosX + changeInX, playerPosY + changeInY)

    var element = document.getElementById(newPosId);

    if(element.classList.contains(Entities.Block))
    {
        
    }
    else if(element.classList.contains(Tiles.Space) || element.classList.contains(Tiles.Goal))
    {
        moveObject(changeInX, changeInY, playerPosX, playerPosY, Entities.Character);
        playerPosX += changeInX;
        playerPosY += changeInY;
        console.log("Player cord(x,y): " + playerPosX + "," + playerPosY);
    }
    //The last one is Wall but then nothing should happen.
    
    //Mutiliply both changeInX & Y by 2 when sending them in to the function that handles if player hit a boxs.
}

function moveObject(changeInX, changeInY, currentX, currentY, ClassName)
{
    var oldId = getId(currentX, currentY);
    changeClass(oldId, ClassName, false)

    var newX = currentX + changeInX;
    var newY = currentY + changeInY;

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
        element.classList.add(className);
    else
        element.classList.remove(className);

    return element;
}

function getId(x, y)
{
    return "x" + x + "y" + y;
}