import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';
import Overview from '~/app/overview';
import MainView from '~/app/main';
import LoadView from '~/app/load';
import PcsView from '~/app/pcs';
import AirConditionerView from '~/app/airConditioner';
import TransformatorView from '~/app/transformator';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='zh-CN' locales={locales}><Framework><Overview /></Framework></Application>;
const main = () => <Application currentLocale='zh-CN' locales={locales}><Framework logout><MainView /></Framework></Application>;
const load = () => <Application currentLocale='zh-CN' locales={locales}><Framework back><LoadView /></Framework></Application>;
const pcs = () => <Application currentLocale='zh-CN' locales={locales}><Framework back><PcsView /></Framework></Application>;
const airConditioner = () => <Application currentLocale='zh-CN' locales={locales}><Framework back><AirConditionerView /></Framework></Application>;
const transformator = () => <Application currentLocale='zh-CN' locales={locales}><Framework back><TransformatorView /></Framework></Application>;

render((
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={main} />
            <Route path='/overview' exact component={overview} />
            <Route path='/main' exact component={main} />
            <Route path='/load' exact component={load} />
            <Route path='/pcs' exact component={pcs} />
            <Route path='/airConditioner' exact component={airConditioner} />
            <Route path='/transformator' exact component={transformator} />
            <Route path='*' component={overview} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
