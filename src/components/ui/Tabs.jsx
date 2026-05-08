import { useState } from 'react';
export default function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={active === tab.id} onClick={() => setActive(tab.id)}>{tab.label}</button>)}
      </div>
      {tabs.map((tab) => <section key={tab.id} className={`tab-panel ${active === tab.id ? 'active' : ''}`}>{tab.content}</section>)}
    </div>
  );
}
