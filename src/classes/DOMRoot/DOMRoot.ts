import { SageElement } from "sage";
import { Fiber, createRootFiber } from "sage-reconciler";
import { renderElement } from "../../core";

export default class DOMRoot {

    private _rootFiber: Fiber | null = null;

    constructor(private _container: HTMLElement) {}

    render(DOMTree: SageElement) {
        this._rootFiber = createRootFiber(DOMTree);

        const container = this._container;

        let element = renderElement(this._rootFiber);
        if (!element) throw new Error('Must have elements');

        if (this._rootFiber.child)
            element = this.renderChild(element, this._rootFiber.child);

        console.log(this._rootFiber);
        console.log(element);

        container.appendChild(element);
    }

    private renderChild(container: HTMLElement, fiber: Fiber): HTMLElement {
        if (fiber.type === 'Component') {
            if (!fiber.child) return container;
            fiber = fiber.child;
        }

        const element = renderElement(fiber);
        if (!element) return container;

        container.appendChild(element);
        if (!fiber.child) return container;

        this.renderChild(element, fiber.child);
        return container;
    }
}