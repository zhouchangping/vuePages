let fs = require("fs");
function dealUrlForList (topUrl) {
  if (fs.existsSync(topUrl)) {
    let resultArray = [];
    let files = fs.readdirSync(topUrl);
    files.forEach(function (file) {
      let curPath = topUrl + "/" + file;
      resultArray.push(file);
      // let itemArray = [];
      // if (fs.statSync(curPath).isDirectory()) {
      //   let itemFiles = fs.readdirSync(curPath);
      //   itemFiles.forEach(function (file) {
      //     console.log(file)
      //     itemArray.push(file);
      //   });
      // }
      // resultArray.push(itemArray)
    });
  }
  return resultArray;
}

export default dealUrlForList;