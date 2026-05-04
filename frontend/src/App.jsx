import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import { userService } from './services/userService'
import './App.css'

function extractUsers(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function extractUser(payload) {
  return payload?.data ?? payload
}

function getApiErrorMessage(error, fallback) {
  if (!error.response) {
    return 'Impossible de joindre l’API. Vérifiez que le backend est démarré sur http://localhost:3001.'
  }

  return error.response.data?.message || error.response.data?.error || fallback
}

function isEmptyUsersError(error) {
  return error.response?.status === 404 || error.response?.data?.message === 'No users found'
}

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await userService.getAll()
        setUsers(extractUsers(response.data))
      } catch (loadError) {
        if (isEmptyUsersError(loadError)) {
          setUsers([])
          return
        }

        setError(getApiErrorMessage(loadError, 'Erreur lors du chargement des utilisateurs.'))
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const showTemporarySuccess = (message) => {
    setSuccess(message)
    window.setTimeout(() => {
      setSuccess('')
    }, 3000)
  }

  const handleCreate = async (data) => {
    setError('')
    setSuccess('')

    try {
      const response = await userService.create(data)
      const createdUser = extractUser(response.data)

      setUsers((currentUsers) => [...currentUsers, createdUser])
      showTemporarySuccess('Utilisateur créé avec succès.')
    } catch (createError) {
      const message =
        createError.response?.status === 409
          ? getApiErrorMessage(createError, 'Email déjà utilisé')
          : getApiErrorMessage(createError, 'Erreur lors de la création de l’utilisateur.')

      setError(message)
      throw createError
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await userService.remove(id)
      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id))
      showTemporarySuccess('Utilisateur supprimé avec succès.')
    } catch (deleteError) {
      setError(getApiErrorMessage(deleteError, 'Erreur lors de la suppression de l’utilisateur.'))
    }
  }

  return (
    <>
      <Navbar count={users.length} />

      <main className="app">
        {success && <p className="message message--success">{success}</p>}

        <UserForm onSubmit={handleCreate} />
        <UserList
          users={users}
          loading={loading}
          error={error}
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}

export default App
