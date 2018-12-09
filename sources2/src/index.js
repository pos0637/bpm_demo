import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';

const locales = { 'ZH-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='ZH-CN' locales={locales}><Framework><Overview /></Framework></Application>;

render((
    <MemoryRouter>
        <Switch>
            <Route path='/' exact component={overview} />
            <Route path='/overview' exact component={overview} />
            <Route path='*' component={overview} />
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));
