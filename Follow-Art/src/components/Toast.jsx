import React, { useEffect, useState } from 'react';

const Toast = () => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        let timer;
        const onToast = (e) => {
            setMessage(e.detail);
            clearTimeout(timer);
            timer = setTimeout(() => setMessage(null), 2200);
        };
        window.addEventListener('app:toast', onToast);
        return () => {
            window.removeEventListener('app:toast', onToast);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`toast ${message ? 'is-on' : ''}`} role="status" aria-live="polite">
            {message}
        </div>
    );
};

export default Toast;
