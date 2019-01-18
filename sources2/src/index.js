import React from 'react';
import { render } from 'react-dom';
import LiveRoute from 'react-live-route';
import { MemoryRouter, Switch } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';
import Login from '~/app/login';
import Load from '~/app/load';
import Pcs from '~/app/pcs';
import Air from '~/app/air';
import Transformer from '~/app/transformer';
import Bms from '~/app/bms';

const locales = { 'ZH-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='ZH-CN' locales={locales}><Framework><Overview /></Framework></Application>;
const login = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Login /></Framework></Application>;
const load = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Load /></Framework></Application>;
const pcs = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Pcs /></Framework></Application>;
const air = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Air /></Framework></Application>;
const transformer = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Transformer /></Framework></Application>;
const bms = () => <Application currentLocale='ZH-CN' locales={locales}><Framework back><Bms /></Framework></Application>;

render((
    <MemoryRouter>
        <Switch>
            <LiveRoute path='/' exact alwaysLive component={overview} />
            <LiveRoute path='/overview' exact alwaysLive component={overview} />
            <LiveRoute path='/login' exact alwaysLive component={login} />
            <LiveRoute path='/load' exact alwaysLive component={load} />
            <LiveRoute path='/pcs' exact alwaysLive component={pcs} />
            <LiveRoute path='/air' exact alwaysLive component={air} />
            <LiveRoute path='/transformer' exact alwaysLive component={transformer} />
            <LiveRoute path='/bms' exact alwaysLive component={bms} />
            <LiveRoute path='*' alwaysLive component={overview} />
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));
