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
    var playerMoveToId = getId(playerPosX + changeInX, playerPosY + changeInY)
    var playerMoveToElement = document.getElementById(playerMoveToId);

    if(classContains(playerMoveToElement, Entities.Block))
    {
        //changeInX & changeInY multiplied by 2 because we want to check the pos beyond the box. Where it tries to move to
        var moveBoxToID = getId(playerPosX + (changeInX*2), playerPosY + (changeInY*2));
        var elementMoveBoxTo = document.getElementById(moveBoxToID);

        if(!classContains(elementMoveBoxTo, Tiles.Wall) && !classContains(elementMoveBoxTo, Entities.Block))
        {
            //                               Box's old X pos         it's old Y pos
            moveObject(changeInX, changeInY, (playerPosX+changeInX), (playerPosY+changeInY), Entities.Block);
            movePlayer(changeInX, changeInY);

            //                      Box old element,    it's old pos,   box new element,  it's new pos
            checkIfBoxMovedToAGoal(playerMoveToElement, playerMoveToId, elementMoveBoxTo, moveBoxToID);
        }
    }
    else if(classContains(playerMoveToElement, Tiles.Space) || classContains(playerMoveToElement, Tiles.Goal))
    {
        movePlayer(changeInX, changeInY);
    }
    //The last one is Wall but then nothing should happen.
}

function checkIfBoxMovedToAGoal(element, newPosId, elementMoveBoxTo, moveBoxToID)
{
    //If the box's old pos also had a goal on it, then we should removes its done class
    if(classContains(element, Entities.BlockDone))
    {
        changeClass(newPosId, Entities.BlockDone, false);
    }
    //Is there a goal on the box's new pos? If so set the elements class to done
    if(classContains(elementMoveBoxTo, Tiles.Goal))
    {
        changeClass(moveBoxToID, Entities.BlockDone, true);
        didThePlayerWin();
    }
}

function didThePlayerWin()
{
    var count = 0;
    var element = document.getElementsByClassName(Tiles.Goal);

    //Loops through all goals and check if they all a block on them
    for (let index = 0; index < nrOfGoals; index++) 
    {
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

function classContains(element, what)
{
    return element.classList.contains(what)
}

function moveObject(changeInX, changeInY, currentX, currentY, ClassName)
{
    //Remove the specific class from the old pos
    var oldId = getId(currentX, currentY);
    changeClass(oldId, ClassName, false)

    var newX = currentX + changeInX;
    var newY = currentY + changeInY;

    //Add the specific class to the new pos
    var newId = getId(newX, newY);
    changeClass(newId, ClassName, true);
}

function changeClass(id, className, addName)
{
    var element = document.getElementById(id);

    //If true then add the class, if false, remove it
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