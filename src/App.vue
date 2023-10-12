<script setup>

</script>

<template>
  <router-view/>
</template>

<style>
/** 重置所有元素的内外边距为零 **/
body {
  @apply bg-gray-100;
}

* {
  margin: 0;
  padding: 0;
}

/** 重置标题的字体样式 **/
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: normal;
}

/** 重置段落的行高和字体样式 **/
p {
  line-height: inherit;
  font-size: inherit;
}

/** 重置链接的样式 **/
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

/** 重置列表的样式 **/
ul, ol {
  list-style: none;
}

/** 重置图片的边框为零 **/
img {
  border: 0;
}
</style>