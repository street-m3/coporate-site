'use strict';
import { globalvariables } from '../env/env';
const newsTicker = (post) => {
    const pageURL = 'index.html';
    const published = new Date(post.publishedAt);

    return `
        <a href="${globalvariables.siteUrl}blog/${pageURL}?id=${post.id}" class="c-newsTicker_Item-Link">
            <div class="c-newsTicker_Item-Category">
                ${post.category}
            </div>
            <div class="c-newsTicker_Item-Description">
                <time class="c-newsTicker_Description-Date">
                    ${published.toLocaleDateString()}
                </time>
                <p class="c-newsTicker_Description-Text js-trim">
                    ${post.title}
                </p>
            </div>
        </a>
    `;
}

export { newsTicker };