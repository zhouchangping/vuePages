<template>
  <article-content :title="title" :time="time">
    <section>
      <h2>正则</h2>
    </section>
  </article-content>
</template>
<script>
import ArticleContent from "@/components/article.vue";
export default {
  name: "zhengze",
  data () {
    return {
      title: "正则训练",
      time: "2021-03-05"
    }
  },
  created () {
    // let reg = /^[0-9]*/;
    // // console.log(reg.test(123))
    // console.log(reg.exec(123))
    // let reg1 = /hello/g;
    // console.log(reg.exec('hello 123'))

    const regex1 = /foo*/g;
    const str1 = 'table football, foosball';
    let array1;
    console.log(regex1.exec(str1))

    // while ((array1 = regex1.exec(str1)) !== null) {
    //   console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
    // }

    function replacer (match, p1, p2, p3, offset, string) {
      // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      console.log(match)
      return [p1, p2, p3].join(' - ');
    }
    let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
    console.log(newString);  // abc - 12345 - #$*%

    // var str = "Is this all there is?";
    // var patt1 = /[a-h]/g;
    // console.log(str.match(patt1))
  },
  methods: {
  },
  components: {
    ArticleContent
  }
}
</script>
<style lang="scss" scoped>
</style>