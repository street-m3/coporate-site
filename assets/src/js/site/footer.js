'use strict';
import { globalvariables } from '../env/env';
export class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin', 
            `
            <footer class="s-Footer" role="contentinfo">
                <div class="s-Footer_Inner">
                    <address class="s-Footer_Address">
                        <div class="s-Footer_Address-Brand">
                            <img src="${this.getAttribute('media')}logo.svg" width="99px" height="83.41px" alt="藤岡行政書士事務所">
                            <ul class="s-Footer_AddressList">
                                <li class="s-Footer_AddressList-Item">
                                    〒234-0013
                                </li>
                                <li class="s-Footer_AddressList-Item">
                                    京都府京都市伏見区淀水垂町509-16
                                </li>
                            </ul>
                        </div>
                    </address>
                    <nav class="s-Footer_nav">
                        <ul class="s-Footer_navList">
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}">ホーム</a>
                            </li>
                            <li class="s-Footer_navList-Item s-Footer-Dropdown">
                                <div class="s-Footer-Dropdown_Header js-Footer-Dropdown-Header">
                                    <button type="button" class="s-Footer-Dropdown_Tab">
                                        サービス一覧
                                    </button>
                                </div>
                                <div class="s-Footer-Dropdown_nav">
                                    <ul class="s-Footer-Dropdown_navList">
                                        <li class="s-Footer-Dropdown_navList-Item">
                                            <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}1">IT法務</a>
                                        </li>
                                        <li class="s-Footer-Dropdown_navList-Item">
                                            <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}2">ビザ申請</a>
                                        </li>
                                        <li class="s-Footer-Dropdown_navList-Item">
                                            <a href="${globalvariables.siteUrl}service/index.html${globalvariables.prefixid}3">民泊申請</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}price">価格</a>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}news">お知らせ</a>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}company">会社概要</a>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}faq">よくある質問</a>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="${globalvariables.siteUrl}sitemap">サイトマップ</a>
                            </li>
                            <li class="s-Footer_navList-Item">
                                <a class="touch-hover" href="policy">プライバシーポリシー</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="s-Footer_Copyright">
                    <div class="ly-Inner_Grid">
                        <small translate="no">© 藤岡行政書士事務所 All Rights Reserved.</small>
                    </div>
                </div>
            </footer>
            `
        );
    }
}

customElements.define('site-footer', Footer);