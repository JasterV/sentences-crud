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

    rl.on('line', async (line) => {
        const sentence = JSON.parse(line)
        const sentencesRef = db.collection('sentences');
        const categoriesRef = db.collection('categories');

        const result = await sentencesRef.add({
            text: sentence.text
        })

        await categoriesRef.add({
            sentenceId: result.id,
            ...sentence.cats
        })
    });
})();
