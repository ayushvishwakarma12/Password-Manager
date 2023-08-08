import './index.css'

const PasswordItems = props => {
  const {eachItem, isPasswordShow, onDeletePasswordItem} = props
  const {id, website, username, password, bgColor} = eachItem

  const onDeletePassword = () => {
    onDeletePasswordItem(id)
  }

  const passwordShow = () => (
    <p className="password-manager-details-info">{password}</p>
  )

  const pattern = () => (
    <img
      alt="stars"
      className="stars-image"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )

  const initialName = website.slice(0, 1).toUpperCase()

  return (
    <li className="password-container">
      <div className={`initial-name-container ${bgColor}`}>{initialName}</div>
      <div className="password-info-card-container">
        <p className="password-manager-details-info">{website}</p>
        <p className="password-manager-details-info">{username}</p>
        {isPasswordShow ? passwordShow() : pattern()}
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItems
