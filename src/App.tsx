import React from 'react';
import AppRouter from './routes/AppRouter';
import Header from './components/Header/Header';
import './App.scss';

export const App: React.FC = () => (
  <>
    <Header />
    <AppRouter />
  </>
);
