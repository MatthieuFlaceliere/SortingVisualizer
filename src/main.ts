import './style.css'

const MIN_LIST_SIZE = 10;

const barContainer: HTMLDivElement = document.querySelector('.bar-container') as HTMLDivElement
const listSizeInput = document.querySelector('.list-size') as HTMLInputElement;
const listSizeValue = document.querySelector('.list-size-value') as HTMLInputElement

/**
 * MAIN FUNCTION
 */
const main = (): void => {  
  // Set default list size
  listSizeInput.value = MIN_LIST_SIZE.toString()
  updateListSizeValue()

  // Generate new list
  generateNewList(parseInt(listSizeInput.value))
}

//#region Utils functions

/**
 * Generate new list
 * @param length
 * @returns void
 * @description Generate new list and add it to the DOM
 * @example generateNewList(10)
 */
const generateNewList = (length: number = 10) => {
  const list: Array<number> = generateList(length)
  barContainer.innerText = ''
  addBarToContainer(list, barContainer)
}

/**
 * Generate list
 * @param length
 * @param max
 * @param min
 * @returns Array<number>
 * @description Generate a list of random numbers
 * @example generateList(10, 100, 5)
 */
const generateList = (length: number, max: number = 100, min: number = 5): Array<number> => {
  const list: Array<number> = []
  for (let i = 0; i <= length; i++) {
    list.push(Math.floor(Math.random() * (max - min + 1) + min))
  }

  return list
}

/**
 * Add bar to container
 * @param list
 * @param container
 * @returns void
 * @description Add bar to container element passed in parameter
 * @example addBarToContainer([10, 20, 30], document.querySelector('.bar-container'))
 */
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

// const GenerateButton = document.querySelector('.generate-btn') as HTMLButtonElement

// GenerateButton.addEventListener('click', () => {  
//   generateNewList(parseInt(listSizeInput.value))
// })

/**
 * Update list size value
 * @returns void
 * @description Set list size value to the element with class .list-size-value
 */
const updateListSizeValue = () => {
  let value: number = parseInt(listSizeInput.value);
  listSizeValue.innerText = value.toString();
}

//#endregion Utils functions

//#region Events
/**
 * List size input event
 * @description Update list size value and generate new list
 */
listSizeInput.addEventListener('input', function() {
  const value: number = parseInt(this.value);

  generateNewList(value)
  
  updateListSizeValue()
})

//#endregion Events

//#region Sort functions

/**
 * Bubble sort
 * @param list
 * @returns Array<number>
 * @description Sort list with bubble sort algorithm
 */
const bubbleSort = (list: Array<number>): Array<number> => {
  let swapped: boolean = false
  do {
    swapped = false
    for (let i = 0; i < list.length; i++) {
      if (list[i] > list[i + 1]) {
        const tmp = list[i]
        list[i] = list[i + 1]
        list[i + 1] = tmp
        swapped = true
      }
    }
  } while (swapped)

  return list
}

//#endregion Sort functions

main()
