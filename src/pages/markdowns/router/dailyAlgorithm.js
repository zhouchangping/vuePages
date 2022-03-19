import reversMid from "../view/dailyAlgorithm/反转中位数.md";
import triangle from "../view/dailyAlgorithm/三角形最小路径和.md";
import maximumOfTree from "../view/dailyAlgorithm/二叉树最大深度.md";
import integerInversion from "../view/dailyAlgorithm/整数反转.md";
import repeateCharacters from "../view/dailyAlgorithm/无重复字符的最长字串.md";
import longestCommonPrefix from "../view/dailyAlgorithm/最长公共前缀.md";
import longestPalindrome from "../view/dailyAlgorithm/最长回文.md";
import pathsum from "../view/dailyAlgorithm/路径总和.md";


const routes = [{
  path: "/",
  name: "reversMid",
  component: reversMid,
  meta: {
    title: "reversMid"
  }
},
{
  path: "/triangle",
  name: "triangle",
  component: triangle,
  meta: {
    title: "triangle"
  }
},
{
  path: "/maximumOfTree",
  name: "maximumOfTree",
  component: maximumOfTree,
  meta: {
    title: "maximumOfTree"
  }
},
{
  path: "/integerInversion",
  name: "integerInversion",
  component: integerInversion,
  meta: {
    title: "integerInversion"
  }
},
{
  path: "/repeateCharacters",
  name: "repeateCharacters",
  component: repeateCharacters,
  meta: {
    title: "repeateCharacters"
  }
},
{
  path: "/longestCommonPrefix",
  name: "longestCommonPrefix",
  component: longestCommonPrefix,
  meta: {
    title: "longestCommonPrefix"
  }
},
{
  path: "/longestPalindrome",
  name: "longestPalindrome",
  component: longestPalindrome,
  meta: {
    title: "longestPalindrome"
  }
},
{
  path: "/pathsum",
  name: "pathsum",
  component: pathsum,
  meta: {
    title: "pathsum"
  }
}];
export default routes;