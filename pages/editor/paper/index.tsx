import * as React from "react";
import { Editor, EditorState } from "draft-js";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import Eventer, { Events } from "../events";
import { applyCommand, Commands } from "../command";

const InlineStyleMap = {
    "Strike": {
        textDecoration: "line-through",
    },
    "Bold": {
        fontWeight: 700,
    },
    "Italic": {
        fontStyle: "italic",
    },
    "UnderLine": {
        textDecoration: "underline",
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
            this.onChange(newEditorState);
        });

        this.setState({
            showEditor: true,
        });
    }

    updateButtonState() {
        const selectionState = this.state.editorState.getSelection();
        const currentContent = this.state.editorState.getCurrentContent();
        const anchorKey = selectionState.getAnchorKey();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);

        let start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        start = start === end ? start - 1 : start;

        const styleList: string[] = currentContentBlock
            .getCharacterList()
            .slice(start, end)
            .map(t => t && t.getStyle())
            .toJS()
            .filter((x: any) => x)
            .reduce((acc: string[], cur: string) => acc.concat(cur), []);

        Eventer.fire(Events.ButtonStateChange, Array.from(new Set(styleList)));
    }

    onChange(newEditorState: EditorState) {
        this.setState({
            editorState: newEditorState,
        }, () => {
            this.updateButtonState();
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
                            ref={ this.editor }
                        /> : null
                }
            </div>
        );
    }
}

export default Paper;