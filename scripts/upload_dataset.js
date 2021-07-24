const admin = require('firebase-admin')
const serviceAccount = require("../.firebase.json");
const fs = require('fs');
const readline = require('readline');

const DATA_FILE_PATH = 'scripts/sentences.jsonl.txt';

(async () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore()

    console.log('Firestore credentials ok')

    const rl = readline.createInterface({
        input: fs.createReadStream(DATA_FILE_PATH),
        output: process.stdout,
        terminal: false
    });

    console.log('Reading sentences.jsonl.txt')
    console.log('Importing data to firebase...')

    rl.on('line', async (line) => {
        const sentence = JSON.parse(line)
        const sentencesRef = db.collection('sentences');
        const entry = Object.entries(sentence.cats).find((elem) => elem['1'] == 1)
        if(!entry) {
            console.log('Sentence: ', sentence, ' does not have a category')
            return
        }
        await sentencesRef.add({
            text: sentence.text,
            category: entry['0']
        })
    });
    console.log('Done!')
})();
