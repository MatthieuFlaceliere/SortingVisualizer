import "./style.css";

const MIN_LIST_SIZE = 10;
const LIST: Array<number> = [];

const barContainer: HTMLDivElement = document.querySelector(".bar-container") as HTMLDivElement;
const listSizeInput = document.querySelector(".list-size") as HTMLInputElement;
const listSizeValue = document.querySelector(".list-size-value") as HTMLInputElement;

/**
 * MAIN FUNCTION
 */
const main = (): void => {
  // Set default list size
  listSizeInput.value = MIN_LIST_SIZE.toString();
  updateListSizeValue();

  // Generate new list
  generateNewList(parseInt(listSizeInput.value));
};

//#region Utils functions

/**
 * Generate new list
 * @param length
 * @returns void
 * @description Generate new list and add it to the DOM
 * @example generateNewList(10)
 */
const generateNewList = (length: number = 10) => {
  generateList(length);
  barContainer.innerText = "";
  addBarToContainer(LIST, barContainer);
};

/**
 * Generate list
 * @param length
 * @param max
 * @param min
 * @description Generate a list of random numbers
 * @example generateList(10, 100, 5)
 */
const generateList = (
  length: number,
  max: number = 100,
  min: number = 5
): void => {
  for (let i = 0; i <= length; i++) {
    LIST.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
};

/**
 * Add bar to container
 * @param list
 * @param container
 * @returns void
 * @description Add bar to container element passed in parameter
 * @example addBarToContainer([10, 20, 30], document.querySelector('.bar-container'))
 */
const addBarToContainer = (
  list: Array<number>,
  container: HTMLElement
): void => {
  let x = 0;
  list.forEach((item: number) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.id = `bar-${x}`;
    bar.style.height = `${item}%`;
    bar.style.width = `${100 / list.length}%`;
    bar.style.margin = `0 ${100 / list.length / 2}px`;
    container.appendChild(bar);
    x++;
  });
};

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
};

/**
 * Sleep
 * @param ms
 */
const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Set bar color
 * @param Bar id
 */
const setBarColor = (id: number, color: string) => {
  const bar = document.getElementById(`bar-${id}`) as HTMLDivElement;
  bar.style.backgroundColor = color;
};

/**
 * Reset bar color
 * @param Bar id
 */
const resetBarColor = (id: number) => {
  const bar = document.getElementById(`bar-${id}`) as HTMLDivElement;
  bar.style.backgroundColor = "white";
};

/**
 * Reset all bar color
 * @param start index
 */
const resetAllBarColor = (start: number = 0) => {
  for (let i = start; i < LIST.length; i++) {
    resetBarColor(i);
  }
};

/**
 * Swap bar
 * @param id1
 * @param id2
 * @description Swap bar with id1 and id2
 * @example swapBar(0, 1)
 */
const swapBar = (id1: number, id2: number) => {
  const bar1 = document.getElementById(`bar-${id1}`) as HTMLDivElement;
  const bar2 = document.getElementById(`bar-${id2}`) as HTMLDivElement;

  const tmp = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tmp;
};

//#endregion Utils functions

//#region Events
/**
 * List size input event
 * @description Update list size value and generate new list
 */
listSizeInput.addEventListener("input", function () {
  const value: number = parseInt(this.value);

  generateNewList(value);

  updateListSizeValue();
});

/**
 * Sort button event
 * @description Sort list with selection sort algorithm
 */
const sortButton = document.querySelector(".sort-btn") as HTMLButtonElement;
sortButton.addEventListener("click", () => {
  selectionSort(LIST);
});

//#endregion Events

//#region Sort functions

/**
 * Selection sort
 * @description Sort list with selection sort algorithm
 */
const selectionSort = async (list: Array<number>) => {
  for (let i = 0; i < list.length; i++) {
    let min = i;
    setBarColor(i, "green");
    for (let j = i + 1; j < list.length; j++) {
      setBarColor(j, "red");
      if (list[j] < list[min]) {
        min = j;
      }
      await sleep(500);
    }
    if (min !== i) {
      let tmp = list[i];
      list[i] = list[min];
      list[min] = tmp;
      await swapBar(i, min);
    }
    setBarColor(i, "blue");
    resetAllBarColor(i + 1);    
  }
  resetAllBarColor();
};

//#endregion Sort functions

main();
