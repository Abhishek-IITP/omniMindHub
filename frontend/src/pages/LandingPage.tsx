import React from 'react';
import { 
  Film, 
  BookOpen, 
  Music, 
  Gamepad2, 
  ArrowRight, 
  Sparkles, 
  GitBranch, 
  Cpu, 
  CheckCircle, 
  Sliders, 
  Zap, 
  Database, 
  Share2, 
  MessageSquare 
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'movies', label: 'Movies & Cinema', icon: Film, desc: 'Cinematic masterpieces curated by tone, cast, and subgenres.', color: '#d97706' },
    { id: 'books', label: 'Literature & Books', icon: BookOpen, desc: 'Literary critiques, hidden gems, and structured book indexes.', color: '#c05c3c' },
    { id: 'music', label: 'Tracks & Music', icon: Music, desc: 'Acoustic experiences, ambient lofi, and custom playlist builders.', color: '#10b981' },
    { id: 'games', label: 'Interactive & Games', icon: Gamepad2, desc: 'Immersive indies, story-rich epics, and platform indicators.', color: '#3b82f6' }
  ];

  const workflowSteps = [
    { number: '01', title: 'Compile Prompt Schema', desc: 'Accepts raw user prompt directives and translates them to category presets.' },
    { number: '02', title: 'Invoke LangGraph Node', desc: 'Queries Gemini 2.5 Flash to extract structured recommendations from the model.' },
    { number: '03', title: 'Validate via Zod Schema', desc: 'Enforces type declarations to ensure JSON consistency across movies, books, music, and games.' },
    { number: '04', title: 'Resolve Streaming Links', desc: 'Queries JustWatch, YouTube, Gutenberg, Steam, and itch.io for direct watch/download links.' }
  ];

  const features = [
    { icon: Zap, title: 'Live "Watch Free" Searcher', desc: 'No dead ends. OmniMind constructs intelligent queries to locate free streams, ebooks, downloads, and storefronts based on category.' },
    { icon: Database, title: 'Persistent Cache Syncing', desc: 'Favorites and recent runs are automatically synced directly to your browser Client Cache (localStorage).' },
    { icon: Share2, title: 'Multi-Format Exporters', desc: 'Instantly download your recommendations in structured markdown tables or raw JSON schema for external use.' }
  ];

  const testimonials = [
    { author: 'Abhishek Mohanty', role: 'Full Stack Dev', comment: 'The minimal off-white design and warm terracotta accents create an incredibly professional portfolio feel. Absolute visual candy.' },
    { author: 'Anya Sen', role: 'UX Consultant', comment: 'Scrapping the crowded multi-panel list and moving filters into a collapsible horizontal tray is a masterclass in clean UX design.' }
  ];

  return (
    <div className="landing-container">
      {/* Header */}
      <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="landing-logo">
          <span className="logo-spark">✨</span>
          <span>OmniMind Hub</span>
        </div>
        <nav className="landing-nav-center">
          <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.feature-explorer-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
          <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.workflow-section')?.scrollIntoView({ behavior: 'smooth' }); }}>How it works</a>
          <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Story</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onEnter(); }}>Get started</a>
        </nav>
        <div className="landing-version-tag">
          v1.0.0 // AI Orchestrator
        </div>
      </header>

      {/* SECTION 1: HERO VIEW */}
      <main className="landing-hero-section">
        <div className="landing-hero-content">
          <div className="hero-badge">
            <Sparkles size={12} style={{ color: 'var(--accent-color)' }} />
            <span>Next-Gen LangGraph Orchestrator</span>
          </div>

          <h1 className="hero-title">
            Discover your next favorite. <br />
            <span>In seconds, not hours.</span>
          </h1>

          <p className="hero-subtitle">
            OmniMind AI harnesses multi-agent graph flows to build deep-semantic recommendations. 
            Stop browsing blindly; query the node with custom moods, genres, and instructions.
          </p>

          <div className="cta-buttons-row">
            <button className="nexa-pill-primary" onClick={onEnter}>
              <span>Enter Recommender Hub</span>
              <ArrowRight size={16} />
            </button>
            <button className="nexa-pill-secondary" onClick={() => {
              document.querySelector('.feature-explorer-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>Explore Features</span>
            </button>
          </div>
        </div>
      </main>

      {/* SECTION 1.5: CATEGORY EXPLORER GRID */}
      <section className="landing-section feature-explorer-section">
        <div className="section-header-center">
          <div className="section-tag-badge">Recommendation Engines</div>
          <h2>Select a Dynamic Discovery Workspace</h2>
          <p>Choose from our specialized structures, each running optimized Zod types and streaming endpoints.</p>
        </div>

        <div className="landing-feature-grid" style={{ margin: '0 auto' }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="landing-feature-card" onClick={onEnter}>
                <div className="feature-icon-container" style={{ '--accent-light': `${cat.color}15`, '--accent-color': cat.color } as React.CSSProperties}>
                  <Icon size={20} />
                </div>
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
                <div className="card-action-hover">
                  <span>Explore Engine</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: WORKFLOW TIMELINE SECTION */}
      <section className="landing-section workflow-section">
        <div className="section-header-center">
          <div className="section-tag-badge">Orchestration Flow</div>
          <h2>Inside the LangGraph Graph Structure</h2>
          <p>How the agent resolves parameters, validates schemas, and generates outputs.</p>
        </div>

        <div className="workflow-timeline-grid">
          {workflowSteps.map((step, idx) => (
            <div key={step.number} className="workflow-card">
              <div className="workflow-number-tag">{step.number}</div>
              <div className="workflow-card-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {idx < 3 && <div className="workflow-step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: KEY PRODUCT FEATURES */}
      <section className="landing-section features-section">
        <div className="section-header-center">
          <div className="section-tag-badge">System Features</div>
          <h2>Designed for High Fidelity</h2>
          <p>Sleek tools built to solve semantic discoveries and clean documentation exports.</p>
        </div>

        <div className="product-features-grid">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="product-feature-card">
                <div className="product-feature-icon-wrapper">
                  <Icon size={22} />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS & DESIGN SATISFACTION */}
      <section className="landing-section testimonials-section">
        <div className="section-header-center">
          <div className="section-tag-badge">Feedback</div>
          <h2>Loved by Developers & Designers</h2>
          <p>How creators describe the OmniMind minimalist experience.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-comment-box">
                <MessageSquare size={16} className="quote-icon" />
                <p>"{test.comment}"</p>
              </div>
              <div className="testimonial-author-row">
                <div className="author-details">
                  <strong>{test.author}</strong>
                  <span>{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-links">
          <span>LangChain Expression Language (LCEL)</span>
          <span className="footer-divider">•</span>
          <span>Gemini 2.5 Structured Outputs</span>
          <span className="footer-divider">•</span>
          <span>React 18 Architecture</span>
        </div>
        <p className="footer-copy">© 2026 OmniMind Systems. Designed for high fidelity.</p>
      </footer>
    </div>
  );
}
