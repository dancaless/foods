"use strict";
// ./node_modules/.bin/webpack
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
// как импортировать в ES6
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import openModal from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    // как импортировать в CommonJS
    // const tabs = require('./modules/tabs'),
    //       modal = require('./modules/modal'),
    //       timer = require('./modules/timer'),
    //       cards= require('./modules/cards'),
    //       calc = require('./modules/calc'),
    //       forms = require('./modules/forms'),
    //       slider = require('./modules/slider');


    // Делаем так, чтобы модалка появлялась через определенное время
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-12-31');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slide-inner'
    });

});