/**
 * @description tooltip 事件
 * @author lichunlin
 */

import $, { DomElement } from '../../../utils/dom-core'
import Tooltip, { TooltipConfType } from '../../menu-constructors/Tooltip'
import Editor from '../../../editor/index'
import setAlignment from './video-alignment'
import { getRandom } from '../../../utils/util'

/**
 * 生成 Tooltip 的显示隐藏函数
 */
export function createShowHideFn(editor: Editor) {
  let tooltip: Tooltip | null
  const t = (text: string, prefix: string = ''): string => {
    return editor.i18next.t(prefix + text)
  }

  const widthId = getRandom('w-width-id')
  const heightId = getRandom('w-height-id')
  const insertBtnId = getRandom('btn-link')
  const inputIFrameId = getRandom('input-iframe')
  /**
   * 显示 tooltip
   * @param $node 链接元素
   */
  function showVideoTooltip($node: DomElement) {
    const conf: TooltipConfType = [
      {
        $elem: $("<span class='w-e-icon-trash-o'></span>"),
        onClick: (editor: Editor, $node: DomElement) => {
          // 选中video元素 删除
          $node.remove()
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      // {
      //   $elem: $('<span>100%</span>'),
      //   onClick: (editor: Editor, $node: DomElement) => {
      //     $node.attr('width', '100%')
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
      //   $elem: $('<span>30%</span>'),
      //   onClick: (editor: Editor, $node: DomElement) => {
      //     $node.attr('width', '30%')
      //     $node.removeAttr('height')
      //     // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
      //     return true
      //   },
      // },

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
      {
        $elem: $(`<span>${t('重置')}</span>`),
        onClick: (editor: Editor, $node: DomElement) => {
          $node.removeAttr('width')
          $node.removeAttr('height')
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      {
        $elem: $(`<span>${t('menus.justify.靠左')}</span>`),
        onClick: (editor: Editor, $node: DomElement) => {
          // 获取顶级元素
          setAlignment($node, 'left')
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      {
        $elem: $(`<span>${t('menus.justify.居中')}</span>`),
        onClick: (editor: Editor, $node: DomElement) => {

          // 获取顶级元素
          setAlignment($node, 'center')
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
      {
        $elem: $(`<span>${t('menus.justify.靠右')}</span>`),
        onClick: (editor: Editor, $node: DomElement) => {
          // 获取顶级元素
          setAlignment($node, 'right')
          // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
          return true
        },
      },
    ]

    tooltip = new Tooltip(editor, $node, conf)
    tooltip.create()
  }

  /**
   * 隐藏 tooltip
   */
  function hideVideoTooltip() {
    // 移除 tooltip
    if (tooltip) {
      tooltip.remove()
      tooltip = null
    }
  }

  return {
    showVideoTooltip,
    hideVideoTooltip,
  }
}

/**
 * 绑定 tooltip 事件
 * @param editor 编辑器实例
 */
export default function bindTooltipEvent(editor: Editor) {
  const { showVideoTooltip, hideVideoTooltip } = createShowHideFn(editor)

  // 点击视频元素是，显示 tooltip
  editor.txt.eventHooks.videoClickEvents.push(showVideoTooltip)

  // 点击其他地方，或者滚动时，隐藏 tooltip
  editor.txt.eventHooks.clickEvents.push(hideVideoTooltip)
  editor.txt.eventHooks.keyupEvents.push(hideVideoTooltip)
  editor.txt.eventHooks.toolbarClickEvents.push(hideVideoTooltip)
  editor.txt.eventHooks.menuClickEvents.push(hideVideoTooltip)
  editor.txt.eventHooks.textScrollEvents.push(hideVideoTooltip)

  // change 时隐藏
  editor.txt.eventHooks.changeEvents.push(hideVideoTooltip)
}
