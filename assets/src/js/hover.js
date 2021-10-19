'use strict';
document.addEventListener('DOMContentLoaded', () => {
    new Hover();
});

/**
 * hoverイベント
 * @constructor
 */

class Hover {
    constructor() {
        const o = {
            hoverEventGetClass: 'touch-hover',
            hoverEventAddClass: 'hover',
        }
        this.hoverEventGetClass = document.querySelectorAll(`.${o.hoverEventGetClass}`);
        this.hoverEventAddClass = o.hoverEventAddClass;
        this.hoverEventStart = this._hoverEventStart();
        this.hoverEventEnd = this._hoverEventEnd();
        this._hoverEventMethod(this.hoverEventGetClass);
    }

    _hoverEventMethod(array) {
        array.forEach(element => {
            element.addEventListener(this.hoverEventStart, () => {
                element.classList.add(this.hoverEventAddClass);
            });
            element.addEventListener(this.hoverEventEnd, () => {
                element.classList.remove(this.hoverEventAddClass);
            });
        });
    }

    _hoverEventStart() {
        return window.ontouchstart ? 'touchstart' : 'mouseover';
    }

    _hoverEventEnd() {
        return window.ontouchstart ? 'touchend' : 'mouseout';
    }
}