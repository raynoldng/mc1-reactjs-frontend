import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { HOSTNAME } from '../constants'


const NewQuestionCard = () => (
  <Link to="/new-question">
    <div className="card text-white bg-secondary mb-3">
      <div className="card-header">Need help? Ask here!</div>
      <div className="card-body">
        <h4 className="card-title">+ New Question</h4>
        <p className="card-text">Don't worry. Help is on the way!</p>
      </div>
    </div>
  </Link>
)

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: props.question.votes || 0 
    }
  }


  upvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/upvote/${this.props.question.id}`)
      .then(() => {
        this.setState(prevState => ({
          votes: prevState.votes + 1
        }))
      })

  }

  downvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/downvote/${this.props.question.id}`)
      .then(() => {
        this.setState(prevState => ({
          votes: prevState.votes > 0 ? prevState.votes - 1 : 0
        }))
      })

  }

  render() {
    const question = this.props.question;
    return (
      <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
        <Link style={{ textDecoration: 'none' }} to={`/question/${question.id}`}>
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Answers: {question.answers}</div>
            <div className="card-body">
              <h4 className="card-title">{question.title}</h4>
              <p className="card-text">{question.description}</p>
            </div>
            <div className="card-body">
              <div className="house-container text-center">
                <button className="btn btn-danger" onClick={(e) => {
                  this.upvote(e)
                }}>👍</button>
                <span className="badge">{this.state.votes}</span>
                <button className="btn btn-primary" onClick={(e) => {
                  this.downvote(e)
                }}>👎</button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get(HOSTNAME)).data;
    questions.sort((q1,q2) => q2.votes - q1.votes) // want descending order
    this.setState({
      questions,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {NewQuestionCard()}
          {this.state.questions === null && <p>Loading questions...</p>}
          {this.state.questions && this.state.questions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    )
  }
}

export default Questions;
