'use strict';
window.addEventListener('load', () => {
    new MouseFollow(992);
});
// const FOCUSABLE = 'a, area, input, button, select, option, textarea, output, summary, video, audio, object, embed, iframe';
const FOCUSABLE = 'area, input, select, option, textarea, output, summary, video, audio, object, embed, iframe';

class MouseFollow {
    constructor(breakpoints) {
        const o = {
            mouseCenter: 'js-mouseFollow-Center',
            mouseHoverTargets: 'a:not(.no-focus-hover), button[type="button"]',
        };
        this.mouseCenter = document.querySelector(`.${o.mouseCenter}`);
        this.mouseHoverTargets = document.querySelectorAll(`${o.mouseHoverTargets}`);
        this.unSelectable = document.querySelectorAll(FOCUSABLE);
        this.hoverbool = false;
        this.breakpoints = breakpoints;
        this.motion = window.matchMedia(`(min-width:${this.breakpoints}px)`).matches;
        this.init();
    }

    init() {
        if (!this.motion) return;
        this.movePointer();
        this.selectablePointer();
        this.unSelectablePointer();
    }

    movePointer() {
        document.addEventListener('mousemove', (e) => {
            this.mouseCenter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }

    selectablePointer() {
        for (let i = 0; i < this.mouseHoverTargets.length; i++) {
            const element = this.mouseHoverTargets[i];
            // hover
            element.addEventListener('mouseover', (e) => {
                this.mouseCenter.classList.add('hover');
            });
            // not hover
            element.addEventListener('mouseout', (e) => {
                this.mouseCenter.classList.remove('hover');
            });
        }
    }

    unSelectablePointer() {
        this.unSelectable.forEach((element, index) => {
            element.addEventListener('mouseover', (e) => {
                this.mouseCenter.style.visiblity = 'hidden';
                this.mouseCenter.style.opacity = 0;
                this.mouseCenter.style.transition = 'opacity 0.3s ease 0s';
            });
            element.addEventListener('mouseout', (e) => {
                this.mouseCenter.style.visiblity = 'visible';
                this.mouseCenter.style.opacity = 1;
                // this.mouseCenter.style.transition = 'opacity 0.3s ease 0s'
            });
        });
    }
}