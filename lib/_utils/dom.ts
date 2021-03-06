/**
 * @description dom操作util
 * @author: 南歌子
 * @date 2021/01/08 09:14
 * @version V1.0.0
 *
 * Hello, humor
 */

/* istanbul ignore next */
import {throttle} from "./throttleDebounce";

const trim = (string: string) => {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
export const on = (function() {
  // @ts-ignore
  if (document.addEventListener) {
    return function(element: any, event: string, handler: Function) {
      if (element && event && handler) {
        const eventHandler = throttle(1000, handler)
        element.addEventListener(event, eventHandler, false);
      }
    };
  } else {
    return function(element: any, event: string, handler: Function) {
      if (element && event && handler) {
        const eventHandler = throttle(1000, handler)
        element.attachEvent('on' + event, eventHandler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  // @ts-ignore
  if (document.removeEventListener) {
    return function(element: any, event: string, handler: Function) {
      if (element && event) {
        const eventHandler = throttle(1000, handler)
        element.removeEventListener(event, eventHandler, false);
      }
    };
  } else {
    return function(element: any, event: string, handler: Function) {
      if (element && event) {
        const eventHandler = throttle(1000, handler)
        element.detachEvent('on' + event, eventHandler);
      }
    };
  }
})();

/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: Element, cls: string) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
export function hasClass(el: Element, cls: string) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}

/**
 * 获取dom的像素数值
 * @param elt
 * @param type
 */
export const getStyleNumber = (elt: Element, type: any) => {
  if(elt){
    const num = Number(window.getComputedStyle(elt)[type].replace('px', ''));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};
