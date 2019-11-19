import * as React from "react";
import { DraftInlineStyle, DraftStyleMap, Editor, EditorState } from "draft-js";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import Eventer, { Events } from "../events";
import { applyCommand, Commands } from "../command";

const customStyleMap = {
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
    "FontSlabo": {
        fontFamily: "Slabo",
    },
    "FontUbuntuMono": {
        fontFamily: "Ubuntu Mono",
    },
    "FontNotoSerifSC": {
        fontFamily: "Noto Serif SC",
    },
    "FontNotoSansSC": {
        fontFamily: "Noto Sans SC",
    },
};


const customStyleFn = (style: DraftInlineStyle) => {
    const styleMap: { [index: string]: string } = {};
    style.forEach(styleName => {
        if (styleName && styleName.startsWith("TextColor")) {
            styleMap["color"] = styleName.replace("TextColor", "");
        }
        if (styleName && styleName.startsWith("BackGroundColor")) {
            styleMap["backgroundColor"] = styleName.replace("BackGroundColor", "");
        }
    });
    return styleMap as DraftStyleMap;
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
            const others = {
                color: (ev as any).detail.color,
            };
            const newEditorState = applyCommand(type, others, this.state.editorState);
            this.onChange(newEditorState);
        });

        this.setState({
            showEditor: true,
        });
    }

    updateButtonState() {
        const selectionState = this.state.editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContent = this.state.editorState.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);

        const blockType = currentContentBlock.getType();

        let buttonStates: string[] = this.state.editorState.getCurrentInlineStyle().toJS();
        buttonStates.push(blockType);

        buttonStates = buttonStates.map(x => {
            if (x.startsWith("TextColor")) return "TextColor";
            if (x.startsWith("BackGroundColor")) return "BackGroundColor";
            return x;
        });

        Eventer.fire(Events.ButtonStateChange, buttonStates);
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
                            customStyleMap={ customStyleMap }
                            customStyleFn={ customStyleFn }
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