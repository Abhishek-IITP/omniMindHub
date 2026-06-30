import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

interface RecommendationCardProps {
  title: string;
  subtitle: string;
  meta: string;
  tags: string[];
  rating: number;
  reason: string;
  isFavorited: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onClick: () => void;
  index: number;
}

export default function RecommendationCard({
  title,
  subtitle,
  meta,
  tags,
  rating,
  reason,
  isFavorited,
  onToggleFavorite,
  onClick,
  index
}: RecommendationCardProps) {
  const staggerClass = `stagger-${(index % 5) + 1}`;
  
  return (
    <div className={`rec-card-premium ${staggerClass}`} onClick={onClick}>
      <div className="rec-card-premium-header">
        <div className="rec-card-premium-title-group">
          <h4 className="rec-card-premium-title">{title}</h4>
          <span className="rec-card-premium-meta">{subtitle} • {meta}</span>
        </div>
        
        <button 
          className={`card-favorite-btn ${isFavorited ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(e);
          }}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star size={14} fill={isFavorited ? 'var(--accent-color)' : 'none'} stroke="currentColor" />
        </button>
      </div>

      <p className="rec-card-premium-reason">{reason}</p>

      <div className="rec-card-premium-footer">
        <div className="rec-card-premium-tags">
          {tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag-premium">{tag}</span>
          ))}
        </div>
        
        <div className="rating-badge-premium">
          <span>{rating}</span>
          <span className="rating-max">/10</span>
        </div>
      </div>

      <div className="card-action-bar">
        <span>View full analysis</span>
        <ArrowRight size={12} />
      </div>
    </div>
  );
}
