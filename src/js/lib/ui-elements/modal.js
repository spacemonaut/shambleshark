import DialogInterface from './dialog-interface'

export default class Modal extends DialogInterface {
  _constructElement (options) {
    const modal = document.createElement('div')
    const titleId = `modal-title-${options.id}`
    const header = this._originalHeader

    document.addEventListener('keyup', this._onEscKey.bind(this))

    modal.id = options.id
    modal.classList.add('modal-dialog-overlay')
    modal.setAttribute('aria-modal', 'true')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-labelledby', titleId)

    if (!options.open) {
      modal.style.display = 'none'
    }

    modal.innerHTML = `
      <div class="modal-dialog">
        <h6 class="modal-dialog-title">
          <span class='dialog-title-content' id="${titleId}">${header}</span>
          <button type="button" title="${this._getCloseButtonMessage()}" class="dialog-close modal-dialog-close">
            <span class="vh">Close this dialog</span> <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z"></path></svg>
          </button>
        </h6>

        <div class="dialog-loader modal-dialog-content" role="alert" aria-label="${options.loadingMessage || 'Loading'}">
          <img src="https://assets.scryfall.com/assets/spinner-0e5953300e953759359ad94bcff35ac64ff73a403d3a0702e809d6c43e7e5ed5.gif" class="modal-dialog-spinner" aria-hidden="true">
        </div>
      <!---->
        <div class="dialog-content-container modal-dialog-stage" style="position:fixed;left:-100%;visibility:hidden">
          <div role="alert" aria-label="${options.contentMessage || 'Modal Loaded'}"></div>
          <div class="dialog-content modal-dialog-stage-content">${this._originalContent}</div>
        </div>
      </div>
      `
    modal.querySelector('.dialog-close').addEventListener('click', () => {
      this.close()
    })

    return modal
  }
}