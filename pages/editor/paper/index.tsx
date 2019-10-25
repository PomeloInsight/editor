import * as React from "react";
import { Editor, EditorState } from "draft-js";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import Eventer, { Commands, Events } from "../events";

@autobind
class Paper extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
    };

    componentDidMount() {
        Eventer.subscribe(Events.ButtonClicked, (ev: Event) => {
            const type: Commands = (ev as any).detail.type;
            if (type === Commands.Bold) this.bold();
            if (type === Commands.UnderLine) this.underline();
            if (type === Commands.Italic) this.italic();
            if (type === Commands.Strike) this.strike();
        });
    }

    bold() {
        console.log("bold");
    }

    underline() {
        console.log("underline");
    }

    italic() {
        console.log("Italic");
    }

    strike() {
        console.log("Strike");
    }

    onChange(newEditorState: EditorState) {
        this.setState({
            editorState: newEditorState,
        });
    }

    render() {
        return (
            <div className={ css.paper }>
                <Editor editorState={ this.state.editorState } onChange={ this.onChange }/>
            </div>
        );
    }
}

export default Paper;