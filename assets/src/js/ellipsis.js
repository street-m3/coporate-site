document.addEventListener('DOMContentLoaded', () => {
    new Ellipsis('js-trim', 25);
});

class Ellipsis {
    constructor(str, num) {
        this.sectence = document.querySelectorAll(`.${str}`);
        this.after = '...';
        this.num = num;
        this.trim();
    }

    trim() {
        this.sectence.forEach(element => {
            const concat = element.textContent.trim();
            if (concat.length > this.num) {
                let read = concat.slice(0, this.num);
                element.innerText = read + this.after;
            }

            return;
        });
    }
}