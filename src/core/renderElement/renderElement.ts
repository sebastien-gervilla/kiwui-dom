import { CSSStyleKey } from "sage";
import { FiberHostElement } from "sage-reconciler";

  
const renderElement = (fiber: FiberHostElement): HTMLElement => {
    const { tag, props } = fiber;

    const element = document.createElement(tag);
    if (!props) return element;

    for (const [key, value] of Object.entries(props)) {
        
        if (!value) continue;

        if (key === 'className') {
            element.setAttribute('class', value.toString());
            continue;
        } 
        
        if (typeof value === 'function') {
            if (key.startsWith('on'))
                element.addEventListener(key.replace('on', '').toLowerCase(), value);
            continue
        } 
        
        if (key === 'style' && typeof value === 'object') {
            const styleProps = value;
            applyStyles(element, styleProps);
            continue;
        } 
        
        if (!allowedPropertyTypes.includes(typeof value))
            continue;

        element.setAttribute(key, value.toString());
    }

    return element;
}

const applyStyles = (element: HTMLElement, styleProps: Record<CSSStyleKey, string | number>) => {
    console.log(element,styleProps)
    for (const styleKey in styleProps) {
        if (styleProps.hasOwnProperty(styleKey)) {
            element.style[styleKey] = styleProps[styleKey].toString();
        }
    }
};

const allowedPropertyTypes = [
    'string',
    'number'
]

export default renderElement;