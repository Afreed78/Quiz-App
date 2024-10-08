import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => (
  <div className="header">
    <Link to="/" className="title">
      KBC Quiz Hub
    </Link>
    <hr className="divider" />
  </div>
)

export default Header
