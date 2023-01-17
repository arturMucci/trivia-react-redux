import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import fetchToken from '../helpers/fetch';
import Button from '../components/Button';
import { ACTION_INCREMENT_SCORE, ACTION_SAVE_GRAVATAR } from '../redux/actions';

const correctAnswerId = 'correct-answer';
const three = 3;
const four = 4;
const ten = 10;
class Game extends Component {
  state = { questions: [],
    questionIndex: 0,
    answers: [],
    correctClass: '',
    wrongClass: '',
    answered: false,
    timer: 30,
    intervalId: '',
    nextOn: false,
  };

  async componentDidMount() {
    const { history, dispatch, player: { gravatarEmail } } = this.props;
    const emailString = md5(gravatarEmail).toString();
    ACTION_SAVE_GRAVATAR(dispatch, `https://www.gravatar.com/avatar/${emailString}`);
    const token = localStorage.getItem('token');
    const newUrl = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const apiCheck = await fetchToken(newUrl);
    if (apiCheck.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: apiCheck.results }, this.handleShuffle);
      this.timedStart();
    }
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) this.endTimer();
  }

  componentWillUnmount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player: { name, score }, gravatar } = this.props;
    const newRanking = localStorage.ranking
      ? [...ranking, { name, score, gravatar }]
      : [{ name, score, gravatar }];

    newRanking.sort((a, b) => b.score - a.score);

    localStorage
      .setItem('ranking', JSON.stringify(newRanking));
  }

  styleAnswerButton = () => {
    this.setState({ correctClass: 'green-border', wrongClass: 'red-border' });
  };

  handleClickAnswer = ({ target }) => {
    const { state: { timer, questions, questionIndex }, props: { dispatch } } = this;
    const dificuldade = { easy: 1, medium: 2, hard: 3 };

    this.styleAnswerButton();
    if (target.id === correctAnswerId) {
      ACTION_INCREMENT_SCORE(
        dispatch,
        (ten + (timer * dificuldade[questions[questionIndex].difficulty])),
      );
    }
    this.setState({ nextOn: true });
    this.endTimer();
  };

  shuffleArray = (arr) => {
    const arr2 = [];
    arr.forEach((el) => arr2.splice(Math.floor(Math.random() * arr.length), 0, el));
    return arr2;
  };

  handleShuffle = () => {
    const { questions, questionIndex } = this.state;
    if (questions.length > 0) {
      const answers = this.shuffleArray([
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ]);
      this.setState({ answers, correctAnswer: questions[questionIndex].correct_answer });
    }
  };

  timedStart = () => {
    const { timer, intervalId } = this.state;
    const interval = 1000;
    if (intervalId || timer === 0) {
      this.setState({ timer: 30, intervalId: '' });
    }

    const timerCount = setInterval(() => {
      this.setState((prevState) => ({
        ...prevState,
        timer: prevState.timer - 1,
        intervalId: timerCount,
      }));
    }, interval);
  };

  handleTimer = () => {
    const { timer } = this.state;
    const limit = 0;
    if (timer === limit) return true;
  };

  endTimer = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  };

  handleNext = () => {
    const { questionIndex } = this.state;
    if (questionIndex < four) {
      this.setState((prevState) => ({
        nextOn: false,
        questionIndex: prevState.questionIndex + 1,
        correctClass: '',
        wrongClass: '',
      }), this.handleShuffle, this.timedStart());
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const {
      questions,
      questionIndex,
      answers,
      correctAnswer,
      correctClass,
      wrongClass,
      timer,
      nextOn,
    } = this.state;

    console.log('Teste 6');

    return (
      <div>
        <Header />
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
                      questions[questionIndex].question
                    }
                  </h3>
                  {timer}
                  <section
                    data-testid="answer-options"
                  >
                    {
                      answers.map((each, index) => (
                        <Button
                          key={ each }
                          btnLabel={ each }
                          id={
                            each === correctAnswer
                              ? correctAnswerId
                              : `wrong-answer-${index}`
                          }
                          testId={
                            each === correctAnswer
                              ? correctAnswerId
                              : `wrong-answer-${index}`
                          }
                          handleButton={ this.handleClickAnswer }
                          buttonClassCss={
                            each === correctAnswer
                              ? correctClass
                              : wrongClass
                          }
                          isDisabled={ this.handleTimer() }
                        />
                      ))
                    }
                  </section>
                </>
              )
              : <h1>LOADING...</h1>
          }
        </section>
        {nextOn
          ? (
            <Button
              testId="btn-next"
              disabled={ false }
              handleButton={ this.handleNext }
              btnLabel="Next"
            />)
          : ''}
      </div>
    );
  }
}

Game.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  gravatar: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Game.defaultProps = {
  gravatar: '',
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
