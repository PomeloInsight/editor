import * as React from "react";
import Head from "next/head";

import Toolbar from "./toolbar";

import * as css from "./index.scss";

class Editor extends React.Component {
    render() {
        return (
            <div className={ css.editorRoot }>
                <Head>
                    <title>Editor</title>
                </Head>
                <Toolbar/>
            </div>
        );
    }
}

export default Editor;
