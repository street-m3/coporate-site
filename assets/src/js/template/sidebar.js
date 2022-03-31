'use strict';
import { globalvariables } from '../env/env.js';
const sidebarTemplate = (post) => {
    const weekLabel = ['日','月','火','水','木','金','土'];
    const published = new Date(post.publishedAt);
    const getday = published.getDay();
    const pageURL = 'index.html';
    return `
        <a href="${globalvariables.siteUrl}${pageURL}?id=${post.id}">
            <div class="p-Sidebar-List-Card_Body">
                <div class="p-Sidebar-List-Card_Meta">
                    <time class="p-Sidebar-List-Card_Meta-Date c-headline-lv4">${published.toLocaleDateString() + '(' + weekLabel[getday] + ')'}</time>
                    <span class="c-category-Label">${post.category}</span>
                </div>
                <h5 class="p-Sidebar-List-Card_Title">
                    ${post.title}
                </h5>
            </div>
            <figure class="p-Sidebar-List-Card_Image">
                <img src="${post.image.url || ''}" alt="">
            </figure>
        </a>
    `;
}

export { sidebarTemplate };