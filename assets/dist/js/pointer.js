'use strict';
window.addEventListener('load', () => {
    new MouseFollow(992);
});

/**
 * 非表示にしたいセレクターや領域(class)を文字列で記述します。
 */
const FOCUSABLE = 'area, input, select, option, textarea, output, summary, video, audio, object, embed, iframe, .s-header, .c-newsticker';
class MouseFollow {
    constructor(breakpoints) {
        this.o = {
            mouseCenter: 'js-mouseFollow-Center',
            mouseHoverSelecter: 'a, button[type="button"]',
            mouseHoverPlay: '.p-topMainvisual',
        };
        this.mouseCenter = document.querySelector(`.${this.o.mouseCenter}`);
        this.mouseHoverTargets = document.querySelectorAll(`${[this.o.mouseHoverSelecter, this.o.mouseHoverPlay]}`);
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
            this.mouseCenter.style.transition = `transform 0.3s ease-out 0s`;
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