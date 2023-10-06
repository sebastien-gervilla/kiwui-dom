import { KiwuiElement, KiwuiNode, PortalComponent } from "kiwui";

export const createPortal = (children: KiwuiNode, container: HTMLElement): KiwuiElement<PortalComponent> => {
    const Portal: PortalComponent = (props) => props.children;
    Portal.exoticTag = 'Portal';
    Portal.container = container;
    return {
        key: 'Portal',
        type: Portal,
        props: {
            children
        }
    };
}