import { useNavigate } from 'react-router-dom';
import { roles } from '../../data/mockUsers.js';
export default function RoleSwitcher() {
  const navigate = useNavigate();
  return <label className="role-switcher"><span className="sr-only">Switch role</span><select onChange={(e) => navigate(e.target.value)} defaultValue=""><option value="" disabled>Switch role</option>{roles.map((role) => <option key={role.id} value={role.path}>{role.label}</option>)}</select></label>;
}
