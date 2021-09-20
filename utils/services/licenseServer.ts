export type CheckoutForm = {
  clientName: string,
  clientCif: string,
  clientAddress: string,
  clientCity: string,
  clientPostalCode: string,
  country: string,
  licenses: number,
  taxPercent: number,
  type: "desktop" | "team" | "trial",
  checkoutType: "personal" | "commercial",
}

async function createSession(session: CheckoutForm) {
  let response = await fetch(`${process.env.NEXT_PUBLIC_LICENSESERVER_URL}` as string, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(session)
  })
  if (!response.ok) {
    throw await response.json()
  }
  return await response.json()
}

export default { createSession }
