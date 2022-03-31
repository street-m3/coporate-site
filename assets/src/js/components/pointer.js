'use strict';
export class PointerDOM extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin', `
        <div class="c-mouseFollow_Center js-mouseFollow-Center">
            <span aria-label="クリック" lang="en" class="c-mouseFollow_Text">CLICK</span>
            <span aria-label="動画を再生" class="c-mouseFollow_playIcon">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35" viewBox="0 0 30 35">
                    <path d="M17.5,0,35,30H0Z" transform="translate(30) rotate(90)" fill="#fff" />
                </svg>
            </span>
        </div>
        `);
    }
}
customElements.define('pointer-component', PointerDOM);