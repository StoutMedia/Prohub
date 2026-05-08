export default function ProgressBar({ value, label }) {
  return (
    <div className="progress-wrap">
      <div className="progress-meta"><span>{label}</span><strong>{value}%</strong></div>
      <div className="progress"><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}
