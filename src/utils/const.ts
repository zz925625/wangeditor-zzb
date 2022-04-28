/**
 * @description 常量
 * @author wangfupeng
 */
// import defaultConfig from '../config/index'
// import Editor from '../editor/index'
// console.log('Editor: ', Editor);
export function EMPTY_FN() { }

let EMPTY_P: string = '<br>'
let EMPTY_P_LAST_REGEX: RegExp = /<br\/?>$/gim

export function Change_Empty_P(hasPOrBr: boolean) {
  if (hasPOrBr) {
    EMPTY_P = '<p data-we-empty-p=""><br></p>'
    EMPTY_P_LAST_REGEX = /<p data-we-empty-p=""><br\/?><\/p>$/gim
  } else {
    EMPTY_P = '<br>'
    EMPTY_P_LAST_REGEX = /<br\/?>$/gim
  }
}

//用于校验是否为url格式字符串
export const urlRegex = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/

// 编辑器为了方便继续输入/换行等原因 主动生成的空标签
// export const EMPTY_P = '<p data-we-empty-p=""><br></p>'
export { EMPTY_P, EMPTY_P_LAST_REGEX }

// 用于校验dom中最后 由编辑器主动生成的空标签结构
// export const EMPTY_P_LAST_REGEX = /<p data-we-empty-p=""><br\/?><\/p>$/gim
// export const EMPTY_P_LAST_REGEX = /<br\/?>$/gim

// 用于校验dom中所有 由编辑器主动生成的空标签结构
// export const EMPTY_P_REGEX = /<p data-we-empty-p="">/gim
export const EMPTY_P_REGEX = /<p data-we-empty-p="">/gim
