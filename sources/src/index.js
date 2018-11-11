import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';
import MainView from '~/app/main';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='zh-CN' locales={locales}><Framework><Overview /></Framework></Application>;
const main = () => <Application currentLocale='zh-CN' locales={locales}><Framework><MainView /></Framework></Application>;

render((
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={overview} />
            <Route path='/main' exact component={main} />
            <Route path='*' component={overview} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
