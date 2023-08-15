import { SageElement } from "sage";
import { FiberHostElement, createFiberRoot, update } from "sage-reconciler";

export default class DOMRoot {

    private _rootFiber: FiberHostElement;

    constructor(private _container: HTMLElement) {
        this._rootFiber = createFiberRoot(this._container);
        this._rootFiber.node = this._container;
        this._rootFiber.type = 'Root';
    }

    render(tree: SageElement) {
        this._rootFiber.props.children = [tree];
        update(this._rootFiber);
    }
}