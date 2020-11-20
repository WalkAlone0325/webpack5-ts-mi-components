// import './popup.css' // 全局 css
let styles = require('./popup.css').default
// import styles from './popup.css'

interface IPopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content: (content: HTMLElement) => void;
}

interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void
}

function popup(options: IPopup) {
  return new Popup(options)
}

class Popup implements Icomponent {
  tempContainer: any;
  mask: any;
  constructor(private settings: IPopup) {
    this.settings = Object.assign({
      width: '100%',
      height: '100%',
      title: '',
      pos: 'center',
      mask: true,
      content: () => { }
    }, this.settings)
    this.init()
  }

  // 初始化
  init() {
    this.template()
    // 遮罩
    this.settings.mask && this.createMask()
    this.handle()
    this.contentCallback()
  }
  // 创建模板
  template() {
    this.tempContainer = document.createElement('div')

    this.tempContainer.style.width = this.settings.width
    this.tempContainer.style.height = this.settings.height
    this.tempContainer.className = styles.popup

    this.tempContainer.innerHTML = `
      <div class="${styles['popup-title']}">
        <h3>${this.settings.title}</h3>
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="${styles['popup-content']}"></div>
    `
    document.body.appendChild(this.tempContainer)


    if (this.settings.pos === 'left') {
      this.tempContainer.style.left = 0
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) + 'px'

    } else if (this.settings.pos === 'right') {
      this.tempContainer.style.right = 0
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) + 'px'

    } else {
      this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth) / 2 + 'px'
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px'
    }
  }
  // 事件操作
  handle() {
    let popupClose: HTMLElement = this.tempContainer.querySelector(`.${styles['popup-title']} i`)
    popupClose.addEventListener('click', () => {
      document.body.removeChild(this.tempContainer)
      this.settings.mask && document.body.removeChild(this.mask)
    })
  }

  // 遮罩
  createMask() {
    this.mask = document.createElement('div')
    this.mask.className = styles.mask
    this.mask.style.width = '100%'
    this.mask.style.height = document.body.offsetHeight + 'px'

    document.body.appendChild(this.mask)
  }

  contentCallback() {
    let popupContent: HTMLElement = this.tempContainer.querySelector(`.${styles['popup-content']}`)
    this.settings.content(popupContent)
  }

}

export default popup