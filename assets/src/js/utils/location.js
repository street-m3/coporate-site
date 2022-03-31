'use strict';
import { _smoothScroll } from '../utils/smoothAnimate.js';
export class LocationController {
    constructor(header) {
        this.urlHash = location.hash;
        this.urlTarget = document.getElementById(this.urlHash.replace('#', ''));
        this.headerClientHeight = document.querySelector(`.${header}`).clientHeight;
        this.init();
    }

    init() {
        if (!this.urlTarget) return;
        if (this.urlHash) {
            const targetPosition = this.urlTarget.offsetTop - this.headerClientHeight;
            _smoothScroll(targetPosition);
        }
    }
}