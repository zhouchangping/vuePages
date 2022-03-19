## 双重循环
```
Array.prototype.unique = function () {
  const newArray = []; // 存放不重复的元素
  let isRespect;
  for (let i = 0; i < this.length; i++) {
    isRespect = false; // 每次都设置为false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) { // 与新数组重复了跳出当前循环
        isRespect = true;
        break;
      }
    }
    if (!isRespect) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}

Array.prototype.unique = function () {
  const newArray = []; // 存放不重复的元素
  let isRespect;
  for (let i = 0; i < this.length; i++) {
    isRespect = false; // 每次都设置为false;
    for (let j = i+1; j < this.length; j++) {
      if (this[i] === this[j]) { // 与新数组重复了跳出当前循环
        isRespect = true;
        break;
      }
    }
    if (!isRespect) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

## Array.prototype.indexOf()
+ 利用Array.prototype.filter()过滤功能
+ Array.prototype.indexOf()返回的是第一个索引值
+ 只将数组中元素第一次出现的返回
+ 之后出现的将被过滤掉
```
Array.prototype.unique = function () {
  return this.filter((item, index)=> {
    return this.indexOf(item) === index;
  })
}
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item=> {
    if (newArray.indexOf(item)=== -1) {
      newArray.push(item);
    }
  })
  return newArray;
}
```

## Array.prototype.sort
```
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i]!==newArray[newArray.length -1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}
```

## Array.prototype.includes
```
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
}
```

## Array.prototype.reduce
```
Array.prototype.unique = function () {
  return this.sort.reduce((arr, current)=> {
    if (arr.length === 0 || arr[arr.length -1] !== current) { // 确保排序后加入的数，在arr累计器不存在
      arr.push(current);
    }
  }, [])
}
```

## map
```
Array.prototype.unique = function () {
  const newArray = [];
  const map = new Map();
  for (let i = 0; i < this.length; i++) {
    if (!map.get(this[i])) {
      map.set(this[i], true);
      newArray.push(this[i]);
    }
  }
  return newArray;
}
Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}
```

## set
```
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
}
Array.prototype.unique = function () {
  return [...new Set(this)]
}
```
## 总结
+ 其中map方式时间效率最高

