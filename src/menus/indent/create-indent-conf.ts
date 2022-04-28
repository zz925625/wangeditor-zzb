/**
 * @description table 菜单 panel tab 配置
 * @author lichunlin
 */

import Editor from '../../editor/index'
import { PanelConf, PanelTabConf } from '../menu-constructors/Panel'
import { getRandom } from '../../utils/util'
import $ from '../../utils/dom-core'
import '../../assets/style/create-panel-conf.less'
// import CreateIndent from './create-indent'

/**
 * 判断一个数值是否为正整数
 * @param { number } n 被验证的值
 */
function isPositiveInteger(n: number): boolean {
  //是否为正整数
  return n > 0 && Number.isInteger(n)
}

export default function (editor: Editor): PanelConf {
  // const CreateIndent = new CreateIndent(editor)
  // panel 中需要用到的id
  const leftId = getRandom('w-left-id')
  const rightId = getRandom('w-right-id')
  const firstRowId = getRandom('w-first-row-id')
  const insertBtnId = getRandom('btn-link')

  const i18nPrefix = 'menus.panelMenus.table.'
  const t = (text: string): string => {
    return editor.i18next.t(text)
  }

  // tabs 配置 -----------------------------------------
  const tabsConf: PanelTabConf[] = [
    {
      title: t(`${i18nPrefix}插入表格`),
      tpl: `<div>
                    <div class="w-e-table">
                        <span>${t('左缩进')}</span>
                        <input id="${leftId}"  type="text" class="w-e-table-input" value="5"/>
                        <span>${t(`${i18nPrefix}字符`)}</span>
                    </div>

                    <div  class="w-e-table">
                        <span>${t('右缩进')}</span>
                        <input id="${rightId}" type="text" class="w-e-table-input" value="5"/>
                        <span>${t(`${i18nPrefix}字符`)}</span>  
                    </div>

                    <div  class="w-e-table">
                        <span>${t('首行缩进')}</span>
                        <input id="${firstRowId}" type="text" class="w-e-table-input" value="5"/>
                        <span>${t(`${i18nPrefix}字符`)}</span>  
                    </div>

                    <div class="w-e-button-container">
                        <button type="button" id="${insertBtnId}" class="right">${t(
        '插入'
      )}</button>
                    </div>
                </div>`,
      events: [
        {
          selector: '#' + insertBtnId,
          type: 'click',
          fn: () => {
            const leftValue = Number($('#' + leftId).val())
            const rightValue = Number($('#' + rightId).val())
            const firstValue = Number($('#' + firstRowId).val())
            //校验是否传值
            if (
              isPositiveInteger(rightValue) &&
              isPositiveInteger(leftValue) &&
              isPositiveInteger(firstValue)
            ) {
              // CreateIndent.command()
              console.log(leftValue, rightValue, firstValue)
              return true
            } else {
              editor.config.customAlert('表格行列请输入正整数', 'warning')
              return false
            }
            // 返回 true 表示函数执行结束之后关闭 panel
          },
          bindEnter: true,
        },
      ],
    },
  ]
  // tabs end

  // 最终的配置 -----------------------------------------
  const conf: PanelConf = {
    width: 330,
    height: 0,
    tabs: [],
  }
  conf.tabs.push(tabsConf[0])

  return conf
}
