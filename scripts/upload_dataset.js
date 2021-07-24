const admin = require('firebase-admin')
const serviceAccount = require("../.firebase.json");
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);

if (args.length != 1) {
    console.log('Dataset path required: ')
    console.log('nodejs upload_dataset.js <dataset-path>')
    process.exit(-1)
}

const dataFilePath = args[0]
    (async () => {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });

        const db = admin.firestore()

        console.log('Firestore credentials ok')

        const rl = readline.createInterface({
            input: fs.createReadStream(dataFilePath),
            output: process.stdout,
            terminal: false
        });

        console.log('Reading sentences.jsonl.txt')
        console.log('Importing data to firebase...')

        rl.on('line', async (line) => {
            const sentence = JSON.parse(line)
            const entry = Object.entries(sentence.cats).find((elem) => elem['1'] == 1)
            if (!entry) {
                console.log('Sentence: ', sentence, ' does not have a category')
                return
            }
            await db.collection('sentences').doc().set({
                text: sentence.text,
                category: entry[0]
            })
        });
    })();
