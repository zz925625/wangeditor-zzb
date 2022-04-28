/**
 * @description 增加缩进/减少缩进
 * @author tonghan
 */

import $ from '../../utils/dom-core'
import Editor from '../../editor/index'
import PanelMenu from '../menu-constructors/PanelMenu'
import Panel from '../menu-constructors/Panel'
import { MenuActive } from '../menu-constructors/Menu'
import createPanelConf from './create-indent-conf'

class Indent extends PanelMenu implements MenuActive {
  constructor(editor: Editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="缩进">
                <i class="w-e-icon-indent-increase"></i>
                <span>缩进</span>
            
                </div>`
    )
    super($elem, editor)
  }

  /**
   * 菜单点击事件
   */
  public clickHandler(): void {
    this.createPanel()
  }

  /**
   * 创建 panel
   */
  private createPanel(): void {
    const conf = createPanelConf(this.editor)
    const panel = new Panel(this, conf)
    panel.create()
  }

  /**
   * 尝试修改菜单 active 状态
   */
  public tryChangeActive() { }
}

export default Indent
