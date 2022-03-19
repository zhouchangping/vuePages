<!--
 * @Author: zhouchangping
 * @Date: 2021-01-27 15:19:22
 * @LastEditTime: 2022-02-18 15:46:11
 * @LastEditors: zhouzhou
 * @Description: 
 * @FilePath: /reactVue/vueWebpackCliDemo/src/pages/markdowns/view/public/js/原生webview和javascript交互.md
 * 可以输入预定的版权声明、个性签名、空行等
-->
# 原生webview和javascript交互(https://blog.csdn.net/yuzhengfei7/article/details/93468914)
## javascript调用原生提供方法
+ 从API19开始，Android提供了@JavascriptInterface对象注解的方式来建立起Javascript对象和Android原生对象的绑定，提供给JavScript调用的函数必须带有@JavascriptInterface。以下方式基于api19以后
+ 使用方式及流程：
  + 1，@JavascriptInterface注解；
  + 2，注册JavaScriptInterface；
  + 3，调用，如window.android.show("JavaScript called~!");

### @javascriptInterface，无返回值
```
// 1. 编写Java原生方法并用使用@JavascriptInterface注解
@JavascriptInterface
public void show(String s){
  Toast.makeText(getApplication(), s, Toast.LENGTH_SHORT).show();
}

// 2. 注册JavaScriptInterface。addJavascriptInterface的作用是把this所代表的类映射为JavaScript中的android对象。
webView.addJavascriptInterface(this, "android");

// 3.编写JavaScript代码
function toastClick(){
  window.android.show("JavaScript called~!");
}
```
### @javascriptInterface，有返回值
```
@javascriptInterface
public String getMessage(){
    return "Hello,boy~";
}

webView.addJavaScriptInterface(this,"Android");

function showHello(){
  var str=window.Android.getMessage();
  console.log(str);
}
```

## WebView调用网页上的JavaScript代码
+ 使用原生webview方法，loadUrl()
+ webView.evaluateJavascript

### webview方法loadUrl，需要在主线程中发起调用
```
// 原生代码：
webView.loadUrl("javascript:methodName(parameterValues)"); 

// javascript代码：
<script type="text/javascript">
  function readyToGo() {
    alert("Hello")
  }

  function alertMessage(message) {
    alert(message)
  }

  function getYourCar(){
    return "Car";
  }
</script>
```
```
1. WebView调用JavaScript无参无返回值函数
String call = "javascript:readyToGo()";
webView.loadUrl(call);

2. WebView调用JavScript有参无返回值函数
String call = "javascript:alertMessage(\"" + "content" + "\")";
webView.loadUrl(call);

3. WebView调用JavaScript有参数有返回值的函数,使用webView.evaluateJavascript
@TargetApi(Build.VERSION_CODES.KITKAT)
  private void evaluateJavaScript(WebView webView) {
    webView.evaluateJavascript("getYourCar()", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {
            Log.d("findCar",s);
        }
    });
  }
```