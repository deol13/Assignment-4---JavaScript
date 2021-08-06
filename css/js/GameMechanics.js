"use strict"

document.addEventListener('keydown', (e) => {
    let key = e;

    //If I use e as "key" inside the switch then it's inheirited funtions such as preventDefault are hidden
    switch (key.key) {
        case "ArrowUp":
            e.preventDefault();
            checkCollison(0, -1);
            break;
        case "ArrowDown":
            e.preventDefault();
            checkCollison(0, 1);
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
    var newPosId = getId(playerPosX + changeInX, playerPosY + changeInY)

    var element = document.getElementById(newPosId);

    if(classContains(element, Entities.Block))
    {
        var moveBoxToID = getId(playerPosX + (changeInX*2), playerPosY + (changeInY*2));
        var elementMoveBoxTo = document.getElementById(moveBoxToID);

        if(boxCanBeMovedTo(elementMoveBoxTo))
        {
            moveObject(changeInX, changeInY, (playerPosX+changeInX), (playerPosY+changeInY), Entities.Block);
            movePlayer(changeInX, changeInY);

            if(classContains(elementMoveBoxTo, Tiles.Goal))
            {
                changeClass(moveBoxToID, Entities.BlockDone, true);
                didThePlayerWin();
            }
            if(classContains(element, Entities.BlockDone))
            {
                changeClass(newPosId, Entities.BlockDone, false);
            } 
        }
    }
    else if(classContains(element, Tiles.Space) || classContains(element, Tiles.Goal))
    {
        movePlayer(changeInX, changeInY);
    }
    //The last one is Wall but then nothing should happen.
}

function didThePlayerWin()
{
    var count = 0;
    var element = document.getElementsByClassName(Tiles.Goal);

    for (let index = 0; index < nrOfGoals; index++) 
    {
        console.log(element[index]);
        if(classContains(element[index], Entities.BlockDone))
        {
            count += classContains(element[index], Tiles.Goal) ? 1 : 0;
        } 
    }

    if(count === nrOfGoals)
    {
        //Pop up window
        window.alert("You won!");
    }
}

function movePlayer(changeInX, changeInY)
{
    moveObject(changeInX, changeInY, playerPosX, playerPosY, Entities.Character);
    playerPosX += changeInX;
    playerPosY += changeInY;
}

function boxCanBeMovedTo(element)
{
    if(classContains(element, Tiles.Wall) || classContains(element, Entities.Block))
    {
        return false;
    }
    return true;
}

function classContains(element, what)
{
    return element.classList.contains(what)
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