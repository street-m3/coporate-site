import { presets } from './env/env';
import { contentAPIasyncFunctions } from './api/api.constructor';
import { Breadcrumb } from './site/breadcrumb';
import { SitemapLoader } from './modules/sitemapLoader';
import { Ellipsis } from './utils/ellipsis';
import { IntersectionObservers } from './ux/scrollobserver';
import { responsiveFooterBranch } from './ux/footer-nav';

async function series() {
    await new Promise((resolve) => {
        contentAPIasyncFunctions();
        resolve();
    })

    await new Promise((resolve) => {
        responsiveFooterBranch();
        resolve();
    })

    await new Promise((resolve) => {
        Ellipsis('js-trim', 25);
        resolve();
    })

    await new Promise((resolve) => {
        new IntersectionObservers();
        resolve();
    })
    
    await new Promise((resolve) => {
        setTimeout(() => {
            new Breadcrumb();
            new SitemapLoader();
        }, 300);
        resolve();
    })
}


export { series };