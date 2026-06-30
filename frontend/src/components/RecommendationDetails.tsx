import { Star, ExternalLink, Play, BookOpen, Music, Gamepad2, Search, HelpCircle, X } from 'lucide-react';

interface RecommendationDetailsProps {
  title: string;
  subtitle: string;
  subtitleLabel: string;
  meta: string;
  rating: number;
  reason: string;
  extraLabel: string;
  extraValues: string[];
  activeCategory: string;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onClose: () => void;
}

export default function RecommendationDetails({
  title,
  subtitle,
  subtitleLabel,
  meta,
  rating,
  reason,
  extraLabel,
  extraValues,
  activeCategory,
  isFavorited,
  onToggleFavorite,
  onClose
}: RecommendationDetailsProps) {

  // Generate lookup links based on category
  const renderFreeLinks = () => {
    switch (activeCategory) {
      case 'movies':
        return [
          {
            name: 'YouTube Free Movie',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' full movie free')}`,
            icon: Play,
            color: '#ef4444',
            desc: 'Search for ad-supported uploads'
          },
          {
            name: 'Google Free Stream',
            url: `https://www.google.com/search?q=${encodeURIComponent('watch ' + title + ' online free streaming')}`,
            icon: Search,
            color: '#10b981',
            desc: 'Search for indexers and streams'
          },
          {
            name: 'JustWatch Finder',
            url: `https://www.justwatch.com/us/search?q=${encodeURIComponent(title)}`,
            icon: HelpCircle,
            color: '#d97706',
            desc: 'Check official stream availability'
          }
        ];
      case 'books':
        return [
          {
            name: 'Project Gutenberg',
            url: `https://gutenberg.org/ebooks/search/?query=${encodeURIComponent(title)}`,
            icon: BookOpen,
            color: '#c05c3c',
            desc: 'Free public domain publications'
          },
          {
            name: 'Internet Archive',
            url: `https://archive.org/search.php?query=${encodeURIComponent(title)}`,
            icon: Search,
            color: '#3b82f6',
            desc: 'Digital lending library check'
          },
          {
            name: 'Google Books preview',
            url: `https://books.google.com/books?q=${encodeURIComponent(title)}`,
            icon: HelpCircle,
            color: '#10b981',
            desc: 'Read digital samples'
          }
        ];
      case 'music':
        return [
          {
            name: 'YouTube Music Search',
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(subtitle + ' ' + title)}`,
            icon: Play,
            color: '#ef4444',
            desc: 'Stream audio and video tracks'
          },
          {
            name: 'SoundCloud Listen',
            url: `https://soundcloud.com/search?q=${encodeURIComponent(subtitle + ' ' + title)}`,
            icon: Music,
            color: '#f97316',
            desc: 'Search free audio uploads'
          }
        ];
      case 'games':
        return [
          {
            name: 'Itch.io (Free Indies)',
            url: `https://itch.io/search?q=${encodeURIComponent(title)}`,
            icon: Gamepad2,
            color: '#ef4444',
            desc: 'Check free indie game builds'
          },
          {
            name: 'Steam Store page',
            url: `https://store.steampowered.com/search/?term=${encodeURIComponent(title)}`,
            icon: Search,
            color: '#3b82f6',
            desc: 'Find official releases and sales'
          }
        ];
      default:
        return [];
    }
  };

  const lookupLinks = renderFreeLinks();

  return (
    <div className="details-modal-overlay" onClick={onClose}>
      <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close details">
          <X size={18} />
        </button>

        <div className="detail-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', paddingRight: '24px' }}>
            <h3 className="detail-title">{title}</h3>
            <button 
              className={`favorite-toggle-btn ${isFavorited ? 'active' : ''}`}
              onClick={onToggleFavorite}
              title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Star 
                size={18} 
                fill={isFavorited ? 'var(--accent-color)' : 'none'} 
                stroke={isFavorited ? 'var(--accent-color)' : 'currentColor'} 
              />
            </button>
          </div>
          
          <div className="rec-card-meta" style={{ fontSize: '0.88rem', marginTop: '4px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {subtitleLabel}: {subtitle}
            </span>
            <span className="rec-card-meta-dot"></span>
            <span>{meta}</span>
          </div>

          <div className="detail-rating-row">
            <div className="detail-rating-stars">
              {[...Array(5)].map((_, i) => {
                const starVal = (i + 1) * 2;
                const filled = rating >= starVal;
                const half = !filled && rating >= (starVal - 1);
                return (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={filled ? "var(--accent-color)" : "none"} 
                    stroke="var(--accent-color)"
                    style={{ opacity: filled ? 1 : half ? 0.7 : 0.25 }}
                  />
                );
              })}
            </div>
            <span className="detail-rating-value">{rating} / 10 Evaluation</span>
          </div>
        </div>

        <div className="modal-scroll-content">
          <div className="detail-block">
            <div className="detail-block-label">Recommendation Rationale</div>
            <div className="detail-reason-box">
              {reason}
            </div>
          </div>

          <div className="detail-block">
            <div className="detail-block-label">{extraLabel}</div>
            <div className="detail-list">
              {extraValues.map(val => (
                <span key={val} className="detail-list-item">{val}</span>
              ))}
            </div>
          </div>

          {/* Free Streams and Access Resources */}
          {lookupLinks.length > 0 && (
            <div className="detail-block" style={{ marginTop: '20px' }}>
              <div className="detail-block-label">Free Streams & Online Access</div>
              <div className="lookup-links-grid">
                {lookupLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="lookup-link-card"
                    >
                      <div className="lookup-link-icon" style={{ backgroundColor: `${link.color}15`, color: link.color }}>
                        <Icon size={16} />
                      </div>
                      <div className="lookup-link-info">
                        <span className="lookup-link-name">
                          {link.name}
                          <ExternalLink size={10} style={{ marginLeft: '4px', opacity: 0.7 }} />
                        </span>
                        <span className="lookup-link-desc">{link.desc}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Engine category: <strong style={{ color: 'var(--text-secondary)' }}>{activeCategory}</strong>
          </span>
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(title + ' ' + (activeCategory === 'music' ? subtitle : ''))}`}
            target="_blank" 
            rel="noreferrer"
            style={{ 
              fontSize: '0.8rem', 
              color: 'var(--accent-color)', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontWeight: 500
            }}
          >
            <span>Google search</span>
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </div>
  );
}
