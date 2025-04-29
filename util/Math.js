export function findClosestLess(arr, target) {
    let closest = -Infinity;
  
    for (const num of arr) {
      if (num.time <= target && num.time > closest) {
        closest = num.time;
      }
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].time === closest) {
            return i;
        }
    }
}

export function findClosestGreater(arr, target) {
  let closest = Infinity;
  
  for (const num of arr) {
    if (num.time >= target && num.time < closest) {
      closest = num.time;
    }
  }

  for (let i = 0; i < arr.length; i++) {
      if (arr[i].time === closest) {
          return i;
      }
  }
}