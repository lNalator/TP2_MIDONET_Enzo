function formatDate(value) {
  if (!value) {
    return 'Date inconnue'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Date invalide'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function UserCard({ user, onDelete }) {
  return (
    <article className="user-card">
      <div className="user-card__header">
        <h3>{user.name}</h3>
        <span className={`role-badge role-badge--${user.role}`}>
          {user.role}
        </span>
      </div>

      <p className="user-card__email">{user.email}</p>
      <p className="user-card__date">Créé le {formatDate(user.createdAt)}</p>

      <button
        type="button"
        className="button button--danger"
        onClick={() => onDelete(user._id)}
      >
        Supprimer
      </button>
    </article>
  )
}

export default UserCard
