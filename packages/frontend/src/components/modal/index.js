// i.AI Design System — Modal behaviour over the native <dialog>.
//
// Markup:
//   <dialog class="iai-modal" data-module="iai-modal"> ... </dialog>
//   <button data-iai-modal-open="dialog-id">Open</button>
//   <button data-iai-modal-close>Close</button>
//
// Framework wrappers driving the modal from an `open` prop should call the
// exported open()/close() helpers rather than re-implementing this logic.

const MODULE = "iai-modal";
const INIT_FLAG = `data-${MODULE}-init`;
const SCROLL_LOCK_CLASS = "iai-modal-scroll-locked";

function unlockScroll() {
    document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
}

/**
 * Open a modal dialog.
 * @param {HTMLDialogElement} dialog
 */
export function open(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    dialog.focus();
    document.documentElement.classList.add(SCROLL_LOCK_CLASS);
}

/**
 * Close a modal dialog. Scroll-lock release happens in the dialog's `close`
 * event handler (see initModal), which also covers Esc. Native <dialog>
 * restores focus to the opener itself.
 * @param {HTMLDialogElement} dialog
 */
export function close(dialog) {
    if (!dialog || !dialog.open) return;
    dialog.close();
}

/**
 * Enhance a single dialog element. Idempotent.
 * @param {HTMLDialogElement} dialog
 */
export function initModal(dialog) {
    if (!dialog || dialog.hasAttribute(INIT_FLAG)) return;
    dialog.setAttribute(INIT_FLAG, "");

    dialog.addEventListener("click", (event) => {
        if (event.target.closest("[data-iai-modal-close]")) {
            close(dialog);
            return;
        }
        // A ::backdrop click reports the dialog as target but lands outside its
        // content rect.
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;
        if (outside) close(dialog);
    });

    // shortcut: unlocks unconditionally (one modal at a time); revisit if
    // stacked modals are ever supported.
    dialog.addEventListener("close", unlockScroll);
}

let triggersBound = false;

/**
 * Wire up every modal and its triggers on the page. Idempotent.
 */
export function initAllModals() {
    document
        .querySelectorAll(`dialog.iai-modal[data-module="${MODULE}"]`)
        .forEach(initModal);

    if (triggersBound) return;
    triggersBound = true;
    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-iai-modal-open]");
        if (!trigger) return;
        const dialog = document.getElementById(trigger.getAttribute("data-iai-modal-open"));
        if (dialog) {
            initModal(dialog);
            open(dialog);
        }
    });
}
