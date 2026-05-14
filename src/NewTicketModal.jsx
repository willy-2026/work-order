const { FormField } = window;

function NewTicketModal({ open, onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    reportingUnit: '',
    repairCategory: '',
    priority: 'P2',
    csCaseRef: '',
    occurredAt: '',
    expectedAt: '',
    description: '',
    supplementary: '',
  });
  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>新建工單</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form className="modal-body" onSubmit={submit}>
          <div className="form-grid">
            <FormField label="提報單位 *">
              <select className="input" required value={form.reportingUnit} onChange={(e) => upd('reportingUnit', e.target.value)}>
                <option value="">請選擇提報單位</option>
                {window.REPORTING_UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </FormField>
            <FormField label="報修類型 *">
              <select className="input" required value={form.repairCategory} onChange={(e) => upd('repairCategory', e.target.value)}>
                <option value="">請選擇報修類型</option>
                {window.TICKET_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="緊急程度 *">
              <div className="radio-row">
                {[
                  { v: 'P0', d: '致命影響／系統中斷' },
                  { v: 'P1', d: '嚴重影響／部分功能失效' },
                  { v: 'P2', d: '一般影響／單一使用者／詢問' },
                ].map((opt) => (
                  <label key={opt.v} className={`prio-pill ${form.priority === opt.v ? `active prio-${opt.v}` : ''}`}>
                    <input type="radio" name="prio" checked={form.priority === opt.v} onChange={() => upd('priority', opt.v)} />
                    <strong>{opt.v}</strong>
                    <span>{opt.d}</span>
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="客服工單編號">
              <input className="input" placeholder="可關聯 C 端客服工單編號" value={form.csCaseRef} onChange={(e) => upd('csCaseRef', e.target.value)} />
            </FormField>
            <FormField label="發生時間 *">
              <input className="input" type="datetime-local" required value={form.occurredAt} onChange={(e) => upd('occurredAt', e.target.value)} />
            </FormField>
            <FormField label="期待完成時間">
              <input className="input" type="datetime-local" value={form.expectedAt} onChange={(e) => upd('expectedAt', e.target.value)} />
            </FormField>
            <FormField label="報修問題描述 *" span={2}>
              <textarea className="input textarea" required rows={4} value={form.description} onChange={(e) => upd('description', e.target.value)} placeholder="請描述發生的問題..." />
            </FormField>
            <FormField label="其他補充" span={2}>
              <textarea className="input textarea" rows={3} value={form.supplementary} onChange={(e) => upd('supplementary', e.target.value)} placeholder="補充說明（選填）" />
            </FormField>
            <FormField label="附件" span={2}>
              <div className="upload-zone">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>
                <span>點擊或拖曳檔案至此上傳（單檔最大 20 MB）</span>
              </div>
            </FormField>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>取消</button>
            <button type="submit" className="btn btn-primary">建立工單</button>
          </div>
        </form>
      </div>
    </div>
  );
}

window.NewTicketModal = NewTicketModal;
