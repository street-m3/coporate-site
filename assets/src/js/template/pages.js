'use strict';
const singularTemplate = (post) => {
    const weekLabel = ['日','月','火','水','木','金','土'];
    const published = new Date(post.publishedAt);
    const getday = published.getDay();

    return `
    ${post.title}
    ${post.body}
    `;
}

export { singularTemplate };