function Tag({ label, color = 'blue' }) {
  return <span className={`tag tag-${color}`}>{label}</span>;
}

function HistoryCard({ entry }) {
  return (
    <div className="hist-item">
      <div className="hist-head">
        <span className="hist-date">{entry.date}</span>
        <Tag label={entry.tag} color={entry.tagColor} />
        {entry.operator && <span className="hist-op">{entry.operator}</span>}
      </div>
      <div className="hist-body">
        {entry.type &&
        <>
            <div className="kv"><span className="kv-k">問題類型：</span><span>{entry.type}</span></div>
            <div className="kv">
              <span className="kv-k">問題描述：</span>
              <div className="kv-v">{entry.desc}</div>
            </div>
            {entry.attachments &&
          <div className="kv">
                <span className="kv-k">問題附件：</span>
                <div className="attachments">
                  {entry.attachments.map((a, i) =>
              <div key={i} className="attachment-thumb" title={a}>
                      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <rect width="56" height="56" rx="3" fill="#f1f5f9" />
                        <path d="M8 12h28v8H8zM8 22h28v3H8zM8 27h22v2H8zM8 31h28v3H8zM8 36h18v2H8z" fill="#cbd5e1" />
                        <path d="M40 32l8-8v22H10l14-14 6 6 4-4 6 6z" fill="#94a3b8" opacity="0.5" />
                      </svg>
                    </div>
              )}
                </div>
              </div>
          }
          </>
        }
        {!entry.type && entry.body &&
        <div className="hist-message">{entry.body}</div>
        }
      </div>
    </div>);

}

function ActionPanel() {
  const [action, setAction] = React.useState('');
  const [forwardTo, setForwardTo] = React.useState('');
  const [note, setNote] = React.useState('');

  const needsCategory = action === '轉單';
  const needsNote = action && action !== '處理中';

  return (
    <div className="action-panel">
      <div className="action-title">處理動作</div>

      <div className="action-field">
        <label className="action-label">選擇處理方式 <span className="req">*</span></label>
        <div className="action-options">
          {[
            { v: '處理中', cls: 'opt-process' },
            { v: '轉單', cls: 'opt-forward' },
            { v: '拒絕', cls: 'opt-reject' },
            { v: '完成', cls: 'opt-complete' },
          ].map((opt) => (
            <label key={opt.v} className={`action-pill ${opt.cls} ${action === opt.v ? 'active' : ''}`}>
              <input type="radio" name="action" checked={action === opt.v} onChange={() => setAction(opt.v)} />
              <span>{opt.v}</span>
            </label>
          ))}
        </div>
      </div>

      {needsCategory && (
        <div className="action-field">
          <label className="action-label">轉至報修類型 <span className="req">*</span></label>
          <select className="input" value={forwardTo} onChange={(e) => setForwardTo(e.target.value)}>
            <option value="">請選擇報修類型</option>
            {window.TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <div className="action-hint">轉單後將自動指派至目標報修類型之預設群組</div>
        </div>
      )}

      <div className="action-field">
        <label className="action-label">
          處理備註 {needsNote && <span className="req">*</span>}
          {action === '處理中' && <span className="action-hint-inline">（選填）</span>}
        </label>
        <textarea
          className="input textarea"
          rows={4}
          placeholder={action === '轉單' ? '請填寫轉單理由與給對方單位的說明...' : action === '拒絕' ? '請填寫不受理理由...' : '輸入處理備註...'}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="action-foot">
        <button className="btn btn-ghost">取消</button>
        <button className="btn btn-primary" disabled={!action || (needsCategory && !forwardTo) || (needsNote && !note)}>
          送出
        </button>
      </div>
    </div>
  );
}

function StatusEventCard({ entry }) {
  const variants = {
    '新開單': 'info',
    '處理中': 'warning',
    '轉單中': 'purple',
    '拒絕': 'danger',
    '完成': 'success',
  };
  return (
    <div className="hist-item">
      <div className="hist-head">
        <span className="hist-date">{entry.date}</span>
        <span className={`badge badge-${variants[entry.status] || 'default'}`}>{entry.status}</span>
        {entry.operator && <span className="hist-op">{entry.operator}</span>}
      </div>
      <div className="hist-body">
        {entry.note && <div className="hist-note">{entry.note}</div>}
      </div>
    </div>
  );
}

function TicketDetail({ ticket, onBack }) {
  const StatusBadge = window.StatusBadge;
  const history = window.TICKET_HISTORY;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title-row">
          <button className="btn btn-back" onClick={onBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
            返回
          </button>
          <h1 className="page-title">查看詳情</h1>
        </div>
      </div>

      <section className="card">
        <div className="td-header">
          <div className="td-title-row">
            <h2 className="td-no">工單編號：{ticket.id}</h2>
            <StatusBadge status={ticket.status} />
          </div>
          <div className="td-meta">
            <span>用戶ID：{ticket.userId}</span>
            <a className="link" href="#">查看詳情</a>
            <span className="td-sep">｜</span>
            <span>聯繫郵箱：{ticket.email}</span>
            <span className="td-sep">｜</span>
            <span>處理人員：{ticket.handler && ticket.handler !== '-' ? ticket.handler : '未指派'}</span>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-title">工單內容</div>
        <div className="detail-grid">
          <div className="dg-item">
            <div className="dg-k">報修類型</div>
            <div className="dg-v">{ticket.repairCategory || '-'}</div>
          </div>
          <div className="dg-item">
            <div className="dg-k">提報單位</div>
            <div className="dg-v">{ticket.source}</div>
          </div>
          <div className="dg-item">
            <div className="dg-k">緊急程度</div>
            <div className="dg-v"><span className="prio-badge prio-P2">P2 · 一般影響</span></div>
          </div>
          <div className="dg-item">
            <div className="dg-k">客服工單編號</div>
            <div className="dg-v mono">{ticket.id}</div>
          </div>
          <div className="dg-item">
            <div className="dg-k">發生時間</div>
            <div className="dg-v mono-sm">{ticket.createdAt}</div>
          </div>
          <div className="dg-item">
            <div className="dg-k">期待完成時間</div>
            <div className="dg-v mono-sm">2026-05-15 18:00:00</div>
          </div>
          <div className="dg-item dg-full">
            <div className="dg-k">報修問題描述</div>
            <div className="dg-v dg-text">{ticket.desc}</div>
          </div>
          <div className="dg-item dg-full">
            <div className="dg-k">附件</div>
            <div className="dg-v">
              <div className="attachments">
                <div className="attachment-thumb">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect width="56" height="56" rx="3" fill="#f1f5f9" />
                    <path d="M8 12h28v8H8zM8 22h28v3H8zM8 27h22v2H8zM8 31h28v3H8zM8 36h18v2H8z" fill="#cbd5e1" />
                    <path d="M40 32l8-8v22H10l14-14 6 6 4-4 6 6z" fill="#94a3b8" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="td-grid">
        <section className="card">
          <div className="card-title">處理詳情</div>

          <div className="td-section">
            <div className="td-section-title">當前工單</div>
            <div className="td-inner">
              <HistoryCard entry={{ date: ticket.createdAt, tag: '用戶反饋', tagColor: 'blue', type: ticket.type, desc: ticket.desc, attachments: ['attach.png'] }} />
            </div>
          </div>

          <div className="td-section">
            <div className="td-section-title">歷史工單</div>
            <div className="td-timeline">
              {history.map((h, i) =>
              <div key={i} className="tl-row">
                  <div className="tl-dot" />
                  <div className="tl-content"><HistoryCard entry={h} /></div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="card td-reply-card">
          {reply &&
          <div className="reply-block">
              <div className="reply-head">
                <span className="reply-date">{reply.date}</span>
                <Tag label="客服回覆" color="green" />
                <span className="reply-op">{reply.operator}</span>
              </div>
              <div className="reply-body">{reply.body}</div>
            </div>
          }
          <ActionPanel />
        </section>
      </div>
    </div>);

}

window.TicketDetail = TicketDetail;