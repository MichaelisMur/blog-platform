import React from 'react'
import './style/App.css'
import Main from './Main'
import Register from './Register'
import Login from './Login'
import New from './New'
// import Get from './Get'
// import Request from './Request'
import Stat from './Stat'
// import Webm from './Webm'
// import Audio from './Audio'
import Edit from './Edit'
import News from './News'
import NewsPage from './NewsPage'
import Bio from './Bio'
import AddNews from './AddNews'
import EditNewsPage from './EditNews'
import {Switch, Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'



class App extends React.Component{
  render(){
    return(
        <Switch>
          {/* <Route path="/about" component={About} />
          <Route path="/get" component={Get} />
          <Route path="/request" component={Request} />
          <Route path="/Webm" component={Webm} />
          <Route path="/audio" component={Audio} /> */}
          <Route path="/stat" component={Stat} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/editnews/:link" component={EditNewsPage} />
          <Route path="/news/:link" component={NewsPage} />
          <Route path="/addnews" component={AddNews} />
          <Route path="/news" component={News} />
          <Route path="/bio" component={Bio} />
          <Route path="/new" component={New} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Main} />
          {/* <Route component={Secret} /> */}
        </Switch>
    )
  }
}

export default App;