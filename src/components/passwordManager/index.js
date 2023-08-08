import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItems from '../passwordItems'

import './index.css'

const bgColour = ['bgColor1', 'bgColor2', 'bgColor3', 'bgColor4']

class PasswordManager extends Component {
  state = {
    initialList: [],
    website: '',
    username: '',
    password: '',
    isPasswordShow: false,
    searchWords: '',
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onAddButton = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const listLength = bgColour.length - 1
    const randomIndex = Math.floor(Math.random() * listLength)
    const bgRandomColor = bgColour[randomIndex]

    const newAddedPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      bgColor: bgRandomColor,
    }
    this.setState(prevState => ({
      initialList: [...prevState.initialList, newAddedPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  renderNoPasswordImage = () => {
    const imgSrc =
      'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'

    return (
      <div className="no-password-image-container">
        <img alt="no passwords" className="no-password-image" src={imgSrc} />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    )
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      isPasswordShow: !prevState.isPasswordShow,
    }))
  }

  onDeletePasswordItem = id => {
    const {initialList} = this.state
    const deletePassword = initialList.filter(eachItem => eachItem.id !== id)
    this.setState({initialList: deletePassword})
  }

  searchPasswordManager = event => {
    this.setState({searchWords: event.target.value})
  }

  filteredPassword = () => {
    const {initialList, searchWords} = this.state
    const filteredListPassword = initialList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchWords.toLowerCase()),
    )
    return filteredListPassword
  }

  renderPasswordItem = () => {
    const {isPasswordShow} = this.state
    const filteredList = this.filteredPassword()
    return (
      <ul className="password-list-container">
        {filteredList.map(eachItem => (
          <PasswordItems
            key={eachItem.id}
            eachItem={eachItem}
            isPasswordShow={isPasswordShow}
            onDeletePasswordItem={this.onDeletePasswordItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {website, username, password} = this.state
    const filteredList = this.filteredPassword()
    const listLength = filteredList.length
    return (
      <div className="bg-container">
        <div className="app-container">
          <img
            className="app-logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="password-info-container">
            <form className="form">
              <h1 className="add-password">Add New Password</h1>
              <div className="input-logo-text-container">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="website"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  />
                </div>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-logo-text-container">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  />
                </div>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-logo-text-container">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  />
                </div>
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                type="submit"
                className="button"
                onClick={this.onAddButton}
              >
                Add
              </button>
            </form>
            <div className="password-manager-image-container">
              <img
                className="password-manager-image"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              />
            </div>
          </div>
          <div className="your-password">
            <nav className="nav-bar-container">
              <h1 className="nav-heading">
                Your Passwords
                <span>
                  <p className="password-count">{listLength}</p>
                </span>
              </h1>
              <div className="search-input-container">
                <img
                  className="search-icon"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  className="search-input"
                  placeholder="Search"
                  type="search"
                  onChange={this.searchPasswordManager}
                />
              </div>
            </nav>
            <hr className="line" />
            <div className="checkbox-container">
              <input
                id="checkbox"
                type="checkbox"
                onChange={this.onChangeShowPassword}
              />
              <label className="checkbox-label" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            {listLength === 0
              ? this.renderNoPasswordImage()
              : this.renderPasswordItem()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
