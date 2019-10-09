import Modal from '../../src/js/lib/modal'

describe('makeModal', function () {
  describe('element', function () {
    it('creates a scryfall style modal', function () {
      const modal = new Modal()

      expect(modal.element.querySelector('.modal-dialog')).not.toBeFalsy()
      expect(modal.element.querySelector('.modal-dialog-content')).not.toBeFalsy()
      expect(modal.element.querySelector('.modal-dialog-close')).not.toBeFalsy()
    })

    it('hides the modal by default', function () {
      const modal = new Modal()

      expect(modal.element.style.display).toBe('none')
    })

    it('can opt into showing the modal', function () {
      const modal = new Modal({
        open: true
      })

      expect(modal.element.style.display).toBeFalsy()
    })

    it('can provide an id', function () {
      const modal = new Modal({
        id: 'my-id'
      })

      expect(modal.element.id).toBe('my-id')
    })

    it('can provide a header', function () {
      const modal = new Modal({
        header: 'Title'
      })

      expect(modal.element.querySelector('.modal-dialog-title-content').innerHTML).toBe('Title')
    })

    it('has default loading label', function () {
      const modal = new Modal()

      expect(modal.element.querySelector('.modal-dialog-content').getAttribute('aria-label')).toBe('Loading')
    })

    it('can provide a loading label', function () {
      const modal = new Modal({
        loadingMessage: 'Custom Loading Message'
      })

      expect(modal.element.querySelector('.modal-dialog-content').getAttribute('aria-label')).toBe('Custom Loading Message')
    })

    it('can provide content', function () {
      const modal = new Modal({
        content: 'Some content'
      })

      expect(modal.element.querySelector('.modal-dialog-stage').innerHTML).toBe('Some content')
    })

    it('does not require content', function () {
      const modal = new Modal()

      expect(modal.element.querySelector('.modal-dialog-stage').innerHTML).toBe('')
    })

    it('closes when the close button is clicked', function () {
      const modal = new Modal()
      const close = modal.element.querySelector('.modal-dialog-close')

      jest.spyOn(modal, 'close').mockImplementation()

      close.click()

      expect(modal.close).toBeCalledTimes(1)
    })

    it('closes when the esc key is typed', function () {
      const modal = new Modal()

      jest.spyOn(modal, 'close').mockImplementation()

      modal.open()

      const evt = new KeyboardEvent('keyup', {
        key: 'Escape',
        keyCode: 27,
        which: 27
      })
      document.dispatchEvent(evt)

      expect(modal.close).toBeCalledTimes(1)
    })

    it('does not close when the esc key is typed if modal is not opened', function () {
      const modal = new Modal()

      jest.spyOn(modal, 'close').mockImplementation()

      const evt = new KeyboardEvent('keyup', {
        key: 'Escape',
        keyCode: 27,
        which: 27
      })
      document.dispatchEvent(evt)

      expect(modal.close).not.toBeCalled()
    })
  })

  describe('setTitle', function () {
    it('can write over content', function () {
      const modal = new Modal({
        title: 'Some title'
      })

      modal.setTitle('new title')

      expect(modal.element.querySelector('.modal-dialog-title-content').innerHTML).toBe('new title')
    })
  })

  describe('setContent', function () {
    it('can write over content', function () {
      const modal = new Modal({
        content: 'Some content'
      })

      modal.setContent('new content')

      expect(modal.element.querySelector('.modal-dialog-stage').innerHTML).toBe('new content')
    })

    it('replaces content with DOM node when DOM node is provided', function () {
      const modal = new Modal({
        content: 'Some content'
      })
      const node = document.createElement('div')
      node.id = 'some-id'
      node.innerHTML = 'foo'

      modal.setContent(node)

      expect(modal.element.querySelector('.modal-dialog-stage #some-id').innerHTML).toBe('foo')
    })
  })

  describe('setLoading', function () {
    it('hides the spinner', function () {
      const modal = new Modal({
        content: 'Some content'
      })

      modal.setLoading(false)

      expect(modal.element.querySelector('.modal-dialog-stage').style.display).toBeFalsy()
      expect(modal.element.querySelector('.modal-dialog-content').style.display).toBe('none')
    })

    it('shows the spinner when empty content is given', function () {
      const modal = new Modal({
        content: 'Some content'
      })

      modal.setLoading(true)

      expect(modal.element.querySelector('.modal-dialog-stage').style.display).toBe('none')
      expect(modal.element.querySelector('.modal-dialog-content').style.display).toBeFalsy()
    })
  })

  describe('open', function () {
    it('shows the modal', function () {
      const modal = new Modal()

      expect(modal.element.style.display).toBe('none')

      modal.open()

      expect(modal.element.style.display).toBeFalsy()
    })

    it('can call an onOpen hook if specified', function () {
      const spy = jest.fn()
      const modal = new Modal({
        onOpen: spy
      })

      modal.open()

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(modal)
    })
  })

  describe('close', function () {
    it('hides the modal', function () {
      const modal = new Modal({
        open: true
      })

      expect(modal.element.style.display).toBeFalsy()

      modal.close()

      expect(modal.element.style.display).toBe('none')
    })

    it('can reset content on close if specified', function () {
      const modal = new Modal({
        open: true,
        content: 'original content',
        resetContentOnClose: true
      })

      modal.setContent('some content')

      jest.spyOn(modal, 'setContent')

      modal.close()

      expect(modal.setContent).toBeCalledWith('original content')
    })

    it('can call an onClose hook if specified', function () {
      const spy = jest.fn()
      const modal = new Modal({
        open: true,
        onClose: spy
      })

      modal.close()

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(modal)
    })
  })
})
