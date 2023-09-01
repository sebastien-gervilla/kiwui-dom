import { DOMRoot } from "../../classes";

const createRoot = (rootId: string) => {
    const container = document.getElementById(rootId);
    if (!container) throw new Error(`
        Couldn't find container (root) element. 
        Make sure it exists in index.html.
    `);
    
    return new DOMRoot(container);
}

export default createRoot;