/**
 * @description tooltip 事件
 * @author lichunlin
 */

import $, { DomElement } from '../../../utils/dom-core'
import Tooltip, { TooltipConfType } from '../../menu-constructors/Tooltip'
import Editor from '../../../editor/index'
// import { getRandom } from '../../../util/utils'
import { getRandom } from '../../../utils/util'
/**
 * 生成 Tooltip 的显示隐藏函数
 */
export function createShowHideFn(editor: Editor) {
  let tooltip: Tooltip | null
  const t = (text: string, prefix: string = ''): string => {
    return editor.i18next.t(prefix + text)
  }

  /**
   * 显示 tooltip
   * @param $node 链接元素
   */
  function showImgTooltip($node: DomElement) {

    const widthId = getRandom('w-width-id')
    const heightId = getRandom('w-height-id')
    const insertBtnId = getRandom('btn-link')

    const conf: TooltipConfType = [
      {
        $elem: $("<span class='w-e-icon-trash-o'></span>"),
        onClick: (editor: Editor, $node: DomElement) => {
          // 选中img元素
          editor.selection.createRangeByElem($node)
          editor.selection.restoreSelection()
          editor.cmd.do('delete')
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      // 新增 输入框处理 图片大小
      {
        $elem: $(`<button type="button" id="${insertBtnId}" class="right">${t('确定')}</button>
                   `),
        $input: $(`<div class="w-e-table">
                        <span>宽</span>
                        <input id="${widthId}"  type="text" class="w-e-table-input" value=""/></td>
                        <span>高</span>
                        <input id="${heightId}" type="text" class="w-e-table-input" value=""/></td>
                    </div>
               `),
        onClick: (editor: Editor, $node: DomElement) => {
          const widthValue = Number($('#' + widthId).val())
          console.log('widthValue: ', widthValue);
          const heighValue = Number($('#' + heightId).val())
          console.log('heighValue: ', heighValue);
          console.log('$node: ', $node);
          if (widthValue) {
            $node.attr('width', widthValue + 'px');
            !heighValue && $node.removeAttr('height')
          }
          if (heighValue) {
            $node.attr('height', heighValue + 'px');
            !widthValue && $node.removeAttr('width')
          }


          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      // {
      //   $elem: $('<span>30%</span>'),
      //   onClick: (editor: Editor, $node: DomElement) => {
      //     $node.attr('width', '30%')
      //     $node.removeAttr('height')
      //     // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
      //     return true
      //   },
      // },
      // {
      //   $elem: $('<span>50%</span>'),
      //   onClick: (editor: Editor, $node: DomElement) => {
      //     $node.attr('width', '50%')
      //     $node.removeAttr('height')

      //     // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
      //     return true
      //   },
      // },
      // {
      //   $elem: $('<span>100%</span>'),
      //   onClick: (editor: Editor, $node: DomElement) => {
      //     $node.attr('width', '100%')
      //     $node.removeAttr('height')

      //     // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
      //     return true
      //   },
      // },
    ]

    conf.push({
      $elem: $(`<span>${t('重置')}</span>`),
      onClick: (editor: Editor, $node: DomElement) => {
        $node.removeAttr('width')
        $node.removeAttr('height')

        // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
        return true
      },
    })

    if ($node.attr('data-href')) {
      conf.push({
        $elem: $(`<span>${t('查看链接')}</span>`),
        onClick: (editor: Editor, $node: DomElement) => {
          let link = $node.attr('data-href')
          if (link) {
            link = decodeURIComponent(link)
            window.open(link, '_target')
          }
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      })
    }

    tooltip = new Tooltip(editor, $node, conf)
    tooltip.create()
  }

  /**
   * 隐藏 tooltip
   */
  function hideImgTooltip() {

    // 移除 tooltip
    if (tooltip) {
      console.log('tooltip:   hideImgTooltip',);
      tooltip.remove()
      tooltip = null
    }
  }

  return {
    showImgTooltip,
    hideImgTooltip,
  }
}

/**
 * 绑定 tooltip 事件
 * @param editor 编辑器实例
 */
export default function bindTooltipEvent(editor: Editor) {
  const { showImgTooltip, hideImgTooltip } = createShowHideFn(editor)

  // 点击图片元素是，显示 tooltip
  editor.txt.eventHooks.imgClickEvents.push(showImgTooltip)

  // 点击其他地方，或者滚动时，隐藏 tooltip
  editor.txt.eventHooks.clickEvents.push(hideImgTooltip)
  editor.txt.eventHooks.keyupEvents.push(hideImgTooltip)
  editor.txt.eventHooks.toolbarClickEvents.push(hideImgTooltip)
  editor.txt.eventHooks.menuClickEvents.push(hideImgTooltip)
  editor.txt.eventHooks.textScrollEvents.push(hideImgTooltip)
  editor.txt.eventHooks.imgDragBarMouseDownEvents.push(hideImgTooltip)

  // change 时隐藏
  editor.txt.eventHooks.changeEvents.push(hideImgTooltip)
}
