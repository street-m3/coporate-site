'use strict';
export { Megamenu, HoverHeader };

class Megamenu {
    constructor() {
        this.dropdownContainer = document.querySelectorAll('.js-Header-Dropdown');
        this.dropdownBody = document.querySelector('.s-Header-Dropdown');
        this.clickHandler = this._clickHandler();
        this.endHoverHandler = this._endHoverHandler();
        this.startHoverHandler = this._startHoverHandler();
        this._open();
    }

    _open() {
        if (!(this.dropdownContainer && this.dropdownBody)) return;
        this.dropdownContainer.forEach(element => {
            element.addEventListener(this.startHoverHandler, () => {
                this.dropdownBody.setAttribute('aria-hidden', 'false');
            });

            element.addEventListener(this.endHoverHandler, () => {
                this.dropdownBody.setAttribute('aria-hidden', 'true');
            });
        });
    }

    _startHoverHandler() {
        return window.ontouchstart ? 'touchstart' : 'mouseover';
    }

    _endHoverHandler() {
        return window.ontouchstart ? 'touchend' : 'mouseout';
    }

    _clickHandler() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }
}

class HoverHeader extends Megamenu {
    constructor() {
        super();
        this.wrapper = document.querySelector('[data-hover]');
        this.navbarItem = document.querySelectorAll('.s-Header_navList-Item');
        this._navbar();
    }

    _navbar() {
        if(!(this.navbarItem && this.wrapper)) return;
        this.navbarItem.forEach(element => {
            const anchor = element.querySelector('a');
            element.addEventListener(this.startHoverHandler, () => {
                this.wrapper.dataset.hover = "true";
                anchor.classList.add("active");
            });
            element.addEventListener(this.endHoverHandler, () => {
                this.wrapper.dataset.hover = "false";
                anchor.classList.remove("active");
            });
        });
    }
}