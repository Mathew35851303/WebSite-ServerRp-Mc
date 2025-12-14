import { NextResponse } from 'next/server'

const API_URL = 'https://news.losnachoschipies.fr'

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/news`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Revalidate every 60 seconds
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Impossible de charger les actualités' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur API news:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
