const admin = require('firebase-admin')

const args = process.argv.slice(2);

if (args.length != 1) {
    console.log('Firebase service account file required')
    console.log('nodejs aggregate_words.js <account-file>')
    process.exit(-1)
}

const serviceAccount = require(args[0]);

(async () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore()

    console.log('Firestore credentials ok')

    console.log('Reading sentences')

    const sentencesRef = await db.collection('sentences').get()

    const words = {}
    
    sentencesRef.forEach((sentence) => {
        const { text } = sentence.data()
        text.trim().split(' ').forEach(word => words[word] = (words[word] ?? 0) + 1)
    })

    Object.entries(words)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 100)
            .forEach((pair) => console.log(pair[0], pair[1]))
})();
