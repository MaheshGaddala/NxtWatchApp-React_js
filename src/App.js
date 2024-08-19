import './App.css'

import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

class App extends Component {
  state = {isDarkTheme: false, savedVideosList: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  saveVideoButtonClicked = data => {
    const {id} = data
    console.log(id)
    const {savedVideosList} = this.state
    const video = savedVideosList.find(each => each.id === id)
    if (video === undefined) {
      this.setState({savedVideosList: [...savedVideosList, data]})
    } else {
      this.setState({
        savedVideosList: savedVideosList.filter(each => each.id !== id),
      })
    }
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state
    console.log(savedVideosList.length)
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          saveVideoButtonClicked: this.saveVideoButtonClicked,
          savedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
