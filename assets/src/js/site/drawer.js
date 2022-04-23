'use strict';
import { presets } from '../env/env';
export class DrawerComponents extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        const prefixBase = '#index_id';
        return this.insertAdjacentHTML('afterbegin', `
        <div class="s-Drawer">
            <button type="button" class="s-Drawer_Button js-Drawer-Button" aria-controls="site:drawer-nav" aria-label="モバイルメニュー" aria-expanded="false">
                <span class="Button-Line Button-Line--1"></span>
                <span class="Button-Line Button-Line--2"></span>
            </button>
            <div class="s-Drawer_Overlay js-Drawer-Overlay" data-focus-visible="false"></div>
            <div id="site:drawer-nav" class="s-Drawer_Content" aria-hidden="true">
                <nav class="s-Drawer_nav" role="navigation">
                    <ul class="s-Drawer_navList">
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}">ホーム</a>
                        </li>
                        <li class="s-Drawer_navList-Item s-Drawer-Dropdown">
                            <div class="s-Drawer-Dropdown_Header js-Drawer-Dropdown-Header">
                                <button type="button" class="s-Drawer-Dropdown_Tab">
                                    サービス
                                </button>
                            </div>
                            <div class="s-Drawer-Dropdown_nav">
                                <ul class="s-Drawer-Dropdown_navList">
                                    <li class="s-Drawer-Dropdown_navList-Item">
                                        <a href="${presets.siteUrl}service/index.html${prefixBase}1">IT法務</a>
                                    </li>
                                    <li class="s-Drawer-Dropdown_navList-Item">
                                        <a href="${presets.siteUrl}service/index.html${prefixBase}2">ビザ申請</a>
                                    </li>
                                    <li class="s-Drawer-Dropdown_navList-Item">
                                        <a href="${presets.siteUrl}service/index.html${prefixBase}3">民泊申請</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}price">価格</a>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}news">お知らせ</a>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}company">会社情報</a>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}faq">よくある質問</a>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}sitemap">サイトマップ</a>
                        </li>
                        <li class="s-Drawer_navList-Item">
                            <a href="${presets.siteUrl}policy">プライバシーポリシー</a>
                        </li>
                    </ul>
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
                </nav>
            </div>
        </div>
        `);
    }
}

customElements.define('site-drawer', DrawerComponents);