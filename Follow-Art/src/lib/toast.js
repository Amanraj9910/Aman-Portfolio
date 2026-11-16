// Fire-and-forget status messages, rendered by <Toast />.
export const toast = (message) => {
    window.dispatchEvent(new CustomEvent('app:toast', { detail: message }));
};

export async function copyText(text, label = 'Copied') {
    try {
        await navigator.clipboard.writeText(text);
        toast(label);
        return true;
    } catch {
        toast('Copy failed, please select it manually');
        return false;
    }
}
