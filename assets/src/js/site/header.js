'use strict';
import { globalvariables } from '../env/env.js';
export class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin', 
            `
            <header class="s-Header" role="banner">
                <div class="s-Header_Brand">
                    <a href="https://reverent-volhard-d99d5d.netlify.app/" class="s-Header_Brand-Title">
                        <img src="${this.getAttribute('media')}logo.svg" width="99px" height="83.41px" alt="藤岡行政書士事務所">
                    </a>
                </div>
                <div class="s-Header_Inner" data-scroll="false" data-hover="false">
                    <nav class="s-Header_nav" role="navigation">
                        <div class="s-Header_nav-Wrapper">
                            <ul class="s-Header_navList">
                                <li class="s-Header_navList-Item">
                                    <a class="touch-hover" href="${globalvariables.siteUrl}">ホーム</a>
                                </li>
                                <li class="s-Header_navList-Item js-Header-Dropdown">
                                    <a class="touch-hover" href="${globalvariables.siteUrl}service">サービス</a>
                                    <div class="s-Header-Dropdown" aria-hidden="true">
                                        <div class="s-Header-Dropdown_Inner">
                                            <ul class="s-Header-Dropdown_List">
                                                <li class="s-Header-Dropdown_List-Item">
                                                    <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}1" data-smooth-scroll="true">IT法務</a>
                                                </li>
                                                <li class="s-Header-Dropdown_List-Item">
                                                    <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}2" data-smooth-scroll="true">ビザ申請</a>
                                                </li>
                                                <li class="s-Header-Dropdown_List-Item">
                                                    <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}3" data-smooth-scroll="true">民泊申請</a>
                                                </li>
                                            </ul>
                                            <div class="s-Header-Dropdown_Contact">
                                                <div class="c-Telephone-Number">
                                                    <a href="tel:0123-456-789​" class="c-Telephone-Number_Link">0123-456-789​</a>
                                                    <p class="c-Telephone-Number_Date">(平日00:00〜00:00)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="s-Header_navList-Item">
                                    <a href="${globalvariables.siteUrl}price">価格</a>
                                </li>
                                <li class="s-Header_navList-Item">
                                    <a href="${globalvariables.siteUrl}news">お知らせ</a>
                                </li>
                                <li class="s-Header_navList-Item">
                                    <a href="${globalvariables.siteUrl}company">会社情報</a>
                                </li>
                                <li class="s-Header_navList-Item">
                                    <a href="${globalvariables.siteUrl}faq">よくある質問</a>
                                </li>
                            </ul>
                            <a href="${globalvariables.siteUrl}contact" class="o-button s-Header_nav-ContactLink">CONTACT</a>
                        </div>
                    </nav>
                </div>
            </header>
            `
        );
    }
}

customElements.define('site-header', Header);