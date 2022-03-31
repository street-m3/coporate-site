'use strict';

const Ellipsis = (str, num) => {
    const sectence = document.querySelectorAll(`.${str}`);
    const after = '...';

    sectence.forEach(element => {
        const concat = element.textContent.trim();
        if (concat.length > num) {
            let read = concat.slice(0, num);
            element.innerText = read + after;
        }
    });
}

export { Ellipsis };