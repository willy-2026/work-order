function App() {
  const { Sidebar, TopBar, TicketList, TicketDetail, PersonalCS, NewTicketModal } = window;
  const [page, setPage] = React.useState('tickets');
  const [origin, setOrigin] = React.useState('tickets'); // remember where 'detail' came from
  const [currentTicket, setCurrentTicket] = React.useState(null);
  const [newModal, setNewModal] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const openTicket = (t) => {
    setOrigin(page === 'detail' ? origin : page);
    setCurrentTicket(t);
    setPage('detail');
  };
  const navigate = (key) => { setCurrentTicket(null); setPage(key); };
  const closeDetail = () => setPage(origin);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleCreate = (form) => {
    showToast(`工單已建立：${form.repairCategory || '新工單'} (${form.priority})`);
  };

  const breadcrumbs = {
    tickets: ['工單管理'],
    personal: ['客服中心(個人)'],
    detail: ['工單管理', '工單詳情'],
  };

  return (
    <div className="app" data-screen-label={`00 ${page}`}>
      <Sidebar activeKey={page === 'detail' ? 'tickets' : page} onNavigate={navigate} />
      <main className="main">
        <TopBar breadcrumb={breadcrumbs[page]} />
        <div className="content">
          {page === 'tickets' && (
            <div data-screen-label="01 工單管理">
              <TicketList onOpenTicket={openTicket} onOpenNew={() => setNewModal(true)} />
            </div>
          )}
          {page === 'detail' && currentTicket && (
            <div data-screen-label="02 工單詳情">
              <TicketDetail ticket={currentTicket} onBack={closeDetail} />
            </div>
          )}
          {page === 'personal' && (
            <div data-screen-label="03 客服中心(個人)">
              <PersonalCS onOpenTicket={openTicket} />
            </div>
          )}
        </div>
      </main>
      <NewTicketModal open={newModal} onClose={() => setNewModal(false)} onSubmit={handleCreate} />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

window.App = App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
