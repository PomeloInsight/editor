import { EditorState, Modifier, RichUtils } from "draft-js";

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
    "FontFamilyDefault" = "FontFamilyDefault",
    "FontFamilySlabo" = "FontFamilySlabo",
    "FontFamilyUbuntuMono" = "FontFamilyUbuntuMono",
    "FontFamilyNotoSerifSC" = "FontFamilyNotoSerifSC",
    "FontFamilyNotoSansSC" = "FontFamilyNotoSansSC",
    "TextColor" = "TextColor",
    "BackGroundColor" = "BackGroundColor",
    "Link" = "Link",
}

function applyCommand(command: Commands, others: any, editorState: EditorState): EditorState {
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
        case Commands.FontFamilyDefault:
            return clearFontFamily(editorState);
        case Commands.FontFamilyNotoSansSC:
            return fontFamilyNotoSansSC(editorState);
        case Commands.FontFamilyNotoSerifSC:
            return fontFamilyNotoSerifSC(editorState);
        case Commands.FontFamilySlabo:
            return fontFamilySlabo(editorState);
        case Commands.FontFamilyUbuntuMono:
            return fontFamilyUbuntuMono(editorState);
        case Commands.TextColor:
            return textColor(others, editorState);
        case Commands.BackGroundColor:
            return backgroundColor(others, editorState);
        case Commands.Link:
            return link(editorState);
        default:
            return editorState;
    }
}

function link(editorState: EditorState): EditorState {
    return editorState;
}

function textColor(others: any, editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, `TextColor${ others.color }`);
}

function backgroundColor(others: any, editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(editorState, `BackGroundColor${ others.color }`);
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

function removeInlineStyles(editorState: EditorState, inlineStyles: string[]) {
    const selection = editorState.getSelection();
    const nextContentState = inlineStyles.reduce((contentState, style) => Modifier.removeInlineStyle(
        contentState,
        selection,
        style,
    ), editorState.getCurrentContent());

    return EditorState.push(
        editorState,
        nextContentState,
        "change-inline-style",
    );
}

function clearFontFamily(editorState: EditorState): EditorState {
    return removeInlineStyles(editorState, ["FontSlabo", "FontUbuntuMono", "FontNotoSerifSC", "FontNotoSansSC"]);
}

function fontFamilySlabo(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(clearFontFamily(editorState), "FontSlabo");
}

function fontFamilyUbuntuMono(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(clearFontFamily(editorState), "FontUbuntuMono");
}

function fontFamilyNotoSerifSC(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(clearFontFamily(editorState), "FontNotoSerifSC");
}

function fontFamilyNotoSansSC(editorState: EditorState): EditorState {
    return RichUtils.toggleInlineStyle(clearFontFamily(editorState), "FontNotoSansSC");
}

export { Commands, applyCommand };
