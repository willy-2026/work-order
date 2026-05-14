const { FormField, StatusBadge } = window;

function PersonalCS({ onOpenTicket }) {
  const myInitial = window.MOCK_TICKETS.filter((t) => t.handler === '林威成');
  const initialProcessing = myInitial.filter((t) => t.status === '處理中').length;

  const [online, setOnline] = React.useState(true);
  const [maxLoad, setMaxLoad] = React.useState(10);
  const [lastOn, setLastOn] = React.useState('2026-05-13 09:12:34');
  const [lastOff, setLastOff] = React.useState('2026-05-12 18:45:02');
  const [processing, setProcessing] = React.useState(initialProcessing);
  const [myTickets, setMyTickets] = React.useState(myInitial);

  const toggle = () => {
    const now = new Date();
    const stamp = now.toISOString().slice(0, 19).replace('T', ' ');
    if (!online) {
      setOnline(true);
      setLastOn(stamp);
      // load some sample data
      setMyTickets(window.MOCK_TICKETS.filter((t) => t.handler === '林威成'));
      setProcessing(window.MOCK_TICKETS.filter((t) => t.handler === '林威成' && t.status === '處理中').length);
    } else {
      setOnline(false);
      setLastOff(stamp);
      setMyTickets([]);
      setProcessing(0);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">派工處理(個人）</h1>
      </div>

      <section className="card">
        <div className="cs-status-row">
          <div className="cs-status-left">
            <span>處理人員：<strong>林威成</strong></span>
            <span className="cs-sep">｜</span>
            <span>狀態：<span className={`badge ${online ? 'badge-success' : 'badge-default'}`}>{online ? '上線' : '離線'}</span></span>
            <span className="cs-sep">｜</span>
            <span>處理中工單：<strong className="cs-counter">{processing} / {maxLoad}</strong>
              <button className="ic-btn" title="刷新">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
              </button>
            </span>
          </div>
          <button className={`btn ${online ? 'btn-ghost-red' : 'btn-primary'}`} onClick={toggle}>
            {online ? '下線' : '上線'}
          </button>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-label">當前處理中工單數</div>
            <div className="stat-value">{processing}</div>
          </div>
          <div className="stat">
            <div className="stat-label">最大可處理工單數</div>
            <div className="stat-value">{maxLoad}</div>
          </div>
          <div className="stat">
            <div className="stat-label">最後上線時間</div>
            <div className="stat-value">{lastOn}</div>
          </div>
          <div className="stat">
            <div className="stat-label">最後下線時間</div>
            <div className="stat-value">{lastOff}</div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-title">查詢條件</div>
        <div className="form-grid">
          <FormField label="關鍵字"><input className="input" placeholder="工單ID/用戶ID" /></FormField>
          <FormField label="提報單位">
            <select className="input">
              <option value="">請選擇提報單位</option>
              {window.SOURCE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="報修類型">
            <select className="input">
              <option value="">請選擇報修類型</option>
              {window.TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="工單狀態">
            <select className="input">
              <option value="">請選擇狀態</option>
              {window.STATUS_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="創建時間" span={2}>
            <div className="date-range">
              <input className="input" type="date" />
              <span className="date-sep">→</span>
              <input className="input" type="date" />
            </div>
          </FormField>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary">查詢</button>
          <button className="btn btn-ghost">重置</button>
        </div>
      </section>

      <section className="card">
        <div className="card-title">我的工單</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th className="th-check"><input type="checkbox" /></th>
                <th>工單編號</th>
                <th>用戶ID</th>
                <th>報修類型</th>
                <th>問題描述</th>
                <th>提報單位</th>
                <th>狀態</th>
                <th>處理人員</th>
                <th>提報人員</th>
                <th>創建時間</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {myTickets.length === 0 ?
              <tr><td colSpan={11}>
                  <div className="empty">
                    <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
                      <rect x="8" y="20" width="48" height="34" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
                      <path d="M8 26l24 16 24-16" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                      <rect x="16" y="10" width="32" height="22" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.2" />
                      <path d="M22 17h20M22 22h20M22 27h12" stroke="#cbd5e1" strokeWidth="1.2" />
                    </svg>
                    <div className="empty-text">暫無資料</div>
                  </div>
                </td></tr> :
              myTickets.map((row) =>
              <tr key={row.id}>
                  <td><input type="checkbox" /></td>
                  <td className="mono">{row.id}</td>
                  <td className="mono">{row.userId}</td>
                  <td>{row.repairCategory}</td>
                  <td className="ellipsis" title={row.desc}>{row.desc}</td>
                  <td>{row.source}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td>{row.handler}</td>
                  <td>{row.manualCreator}</td>
                  <td className="mono-sm">{row.createdAt}</td>
                  <td><button className="link-btn" onClick={() => onOpenTicket && onOpenTicket(row)}>查看</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {myTickets.length > 0 && (
          <div className="pagination">
            <div className="page-info">顯示 1-{myTickets.length} 條，共 {myTickets.length} 條記錄</div>
            <div className="pager">
              <button className="pg-btn">‹</button>
              <button className="pg-btn active">1</button>
              <button className="pg-btn">›</button>
              <select className="pg-size" defaultValue={10}>
                <option value={10}>10 條/頁</option>
                <option value={20}>20 條/頁</option>
                <option value={50}>50 條/頁</option>
              </select>
              <span className="pg-jump">跳至</span>
              <input className="pg-jump-input" type="number" defaultValue="" />
              <span className="pg-jump">頁</span>
            </div>
          </div>
        )}
      </section>
    </div>);

}

window.PersonalCS = PersonalCS;