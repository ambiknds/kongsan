import { useState, useEffect } from "react";
import axios from "axios";

export default function RandomVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomVerse = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://bible-api.com/?random=verse");
      setVerse({
        book_name: response.data.reference.split(" ")[0],
        chapter: parseInt(response.data.reference.split(" ")[1].split(":")[0]),
        verse: parseInt(response.data.reference.split(":")[1]),
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
      <h1 className="text-2xl text-center font-bold mb-4">Bible Verse for You</h1>
      {loading && <p className="mx-auto"></p>}
      {error && <p className="text-red-500 mx-auto">{error}</p>}
      {verse && (
        <div className="bg-slate-200 text-lg max-w-2xl mx-auto border shadow-xl rounded-lg p-8">
          <p className="italic">"{verse.text}"</p>
          <p className="text-right text-indigo-600 font-semibold">
            - {verse.book_name} {verse.chapter}:{verse.verse}
          </p>
        </div>
      )}
    </div>
  );
}
