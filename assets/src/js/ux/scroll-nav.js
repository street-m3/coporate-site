'use strict';
import { requestAnimationTargetTop } from '../utils/smoothAnimate.js';

export class SmoothScrollNavigation {
    constructor() {
        this.navigation = document.querySelectorAll('[data-smooth-scroll]');
        this.touchEventListener = this.touchEventListener();
        this.header = document.querySelector('.s-Header_Brand');
        this.init();
    }

    init() {
        if (!this.navigation) return;
        this._scrollEventListener();
    }

    _scrollEventListener() { 
        this.navigation.forEach(anchor => {
            if (anchor.dataset.smoothScroll == 'false') return;
            anchor.addEventListener(this.touchEventListener, (e) => {
                requestAnimationTargetTop(e, this.header.clientHeight);
            })
        });
    }

    touchEventListener() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}