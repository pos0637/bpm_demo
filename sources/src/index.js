import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';
import MainView from '~/app/main';
import LoadView from '~/app/load';
import PcsView from '~/app/pcs';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='zh-CN' locales={locales}><Framework><Overview /></Framework></Application>;
const main = () => <Application currentLocale='zh-CN' locales={locales}><Framework logout><MainView /></Framework></Application>;
const load = () => <Application currentLocale='zh-CN' locales={locales}><Framework logout><LoadView /></Framework></Application>;
const pcs = () => <Application currentLocale='zh-CN' locales={locales}><Framework logout><PcsView /></Framework></Application>;

render((
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={pcs} />
            <Route path='/main' exact component={main} />
            <Route path='*' component={overview} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
