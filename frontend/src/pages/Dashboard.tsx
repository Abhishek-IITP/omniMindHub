import React, { useState, useEffect } from 'react';
import { 
  Film, 
  BookOpen, 
  Music, 
  Gamepad2, 
  Star, 
  Clock, 
  Sun, 
  Moon, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  SlidersHorizontal, 
  X, 
  Check, 
  Info, 
  Activity, 
  Copy, 
  Terminal, 
  AlignLeft, 
  Code 
} from 'lucide-react';

import { Category, RecommendedItem, RecommendationsResponse, TimelineStep } from '../types';
import { GENRES, MOODS, generateDynamicMockData } from '../utils/mockData';

import RecommendationCard from '../components/RecommendationCard';
import RecommendationDetails from '../components/RecommendationDetails';
import MarkdownViewer from '../components/MarkdownViewer';
import JSONViewer from '../components/JSONViewer';

const CATEGORIES: Category[] = [
  { id: 'movies', label: 'Movies & Cinema', icon: Film, defaultPrompt: 'Suggest mind-bending sci-fi movies like Inception' },
  { id: 'books', label: 'Literature & Books', icon: BookOpen, defaultPrompt: 'Suggest epic fantasy books with deep worldbuilding' },
  { id: 'music', label: 'Tracks & Music', icon: Music, defaultPrompt: 'Suggest ambient electronic music tracks for studying' },
  { id: 'games', label: 'Interactive & Games', icon: Gamepad2, defaultPrompt: 'Suggest immersive story-rich adventure games' }
];

export interface FavoriteItem {
  id: string;
  category: string;
  item: RecommendedItem;
}

export interface RecentGeneration {
  id: string;
  category: string;
  userPrompt: string;
  genre: string;
  mood: string;
  count: number;
  results: RecommendationsResponse;
  timestamp: string;
}

interface DashboardProps {
  onBackToLanding: () => void;
}

export default function Dashboard({ onBackToLanding }: DashboardProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('omnimind_theme') as 'dark' | 'light') || 'dark');
  const [activeCategory, setActiveCategory] = useState<string>('movies');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [count, setCount] = useState<number>(5);
  const [customGenre, setCustomGenre] = useState<string>('');
  const [customMood, setCustomMood] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<RecommendationsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'ui' | 'markdown' | 'json'>('ui');
  const [copied, setCopied] = useState<boolean>(false);
  const [resultsTimestamp, setResultsTimestamp] = useState<number>(Date.now());

  // Layout toggles
  const [showFavoritesDrawer, setShowFavoritesDrawer] = useState<boolean>(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [sandboxMode, setSandboxMode] = useState<boolean>(false);

  // Favorites state
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('omnimind_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Recent Runs state
  const [recentRuns, setRecentRuns] = useState<RecentGeneration[]>(() => {
    const saved = localStorage.getItem('omnimind_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Agent visualizer timeline states
  const [timeline, setTimeline] = useState<TimelineStep[]>([]);

  // Update prompt and reload when changing category
  useEffect(() => {
    const category = CATEGORIES.find(c => c.id === activeCategory);
    if (category) {
      setSelectedGenre(GENRES[activeCategory][0]);
      setSelectedMood(MOODS[activeCategory][0]);
      setCustomGenre('');
      setCustomMood('');
      
      setResults(null);
      setError(null);
      setSelectedItemIndex(0);
      setShowDetails(false);
    }
  }, [activeCategory]);

  // Remount grid on results updates
  useEffect(() => {
    setResultsTimestamp(Date.now());
  }, [results]);

  // Initialize theme on mount & theme updates
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('omnimind_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync history to localStorage
  useEffect(() => {
    localStorage.setItem('omnimind_history', JSON.stringify(recentRuns));
  }, [recentRuns]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('omnimind_theme', newTheme);
  };

  const getCurrentTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + String(now.getMilliseconds()).padStart(3, '0');
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const startTimelineSimulation = async (isSandbox: boolean) => {
    const steps: TimelineStep[] = [
      { id: '1', label: 'Initializing LangGraph multi-agent node...', status: 'active', time: getCurrentTimestamp() },
      { id: '2', label: 'Compiling prompt template & parameters...', status: 'idle' },
      { 
        id: '3', 
        label: isSandbox 
          ? 'Calling Local Mock Simulator (Backend offline)...' 
          : 'Invoking Gemini 2.5 Flash model...', 
        status: 'idle' 
      },
      { id: '4', label: 'Validating output structure via Zod schema...', status: 'idle' },
      { id: '5', label: 'Formatting recommendations & rendering UI...', status: 'idle' },
    ];
    setTimeline(steps);

    const updateStep = (id: string, updates: Partial<TimelineStep>) => {
      setTimeline(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    await delay(350);
    updateStep('1', { status: 'completed' });
    updateStep('2', { status: 'active', time: getCurrentTimestamp() });

    await delay(350);
    updateStep('2', { status: 'completed' });
    updateStep('3', { status: 'active', time: getCurrentTimestamp() });

    return { updateStep };
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedItemIndex(0);
    setShowDetails(false);

    const genreVal = customGenre.trim() || selectedGenre;
    const moodVal = customMood.trim() || selectedMood;

    let timelineHelpers;
    
    if (sandboxMode) {
      try {
        timelineHelpers = await startTimelineSimulation(true);
        await delay(1200);
        
        timelineHelpers.updateStep('3', { status: 'completed' });
        timelineHelpers.updateStep('4', { status: 'active', time: getCurrentTimestamp() });
        await delay(400);
        
        timelineHelpers.updateStep('4', { status: 'completed' });
        timelineHelpers.updateStep('5', { status: 'active', time: getCurrentTimestamp() });
        await delay(300);

        timelineHelpers.updateStep('5', { status: 'completed' });

        const mockResult = generateDynamicMockData(activeCategory, genreVal, moodVal, count, userPrompt);
        setResults(mockResult);
        
        addRecentRun(activeCategory, userPrompt, genreVal, moodVal, count, mockResult);
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      timelineHelpers = await startTimelineSimulation(false);

      const apiBase = import.meta.env.VITE_BACKEND_URL || (import.meta.env.DEV ? '' : 'https://omnimindhub.onrender.com');
      const endpoint = apiBase 
        ? `${apiBase.replace(/\/$/, '')}/api/recommend/${activeCategory}` 
        : `/api/recommend/${activeCategory}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPrompt,
          genre: genreVal,
          mood: moodVal,
          count: count
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status} (${response.statusText || 'Internal Server Error'})`);
      }

      const data = await response.json();
      
      timelineHelpers.updateStep('3', { status: 'completed' });
      timelineHelpers.updateStep('4', { status: 'active', time: getCurrentTimestamp() });
      await delay(400);
      
      timelineHelpers.updateStep('4', { status: 'completed' });
      timelineHelpers.updateStep('5', { status: 'active', time: getCurrentTimestamp() });
      await delay(300);

      timelineHelpers.updateStep('5', { status: 'completed' });

      setResults(data);
      
      addRecentRun(activeCategory, userPrompt, genreVal, moodVal, count, data);
    } catch (err: any) {
      console.error("API Error during generation:", err);
      
      if (timelineHelpers) {
        timelineHelpers.updateStep('3', { 
          status: 'failed', 
          label: `Failed: Model call offline or timed out.` 
        });
      }

      setError(err.message || 'An error occurred while generating recommendations. Please ensure the backend server is running and the Gemini API key is correctly configured.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const addRecentRun = (cat: string, prompt: string, genre: string, mood: string, itemNum: number, resData: any) => {
    const newRun: RecentGeneration = {
      id: String(Date.now()),
      category: cat,
      userPrompt: prompt,
      genre,
      mood,
      count: itemNum,
      results: resData,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setRecentRuns(prev => {
      const filtered = prev.filter(item => item.userPrompt !== prompt || item.category !== cat);
      return [newRun, ...filtered].slice(0, 10);
    });
  };

  const handleToggleFavorite = (item: RecommendedItem) => {
    const favId = `${activeCategory}-${item.title}-${item.year}`;
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === favId);
      if (exists) {
        return prev.filter(fav => fav.id !== favId);
      } else {
        const newFav: FavoriteItem = {
          id: favId,
          category: activeCategory,
          item
        };
        return [newFav, ...prev];
      }
    });
  };

  const handleSelectFavorite = (fav: FavoriteItem) => {
    setActiveCategory(fav.category);
    setResults({
      [fav.category]: [fav.item]
    });
    setSelectedItemIndex(0);
    setError(null);
    setShowDetails(true);
  };

  const handleRemoveFavorite = (favId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favId));
  };

  const handleSelectRun = (run: RecentGeneration) => {
    setActiveCategory(run.category);
    setUserPrompt(run.userPrompt);
    setCustomGenre('');
    setCustomMood('');
    
    if (GENRES[run.category].includes(run.genre)) {
      setSelectedGenre(run.genre);
    } else {
      setCustomGenre(run.genre);
    }

    if (MOODS[run.category].includes(run.mood)) {
      setSelectedMood(run.mood);
    } else {
      setCustomMood(run.mood);
    }

    setCount(run.count);
    setResults(run.results);
    setSelectedItemIndex(0);
    setError(null);
    setShowDetails(false);
  };

  const getGenericData = (item: RecommendedItem, type: string) => {
    switch (type) {
      case 'books':
        return {
          title: item.title,
          subtitle: item.author || 'Unknown Author',
          subtitleLabel: 'Author',
          meta: `Published in ${item.year}`,
          tags: item.genre || [],
          rating: item.rating,
          reason: item.reason,
          extraLabel: 'Categories',
          extraValues: item.genre || []
        };
      case 'music':
        return {
          title: item.title,
          subtitle: item.artist || 'Unknown Artist',
          subtitleLabel: 'Artist',
          meta: `Released in ${item.year}`,
          tags: item.genre || [],
          rating: item.rating,
          reason: item.reason,
          extraLabel: 'Tracks/Album Info',
          extraValues: item.genre || []
        };
      case 'games':
        return {
          title: item.title,
          subtitle: item.developer || 'Unknown Developer',
          subtitleLabel: 'Developer',
          meta: `Released in ${item.year}`,
          tags: item.genre || [],
          rating: item.rating,
          reason: item.reason,
          extraLabel: 'Platforms',
          extraValues: item.platforms || []
        };
      case 'movies':
      default:
        return {
          title: item.title,
          subtitle: item.cast ? item.cast.slice(0, 3).join(', ') : '',
          subtitleLabel: 'Starring',
          meta: `Released in ${item.year}`,
          tags: item.genre || [],
          rating: item.rating,
          reason: item.reason,
          extraLabel: 'Featured Cast',
          extraValues: item.cast || []
        };
    }
  };

  const currentItems = results ? (results[activeCategory as keyof RecommendationsResponse] || []) : [];
  const selectedItem = currentItems[selectedItemIndex];
  const selectedDetails = selectedItem ? getGenericData(selectedItem, activeCategory) : null;

  const generateMarkdown = () => {
    if (!results) return '';
    const items = results[activeCategory as keyof RecommendationsResponse] || [];
    let md = `# AI Recommendations: ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}\n`;
    md += `*Prompt: "${userPrompt}" | Mood: ${customMood.trim() || selectedMood} | Genre: ${customGenre.trim() || selectedGenre}*\n\n`;
    
    items.forEach((item, idx) => {
      md += `### ${idx + 1}. ${item.title} (${item.year})\n`;
      if (activeCategory === 'movies') {
        md += `- **Cast**: ${item.cast?.join(', ')}\n`;
      } else if (activeCategory === 'books') {
        md += `- **Author**: ${item.author}\n`;
      } else if (activeCategory === 'music') {
        md += `- **Artist**: ${item.artist}\n`;
      } else if (activeCategory === 'games') {
        md += `- **Developer**: ${item.developer}\n`;
        md += `- **Platforms**: ${item.platforms?.join(', ')}\n`;
      }
      md += `- **Gemini AI Rating**: ${item.rating}/10\n`;
      md += `- **Orchestrator Analysis**: ${item.reason}\n\n`;
    });
    return md;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container app-horizontal-layout">
      {/* Top Navigation Bar */}
      <header className="horizontal-header">
        <div className="header-brand" onClick={onBackToLanding}>
          <span className="logo-spark">✨</span>
          <span className="brand-title">OmniMind Hub</span>
        </div>

        <div className="header-nav-categories">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`nav-category-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setUserPrompt('');
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="header-actions">
          <button 
            className={`header-action-btn ${showFavoritesDrawer ? 'active' : ''}`}
            onClick={() => {
              setShowFavoritesDrawer(!showFavoritesDrawer);
              setShowHistoryDrawer(false);
            }}
            title="Saved Favorites"
          >
            <Star size={15} fill={favorites.length > 0 ? 'var(--accent-color)' : 'none'} stroke="currentColor" />
            <span>Saved</span>
            {favorites.length > 0 && <span className="action-badge">{favorites.length}</span>}
          </button>

          <button 
            className={`header-action-btn ${showHistoryDrawer ? 'active' : ''}`}
            onClick={() => {
              setShowHistoryDrawer(!showHistoryDrawer);
              setShowFavoritesDrawer(false);
            }}
            title="Query History"
          >
            <Clock size={15} />
            <span>History</span>
          </button>

          <button className="header-action-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button className="header-action-btn back-btn" onClick={onBackToLanding} title="Exit Recommender">
            <Home size={15} />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="main-workspace-horizontal">
        {/* Horizontal Control Shelf */}
        <form onSubmit={handleGenerate} className="horizontal-control-shelf">
          <div className="search-bar-row">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder={`Ask the ${activeCategory} recommender agent (e.g., "${CATEGORIES.find(c => c.id === activeCategory)?.defaultPrompt || ''}")`}
                className="horizontal-prompt-textarea"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate(e as any);
                  }
                }}
              />
            </div>
            
            <button 
              type="button" 
              className={`filter-toggle-btn ${filtersExpanded ? 'expanded' : ''}`}
              onClick={() => setFiltersExpanded(!filtersExpanded)}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {filtersExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <button type="submit" className="generate-pill-btn" disabled={loading || !userPrompt.trim()}>
              <span>{loading ? 'Orchestrating...' : 'Generate'}</span>
            </button>
          </div>

          {/* Expanded parameters tray */}
          {filtersExpanded && (
            <div className="filters-tray-expanded">
              <div className="filter-group">
                <label>Genre Profile</label>
                <div className="pill-selector">
                  {GENRES[activeCategory].map(g => (
                    <button
                      key={g}
                      type="button"
                      className={`pill-btn ${selectedGenre === g && !customGenre ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedGenre(g);
                        setCustomGenre('');
                      }}
                    >
                      {g}
                    </button>
                  ))}
                  <input
                    type="text"
                    value={customGenre}
                    onChange={(e) => setCustomGenre(e.target.value)}
                    placeholder="Custom Genre..."
                    className="custom-filter-input"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Mood Profiler</label>
                <div className="pill-selector">
                  {MOODS[activeCategory].map(m => (
                    <button
                      key={m}
                      type="button"
                      className={`pill-btn ${selectedMood === m && !customMood ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedMood(m);
                        setCustomMood('');
                      }}
                    >
                      {m}
                    </button>
                  ))}
                  <input
                    type="text"
                    value={customMood}
                    onChange={(e) => setCustomMood(e.target.value)}
                    placeholder="Custom Mood..."
                    className="custom-filter-input"
                  />
                </div>
              </div>

              <div className="filter-group count-filter-group">
                <div className="count-label-row">
                  <label>Quantity</label>
                  <span className="count-value">{count} items</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="premium-range-slider"
                />
              </div>

              <div className="filter-group sandbox-filter-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={sandboxMode}
                    onChange={(e) => setSandboxMode(e.target.checked)}
                    className="premium-checkbox"
                  />
                  <span>Simulate sandbox model responses (offline)</span>
                </label>
              </div>
            </div>
          )}
        </form>

        {/* Dynamic Display Area */}
        <div className="display-stage-horizontal">
          {/* Welcome Screen */}
          {!loading && !results && !error && (
            <div className="empty-horizontal-stage">
              <div className="empty-stage-center">
                <div className="pulse-hub-logo">
                  <Activity size={32} />
                </div>
                <h3>OmniMind AI Recommender Hub</h3>
                <p>
                  Input your customized semantic query in the bar above, toggle filters, and click <strong>Generate</strong> to spin up the LangGraph model.
                </p>
              </div>
            </div>
          )}

          {/* Error Screen */}
          {!loading && error && (
            <div className="empty-horizontal-stage error-stage">
              <div className="empty-stage-center">
                <div className="error-hub-logo">
                  <Info size={32} />
                </div>
                <h3>Model Generation Failed</h3>
                <p className="error-message-detail">{error}</p>
                <div className="troubleshoot-guide-card">
                  <strong>Troubleshooting Guide:</strong>
                  <ul>
                    <li>Confirm that your backend Express server is running (run <code>npm run dev</code> inside <code>/backend</code>).</li>
                    <li>Ensure the Vite dev server proxy target matches the backend port in <code>frontend/vite.config.ts</code>.</li>
                    <li>Check if your <code>GEMINI_API_KEY</code> is correctly set in <code>backend/.env</code>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Interactive UI Screen */}
          {!loading && results && activeTab === 'ui' && (
            <div className="recommendations-wrapper-horizontal">
              <div className="artifact-tabs horizontal-tabs">
                <button className="artifact-tab-btn active">
                  <AlignLeft size={13} style={{ marginRight: '4px' }} />
                  <span>Interactive Cards</span>
                </button>
                <button className="artifact-tab-btn" onClick={() => setActiveTab('markdown')}>
                  <Terminal size={13} style={{ marginRight: '4px' }} />
                  <span>Markdown Output</span>
                </button>
                <button className="artifact-tab-btn" onClick={() => setActiveTab('json')}>
                  <Code size={13} style={{ marginRight: '4px' }} />
                  <span>Raw JSON</span>
                </button>
              </div>

              <div className="recommendations-grid" key={resultsTimestamp}>
                {currentItems.map((item, idx) => {
                  const generic = getGenericData(item, activeCategory);
                  const isFav = favorites.some(fav => fav.id === `${activeCategory}-${item.title}-${item.year}`);
                  return (
                    <RecommendationCard
                      key={idx}
                      title={generic.title}
                      subtitle={generic.subtitle}
                      meta={generic.meta}
                      tags={generic.tags}
                      rating={generic.rating}
                      reason={generic.reason}
                      isFavorited={isFav}
                      onToggleFavorite={() => handleToggleFavorite(item)}
                      onClick={() => {
                        setSelectedItemIndex(idx);
                        setShowDetails(true);
                      }}
                      index={idx}
                    />
                  );
                })}
              </div>

              {showDetails && selectedDetails && selectedItem && (
                <RecommendationDetails
                  title={selectedDetails.title}
                  subtitle={selectedDetails.subtitle}
                  subtitleLabel={selectedDetails.subtitleLabel}
                  meta={selectedDetails.meta}
                  rating={selectedDetails.rating}
                  reason={selectedDetails.reason}
                  extraLabel={selectedDetails.extraLabel}
                  extraValues={selectedDetails.extraValues}
                  activeCategory={activeCategory}
                  isFavorited={favorites.some(fav => fav.id === `${activeCategory}-${selectedItem.title}-${selectedItem.year}`)}
                  onToggleFavorite={() => handleToggleFavorite(selectedItem)}
                  onClose={() => setShowDetails(false)}
                />
              )}
            </div>
          )}

          {/* Markdown View Screen */}
          {!loading && results && activeTab === 'markdown' && (
            <div className="recommendations-wrapper-horizontal doc-viewer-horizontal">
              <div className="artifact-tabs horizontal-tabs">
                <button className="artifact-tab-btn" onClick={() => setActiveTab('ui')}>
                  <AlignLeft size={13} style={{ marginRight: '4px' }} />
                  <span>Interactive Cards</span>
                </button>
                <button className="artifact-tab-btn active">
                  <Terminal size={13} style={{ marginRight: '4px' }} />
                  <span>Markdown Output</span>
                </button>
                <button className="artifact-tab-btn" onClick={() => setActiveTab('json')}>
                  <Code size={13} style={{ marginRight: '4px' }} />
                  <span>Raw JSON</span>
                </button>
                
                <button className="copy-doc-btn" onClick={handleCopyMarkdown}>
                  {copied ? <Check size={12} style={{ color: 'var(--success-color)' }} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="doc-viewer-scroll">
                <MarkdownViewer 
                  content={generateMarkdown()} 
                  copied={copied}
                  onCopy={handleCopyMarkdown}
                />
              </div>
            </div>
          )}

          {/* Raw JSON View Screen */}
          {!loading && results && activeTab === 'json' && (
            <div className="recommendations-wrapper-horizontal doc-viewer-horizontal">
              <div className="artifact-tabs horizontal-tabs">
                <button className="artifact-tab-btn" onClick={() => setActiveTab('ui')}>
                  <AlignLeft size={13} style={{ marginRight: '4px' }} />
                  <span>Interactive Cards</span>
                </button>
                <button className="artifact-tab-btn" onClick={() => setActiveTab('markdown')}>
                  <Terminal size={13} style={{ marginRight: '4px' }} />
                  <span>Markdown Output</span>
                </button>
                <button className="artifact-tab-btn active">
                  <Code size={13} style={{ marginRight: '4px' }} />
                  <span>Raw JSON</span>
                </button>
              </div>

              <div className="doc-viewer-scroll">
                <JSONViewer 
                  content={results} 
                  copied={copied}
                  onCopy={handleCopyJSON}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Slide-over Favorites Drawer */}
      <div className={`slide-drawer ${showFavoritesDrawer ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Star size={16} fill="var(--accent-color)" stroke="var(--accent-color)" />
            <h3>Saved Favorites</h3>
          </div>
          <button className="drawer-close-btn" onClick={() => setShowFavoritesDrawer(false)}>
            <X size={16} />
          </button>
        </div>
        <div className="drawer-content">
          {favorites.length === 0 ? (
            <div className="drawer-empty-state">
              <p>No favorites saved yet.</p>
              <span>Toggle the star button inside cards to save your recommendations here.</span>
            </div>
          ) : (
            <div className="drawer-list">
              {favorites.map(fav => {
                const generic = getGenericData(fav.item, fav.category);
                return (
                  <div key={fav.id} className="drawer-item" onClick={() => {
                    handleSelectFavorite(fav);
                    setShowFavoritesDrawer(false);
                  }}>
                    <div className="drawer-item-info">
                      <h4>{generic.title}</h4>
                      <span>{fav.category.toUpperCase()} • {generic.subtitle}</span>
                    </div>
                    <button 
                      className="drawer-item-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(fav.id);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slide-over History Drawer */}
      <div className={`slide-drawer ${showHistoryDrawer ? 'drawer-open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Clock size={16} />
            <h3>Query History</h3>
          </div>
          <button className="drawer-close-btn" onClick={() => setShowHistoryDrawer(false)}>
            <X size={16} />
          </button>
        </div>
        <div className="drawer-content">
          {recentRuns.length === 0 ? (
            <div className="drawer-empty-state">
              <p>No runs logged yet.</p>
              <span>Your last 10 recommendation generation runs will appear here.</span>
            </div>
          ) : (
            <div className="drawer-list">
              {recentRuns.map(run => (
                <div key={run.id} className="drawer-item" onClick={() => {
                  handleSelectRun(run);
                  setShowHistoryDrawer(false);
                }}>
                  <div className="drawer-item-info">
                    <h4>{run.userPrompt}</h4>
                    <span>{run.category.toUpperCase()} • {run.genre} • {run.mood}</span>
                  </div>
                  <span className="drawer-item-time">{run.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawers Backdrop Filter Overlay */}
      {(showFavoritesDrawer || showHistoryDrawer) && (
        <div className="drawer-backdrop" onClick={() => {
          setShowFavoritesDrawer(false);
          setShowHistoryDrawer(false);
        }} />
      )}

      {/* Frost-Overlay Process Timeline Simulation (Visible when loading) */}
      {loading && (
        <div className="loading-timeline-stage">
          <div className="loading-timeline-card">
            <div className="spinner-group">
              <div className="premium-spinner"></div>
              <div className="pulse-dot"></div>
            </div>
            <h3>Orchestrating Recommendations</h3>
            <p>LangGraph agent node is executing structured graph queries...</p>
            
            <div className="simulation-steps">
              {timeline.map(step => (
                <div key={step.id} className={`sim-step ${step.status}`}>
                  <div className="sim-step-indicator">
                    {step.status === 'completed' && <Check size={10} />}
                    {step.status === 'active' && <div className="active-dot" />}
                  </div>
                  <span className="sim-step-label">{step.label}</span>
                  {step.time && <span className="sim-step-time">{step.time.split('.')[0]}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
