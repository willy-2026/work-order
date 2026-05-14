function TopBar({ breadcrumb }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span className="bc-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11a9 9 0 0 0-18 0v6a3 3 0 0 0 3 3h2v-7H5a7 7 0 0 1 14 0h-3v7h2a3 3 0 0 0 3-3z"/></svg>
        </span>
        {breadcrumb.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="bc-sep">/</span>}
            <span className={i === breadcrumb.length - 1 ? 'bc-current' : 'bc-link'}>{b}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" aria-label="通知">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>
        </button>
        <div className="user-chip">
          <span>林威成</span>
          <span className="user-avatar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
          </span>
        </div>
      </div>
    </header>
  );
}

window.TopBar = TopBar;
