function StatusBadge({ status }) {
  const variants = {
    '新開單': 'info',
    '處理中': 'warning',
    '已轉單': 'purple',
    '拒絕': 'danger',
    '完成': 'success'
  };
  return <span className={`badge badge-${variants[status] || 'default'}`}>{status}</span>;
}

function FormField({ label, children, span = 1 }) {
  return (
    <div className="field" style={{ gridColumn: `span ${span}` }}>
      <label className="field-label">{label}</label>
      {children}
    </div>);

}

function TicketList({ onOpenTicket, onOpenNew }) {
  const [query, setQuery] = React.useState({ keyword: '', type: '', status: '', source: '', repairCategory: '', dateFrom: '', dateTo: '' });
  const [applied, setApplied] = React.useState(query);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selected, setSelected] = React.useState(new Set());

  const filtered = React.useMemo(() => {
    return window.MOCK_TICKETS.filter((t) => {
      if (applied.keyword && !(t.id.includes(applied.keyword) || t.userId.includes(applied.keyword))) return false;
      if (applied.type && !t.type.includes(applied.type)) return false;
      if (applied.status && t.status !== applied.status) return false;
      if (applied.source && t.source !== applied.source) return false;
      if (applied.repairCategory && t.repairCategory !== applied.repairCategory) return false;
      return true;
    });
  }, [applied]);

  // Pad to look like 496 records
  const totalRecords = 496;
  const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleAll = () => {
    if (selected.size === pagedRows.length) setSelected(new Set());else
    setSelected(new Set(pagedRows.map((r) => r.id)));
  };
  const toggleOne = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);else next.add(id);
    setSelected(next);
  };

  const onQuery = () => {setApplied(query);setPage(1);};
  const onReset = () => {
    const empty = { keyword: '', type: '', status: '', source: '', repairCategory: '', dateFrom: '', dateTo: '' };
    setQuery(empty);setApplied(empty);setPage(1);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">派工處理</h1>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={onOpenNew}>新建工單</button>
        </div>
      </div>

      <section className="card">
        <div className="card-title">查詢條件</div>
        <div className="form-grid">
          <FormField label="關鍵字">
            <input className="input" placeholder="工單ID/用戶ID" value={query.keyword} onChange={(e) => setQuery({ ...query, keyword: e.target.value })} />
          </FormField>
          <FormField label="提報單位">
            <select className="input" value={query.source} onChange={(e) => setQuery({ ...query, source: e.target.value })}>
              <option value="">請選擇提報單位</option>
              {window.SOURCE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="報修類型">
            <select className="input" value={query.repairCategory} onChange={(e) => setQuery({ ...query, repairCategory: e.target.value })}>
              <option value="">請選擇報修類型</option>
              {window.TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="工單狀態">
            <select className="input" value={query.status} onChange={(e) => setQuery({ ...query, status: e.target.value })}>
              <option value="">請選擇狀態</option>
              {window.STATUS_OPTIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </FormField>
          <FormField label="創建時間" span={2}>
            <div className="date-range">
              <input className="input" type="date" value={query.dateFrom} onChange={(e) => setQuery({ ...query, dateFrom: e.target.value })} placeholder="開始日期" />
              <span className="date-sep">→</span>
              <input className="input" type="date" value={query.dateTo} onChange={(e) => setQuery({ ...query, dateTo: e.target.value })} placeholder="結束日期" />
            </div>
          </FormField>
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={onQuery}>查詢</button>
          <button className="btn btn-ghost" onClick={onReset}>重置</button>
        </div>
      </section>

      <section className="card">
        <div className="card-title">工單列表</div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th className="th-check">
                  <input type="checkbox" checked={pagedRows.length > 0 && selected.size === pagedRows.length} onChange={toggleAll} />
                </th>
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
              {pagedRows.map((row) =>
              <tr key={row.id}>
                  <td><input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleOne(row.id)} /></td>
                  <td className="mono">{row.id}</td>
                  <td className="mono">{row.userId}</td>
                  <td>{row.repairCategory}</td>
                  <td className="ellipsis" title={row.desc}>{row.desc}</td>
                  <td>{row.source}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td>{row.handler}</td>
                  <td>{row.manualCreator}</td>
                  <td className="mono-sm">{row.createdAt}</td>
                  <td><button className="link-btn" onClick={() => onOpenTicket(row)}>查看</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <div className="page-info">顯示 {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, totalRecords)} 條，共 {totalRecords} 條記錄</div>
          <div className="pager">
            <button className="pg-btn" onClick={() => setPage(Math.max(1, page - 1))}>‹</button>
            {[1, 2, 3, 4, 5].map((n) =>
            <button key={n} className={`pg-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
            )}
            <span className="pg-ellipsis">···</span>
            <button className="pg-btn" onClick={() => setPage(50)}>50</button>
            <button className="pg-btn" onClick={() => setPage(page + 1)}>›</button>
            <select className="pg-size" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value={10}>10 條/頁</option>
              <option value={20}>20 條/頁</option>
              <option value={50}>50 條/頁</option>
            </select>
            <span className="pg-jump">跳至</span>
            <input className="pg-jump-input" type="number" defaultValue="" />
            <span className="pg-jump">頁</span>
          </div>
        </div>
      </section>
    </div>);

}

window.TicketList = TicketList;
window.StatusBadge = StatusBadge;
window.FormField = FormField;