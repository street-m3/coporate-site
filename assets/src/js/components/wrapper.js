'use strict';

export class Wrapper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }
    attachShadow() {
        this.insertAdjacentHTML('afterbegin', `
            <div></div>
        `);
    }
}

customElements.define('anchor-component', Wrapper);