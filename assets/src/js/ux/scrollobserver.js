'use strict';
import { ScrollObserver } from '../modules/observer';

export class IntersectionObservers {
    constructor() {
        this._observers = [];
        this._scrollInit();
    }

    // this._observers.push( new Intersection observer instance.. ); push処理を関数化
    set setobservers(val) {
        this._observers.push(val);
    }

    // Arrayを返却する
    get getobservers() {
        return this._observers;
    }

    _scrollFixedHeader = (element, isIntersecting) => {
        const headerBreakpoint = window.matchMedia(`(min-width: 992px)`).matches;
        const headerContainer = document.querySelector('[data-scroll]');
        if (isIntersecting && headerBreakpoint) {
            headerContainer.dataset.scroll = "false";
        } else {
            headerContainer.dataset.scroll = "true";
        }
    }

    _scrollAnimateFadein = (element, isIntersecting) => {
        if (isIntersecting) {
            element.dataset.animate = 'true';
        } else {
            element.dataset.animate = 'false';
        }
    }

    _scrollInit() {
        this.setobservers = new ScrollObserver('.js-headerScroll-Target', this._scrollFixedHeader, { once: false });
        this.setobservers = new ScrollObserver('.js-observe', this._scrollAnimateFadein, { once: true, threshold: 0.1, });
    }
}