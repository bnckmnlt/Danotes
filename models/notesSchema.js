const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    notesList: [],
  },
  { timestamps: true }
);

const createNote = mongoose.model('notes', notesSchema);

module.exports = createNote;
