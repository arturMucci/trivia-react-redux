import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { storageMock } from './helpers/data';
import App from '../App';
import Login from '../pages/Login';
import Ranking from '../pages/Ranking';
import { act } from 'react-dom/test-utils';

describe('teste da página de ranking', () => {
    test('Verifica se existe um botão que redireciona a pessoa para a tela inicial (login)', async () => {
        const { history } = renderWithRouterAndRedux(<Ranking />);
        const buttonBack = screen.getByTestId('btn-go-home');
        expect(buttonBack).toBeInTheDocument();
        userEvent.click(buttonBack);
        expect(history.location.pathname).toBe('/');
    });
    test('Verifica se ranking de jogadores está na tela', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        Object.defineProperty(window, 'localStorage', { value: storageMock });
        act(() => history.push('/ranking'));
        const player01 = screen.getByTestId('player-name-0');
        const score01 = screen.getByTestId('player-score-0');
        expect(player01).toBeInTheDocument();
        expect(score01).toBeInTheDocument(); 
        expect(screen.getByTestId('player-name-1')).toBeInTheDocument();
        expect(screen.getByTestId('player-name-2')).toBeInTheDocument();
    })
})