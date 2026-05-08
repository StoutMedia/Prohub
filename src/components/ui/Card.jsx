export default function Card({ children, className = '', as: Tag = 'article' }) {
  return <Tag className={`card ${className}`.trim()}>{children}</Tag>;
}
