import './style.css'

const BAR_CONTAINER: HTMLDivElement = document.querySelector('.bar-container') as HTMLDivElement
const LIST_SIZE = document.querySelector('.list-size') as HTMLInputElement;
const MIN_LIST_SIZE = 10;

const main = (): void => {  
  // Set default list size
  LIST_SIZE.value = MIN_LIST_SIZE.toString()
  updateListSizeValue()

  // Generate new list
  generateNewList(parseInt(LIST_SIZE.value))
}

const generateNewList = (length: number = 10) => {
  const list: Array<number> = generateList(length)
  BAR_CONTAINER.innerText = ''
  addBarToContainer(list, BAR_CONTAINER)
}

const generateList = (length: number, max: number = 100, min: number = 5): Array<number> => {
  const list: Array<number> = []
  for (let i = 0; i <= length; i++) {
    list.push(Math.floor(Math.random() * (max - min + 1) + min))
  }

  return list
}

const addBarToContainer = (list: Array<number>, container: HTMLElement): void => {
  let x = 0
  list.forEach((item: number) => {
    const bar = document.createElement('div')
    bar.classList.add('bar')
    bar.id = `bar-${x}`
    bar.style.height = `${item}%`
    bar.style.width = `${100 / list.length}%`
    bar.style.margin = `0 ${100 / list.length / 2}px`
    container.appendChild(bar)
    x++
  })
}

const GenerateButton = document.querySelector('.generate-btn') as HTMLButtonElement

GenerateButton.addEventListener('click', () => {  
  generateNewList(parseInt(LIST_SIZE.value))
})


const listSizeValue = document.querySelector('.list-size-value') as HTMLInputElement
const updateListSizeValue = () => {
  let value: number = parseInt(LIST_SIZE.value);
  listSizeValue.innerText = value.toString();
}


LIST_SIZE.addEventListener('input', function() {
  const value: number = parseInt(this.value);

  generateNewList(value)
  
  updateListSizeValue()
})

main()