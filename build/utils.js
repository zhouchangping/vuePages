
const packageConfig = require("../package.json");
const glob = require("glob");
const path = require("path");
exports.createNotifierCallback = function () {
  const notifier = require("node-notifier");
  return (severity, errors) => {
    if (severity !== "error") return;
    const error = errors[0];
    console.log(error, '-------')
    console.log((error.file.split("!")))
    const filename = error.file && error.file.split("!").pop();
    console.log(filename, "===========")
    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png")
    });
  };
}

exports.getMultiEntry = function (globPath) {
  const entries = {};
  glob.sync(globPath).forEach(function (entry) {
    let pageName = path.basename(entry, path.extname(entry));
    let folders = entry.split("/").splice(-3);
    entries[pageName] = entry;
  })
  // console.log(entries)
  return entries;
}
