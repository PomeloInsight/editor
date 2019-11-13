import { EditorState, RichUtils } from "draft-js";

enum Commands {
    "Bold" = "Bold",
    "Italic" = "Italic",
    "UnderLine" = "UnderLine",
    "Strike" = "Strike",
    "FontSizeBody" = "FontSizeBody",
    "FontSizeH1" = "FontSizeH1",
    "FontSizeH2" = "FontSizeH2",
    "FontSizeH3" = "FontSizeH3",
    "FontSizeH4" = "FontSizeH4",
    "FontSizeH5" = "FontSizeH5",
    "FontSizeH6" = "FontSizeH6",
}

function applyCommand(command: Commands, editorState: EditorState): EditorState {
    switch (command) {
        case Commands.Bold:
            return bold(editorState);
        case Commands.Italic:
            return italic(editorState);
        case Commands.Strike:
            return strike(editorState);
        case Commands.UnderLine:
            return underline(editorState);
        case Commands.FontSizeBody:
            return fontsizeBody(editorState);
        case Commands.FontSizeH1:
            return fontsizeH1(editorState);
        case Commands.FontSizeH2:
            return fontsizeH2(editorState);
        case Commands.FontSizeH3:
            return fontsizeH3(editorState);
        case Commands.FontSizeH4:
            return fontsizeH4(editorState);
        case Commands.FontSizeH5:
            return fontsizeH5(editorState);
        case Commands.FontSizeH6:
            return fontsizeH6(editorState);
        default:
            return editorState;
    }
}

function bold(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, "Bold");
}

function italic(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, "Italic");
}

function underline(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, "UnderLine");
}

function strike(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, "Strike");
}

function fontsizeBody(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "paragraph");
}

function fontsizeH1(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-one");
}

function fontsizeH2(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-two");
}

function fontsizeH3(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-three");
}

function fontsizeH4(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-four");
}

function fontsizeH5(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-five");
}

function fontsizeH6(editorState: EditorState): EditorState {
    return RichUtils.toggleBlockType(editorState, "header-six");
}

export { Commands, applyCommand };
