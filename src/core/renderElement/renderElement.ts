import { Fiber } from "sage-reconciler";

const renderElement = (fiber: Fiber) => {
    if (fiber.type !== 'DOMElement')
        return;
    
    const { tag, props } = fiber;

    const element = document.createElement(tag);
    if (!props) return element;

    for (const [key, value] of Object.entries(props)) {
        if (!value) continue;

        if (typeof value !== 'string' && typeof value !== 'number')
            continue;

        element.setAttribute(key, value.toString());
    }

    return element;
}

export default renderElement;