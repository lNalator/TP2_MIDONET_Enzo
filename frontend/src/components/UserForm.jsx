import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  role: 'user',
}

function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialForm)
  const [validationError, setValidationError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      setValidationError('Le nom et l’email sont obligatoires.')
      return
    }

    setValidationError('')
    setSubmitting(true)

    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
      })
      setFormData(initialForm)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Créer un utilisateur</h2>

      {validationError && (
        <p className="message message--error">{validationError}</p>
      )}

      <div className="form-grid">
        <label className="form-field">
          <span>Nom</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Marie Dupont"
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="marie@example.com"
          />
        </label>

        <label className="form-field">
          <span>Rôle</span>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </label>
      </div>

      <button type="submit" className="button button--primary" disabled={submitting}>
        {submitting ? 'Création...' : 'Créer'}
      </button>
    </form>
  )
}

export default UserForm
