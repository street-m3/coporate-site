'use strict';
export class TitleArea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin',
            `
            <div class="s-titleArea-header js-headerScroll-Target">
                <h1 class="c-headline c-headline-titleArea u-uppercase">${document.querySelector('main').getAttribute('data-placement')}</h1>
            </div>
            `
        );
    }
}

customElements.define('site-titlearea', TitleArea);