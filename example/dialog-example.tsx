import * as React from "react";
import { Dialog, Content, Button } from "../dist";

interface Props {
    theme: string;
    onClose: () => void;
}

export const DialogExample = Dialog<Props>(({ theme, onClose }) => {
    return (
        <>
            <Content style={{ paddingBottom: 0 }}>
                <p>Dialog content</p>
            </Content>
            <Content style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button color={theme} onClick={onClose}>
                    Close
                </Button>
            </Content>
        </>
    );
});
