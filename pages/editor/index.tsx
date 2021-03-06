import * as React from "react";
import Head from "next/head";

import Toolbar from "./toolbar";
import StatusBar from "./statusbar";
import Paper from "./paper";

import * as css from "./style.scss";

class Editor extends React.Component {
    render() {
        return (
            <div className={ css.editorRoot }>
                <Head>
                    <title>Editor</title>
                </Head>
                <StatusBar/>
                <Toolbar/>
                <Paper/>
            </div>
        );
    }
}

export default Editor;
