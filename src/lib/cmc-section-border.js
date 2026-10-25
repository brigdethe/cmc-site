const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      height: calc(
        var(--section-border-offset, .1875rem) +
        (var(--section-border-step, .75rem) * 2) +
        var(--section-border-foundation, .375rem)
      );
      overflow: hidden;
      background: transparent;
    }

    .pattern {
      display: grid;
      grid-template-columns: repeat(var(--section-border-columns, 8), minmax(0, 1fr));
      width: 100%;
      height: 100%;
    }

    .segment {
      display: grid;
      grid-template-rows:
        var(--section-border-offset, .1875rem)
        var(--section-border-step, .75rem)
        var(--section-border-step, .75rem)
        var(--section-border-foundation, .375rem);
      min-width: 0;
      background: transparent;
    }

    .cap { grid-row: 2; }
    .base { grid-row: 3; }
    .foundation { grid-row: 4; background: transparent; }
    .mint { background: var(--section-border-mint, #b7dcc2); }
    .gold-high { background: var(--section-border-gold, #cc9632); }
    .grey { background: var(--section-border-grey, #ddd4cc); }
    .brown { background: var(--section-border-brown, #3d2b27); }
    .gold-low { background: var(--section-border-gold-low, #cb9635); }

    :host([variant="tail"]) {
      height: calc(
        var(--section-border-step, .75rem) +
        var(--section-border-foundation, .375rem)
      );
      background: transparent;
    }

    :host([variant="tail"]) .pattern { grid-template-columns: repeat(var(--about-card-columns, 3), minmax(0, 1fr)); }
    :host([variant="tail"]) .segment {
      grid-template-rows:
        var(--section-border-step, .75rem)
        var(--section-border-foundation, .375rem);
    }
    :host([variant="tail"]) .cap { display: none; }
    :host([variant="tail"]) .base { grid-row: 1; }
    :host([variant="tail"]) .foundation { grid-row: 2; }
    :host([variant="tail"]) .segment:nth-child(-n + 5) { display: none; }

    @media (max-width: 767px) {
      .pattern { grid-template-columns: repeat(var(--section-border-columns, 6), minmax(0, 1fr)); }
      .segment:nth-child(n + 7) { display: none; }
      :host([variant="tail"]) .pattern { grid-template-columns: repeat(var(--about-card-columns, 4), minmax(0, 1fr)); }
      :host([variant="tail"]) .segment:nth-child(n + 3):nth-child(-n + 6) { display: grid; }
      :host([variant="tail"]) .segment:nth-child(-n + 2),
      :host([variant="tail"]) .segment:nth-child(n + 7) { display: none; }
    }
  </style>
  <div class="pattern" aria-hidden="true">
    <span class="segment"><i class="base grey"></i><i class="foundation"></i></span>
    <span class="segment"><i class="cap mint"></i><i class="base brown"></i><i class="foundation"></i></span>
    <span class="segment"><i class="base gold-low"></i><i class="foundation"></i></span>
    <span class="segment"><i class="cap gold-high"></i><i class="base brown"></i><i class="foundation"></i></span>
    <span class="segment"><i class="base grey"></i><i class="foundation"></i></span>
    <span class="segment"><i class="cap mint"></i><i class="base brown"></i><i class="foundation"></i></span>
    <span class="segment"><i class="base gold-low"></i><i class="foundation"></i></span>
    <span class="segment"><i class="cap gold-high"></i><i class="base brown"></i><i class="foundation"></i></span>
  </div>
`;

class SectionBorder extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.setAttribute('aria-hidden', 'true');
  }
}

if (!customElements.get('cmc-section-border')) {
  customElements.define('cmc-section-border', SectionBorder);
}

