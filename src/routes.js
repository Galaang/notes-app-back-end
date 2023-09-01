const { addNotesHandler, getAllNotesHandler, getNoteByID, editNoteByID, deleteNoteByID } = require("./handler");

const routes = [
    // create note
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
        // options: {
        //     cors: {
        //         origin: ['*'],
        //     },
        // },
    },

    // read note
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },

    // lanjutan
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByID,
        
    },

    // update note
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByID,
        
    },

    // delete note
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByID,
    }
];

module.exports = routes;