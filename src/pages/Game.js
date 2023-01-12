import React, { Component } from 'react';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import fetchToken from '../helpers/fetch';
import Button from '../components/Button';

const three = 3;

export default class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    answers: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    const url = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
    const apiCheck = await fetchToken(url);
    if (apiCheck.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: apiCheck.results,
      }, this.handleShuffle);
    }
  }

  shuffleArray = (arr) => {
    const arr2 = [];
    arr.forEach((element) => {
      arr2.splice(Math.floor(Math.random() * arr.length), 0, element);
    });
    return arr2;
  };

  handleShuffle = () => {
    const { questions, questionIndex } = this.state;
    if (questions.length > 0) {
      const answers = this.shuffleArray([
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ]);
      this.setState({
        answers,
        correctAnswer: questions[questionIndex].correct_answer,
      });
    }
  };

  render() {
    const { questions, questionIndex, answers, correctAnswer } = this.state;

    return (
      <section>
        {
          questions.length > 0
            ? (
              <>
                <h3
                  data-testid="question-category"
                >
                  {
                    questions[questionIndex].category
                  }
                </h3>
                <h3
                  data-testid="question-text"
                >
                  {
                    questions[questionIndex]
                      .question
                  }
                </h3>
                <section
                  data-testid="answer-options"
                >
                  {
                    answers.map((each, index) => (
                      <Button
                        key={ each }
                        btnLabel={ each }
                        testId={
                          each === correctAnswer
                            ? 'correct-answer'
                            : `wrong-answer-${index}`
                        }
                        // onClick={}
                      />
                    ))
                  }
                </section>
              </>
            )
            : <h1>LOADING...</h1>
        }
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};