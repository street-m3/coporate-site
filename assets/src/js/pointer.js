'use strict';
window.addEventListener('load', () => {
    new MouseFollow(992);
});

/**
 * 非表示にしたいセレクターや領域(class)を文字列で記述します。
 */
const FOCUSABLE = 'area, input, select, option, textarea, output, summary, video, audio, object, embed, iframe, .s-Header, .c-newsTicker';
class MouseFollow {
    constructor(breakpoints) {
        this.o = {
            mouseCenter: 'js-mouseFollow-Center',
            mouseHoverSelecter: 'a, [type="button"]',
            mouseHoverPlay: '.p-topMainvisual_Title',
        };
        this.mouseCenter = document.querySelector(`.${this.o.mouseCenter}`);
        this.mouseHoverTargets = document.querySelectorAll(`${[this.o.mouseHoverSelecter]}`);
        this.impressive = document.querySelectorAll(`${[this.o.mouseHoverPlay]}`);
        this.unSelectable = document.querySelectorAll(FOCUSABLE);
        this.hoverbool = false;
        this.breakpoints = breakpoints;
        this.motion = window.matchMedia(`(min-width:${this.breakpoints}px)`).matches;
        this.init();
    }

    init() {
        if (!this.motion) return;
        this.movePointer();
        this.selectablePointer(this.mouseHoverTargets, 'hover');
        this.selectablePointer(this.impressive, 'play');
        this.unSelectablePointer();
    }

    movePointer() {
        document.addEventListener('mousemove', (e) => {
            const browser = window.navigator.userAgent.toLowerCase();
            if (browser.indexOf('webkit')) return this.mouseCenter.style.setProperty('-webkit-transform', `translate3d(${e.clientX}px, ${e.clientY}px, 0)`);
            this.mouseCenter.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }

    selectablePointer(targets, suffix) {
        targets.forEach((element) => {
            // hover
            element.addEventListener('mouseover', () => {
                this.mouseCenter.classList.add(suffix);
            });
            // not hover
            element.addEventListener('mouseout', () => {
                this.mouseCenter.classList.remove(suffix);
            });
        });
    }

    unSelectablePointer() {
        this.unSelectable.forEach((element) => {
            element.addEventListener('mouseover', () => {
                this.mouseCenter.style.visiblity = 'hidden';
                this.mouseCenter.style.opacity = 0;
            });
            element.addEventListener('mouseout', () => {
                this.mouseCenter.style.visiblity = 'visible';
                this.mouseCenter.style.opacity = 1;
            });
        });
    }
}