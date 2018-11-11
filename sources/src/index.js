import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Application from '~/components/application';
import Framework from '~/framework';

const locales = { 'zh-CN': require('~/app/locales/zh-CN.json') };
const overview = () => <Application currentLocale='zh-CN' locales={locales}><Framework url="./app_overview.html" /></Application>;
const main = () => <div>123</div>;

render((
    <BrowserRouter>
        <div>
            <Route path="/" component={overview} />
            <Route path="/main" component={main} />
        </div>
    </BrowserRouter>
), document.getElementById('root'));
