import './style.css';

const MIN_LIST_SIZE = 10;
let LIST: Array<number> = [];
let SPEED = 100;

const barContainer: HTMLDivElement = document.querySelector('.bar-container') as HTMLDivElement;

const listSizeInput = document.querySelector('.list-size') as HTMLInputElement;
const listSizeValue = document.querySelector('.list-size-value') as HTMLInputElement;

const speedInput = document.querySelector('.speed') as HTMLInputElement;
const speedValue = document.querySelector('.speed-value') as HTMLInputElement;

const generateButton = document.querySelector('.generate-btn') as HTMLButtonElement;
const sortButton = document.querySelector('.sort-btn') as HTMLButtonElement;

const sortAlgoSelect = document.querySelector('.sort-algo') as HTMLSelectElement;

/**
 * MAIN FUNCTION
 */
const main = (): void => {
  // Set default list size
  listSizeInput.value = MIN_LIST_SIZE.toString();
  updateListSizeValue();

  // Set default speed
  speedInput.value = SPEED.toString();
  updateSpeedValue();

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
  // Reset list before generate new one
  LIST = [];
  generateList(length);

  // Reset bar container before add new bar
  barContainer.innerText = '';
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
const generateList = (length: number, max: number = 100, min: number = 5): void => {
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
const addBarToContainer = (list: Array<number>, container: HTMLElement): void => {
  let barId = 0;
  list.forEach((item: number) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.id = `bar-${barId}`;
    bar.style.height = `${item}%`;
    bar.style.width = `${100 / list.length}%`;
    bar.style.margin = `0 ${100 / list.length / 2}px`;
    // bar.innerText = `${barId}: ${item}`;
    container.appendChild(bar);
    barId++;
  });
};

/**
 * Generate new list event
 * @description Generate new list when click on generate button
 */
generateButton.addEventListener('click', () => {
  generateNewList(parseInt(listSizeInput.value));
});

/**
 * Update list size value
 * @returns void
 * @description Set list size value to the element with class .list-size-value
 */
const updateListSizeValue = () => {
  let value: number = parseInt(listSizeInput.value);
  listSizeValue.innerText = 'List size: ' + value.toString();
};

/**
 * Update speed value
 * @returns void
 * @description Set speed value to the element with class .speed-value
 */
const updateSpeedValue = () => {
  let speed: number = parseInt(speedInput.value);
  SPEED = -speed + 1 * 100.01; // If speed = 1 => SPEED = 99.5, if speed = 100 => SPEED = 0.5
  speedValue.innerText = 'Speed: x' + speed.toString();
};

/**
 * Sleep
 * @param ms
 */
const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Set bar color
 * @param Bar id
 */
const setBarColor = (id: number, color: string) => {
  const bar = document.getElementById(`bar-${id}`) as HTMLDivElement;
  bar.style.backgroundColor = color;
};

const setMultipleBarColor = (start: number, end: number, color: string) => {
  console.log('Set multiple bar color: ', start, end, color);
  for (let i = start; i < end; i++) {
    setBarColor(i, color);
  }
};

/**
 * Get bar color
 * @param Bar id
 */
const getBarColor = (id: number) => {
  const bar = document.getElementById(`bar-${id}`) as HTMLDivElement;
  return bar.style.backgroundColor;
};

/**
 * Reset bar color
 * @param Bar id
 */
const resetBarColor = (id: number) => {
  const bar = document.getElementById(`bar-${id}`) as HTMLDivElement;
  bar.style.backgroundColor = 'white';
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
  // const tmp2 = bar1.innerText;
  // bar1.innerText = bar2.innerText;
  // bar2.innerText = tmp2;
  bar1.style.height = bar2.style.height;
  bar2.style.height = tmp;
};

/**
 * Update diplay if list is currently sorting
 * @param isSorting
 * @description Update display if list is currently sorting
 */
const updateDisplay = (isSorting: boolean) => {
  if (isSorting) {
    listSizeInput.disabled = true;
    generateButton.disabled = true;
    sortAlgoSelect.disabled = true;
    sortButton.innerText = '⬛';
  } else {
    listSizeInput.disabled = false;
    generateButton.disabled = false;
    sortAlgoSelect.disabled = false;
    sortButton.innerText = 'Sort';
  }
};

//#endregion Utils functions

//#region Events
/**
 * List size input event
 * @description Update list size value and generate new list
 */
listSizeInput.addEventListener('input', function () {
  const value: number = parseInt(this.value);

  generateNewList(value);

  updateListSizeValue();
});

/**
 * Speed input event
 * @description Update speed value
 */
speedInput.addEventListener('input', function () {
  updateSpeedValue();
});

/**
 * Sort button event
 * @description Sort list with selection sort algorithm
 */
let isSorting = false;
// Abort controller to cancel sort
let cancelSort = new AbortController();
sortButton.addEventListener('click', async () => {
  if (isSorting) {
    // Cancel sort if isSorting is true and reset cancelSort
    cancelSort.abort();
    cancelSort = new AbortController();

    isSorting = false;
    updateDisplay(isSorting);
  } else {
    isSorting = true;
    updateDisplay(isSorting);

    switch (sortAlgoSelect.value) {
      case 'selection':
        await selectionSort(LIST, cancelSort);
        break;
      case 'bubble':
        await bubbleSort(LIST, cancelSort);
        break;
      case 'insertion':
        await insertionSort(LIST, cancelSort);
        break;
      case 'merge':
        await mergeSort(LIST, cancelSort);
        break;
      case 'quick':
        await quickSort(LIST, cancelSort);
        break;
    }

    isSorting = false;
    updateDisplay(isSorting);
  }
});
//#endregion Events

//#region Sort functions

/**
 * Selection sort
 * @description Sort list with selection sort algorithm
 */
const selectionSort = async (list: Array<number>, cancelSignal: AbortController) => {
  for (let i = 0; i < list.length; i++) {
    let min = i;
    setBarColor(i, '#77738E');
    for (let j = i + 1; j < list.length; j++) {
      // Check if sort is canceled before each iteration
      if (cancelSignal.signal.aborted) {
        resetAllBarColor();
        return; // Stop sort function
      }

      setBarColor(j, '#A089A4');
      if (list[j] < list[min]) {
        min = j;
      }
      await sleep(SPEED);
    }
    if (min !== i) {
      setBarColor(min, '#006C5E');
      setBarColor(i, '#006C5E');
      let tmp = list[i];
      list[i] = list[min];
      list[min] = tmp;
      await sleep(SPEED * (SPEED / 30));
      swapBar(i, min);
    }
    setBarColor(i, '#C8A1B5');
    resetAllBarColor(i + 1);
  }
};

/**
 * Bubble sort
 * @description Sort list with bubble sort algorithm
 */
const bubbleSort = async (list: Array<number>, cancelSignal: AbortController) => {
  for (let i = list.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // Check if sort is canceled before each iteration
      if (cancelSignal.signal.aborted) {
        resetAllBarColor();
        return; // Stop sort function
      }
      setBarColor(j, '#77738E');

      await sleep(SPEED);
      if (list[j] > list[j + 1]) {
        let tmp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = tmp;
        swapBar(j, j + 1);
        resetBarColor(j);
        setBarColor(j + 1, '#006C5E');
      } else {
        setBarColor(j + 1, '#006C5E');
        await sleep(SPEED * (SPEED / 95));
        resetBarColor(j);
      }
    }
    setBarColor(i, '#C8A1B5');
  }
  setBarColor(0, '#C8A1B5');
};

/**
 * Insertion sort
 * @description Sort list with insertion sort algorithm
 */
const insertionSort = async (list: Array<number>, cancelSignal: AbortController) => {
  for (let i = 1; i < list.length; i++) {
    let j = i - 1;
    setBarColor(i - 1, '#77738E');
    await sleep(SPEED);
    while (j >= 0 && list[j] > list[j + 1]) {
      // Check if sort is canceled before each iteration
      if (cancelSignal.signal.aborted) {
        resetAllBarColor();
        return; // Stop sort function
      }

      await sleep(SPEED * (SPEED / 40));
      let tmp = list[j];
      list[j] = list[j + 1];
      list[j + 1] = tmp;
      swapBar(j, j + 1);
      setBarColor(j + 1, getBarColor(j));
      setBarColor(j, '#006C5E');
      j--;
    }
    if (cancelSignal.signal.aborted) {
      resetAllBarColor();
      return; // Stop sort function
    }
    setBarColor(j + 1, '#C8A1B5');
    setBarColor(i - 1, '#C8A1B5');
  }
};

/**
 * Merge sort
 * @description Sort list with merge sort algorithm
 */
const mergeSort = async (list: Array<number>, cancelSignal: AbortController) => {
  LIST = await mainMergeSort([...list], cancelSignal);
  if (cancelSignal.signal.aborted) {
    generateNewList(parseInt(listSizeInput.value));
    return; // Stop sort function
  }
};

const colorList = [
  '#77738e',
  '#6e6e89',
  '#656983',
  '#5c657e',
  '#536078',
  '#4a5b72',
  '#42566c',
  '#3a5265',
  '#324d5f',
  '#2a4858',
];

const getColor = (id: number) => {
  if (id < colorList.length) {
    return colorList[id];
  } else {
    return colorList[id % colorList.length];
  }
};

/**
 * Main merge sort
 * @description Main merge sort function
 */
const mainMergeSort = async (
  list: Array<number>,
  cancelSignal: AbortController,
  colorId: number = 0,
  startRight: number = 0,
): Promise<Array<number>> => {
  const half = list.length / 2;

  if (list.length < 2) {
    return list;
  }

  if (cancelSignal.signal.aborted) {
    resetAllBarColor();
    return list; // Stop sort function
  }

  const left = list.splice(0, half);

  // Generate opposite color for left and right list
  const color1 = getColor(colorId);
  const color2 = getColor(colorList.length - colorId - 1);

  setMultipleBarColor(startRight, startRight + left.length, color1);
  setMultipleBarColor(startRight + left.length, startRight + left.length + list.length, color2);

  const i = startRight + left.length;
  return merge(
    await mainMergeSort(left, cancelSignal, colorId + 10, startRight),
    await mainMergeSort(list, cancelSignal, colorId, i),
    startRight,
    cancelSignal,
  );
};

/**
 * Merge two list
 * @description Merge two list
 */
const merge = async (
  left: Array<number>,
  right: Array<number>,
  start: number,
  cancelSignal: AbortController,
): Promise<Array<number>> => {
  const end = start + left.length + right.length;

  // setMultipleBarColor(start, end, "#C8A1B5");
  let arr: Array<number> = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      for (let i = start + arr.length; i < start + arr.length; i++) {
        setBarColor(i, '#006C5E');
        await sleep(SPEED);
        swapBar(i, i + 1);
        setBarColor(i, '#C8A1B5');
        setBarColor(i + 1, '#006C5E');

        if (cancelSignal.signal.aborted) {
          resetAllBarColor();
          return [...arr, ...left, ...right]; // Stop sort function
        }
      }
      setBarColor(start + arr.length, '#C8A1B5');
      arr.push(left.shift() as number);
    } else {
      for (let i = start + arr.length + left.length; i > start + arr.length; i--) {
        setBarColor(i, '#006C5E');
        await sleep(SPEED);
        swapBar(i, i - 1);
        setBarColor(i, '#C8A1B5');
        setBarColor(i - 1, '#006C5E');
        if (cancelSignal.signal.aborted) {
          resetAllBarColor();
          return [...arr, ...left, ...right]; // Stop sort function
        }
      }
      setBarColor(start + arr.length, '#C8A1B5');
      arr.push(right.shift() as number);
    }
  }

  setMultipleBarColor(start, end, getColor(end));

  return [...arr, ...left, ...right];
};

/**
 * Quick sort
 * @description Sort list with quick sort algorithm
 */
const quickSort = async (list: Array<number>, cancelSignal: AbortController) => {
  console.log('Quick sort');
  console.log(list);
  list = await mainQuickSort([...list], cancelSignal);
  console.log(list);
  if (cancelSignal.signal.aborted) {
    generateNewList(parseInt(listSizeInput.value));
    return; // Stop sort function
  }
};

/**
 * Main quick sort
 * @description Main quick sort function
 */
const mainQuickSort = async (list: Array<number>, cancelSignal: AbortController): Promise<Array<number>> => {
  if (list.length < 2) {
    return list;
  }

  if (cancelSignal.signal.aborted) {
    resetAllBarColor();
    return list; // Stop sort function
  }

  const pivot = list[0];
  const lesser = [];
  const greater = [];

  for (let i = 1; i < list.length; i++) {
    if (list[i] < pivot) {
      lesser.push(list[i]);
    } else {
      greater.push(list[i]);
    }
  }

  const i = list.length - greater.length;
  setMultipleBarColor(i, i + greater.length, '#006C5E');
  setMultipleBarColor(0, i, '#C8A1B5');
  setMultipleBarColor(i + greater.length, list.length, '#C8A1B5');

  return [...(await mainQuickSort(lesser, cancelSignal)), pivot, ...(await mainQuickSort(greater, cancelSignal))];
};

//#endregion Sort functions

main();
