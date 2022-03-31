'use strict';

export class ScrollString {
    constructor() { 
        this.string = document.querySelector('[data-scroll-trigger]');
        this._action();
    }

    _action() {
        window.addEventListener('scroll', (e) => {
            if (!this.string) return;
            this.string.style.transform = `translateX(${window.scrollY / 7}px)`;
        });
        return;
    }
}