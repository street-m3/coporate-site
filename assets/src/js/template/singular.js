'use strict';
const singularTemplate = (post) => {
    const weekLabel = ['日','月','火','水','木','金','土'];
    const published = new Date(post.publishedAt);
    const getday = published.getDay();

    return `
    <div class="th-Article-Template_Inner sc-userWriting-Area">
        <header class="th-Article-Template_Header">
            <h1 class="c-headline-lv1">${post.title}</h1>
            <div class="th-Article-Template_Header-Meta">
                <time class="th-Article-Template_Header-Date">${published.toLocaleDateString() + '(' + weekLabel[getday] + ')'}</time>
                <span class="c-category-Label">${post.category}</span>
            </div>
        </header>
        <figure class="th-Article-Template_Photo">
            <img src="${post.image.url || ''}"/>
        </figure>
        ${post.body}
    </div>
    `;
}

export { singularTemplate };