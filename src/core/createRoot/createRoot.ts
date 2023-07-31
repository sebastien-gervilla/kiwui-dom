import { DOMRoot } from "../../classes";

const createRoot = (container: HTMLElement | null) => {
    if (!container) throw new Error(`
        Couldn't find container (root) element. 
        Make sure it exists in index.html.
    `);
    
    return new DOMRoot(container);
}

export default createRoot;