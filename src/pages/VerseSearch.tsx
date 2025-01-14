'use client'

import { useState } from 'react'

export default function BibleApp() {
  const [query, setQuery] = useState('')
  const [verses, setVerses] = useState<Array<{ text: string; reference: string }>>([])
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setVerses([])
    setError('')

    try {
      const response = await fetch(`https://api.esv.org/v3/passage/search/?q=${encodeURIComponent(query)}&page-size=10`, {
        headers: {
          'Authorization': 'Token 48af79ab745167562e0b7c489719651ca8dce6ea'
        }
      })
      const data = await response.json()

      if (data.results && data.results.length > 0) {
        const fetchedVerses = data.results.map((result: any) => ({
          text: result.content,
          reference: result.reference
        }))
        setVerses(fetchedVerses)
      } else {
        setError('No matching verses found.')
      }
    } catch (err) {
      setError('An error occurred while fetching the verses.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bible Verse Finder</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter words or phrases"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </form>
      {verses.length > 0 && (
        <div className="space-y-4">
          {verses.map((verse, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <p className="mb-2">{verse.text}</p>
              <p className="text-sm text-gray-600">{verse.reference}</p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

