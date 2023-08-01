import { SageElement } from "sage";
import { Fiber, FiberComponent, FiberHostElement, FiberHostText, createRootFiber } from "sage-reconciler";
import { renderElement } from "../../core";

export default class DOMRoot {

    private _rootFiber: Fiber | null = null;

    constructor(private _container: HTMLElement) {}

    render(DOMTree: SageElement) {
        this._rootFiber = createRootFiber(DOMTree);

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
        while (fiber instanceof FiberComponent) {
            if (!fiber.child) return container;
            fiber = fiber.child;
        }

        if (fiber instanceof FiberHostText) {
            container.textContent = fiber.content
            return container;
        }

        if (!(fiber instanceof FiberHostElement))
            return container;

        const element = renderElement(fiber);
        if (!element) return container;

        container.appendChild(element);
        if (!fiber.child) return container;

        this.renderChild(element, fiber.child);
        return container;
    }
}