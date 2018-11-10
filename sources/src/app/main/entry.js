import React from 'react';
import { render } from 'react-dom';
import Application from '~/components/application';
import View from './view';

render(<Application><View /></Application>, document.getElementById('root'));
