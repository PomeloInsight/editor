import * as React from "react";
import { Editor, EditorState } from "draft-js";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import Eventer, { Events } from "../events";
import { applyCommand, Commands } from "../command";

const InlineStyleMap = {
    "STRIKE": {
        textDecoration: "line-through",
    },
};

@autobind
class Paper extends React.Component {
    editor = React.createRef<Editor>();

    state = {
        editorState: EditorState.createEmpty(),
        showEditor: false,
    };

    componentDidMount() {
        Eventer.subscribe(Events.ButtonClicked, (ev: Event) => {
            const type: Commands = (ev as any).detail.type;
            const newEditorState = applyCommand(type, this.state.editorState);
            this.setState({
                editorState: newEditorState,
            });
        });

        this.setState({
            showEditor: true,
        });
    }

    onChange(newEditorState: EditorState) {
        this.setState({
            editorState: newEditorState,
        });
    }

    render() {
        const { showEditor } = this.state;
        return (
            <div className={ css.paper }>
                {
                    showEditor ?
                        <Editor
                            customStyleMap={ InlineStyleMap }
                            placeholder={ "Just Typing Someing..." }
                            editorState={ this.state.editorState }
                            onChange={ this.onChange }
                            onBlur={ () => {
                                console.log("blur");
                            } }
                            onFocus={ () => {
                                console.log("focus");
                            } }
                            ref={ this.editor }
                        /> : null
                }
            </div>
        );
    }
}

export default Paper;