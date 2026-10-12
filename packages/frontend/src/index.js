// i.AI Design System — behaviour layer.
//
// Progressive enhancement for i.AI components. Call after govuk-frontend's
// initAll(). Each component's enhancement lives in its own module.

import { initAllModals } from "./components/modal/index.js";

export { open as openModal, close as closeModal, initModal } from "./components/modal/index.js";

export function initAllIAIDesignSystem() {
    initAllModals();
}
