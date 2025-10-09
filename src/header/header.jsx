import logo from './logo.svg'
import profilesvg from './profile.svg'
import './header.css'

export default function Header() {
  return (
    <header>
      <div>
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className='bar'>
        <div className='option'>
          <a href="/">Home</a>
        </div>
        <div className='option'>
          <a href="/tasks">My Tasks</a>
        </div>
        <div className='option'>
          <a href="/statistics">Statistics</a>
        </div>
        <div className='option'>
          <a href="/settings">Settings</a>
        </div>
        <div className='profile'>
          <a href="/profile">
            <img src={profilesvg} alt="Profile" />
          </a>
        </div>
      </div>
    </header>
  );
}
