import { SageElement } from "sage";
import { Fiber, FiberComponent, FiberHostElement, FiberHostText, createRootFiber } from "sage-reconciler";
import { renderElement } from "../../core";

export default class DOMRoot {

    private _rootFiber: Fiber | null = null;

    constructor(private _container: HTMLElement) {}

    render(DOMTree: SageElement) {
        this._rootFiber = createRootFiber(DOMTree, this.update.bind(this));

        const container = this._container;

        if (!(this._rootFiber instanceof FiberHostElement))
            throw new Error('Must be DOMElement');

        let element = renderElement(this._rootFiber);
        if (!element) throw new Error('Must have elements');

        if (this._rootFiber.child)
            element = this.renderChild(element, this._rootFiber.child);

        console.log(this._rootFiber);
        console.log(element);

        container.appendChild(element);
    }

    private renderChild(container: HTMLElement, fiber: Fiber): HTMLElement {
        if (fiber instanceof FiberHostText) {
            container.textContent = fiber.content
            return container;
        }

        let nextContainer = container;
        if (fiber instanceof FiberHostElement) {
            const element = renderElement(fiber);
            if (!element) return container;
            container.appendChild(element);
            nextContainer = element;
        }

        if (fiber.child)
            this.renderChild(nextContainer, fiber.child);

        if (fiber.sibling) {
            let sibling: Fiber | null = fiber.sibling;
            while (sibling) {
                container = this.renderChild(container, sibling);
                console.log(container);
                
                sibling = sibling.sibling
            }
        }

        return container;
    }

    update(newRootFiber: Fiber) {
        console.log(this);
        
        const rootFiber = newRootFiber;
        if (!rootFiber) 
            throw new Error('States must be used inside Components.');

        const container = this._container;

        if (!(rootFiber instanceof FiberHostElement))
            throw new Error('Must be DOMElement');

        let element = renderElement(rootFiber);
        if (!element) throw new Error('Must have elements');

        if (rootFiber.child)
            element = this.renderChild(element, rootFiber.child);

        console.log(rootFiber);
        console.log(element);

        container.innerHTML = '';
        container.appendChild(element);
    }
}