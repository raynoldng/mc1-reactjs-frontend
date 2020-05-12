import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Question from './Question/Question';
import Questions from './Questions/Questions';
import NewQuestion from './NewQuestion/NewQuestion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route path='/new-question'
                      component={NewQuestion}
                      checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}

export default withRouter(App);
