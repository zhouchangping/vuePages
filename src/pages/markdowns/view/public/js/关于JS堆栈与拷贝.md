var a = [1,2,3,4,5];
var b = a; 3
var c = a[0]; 4
alert(b);//1,2,3,4,5
alert(c); //1
//改变数值
b[4] = 6;
c = 7;
alert(a[4]);//6
alert(a[0]);//1
