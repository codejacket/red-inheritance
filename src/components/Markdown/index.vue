<script name="Markdown" setup>
import pdfLogo from '@/assets/img/pdf.svg'
// markdown编辑器
import MavonEditor from 'mavon-editor'

const props = defineProps({
  isAvoidXss: {
    default: false,
    type: Boolean,
  },
  content: {
    require: true,
    type: String,
  },
})

const markDown = MavonEditor.mavonEditor.getMarkdownIt()
const html = computed(() => {
  if (props.content === null || props.content === undefined) {
    return ''
  }
  // 获取pdf链接生成预览模块
  return markDown.render(props.content).replace(
    /<a.*?href="(.*?.pdf)".*?>(.*?)<\/a>/gi,
    `<p></p>
    <file-card>
      <div>
        <img class="pdf-svg" src="${pdfLogo}">
      </div>
      <div>
        <h5 class="filename">$2</h5>
        <p>
          <a href="$1" target="_blank">Download</a>
        </p>
      </div>
    </file-card>
    <object data="$1" type="application/pdf" width="100%" height="800px"> 
      <embed src="$1">
        This browser does not support PDFs. Please download the PDF to view it: <a href="$1" target="_blank">Download PDF</a>.</p> 
      </embed>
    </object>   
    `,
  )
})
</script>

<template>
  <div class="markdown-body" v-if="isAvoidXss" v-dompurify-html="html" key="avoidXssOn" />
  <div class="markdown-body" v-else v-html="html" key="avoidXssOff" />
</template>

<style lang="scss" scoped>
file-card {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  padding: 0.6rem;
  margin: 1rem 0;
  color: #7a8e97;
  background: #fff;
  border: 1px solid rgb(0 0 0 / 15%);
  border-radius: 4px;
  transition: 0.2s ease-out 0s;

  .pdf-svg {
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  > div:first-of-type {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    width: 5rem;
    height: 5rem;
    padding-right: 1rem;
  }

  .filename {
    display: -webkit-box;
    margin-bottom: 0.5rem !important;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 400 !important;
    line-height: 1.2 !important;
    color: #000;
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-box-orient: vertical;
  }

  p {
    margin: 0;
    line-height: 1;
  }
}

.markdown-body {
  a {
    color: hsl(207deg 90% 54%);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.28s ease;

    &:hover {
      color: #ff5722 !important;
      text-decoration: underline;
    }
  }

  p {
    font-size: 15px;
    line-height: 1.8;
    word-wrap: break-word;
  }

  img {
    max-width: 100%;
    padding: 15px;
    margin: 5px 0;
    background: #fff;
    border: 0;
    box-shadow: inset 0 0 12px rgb(219 219 219);
  }

  pre {
    position: relative !important;
    display: block;
    padding: 5px 10px;
    padding: 0 16px 0 50px !important;
    margin-top: 15px;
    margin-bottom: 15px;
    overflow-y: hidden !important;
    font-size: 1rem !important;
    white-space: pre-wrap;
    white-space: pre !important;
    background: #f8f8f9 !important;
    border: 1px solid #c3ccd0;
    border-radius: 3px !important;

    code {
      line-height: 26px !important;
    }

    ol.pre-numbering {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0;
      margin: 0;
      font-size: 12px;
      line-height: 26px;
      color: #777;
      list-style-type: none;
      counter-reset: sectioncounter;
      background: #f1f1f1;

      li {
        margin-top: 0 !important;

        &::before {
          display: inline-block;
          width: 40px;
          text-align: center;
          content: counter(sectioncounter) '';
          counter-increment: sectioncounter;
        }

        .markdown-body pre i.code-copy {
          position: absolute;
          top: 0;
          right: 0;
          display: none;
          padding: 5px;
          margin: 5px 5px 0 0;
          font-size: 11px;
          color: #fff;
          cursor: pointer;
          background-color: var(--red-secondary);
          border-radius: inherit;
          transition: all 0.3s ease-in-out;
        }
      }
    }
  }

  blockquote {
    padding: 10px;
    margin-left: 0;
    font-size: 14px;
    color: #666;
    background: #f8f8f8;
    border-left: 4px solid #8bc34a;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    margin-top: 1em;
    margin-bottom: 16px;
    font-weight: bold;
    line-height: 1.4;
  }

  h1 {
    padding-bottom: 0.3em;
    font-size: 1.86em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
  }

  h2 {
    padding: 8px 10px;
    font-size: 1.45em;
    line-height: 1.425;
    color: #545857;
    background: #cce5ff;
    border-bottom: 1px solid #eee;
    border-radius: 3px;
  }

  h3 {
    font-size: 1.3em;
    line-height: 1.43;

    &::before {
      padding-left: 6px;
      content: '';
      border-left: 4px solid var(--red-primary);
    }

    .markdown-body h4 {
      font-size: 1.12em;
    }
  }

  h4::before {
    padding-left: 6px;
    content: '';
    border-left: 4px solid #bbb;
  }
}
</style>
