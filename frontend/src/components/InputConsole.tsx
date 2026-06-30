import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputConsoleProps {
  activeCategory: string;
  userPrompt: string;
  setUserPrompt: (val: string) => void;
  genres: string[];
  selectedGenre: string;
  setSelectedGenre: (val: string) => void;
  customGenre: string;
  setCustomGenre: (val: string) => void;
  moods: string[];
  selectedMood: string;
  setSelectedMood: (val: string) => void;
  customMood: string;
  setCustomMood: (val: string) => void;
  count: number;
  setCount: (val: number) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function InputConsole({
  userPrompt,
  setUserPrompt,
  genres,
  selectedGenre,
  setSelectedGenre,
  customGenre,
  setCustomGenre,
  moods,
  selectedMood,
  setSelectedMood,
  customMood,
  setCustomMood,
  count,
  setCount,
  loading,
  onSubmit
}: InputConsoleProps) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Custom Request Textbox */}
      <div className="control-group">
        <label className="control-label">
          Custom User Request
          <span className="control-label-desc">Direct instructions to model</span>
        </label>
        <textarea
          className="prompt-textarea"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Enter custom context or theme rules..."
          required
          disabled={loading}
        />
      </div>

      {/* Quick Genre Pills */}
      <div className="control-group">
        <label className="control-label">
          Target Genre
          <span className="control-label-desc">Quick pills or enter custom</span>
        </label>
        <div className="pill-grid">
          {genres.map(g => (
            <button
              key={g}
              type="button"
              className={`pill ${selectedGenre === g && !customGenre ? 'selected' : ''}`}
              onClick={() => {
                setSelectedGenre(g);
                setCustomGenre('');
              }}
              disabled={loading}
            >
              {g}
            </button>
          ))}
          <input
            type="text"
            placeholder="Custom..."
            className="custom-input-inline"
            value={customGenre}
            onChange={(e) => setCustomGenre(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Quick Mood Pills */}
      <div className="control-group">
        <label className="control-label">
          Current Mood
          <span className="control-label-desc">Pills or write custom</span>
        </label>
        <div className="pill-grid">
          {moods.map(m => (
            <button
              key={m}
              type="button"
              className={`pill ${selectedMood === m && !customMood ? 'selected' : ''}`}
              onClick={() => {
                setSelectedMood(m);
                setCustomMood('');
              }}
              disabled={loading}
            >
              {m}
            </button>
          ))}
          <input
            type="text"
            placeholder="Custom..."
            className="custom-input-inline"
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {/* Count Slider */}
      <div className="control-group">
        <label className="control-label">
          Recommendation Quantity
          <span className="slider-val">{count}</span>
        </label>
        <div className="slider-container">
          <input
            type="range"
            min="2"
            max="10"
            className="count-slider"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            disabled={loading}
          />
        </div>
      </div>

      {/* Generate Recommendations Action */}
      <button type="submit" className="submit-btn" disabled={loading}>
        <Sparkles size={18} />
        <span>{loading ? 'Executing LangGraph Node...' : 'Compile & Generate'}</span>
      </button>

    </form>
  );
}
