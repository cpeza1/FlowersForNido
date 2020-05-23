module.exports = Object.freeze({
    counter: 1,

    MSG_TYPES: {
        INPUT: 'input',
        GAME_UPDATE: 'update',
        JOIN_GAME: 'join_game',
        DRAG: 'drag',
        DROP:'drop',
        DRAG_LEAVE: 'drag_leave',
        ADD_LINE: 'add_line',
        REMOVE_LINE: 'remove_line',
        UPDATE_LINES: 'update_lines',
        UPDATE_DROP: 'update_drop',
        UPDATE_DRAGLEAVE: 'update_dragLeave',
        UPDATE_MAP: 'update_map'
    },

    TOOL: {
        ERASER: 'eraser',
        PEN: 'pen',
        DRAG: 'drag'
    }
});