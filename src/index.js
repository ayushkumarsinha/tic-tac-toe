import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import TicTacToeBoardContainer from './TicTacToeBoardContainer';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TicTacToeBoardContainer />);
