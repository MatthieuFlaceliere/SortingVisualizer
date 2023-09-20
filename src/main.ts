import './style.css'

const BAR_CONTAINER: HTMLDivElement = document.querySelector('.bar-container') as HTMLDivElement
const LIST_SIZE = document.querySelector('.list-size') as HTMLButtonElement;
const MIN_LIST_SIZE = 10;
LIST_SIZE.value = MIN_LIST_SIZE.toString()

const main = (): void => {
  generateNewList(parseInt(LIST_SIZE.value))
  setListSizeStyle()
}

const generateNewList = (length: number = 10) => {
  const list: Array<number> = generateList(length)
  BAR_CONTAINER.innerText = ''
  addBarToContainer(list, BAR_CONTAINER)
}

const generateList = (length: number, max: number = 100, min: number = 5): Array<number> => {
  const list: Array<number> = []
  for (let i = 0; i < length; i++) {
    list.push(Math.floor(Math.random() * (max - min + 1) + min))
  }

  return list
}

const addBarToContainer = (list: Array<number>, container: HTMLElement): void => {
  list.forEach((item: number) => {
    const bar = document.createElement('div')
    bar.classList.add('bar')
    bar.style.height = `${item}%`
    bar.style.width = `${100 / list.length}%`
    bar.style.margin = `0 ${100 / list.length / 2}px`
    container.appendChild(bar)
  })
}

const GenerateButton = document.querySelector('.generate-btn') as HTMLButtonElement

GenerateButton.addEventListener('click', () => {  
  generateNewList(parseInt(LIST_SIZE.value))
})


const setListSizeStyle = () => {
  const value = LIST_SIZE.value;

  LIST_SIZE.style.background = `linear-gradient(to right, var(--background-secondary) 0%, var(--background-secondary) ${value}%, white ${value}%, white 100%)`
}


LIST_SIZE.addEventListener('input', function() {
  const value: number = parseInt(this.value);
  if (value < MIN_LIST_SIZE){
    LIST_SIZE.value = MIN_LIST_SIZE.toString()
  }else {
    setListSizeStyle()
    generateNewList(value)
  }

})

main()