import { Sun, Moon, Film, BookOpen, Music, Gamepad2, Star, Clock, Compass, ChevronLeft, Trash2 } from 'lucide-react';
import { Category, RecommendedItem } from '../types';

export interface FavoriteItem {
  id: string; // `${category}-${title}-${year}`
  category: string;
  item: RecommendedItem;
}

export interface RecentGeneration {
  id: string; // timestamp
  category: string;
  userPrompt: string;
  genre: string;
  mood: string;
  count: number;
  results: any;
  timestamp: string;
}

interface SidebarProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  sandboxMode: boolean;
  setSandboxMode: (val: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  loading: boolean;
  onBackToLanding: () => void;
  
  // Navigation tabs in sidebar
  sidebarTab: 'explore' | 'favorites' | 'history';
  setSidebarTab: (tab: 'explore' | 'favorites' | 'history') => void;
  
  // Favorites
  favorites: FavoriteItem[];
  onSelectFavorite: (fav: FavoriteItem) => void;
  onRemoveFavorite: (favId: string) => void;
  
  // History
  recentRuns: RecentGeneration[];
  onSelectRun: (run: RecentGeneration) => void;
}

export default function Sidebar({
  categories,
  activeCategory,
  setActiveCategory,
  sandboxMode,
  setSandboxMode,
  theme,
  toggleTheme,
  loading,
  onBackToLanding,
  sidebarTab,
  setSidebarTab,
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  recentRuns,
  onSelectRun
}: SidebarProps) {
  
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'books': return BookOpen;
      case 'music': return Music;
      case 'games': return Gamepad2;
      case 'movies':
      default: return Film;
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="back-landing-btn" onClick={onBackToLanding} title="Back to Landing">
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="sidebar-title">OmniMind Hub</h1>
          <span className="sidebar-subtitle">AI ORCHESTRATOR</span>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="sidebar-tabs">
        <button 
          className={`sidebar-tab-btn ${sidebarTab === 'explore' ? 'active' : ''}`}
          onClick={() => setSidebarTab('explore')}
          title="Explore Engines"
        >
          <Compass size={16} />
          <span>Explore</span>
        </button>
        <button 
          className={`sidebar-tab-btn ${sidebarTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setSidebarTab('favorites')}
          title="Saved Favorites"
        >
          <Star size={16} />
          <span>Saved ({favorites.length})</span>
        </button>
        <button 
          className={`sidebar-tab-btn ${sidebarTab === 'history' ? 'active' : ''}`}
          onClick={() => setSidebarTab('history')}
          title="Recent Runs"
        >
          <Clock size={16} />
          <span>History</span>
        </button>
      </div>

      <nav className="sidebar-menu">
        {/* EXPLORE TAB */}
        {sidebarTab === 'explore' && (
          <>
            <span className="menu-section-label">Recommendation Engines</span>
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`menu-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => {
                    if (!loading) setActiveCategory(category.id);
                  }}
                >
                  <span className="menu-icon"><Icon size={18} /></span>
                  <span>{category.label}</span>
                </div>
              );
            })}

            <span className="menu-section-label">Engine Configuration</span>
            <div className="sandbox-config-box">
              <label className="sandbox-label">
                <input 
                  type="checkbox" 
                  checked={sandboxMode} 
                  onChange={(e) => setSandboxMode(e.target.checked)}
                  className="sandbox-checkbox"
                />
                <span>Force Sandbox Mode</span>
              </label>
            </div>
          </>
        )}

        {/* FAVORITES TAB */}
        {sidebarTab === 'favorites' && (
          <div className="sidebar-list-container">
            <span className="menu-section-label">My Favorite Picks</span>
            {favorites.length === 0 ? (
              <div className="sidebar-empty-state">
                <p>No favorites saved yet.</p>
                <span>Click the star icon in the details panel to save a recommendation.</span>
              </div>
            ) : (
              favorites.map(fav => {
                const CatIcon = getCategoryIcon(fav.category);
                return (
                  <div key={fav.id} className="sidebar-list-item">
                    <div 
                      className="sidebar-list-item-content"
                      onClick={() => onSelectFavorite(fav)}
                    >
                      <span className="item-category-icon"><CatIcon size={12} /></span>
                      <div className="item-text">
                        <span className="item-title">{fav.item.title}</span>
                        <span className="item-meta">{fav.category} • {fav.item.year}</span>
                      </div>
                    </div>
                    <button 
                      className="remove-item-btn"
                      onClick={() => onRemoveFavorite(fav.id)}
                      title="Remove Favorite"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {sidebarTab === 'history' && (
          <div className="sidebar-list-container">
            <span className="menu-section-label">Recent Generations</span>
            {recentRuns.length === 0 ? (
              <div className="sidebar-empty-state">
                <p>No recent runs yet.</p>
                <span>Generated recommendations will appear here.</span>
              </div>
            ) : (
              recentRuns.map(run => {
                const CatIcon = getCategoryIcon(run.category);
                return (
                  <div 
                    key={run.id} 
                    className="sidebar-history-item"
                    onClick={() => onSelectRun(run)}
                  >
                    <span className="item-category-icon"><CatIcon size={12} /></span>
                    <div className="item-text">
                      <span className="history-prompt">"{run.userPrompt}"</span>
                      <span className="history-meta">
                        {run.category} • {run.genre} • {run.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? 'Switch to Light Cream' : 'Switch to Warm Charcoal'}</span>
        </button>
        
        <div className="sidebar-footer-tag">
          Orchestrated with LangChain & Gemini
        </div>
      </div>
    </aside>
  );
}
