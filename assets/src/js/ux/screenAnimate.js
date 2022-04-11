'use strict';
import { backfaceFixed } from '../utils/backfaceFixed.js';
import { ScreenAnimateInnerHTML } from '../template/screenAnimate';

export class ScreenAnimate {
    constructor(options) {
        this.defaultOptions = {
            wrapper: 'js-ScreenAnimate-Context-Wrapper',
            animationTime: 2000,
            animationMax: 5000,
            firstLayer: 'anim-MotionLayer_01',
            title: 'js-ScreenAnimate-Routine',
            attribute: 'data-animate-effect',
        };
        this.options = Object.assign(this.defaultOptions, options);
    }
}