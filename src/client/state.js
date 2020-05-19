const Constants = require('../shared/constants');

var currentTool;

export function initState()
{
    currentTool = Constants.TOOL.PEN;  
}

export function setTool(newTool)
{
    console.log(newTool);
    currentTool = newTool;
}

export function getCurrentTool()
{
    return currentTool;
}