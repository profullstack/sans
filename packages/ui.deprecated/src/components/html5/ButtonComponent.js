/**
 * ButtonComponent.js
 * A reusable sans-button web component that can be used in any HTML context
 */

class SansButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._disabled = false;
    this._type = 'default';
    this._size = 'medium';
    this._fullWidth = false;
  }
  
  static get observedAttributes() {
    return ['disabled', 'type', 'size', 'full-width'];
  }
  
  connectedCallback() {
    this.render();
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', (e) => {
      if (!this._disabled) {
        // Dispatch a custom event
        this.dispatchEvent(new CustomEvent('button-click', {
          bubbles: true,
          composed: true,
          detail: { source: this }
        }));
      }
    });
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'type':
        this._type = newValue || 'default';
        break;
      case 'size':
        this._size = newValue || 'medium';
        break;
      case 'full-width':
        this._fullWidth = newValue !== null;
        break;
    }
    
    if (this.shadowRoot) {
      this.render();
    }
  }
  
  get disabled() {
    return this._disabled;
  }
  
  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  
  get type() {
    return this._type;
  }
  
  set type(value) {
    this.setAttribute('type', value);
  }
  
  get size() {
    return this._size;
  }
  
  set size(value) {
    this.setAttribute('size', value);
  }
  
  get fullWidth() {
    return this._fullWidth;
  }
  
  set fullWidth(value) {
    if (value) {
      this.setAttribute('full-width', '');
    } else {
      this.removeAttribute('full-width');
    }
  }
  
  render() {
    const buttonClasses = [
      'btn',
      `btn-${this._type}`,
      `btn-${this._size}`,
      this._fullWidth ? 'btn-full-width' : ''
    ].filter(Boolean).join(' ');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: inherit;
        }
        
        :host([full-width]) {
          display: block;
          width: 100%;
        }
        
        .btn {
          font-family: inherit;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s, transform 0.1s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        
        .btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        
        .btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Types */
        .btn-default {
          background-color: #f0f0f0;
          color: #333;
        }
        
        .btn-primary {
          background-color: #4a56e2;
          color: white;
        }
        
        .btn-secondary {
          background-color: #e2e8f0;
          color: #1a202c;
        }
        
        .btn-danger {
          background-color: #e53e3e;
          color: white;
        }
        
        /* Sizes */
        .btn-small {
          padding: 6px 12px;
          font-size: 0.875rem;
        }
        
        .btn-medium {
          padding: 8px 16px;
          font-size: 1rem;
        }
        
        .btn-large {
          padding: 12px 24px;
          font-size: 1.125rem;
        }
      </style>
      <button class="${buttonClasses}" ?disabled="${this._disabled}">
        <slot></slot>
      </button>
    `;
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && window.customElements) {
  customElements.define('sans-button', SansButton);
}

export default SansButton;
