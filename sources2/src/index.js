import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';
import Login from '~/app/login';
import Load from '~/app/load';

const locales = { 'ZH-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='ZH-CN' locales={locales}><Framework><Overview /></Framework></Application>;
const login = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Login /></Framework></Application>;
const load = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Load /></Framework></Application>;

render((
    <MemoryRouter>
        <Switch>
            <Route path='/' exact component={load} />
            <Route path='/overview' exact component={overview} />
            <Route path='/Login' exact component={login} />
            <Route path='/Load' exact component={load} />
            <Route path='*' component={overview} />
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));