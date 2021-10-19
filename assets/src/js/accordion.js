window.addEventListener('load', () => {
    new Accordion('p-accordions', 'js-accordion-header');
    new Accordion('s-drawer-dropdown', 'js-drawer-dropdown-header');
    footerDropdownMenu('index.html');
});

class Accordion {
    constructor(container, tab) {
        this.accordionContainer = document.querySelector(`.${container}`);
        this.accordionTabs = document.querySelectorAll(`.${tab}`);
        this.accordionAddCls = 'is-open-panel';
        this.touchEventListener = this.touchEventDetection();
        this.multiSelectDefault = true;
        this.init();
    }

    init() {
        if (!this.accordionContainer) return;
        this.accordion_trigger();
    }

    accordion_trigger() {
        this.accordionTabs.forEach((item) => {
            item.addEventListener(this.touchEventListener, (e) => {
                e.preventDefault();
                this.multiSelectable(item);
                item.classList.toggle(this.accordionAddCls);
                const panelItembody = item.nextElementSibling;
                if (item.classList.contains(this.accordionAddCls)) {
                    panelItembody.style.maxHeight = panelItembody.scrollHeight + 'px';
                } else {
                    panelItembody.style.maxHeight = 0;
                }
            });
        });
    }

    multiSelectable(tabitem) {
        if (this.multiSelectDefault == true) {
            const currentlyPanel = this.accordionContainer.querySelector('.js-accordion-header.is-open-panel');
            if (currentlyPanel && currentlyPanel !== tabitem) {
                currentlyPanel.classList.remove(this.accordionAddCls);
                currentlyPanel.nextElementSibling.style.maxHeight = 0;
            }
        }
    }

    touchEventDetection() {
        return window.ontouchstart ? "touchstart" : "click";
    }
}

/**
 * モバイル端末時: ドロップダウンメニュー, PC端末: location.hrefにて遷移させる
 * @param {string} destination 遷移先のリンクを文字列で記述
 * @returns 
 */

function footerDropdownMenu(destination) {
    const footerDropdown = document.querySelector('.s-footer-dropdown__tab');
    if (window.matchMedia(`(max-width: 992px)`).matches) {
        new Accordion('s-footer-dropdown', 'js-footer-dropdown-header');
    } else {
        footerDropdown.addEventListener('click', () => {
            location.href = destination;
        });
    }
}