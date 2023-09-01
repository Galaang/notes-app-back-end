const { nanoid } = require("nanoid");
const notes = require("./notes");

// create note
const addNotesHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updateAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal ditambahkan',
    });

    // response.header('Access-Control-Allow-Origin', '*');

    response.code(500);
    return response;
};

// read note
const getAllNotesHandler = () => ({
    status: 'susscess',
    data: {
        notes,
    },
});


const getNoteByID = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'susccess',
            data: {
                note,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

// update note

const editNoteByID = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        const response = h.response({
            status: 'success',
            message: 'catatan berhasil diupdate',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan gagal diupdate',
    });
    response.code(400);
    return response;

};

// delete note
const deleteNoteByID = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((notes) => notes.id === id);

    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    if (index !== -1) {
        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    };
}

module.exports = { addNotesHandler, getAllNotesHandler, getNoteByID, editNoteByID, deleteNoteByID };