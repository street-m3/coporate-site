'use strict';
import { presets } from '../env/env';

export class ScreenAnimateInnerHTML extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin', `
            <div class="c-ScreenAnimate_Container">
                <div class="c-ScreenAnimate_Layer anim-MotionLayer_01">
                    <div class="c-ScreenAnimate_Routine js-ScreenAnimate-Routine" style="visiblity: hidden; opacity: 0;">
                        <img src="${presets.siteUrl}images/loading.svg">
                    </div>
                </div>
                <div class="c-ScreenAnimate_Layer anim-MotionLayer_02"></div>
            </div>
        `);
    }
}

customElements.define('screen-animation', ScreenAnimateInnerHTML);