import { EditorState } from "draft-js";

enum Commands {
    "Bold" = "Bold",
    "Italic" = "Italic",
    "UnderLine" = "UnderLine",
    "Strike" = "Strike"
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
        default:
            return editorState;
    }
}

function bold(editorState: EditorState): EditorState {
    return editorState;
}

function italic(editorState: EditorState): EditorState {
    return editorState;
}

function underline(editorState: EditorState): EditorState {
    return editorState;
}

function strike(editorState: EditorState): EditorState {
    return editorState;
}

export { Commands, applyCommand };
