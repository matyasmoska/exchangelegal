import admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Using JSON to handle newline problems when storing the
        // key as a secret in Vercel. See:
        // https://github.com/vercel/vercel/issues/749#issuecomment-707515089
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined
      })
    })
  } catch (error) {
    console.error('Firebase admin initialization error', error)
  }
}

export default admin.firestore()
