import { FiberHostElement } from "sage-reconciler";

const renderElement = (fiber: FiberHostElement): HTMLElement => {
    const { tag, props } = fiber;

    const element = document.createElement(tag);
    if (!props) return element;

    for (const [key, value] of Object.entries(props)) {
        if (!value) continue;

        if (typeof value === 'function') {
            if (key.startsWith('on'))
                element.addEventListener(key.replace('on', '').toLowerCase(), value);
            continue
        }

        if (!allowedPropertyTypes.includes(typeof value))
            continue;

        element.setAttribute(key, value.toString());
    }

    return element;
}

const allowedPropertyTypes = [
    'string',
    'number'
]

export default renderElement;