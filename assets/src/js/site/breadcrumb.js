'use strict';
export class Breadcrumb extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'closed' });
    }

    attachShadow() {
        this.insertAdjacentHTML('afterbegin',
            `
            <div class="s-Breadcrumb">
                <div class="ly-Inner_Grid -lg">
                    <nav class="c-Breadcrumb_nav">
                        <ol class="c-Breadcrumb_navList" itemscope itemtype="https://schema.org/BreadcrumbList">
                            <li class="c-Breadcrumb_navList-Item u-uppercase" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                <a href="https://example.com" itemprop="item">
                                    <span itemprop="name">Top</span>
                                </a>
                                <meta itemprop="position" content="1" />
                            </li>
                            <li class="c-Breadcrumb_navList-Item u-uppercase" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                <a href="https://example.com" itemprop="item">
                                    <span itemprop="name">News</span>
                                </a>
                                <meta itemprop="position" content="2" />
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            `
        );
    }
}

customElements.define('site-breadcrumb', Breadcrumb);