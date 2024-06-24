// Import Bootstrap's JS
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

// Custom accordion component template
// Summer 2024

class AccordionItem extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        this.attachShadow({ mode: "open" });
        // Initialize attributes with default values or empty strings
        this.buttonTitle = this.getAttribute('buttonTitle') || 'Accordion Item';
        this.color = this.getAttribute('color') || 'navy'; // Default to 'primary' if not specified
        this.content = this.getAttribute('content') || 'Add content here.'
        // Render the component initially
        this.render();
    }

    // Define observed attributes
    static get observedAttributes() {
        return ['buttonTitle', 'color'];
    }

    // Getters and setters for attributes
    get item() {
        return this.getAttribute('buttonTitle');
    }
    get color() {
        return this.getAttribute('color');
    }
    get content(){
        return this.getAttribute('content');
    }
    set item(value) {
        this.setAttribute('buttonTitle', value);
    }
    set color(value) {
        this.setAttribute('color', value);
    }
    set content(value){
        this.setAttribute('content', value);
    }

    // Callback when observed attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render(); // Re-render component on attribute change
        }
    }

    // Render method to update component view
    render() {
        // Construct the template using shadow DOM
        this.shadowRoot.innerHTML = `
            <link href="../css/main.min.css" rel="stylesheet">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed bg-${this.color} border-bottom border-white text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            ${this.item}
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            ${this.content}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize Bootstrap collapse functionality within the shadow DOM
        const collapseElement = this.shadowRoot.querySelector('.accordion-collapse');
        new bootstrap.Collapse(collapseElement, { toggle: false });
        
        // Attach event listener to manually toggle collapse
        const button = this.shadowRoot.querySelector('.accordion-button');
        button.addEventListener('click', () => {
            const collapseInstance = bootstrap.Collapse.getInstance(collapseElement);
            collapseInstance.toggle();
        });
    }

    // Lifecycle method when component is connected to the DOM
    connectedCallback() {
        this.render(); // Render the component initially when connected to the DOM
    }
}

// Define this component as <accordion-item></accordion-item> HTML tag
customElements.define("accordion-item", AccordionItem);
