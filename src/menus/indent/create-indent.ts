/**
 * @description 创建tabel
 * @author lichunlin
 */

// import { EMPTY_P } from '../../utils/const'
import Editor from '../../editor/index'
import $ from '../../utils/dom-core'
import operateElement from './operate-element'

class CreateIndent {
  private editor: Editor

  constructor(editor: Editor) {
    this.editor = editor
  }

  /**
   * 执行命令
   * @param value value
   */
  public command(value: string): void {
    const editor = this.editor
    const $selectionElem = editor.selection.getSelectionContainerElem()

    // 判断 当前选区为 textElem 时
    if ($selectionElem && editor.$textElem.equal($selectionElem)) {
      // 当 当前选区 等于 textElem 时
      // 代表 当前选区 可能是一个选择了一个完整的段落或者多个段落
      const $elems = editor.selection.getSelectionRangeTopNodes()
      if ($elems.length > 0) {
        $elems.forEach((item: any) => {
          operateElement($(item), value, editor)
        })
      }
    } else {
      // 当 当前选区 不等于 textElem 时
      // 代表 当前选区要么是一个段落，要么是段落中的一部分
      if ($selectionElem && $selectionElem.length > 0) {
        $selectionElem.forEach((item: any) => {
          operateElement($(item), value, editor)
        })
      }
    }

    // 恢复选区
    editor.selection.restoreSelection()
  }

  /**
   * 尝试改变菜单激活（高亮）状态
   */
  public tryChangeActive(): void { }
}

export default CreateIndent
