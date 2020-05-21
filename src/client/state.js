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

    if (newTool === Constants.TOOL.PEN)
    {
        $(".tile").css('pointer-events', 'none');
    }
    else if (newTool === Constants.TOOL.DRAG)
    {
        $(".tile").css('pointer-events', 'auto');
    }

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