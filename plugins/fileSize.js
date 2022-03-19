// class firstPlugin {
//   constructor(options) {
//     this.options = options;
//   }
//   apply (compiler) {
//     compiler.plugin("emit", (compilation, callback) => {
//       let str = "";
//       for (let filename in compilation.assets) {
//         str += `文件:${filename}  大小${compilation.assets[filename]["size"]() / 1024}\n`;
//       }
//       // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
//       compilation.assets["fileSize.md"] = {
//         source: function () {
//           return str;
//         },
//         size: function () {
//           return str.length;
//         }
//       };
//       callback();
//     });
//   }
// }


class FileSize {
  apply (compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
      console.log('The compiler is starting a new compilation...')
      compilation.hooks.optimizeChunkAssets.tapAsync('MyPlugin', (chunks, callback) => {
        console.log("-------------------------")
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            console.log("------------")
            console.log(file)
          });
        });

        // callback();
      });


      // let str = "";
      // for (let filename in compilation.assets) {
      //   str += `文件:${filename}  大小${compilation.assets[filename]["size"]() / 1024}\n`;
      // }
      // // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      // compilation.assets["fileSize.md"] = {
      //   source: function () {
      //     return str;
      //   },
      //   size: function () {
      //     return str.length;
      //   }
      // };
      callback();
    })
  }
}
module.exports = FileSize;
