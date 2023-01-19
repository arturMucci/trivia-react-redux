import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';

describe('teste da página de login', () => {
test('verifica se input, email e botão estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByRole('textbox', {
        name: /nome:/i
      });
    const inputEmail = screen.getByRole('textbox', {
        name: /email:/i
      });
    const buttonPlay = screen.getByRole('button', {
        name: /play/i
      });
      expect(inputEmail).toBeInTheDocument();
      expect(inputName).toBeInTheDocument();
      expect(buttonPlay).toBeInTheDocument();
});
test('verifica se o botão "Play" fica desabilitado caso email e/ou nome não estejam preenchidos', () => {
    renderWithRouterAndRedux(<Login />); 
    const inputName = screen.getByRole('textbox', {
        name: /nome:/i
      });
    const inputEmail = screen.getByRole('textbox', {
        name: /email:/i
      });
    const buttonPlay = screen.getByRole('button', {
        name: /play/i
      });
    expect(inputName.value).toBe('');
    expect(inputName.id).toBe('name');
    expect(inputEmail.value).toBe('');
    expect(buttonPlay.disabled).toBe(true);

    userEvent.type(inputName, 'Trybe');

    expect(inputName.value).toBe('Trybe');
    expect(buttonPlay.disabled).toBe(true);

    userEvent.type(inputEmail, 'test@test.com');

    expect(inputEmail.value).toBe('test@test.com');
    expect(buttonPlay.disabled).toBe(false);
});
test('Verifica se o botão "Play" redireciona para tela de jogo', async () => {
  const { history } = renderWithRouterAndRedux(<App />)
  const inputName = screen.getByRole('textbox', {
    name: /nome:/i
  });
const inputEmail = screen.getByRole('textbox', {
    name: /email:/i
  });
const button = screen.getByRole('button', {
    name: /play/i
  });
  expect(history.location.pathname).toBe('/');
  
  userEvent.type(inputName, 'Trybe');
  userEvent.type(inputEmail, 'test@test.com');
  userEvent.click(button);

  const text1 = await screen.findByText(/sua vez/i);
    expect(text1).toBeInTheDocument();

    const headerScore = await screen.findByTestId('header-score');
    expect(headerScore).toBeInTheDocument();

    const category = await screen.findByTestId('question-category');
    expect(category).toBeInTheDocument();

    const text = await screen.findByTestId('question-text');
    expect(text).toBeInTheDocument();

    const answer = await screen.findByTestId('answer-options');
    expect(answer).toBeInTheDocument();

    expect(history.location.pathname).toBe('/game');

    const timer = screen.getByTestId('timer');
    expect(timer).toHaveTextContent('30');
    await waitFor(() => {
      expect(timer).toHaveTextContent('29');
    }, { timeout: 10000 });

    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);

    const correctAnswer2 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer2);
    const nextButton2 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton2);

    const correctAnswer3 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer3);
    const nextButton3 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton3);

    const correctAnswer4 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer4);
    const nextButton4 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton4);

    const correctAnswer5 = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer5);
    const nextButton5 = await screen.findByTestId('btn-next');
    userEvent.click(nextButton5);

    expect(history.location.pathname).toBe('/feedback');
    const feedbackText = await screen.findByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
  });

test('Verifica se a tela inicial contem um botão que leve para a configuração do jogo', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const button = screen.getByTestId('btn-settings');

  userEvent.click(button);
  
  expect(history.location.pathname).toBe('/settings');
  const title = await screen.findByTestId('settings-title');
  expect(title).toBeInTheDocument();
});
});