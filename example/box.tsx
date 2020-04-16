import * as React from 'react';

interface Props {
    id: string;
}

export const Box: React.FC<Props> = ({id, children}) => {

    return <>
        <div id={id} className="offset" />
        <div className="box">
            {children}
        </div>
    </>;
};
