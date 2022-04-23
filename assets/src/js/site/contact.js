'use strict';
import { presets } from "../env/env";
export class ContactBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        const rootUrl = 'https://reverent-volhard-d99d5d.netlify.app/';
        this.insertAdjacentHTML('afterbegin', 
            `
            <aside class="s-Contact-Banner" role="complementary">
                <div class="s-Contact-Banner_Inner">
                    <h2 class="s-Contact-Banner_Headline">
                        <span lang="en">CONTACT</span>
                        <span lang="ja">お問い合わせ</span>
                    </h2>
                    <div class="s-Contact-Banner_Wrapper">
                        <p class="s-Contact-Banner_Caption">
                            ご質問などありましたらお気軽にお問い合わせください
                        </p>
                        <div class="s-Contact-Banner_Component">
                            <a href="${presets.siteUrl}contact" class="o-button c-button-border s-Contact-Banner_ContactLink" data-op="vertical-right">
                                お問い合わせフォームへ
                            </a>
                        </div>
                        <div class="s-Contact-Banner_Telephone">
                            <p class="s-Contact-Banner_Telephone-Text">
                                お電話でのお問い合わせ
                            </p>
                            <div class="c-Telephone-Number">
                                <a href="tel:0123-456-789​" class="c-Telephone-Number_Link">0123-456-789​</a>
                                <p class="c-Telephone-Number_Date">（平日00:00〜00:00）</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            `
        );
    }
}

customElements.define('site-contact', ContactBanner);