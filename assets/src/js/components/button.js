'use strict';

export class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }
    attachShadow() {
        this.insertAdjacentHTML('afterbegin', `
            <a href="${this.getAttribute('link')}"
            class="o-button c-button-border" 
            data-op="vertical-right" 
            style="
            color: var(--color-main); 
            font-size: 14px; 
            padding: 16px 0;">${this.getAttribute('title')}</a>
        `);
    }
}

customElements.define('anchor-component', Button);