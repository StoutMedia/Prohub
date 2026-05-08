import Card from '../ui/Card.jsx';
import { journalEntries } from '../../data/mockTraining.js';
export default function JournalPreview() {
  const entry = journalEntries[0];
  return <Card><h2>Training journal prompt</h2><p className="prompt">What did you scan before receiving, and how did your first touch help the next action?</p><blockquote>{entry.reflection}</blockquote><p><strong>Coach feedback:</strong> {entry.coachFeedback}</p></Card>;
}
