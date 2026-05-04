import UserCard from './UserCard'

function UserList({ users, loading, error, onDelete }) {
  if (loading) {
    return <p className="message message--loading">Chargement des utilisateurs...</p>
  }

  if (error) {
    return <p className="message message--error">{error}</p>
  }

  if (users.length === 0) {
    return <p className="message">Aucun utilisateur</p>
  }

  return (
    <section className="user-grid" aria-label="Liste des utilisateurs">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </section>
  )
}

export default UserList
