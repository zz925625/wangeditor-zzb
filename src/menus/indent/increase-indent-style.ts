/**
 * @description 增加缩进
 * @author tonghan
 */

import { DomElement } from '../../utils/dom-core'
import { IndentationOptions } from '../../config/menus'

function increaseIndentStyle($node: DomElement, options: IndentationOptions): void {
    const $elem = $node.elems[0]
    if ($elem.style['textIndent'] === '') {
        $node.css('text-indent', options.value + options.unit)
    } else {
        const oldPL = $elem.style['textIndent']
        const oldVal = oldPL.slice(0, oldPL.length - options.unit.length)
        const newVal = Number(oldVal) + options.value
        $node.css('text-indent', `${newVal}${options.unit}`)
    }
}

export default increaseIndentStyle
