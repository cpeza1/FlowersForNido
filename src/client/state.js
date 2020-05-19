const Constants = require('../shared/constants');

var currentTool;
var currentLines = [];

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

export function getCurrentLines()
{
    return currentLines;
}

export function setCurrentLines(lines)
{
    currentLines = lines;
}