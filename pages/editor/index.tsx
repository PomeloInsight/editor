import * as React from "react";

import Toolbar from "./toolbar";

import * as css from "./index.scss";

class Editor extends React.Component {
    render() {
        return (
            <div className={ css.editorRoot }>
                <Toolbar/>
            </div>
        );
    }
}

export default Editor;
