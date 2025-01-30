/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An example element.
 *
 * Props
 * @prop {string} content - The content of the message
 * @prop {string} date - The date of the message
 * @prop {string} author - The author of the message
 * @prop {number} likes - The number of likes of the message
 * @prop {boolean} liked - If the message is liked by the user
 */
@customElement('beep-message')
export class BeepMessage extends LitElement {
  static override styles = css`
    .message {
        border-bottom: 1px solid #c8c8c8;
        padding: 12px;
    }
  `;

  @property()
  content = 'Test content';

  @property()
  date = new Date().toISOString();

  @property()
  author = 'Test author';

  @property({ type: Number })
  likes = 0;

  @property({ type: Boolean })
  liked = false;

  override render() {
    return html`
        <div class="message">
            <div class="message-body">
                <h6 class="message-author">
                    ${this.author} - ${this.date}
                </h6>
                <p class="message-content">${this.content}</p>
                <span>${this.likes} likes</span>
                <button @click=${this._toggleLike} class="message-link">${this.liked ? "❤️" : "♡"}</button>
            </div>
        </div>
    `;
  }

  private _toggleLike() {
    this.liked = !this.liked;
    this.likes += this.liked ? 1 : -1;

    this.dispatchEvent(new CustomEvent(this.liked ? 'like' : 'unlike'));
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'beep-message': BeepMessage;
  }
}
