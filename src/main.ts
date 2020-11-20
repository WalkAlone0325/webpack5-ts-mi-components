import './main.css'
import popup from './components/popup/popup'
import video from './components/video/video'

let listItem = document.querySelectorAll('#list li')

for (let i = 0; i < listItem.length; i++) {
  listItem[i].addEventListener('click', function (this: any) {
    let url = this.dataset.url
    let title = this.dataset.title
    console.log(url, title)

    popup({
      width: '880px',
      height: '556px',
      title: title,
      pos: 'center',
      mask: true,
      content(element) {
        video({
          url,
          element,
          autoplay: true
        })
      }
    })
  })
}