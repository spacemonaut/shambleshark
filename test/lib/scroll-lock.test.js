import scrollLock from '../../src/js/lib/scroll-lock'

describe('scrollLock', function () {
  beforeEach(function () {
    global.scrollTo.mockClear()
  })

  it('freezes body to scrollY position when locked is set to true', function () {
    global.scrollY = 13
    expect(document.body.style.width).toEqual('')
    expect(document.body.style.position).toEqual('')
    expect(document.body.style.top).toEqual('')

    scrollLock(true)

    expect(document.body.style.width).toEqual('100%')
    expect(document.body.style.position).toEqual('fixed')
    expect(document.body.style.top).toEqual('-13px')
  })

  it('resets body and scrolls to position when locked is set to false', function () {
    document.body.style.width = '100%'
    document.body.style.position = 'fixed'
    document.body.style.top = '-13px'

    scrollLock(false)

    expect(document.body.style.width).toEqual('')
    expect(document.body.style.position).toEqual('')
    expect(document.body.style.top).toEqual('')
    expect(global.scrollTo).toBeCalledTimes(1)
    expect(global.scrollTo).toBeCalledWith(0, 13)
  })

  it('does not scroll if body has no top attribute when locked is set to false', function () {
    document.body.style.top = ''

    scrollLock(false)

    expect(global.scrollTo).toBeCalledTimes(0)
  })
})
