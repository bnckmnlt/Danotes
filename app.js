// Initialize
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/sampleRoutes');
const createNote = require('./models/notesSchema');
const markdown = require('markdown').markdown;

let date = new Date();
let currMonth = date.getMonth() + 1;
let currDate = date.getDate();
if (currMonth < 10) {
  currMonth = `0${currMonth}`;
}
if (currDate < 10) {
  currDate = `0${currDate}`;
}
let fullDate = `${date.getFullYear()}-${currMonth}-${currDate}`;

function generateRandomString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function elapsedCreated(elapsedTime, elapsedMinutes) {}

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Connect MongoDB
const dbUrl =
  'mongodb+srv://admin:Pokemon23@notesdb.ddgnf0s.mongodb.net/note-db?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  createNote
    .findOne(req.notesList)
    .then((notes) => {
      let elapsedTime = [];
      let arraylist = [];
      const dateCreated = notes.notesList;
      for (let time of dateCreated) {
        arraylist.push(time.createdAt);
      }
      let currentTime = new Date();
      for (let createdAt of arraylist) {
        const timeDifference = currentTime - new Date(createdAt);
        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60)) + 8;
        const minutesAgo = Math.floor((timeDifference / (1000 * 60)) % 60) + 60;

        if (hoursAgo == 0) {
          elapsedTime.push(`${minutesAgo} minutes ago`);
        }
        if (hoursAgo > 24) {
          elapsedTime.push(`${Math.floor(hoursAgo / 24)} days ago`);
        }
        if (hoursAgo < 24 && hoursAgo != 0) {
          elapsedTime.push(`${hoursAgo} hrs ago`);
        }
      }

      res.render('index', { notes: notes.notesList, elapsedTime: elapsedTime });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/add_note', (req, res) => {
  let createId = generateRandomString(11);

  let noteDate = new Date();
  let mins = noteDate.getMinutes();
  let sec = noteDate.getSeconds();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (sec < 10) {
    sec = `0${sec}`;
  }
  let time = `${noteDate.getHours()}:${mins}:${sec}.${noteDate.getMilliseconds()}`;

  const newNote = Object.assign({}, req.body, {
    noteId: createId,
    title: req.body.title,
    content: req.body.content,
    dateCreated: fullDate,
    timeCreated: time,
    createdAt: `${fullDate}T${time}Z`,
  });

  const addNote = new createNote(newNote);

  createNote
    .updateOne(
      { _id: '63b3c3ad7b7a35d813065de7' },
      { $push: { notesList: newNote } }
    )
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use(routes);
