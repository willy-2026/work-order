const NAV = [
  { key: 'store', label: '店家管理', icon: 'store', children: [] },
  { key: 'audit', label: '審核中心', icon: 'audit', children: [] },
  { key: 'marketing', label: '行銷管理', icon: 'mkt', children: [] },
  { key: 'finance', label: '財務中心', icon: 'finance', children: [] },
  { key: 'user', label: '用戶中心', icon: 'user', children: [] },
  { key: 'resource', label: '資源配置', icon: 'resource', children: [] },
  { key: 'permission', label: '權限管理', icon: 'permission', children: [] },
  { key: 'report', label: '報表中心', icon: 'report', children: [] },
  {
    key: 'cs',
    label: '派工中心',
    icon: 'cs',
    children: [
      { key: 'tickets', label: '派工管理', icon: 'cs' },
      { key: 'personal', label: '派工管理 ( 個人)', icon: 'cs' },
    ],
  },
];

const Icon = ({ name }) => {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'store': return <svg {...props}><path d="M3 9l1-5h16l1 5"/><path d="M5 9v11h14V9"/><path d="M9 22V12h6v10"/></svg>;
    case 'audit': return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
    case 'mkt': return <svg {...props}><path d="M3 11l18-8v18l-18-8z"/><path d="M11 14v6"/></svg>;
    case 'finance': return <svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="14.5" r="1.5"/></svg>;
    case 'user': return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>;
    case 'resource': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 1-.2 1.8l2 1.6-2 3.4-2.4-1a7 7 0 0 1-3 1.7l-.4 2.5h-4l-.4-2.5a7 7 0 0 1-3-1.7l-2.4 1-2-3.4 2-1.6A7 7 0 0 1 3 12c0-.6.1-1.2.2-1.8l-2-1.6 2-3.4 2.4 1a7 7 0 0 1 3-1.7l.4-2.5h4l.4 2.5a7 7 0 0 1 3 1.7l2.4-1 2 3.4-2 1.6c.1.6.2 1.2.2 1.8z"/></svg>;
    case 'permission': return <svg {...props}><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/></svg>;
    case 'report': return <svg {...props}><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>;
    case 'cs': return <svg {...props}><path d="M21 11a9 9 0 0 0-18 0v6a3 3 0 0 0 3 3h2v-7H5a7 7 0 0 1 14 0h-3v7h2a3 3 0 0 0 3-3z"/></svg>;
    case 'chevron': return <svg {...props}><path d="m6 9 6 6 6-6"/></svg>;
    default: return null;
  }
};

function Sidebar({ activeKey, onNavigate }) {
  const [expanded, setExpanded] = React.useState({ cs: true });

  const toggle = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">營運管理系統</div>
      <nav className="sidebar-nav">
        {NAV.map((item) => {
          const isOpen = expanded[item.key];
          const isActiveParent = item.children?.some((c) => c.key === activeKey);
          return (
            <div key={item.key} className="nav-group">
              <button
                className={`nav-item ${isActiveParent ? 'is-parent-active' : ''}`}
                onClick={() => toggle(item.key)}
              >
                <span className="nav-icon"><Icon name={item.icon} /></span>
                <span className="nav-label">{item.label}</span>
                <span className={`nav-chev ${isOpen ? 'open' : ''}`}><Icon name="chevron" /></span>
              </button>
              {isOpen && item.children?.length > 0 && (
                <div className="nav-children">
                  {item.children.map((c) => (
                    <button
                      key={c.key}
                      className={`nav-child ${activeKey === c.key ? 'active' : ''}`}
                      onClick={() => onNavigate(c.key)}
                    >
                      <span className="nav-icon"><Icon name={c.icon} /></span>
                      <span className="nav-label">{c.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.NavIcon = Icon;
