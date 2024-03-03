import React, { useEffect, useState } from "react";

const DelaiRender = ({ children }) => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        async function delayComponent() {
            await new Promise((resolve) => setTimeout(resolve, 1));
            setShowComponent(true);
        }

        delayComponent();
    }, []);

    return showComponent ? <>{children}</> : null;
};

export default DelaiRender;
