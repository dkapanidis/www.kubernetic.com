import { Trial } from "@components/models/Trial";

// Posts a Team trial request to the Go backend, which records it, issues the
// 30-day licence and emails it. Replaces the form's direct Firestore write.
//
// The fields are listed out rather than spread: the API rejects unknown
// properties, and the form carries a timestamp that the server sets itself.
async function createTrial(trial: Trial) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_TRIAL_URL}` as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: trial.name,
      email: trial.email,
      jobTitle: trial.jobTitle,
      country: trial.country,
      expectedUsers: trial.expectedUsers,
      phone: trial.phone,
      gdpr: trial.gdpr,
      terms: trial.terms,
    })
  })
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json()
}

export default { createTrial }
