/** Obtiene todos los hermanos de un elemento del DOM */
const getSiblings = (element, selector = null) =>{
  let siblings = []

  if(!element.parentNode) { return siblings }

  const allChilds = element.parentNode.children
  Array.from(allChilds, child => {
    if(child != element && !child.matches(selector)) { siblings.push(child) }
  })

  return siblings
}

/** Posiciona el indicador del menu activo */
const setMenuIndicator = () => {
  const nodeList = Array.prototype.slice.call(document.querySelectorAll('.q-page'))
  const active = document.querySelector('.q-page--active')
  const index = nodeList.indexOf(active)
  const indicator = document.querySelector('.q-menu-indicator')
  indicator.style.top = `${62 * index}px`
}

setMenuIndicator();

const menuButtons = document.querySelectorAll('.q-menu-item')
menuButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const t = e.target
    const current = document.querySelector('.q-page--active')
    const page = document.querySelector(`#q-${t.getAttribute('data-page')}`)
    const siblings = getSiblings(page)
    
    current.style.opacity = '0'
    setTimeout(() => {
      current.style.display = 'none'
      page.style.display = 'block'

      setTimeout(() => {
        page.style.opacity = '1'
        page.classList.add('q-page--active')
        siblings.forEach(sib => {
          sib.classList.remove('q-page--active')
          sib.removeAttribute('style')
        })
        setMenuIndicator()
      }, 250)
    }, 250)
  })
})