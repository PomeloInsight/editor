import * as React from "react";
import { Editor, EditorState } from "draft-js";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import Eventer, { Events } from "../events";
import { applyCommand, Commands } from "../command";

@autobind
class Paper extends React.Component {
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
                    showEditor ? <Editor editorState={ this.state.editorState } onChange={ this.onChange }/> : null
                }
            </div>
        );
    }
}

export default Paper;