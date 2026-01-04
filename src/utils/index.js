// 日期格式化
export function parseTime(date, pattern = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (date instanceof Date) {
    return pattern?.replace(/{(y|m|d|h|i|s|a)}/g, (_, key) => {
      return {
        y: date.getFullYear(),
        m: (date.getMonth() + 1).toString().padStart(2, '0'),
        d: date.getDate().toString().padStart(2, '0'),
        h: date.getHours().toString().padStart(2, '0'),
        i: date.getMinutes().toString().padStart(2, '0'),
        s: date.getSeconds().toString().padStart(2, '0'),
        a: date.getDay(),
      }[key]
    })
  } else if (typeof date === 'string' || typeof date === 'number') {
    return parseTime(new Date(date), pattern)
  }
}

export function formatCase(str, from = 'xX', to = 'x-x') {
  function getRule(str) {
    if (/[xX]{1}([xX]{1}|[\s-_]{1}[xX]{1})/.test(str)) {
      return {
        upperFirst: str[0] === 'X',
        separator: str.length === 2 ? '' : str[1],
        upperBehind: str[str.length - 1] === 'X',
      }
    }
  }

  let fromRule = getRule(from)
  let toRule = getRule(to)
  return str
    .split(fromRule.separator === '' ? /(?=[A-Z])/ : fromRule.separator)
    .map((word, i) => {
      return (toRule.upperFirst && i === 0) || (toRule.upperBehind && i !== 0)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.charAt(0).toLowerCase() + word.slice(1)
    })
    .join(toRule.separator)
}

export function print(content) {
  let iframe = document.body.appendChild(document.createElement('iframe'))
  iframe.style.display = 'none'
  let w = iframe.contentWindow || iframe.contentDocument
  let doc = iframe.contentDocument || iframe.contentWindow.document
  doc.open()
  doc.write(content)
  doc.close()
  w.document.execCommand('print', false, null)
  w.close()
  document.body.removeChild(iframe)
}

export function downloadFile(fileName) {
  const fileUrl = new URL(`../assets/doc/${fileName}`, import.meta.url).href
  const a = document.createElement('a')
  a.href = fileUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 打印日志并返回值
export function log(obj) {
  console.log(obj)
  return obj
}

// 全局方法
export default {
  install(app) {
    app.config.globalProperties.$parseTime = parseTime
    app.config.globalProperties.$log = log
  },
}
