function Navbar({ count }) {
  return (
    <header className="navbar">
      <div className="navbar__content">
        <h1>Gestion des utilisateurs</h1>
        <span className="navbar__count">
          {count} utilisateur{count > 1 ? 's' : ''}
        </span>
      </div>
    </header>
  )
}

export default Navbar
