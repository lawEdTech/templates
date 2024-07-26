// Custom accordion component template
// Summer 2024

class AccordionItem extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    static get observedAttributes() {
        return ['color', 'textcolor'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    // Helper method to generate unique IDs
    generateId() {
        return `accordion-${Math.random().toString(36).substr(2, 9)}`;
    }

    render() {
        // Generate unique IDs for accordion elements
        const accordionId = this.generateId();
        const headingId = `${accordionId}-heading`;
        const collapseId = `${accordionId}-collapse`;

        this.innerHTML = `
            <link href="https://raw.githack.com/lawEdTech/templates/main/styles.css" rel="stylesheet">
            <div class="container-md">
                <div class="accordion accordion-flush" id="${accordionId}">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${headingId}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                                <slot name="buttonTitle">Default Title</slot>
                            </button>
                        </h2>
                        <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#${accordionId}">
                            <div class="accordion-body">
                                <slot name="content">Default content goes here.</slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Apply styles dynamically based on color and textcolor attributes
        const button = this.querySelector('.accordion-button');
        const color = this.getAttribute('color') || 'navy';
        const textcolor = this.getAttribute('textcolor') || 'white';
        button.style.backgroundColor = color;
        button.style.color = textcolor;

        // Initialize Bootstrap collapse functionality within the element
        const collapseElement = this.querySelector('.accordion-collapse');
        new bootstrap.Collapse(collapseElement, { toggle: false });

        // Attach event listener to manually toggle collapse
        button.addEventListener('click', () => {
            const collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
            collapseInstance.toggle();
        });
    }

    connectedCallback() {
        this.render(); // Initial render
    }
}

// Define the custom element
customElements.define('accordion-item', AccordionItem);
