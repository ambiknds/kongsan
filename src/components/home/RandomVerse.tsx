import React, { useState, useEffect } from "react";
import axios from "axios";

interface VerseData {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

const RandomVerse: React.FC = () => {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRandomVerse = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://bible-api.com/?random=verse");
      console.log(response.data); // Debugging: Log the full API response
      setVerse({
        book_name: response.data.reference.split(" ")[0], // Extract book name from reference
        chapter: parseInt(response.data.reference.split(" ")[1].split(":")[0]), // Extract chapter
        verse: parseInt(response.data.reference.split(":")[1]), // Extract verse
        text: response.data.text,
      });
    } catch (err) {
      setError("Failed to fetch the verse. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-500 rounded-lg shadow-lg p-6 mb-8">
      <h1 className="text-2xl font-bold mb-4">Bible Verse for You</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {verse && (
        <div className="text-lg">
          <p className="italic">"{verse.text}"</p>
          <p className="text-right text-indigo-600 font-semibold">
            - {verse.book_name} {verse.chapter}:{verse.verse}
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomVerse;
