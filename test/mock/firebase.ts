import admin from 'firebase-admin';

import { mockFirebaseAdmin } from 'mock-firebase-ts';

const firebaseAdmin = mockFirebaseAdmin();

const app = firebaseAdmin.initializeApp({})

export const mockDb = app.firestore()


