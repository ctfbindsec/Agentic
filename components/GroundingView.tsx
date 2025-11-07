import React, { useState, useEffect } from 'react';
import { searchWithGrounding } from '../services/geminiService';
import Button from './ui/Button';
import Card from './ui/Card';
import Loader from './ui/Loader';
import { GroundingChunk } from '../types';

type SearchMode = 'web' | 'maps';

const GroundingView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SearchMode>('web');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'maps' && !location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setError('Could not get location. Please enable location services in your browser.');
          console.warn(`Geolocation error: ${err.message}`);
        }
      );
    }
  }, [mode, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResult('');
    setSources([]);
    setError('');

    try {
      const response = await searchWithGrounding(query, mode === 'maps' ? location : null);
      setResult(response.text);
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
         setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[]);
      }
    } catch (e) {
      setError('An error occurred during the search. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-text mb-2">Research Agent</h1>
      <p className="text-text-secondary mb-6">Get up-to-date information grounded in Google Search or Maps.</p>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="mode" value="web" checked={mode === 'web'} onChange={() => setMode('web')} className="form-radio text-primary bg-surface border-border focus:ring-primary" />
            <span>Web Search</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="mode" value="maps" checked={mode === 'maps'} onChange={() => setMode('maps')} className="form-radio text-primary bg-surface border-border focus:ring-primary" />
            <span>Maps Search</span>
          </label>
        </div>
      </form>

       <div className="flex-1 overflow-y-auto">
        <Card>
          {isLoading && <Loader text="Searching..." />}
          {error && <p className="text-red-400">{error}</p>}
          {result && (
            <div>
              <pre className="whitespace-pre-wrap font-sans text-text mb-6">{result}</pre>
              {sources.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-text-secondary border-t border-border pt-4">Sources:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {sources.map((source, index) => {
                       const uri = source.web?.uri || source.maps?.uri;
                       const title = source.web?.title || source.maps?.title;
                       if (!uri) return null;
                       return (
                           <li key={index}>
                               <a href={uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                 {title || uri}
                               </a>
                           </li>
                       );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
          {!isLoading && !result && !error && (
            <div className="text-center text-text-secondary py-16">
              <h3 className="text-lg font-semibold">Search results will appear here.</h3>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GroundingView;