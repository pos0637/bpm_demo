import React from 'react';
import { render } from 'react-dom';
import { MemoryRouter, Switch, Route } from 'react-router-dom'
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
            <Route path='/' exact component={load} />
            <Route path='/overview' exact component={overview} />
            <Route path='/login' exact component={login} />
            <Route path='/load' exact component={load} />
            <Route path='/pcs' exact component={pcs} />
            <Route path='/air' exact component={air} />
            <Route path='/transformer' exact component={transformer} />
            <Route path='/bms' exact component={bms} />
            <Route path='*' component={overview} />
        </Switch>
    </MemoryRouter>
), document.getElementById('root'));
