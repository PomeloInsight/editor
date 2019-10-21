import * as React from "react";

import * as css from "./items.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";


class ToolBarItem extends React.Component {
    render() {
        return (
            <div className={ css.item }>
                { this.props.children }
            </div>
        );
    }
}

const SimpleButton = (icon: IconDefinition) => (
    <ToolBarItem>
        <FontAwesomeIcon icon={ icon }/>
    </ToolBarItem>
);

export const Bold = SimpleButton(fa.faBold);
export const AlignLeft = SimpleButton(fa.faAlignLeft);
export const AlignCenter = SimpleButton(fa.faAlignCenter);
export const AlignRight = SimpleButton(fa.faAlignRight);
export const Table = SimpleButton(fa.faTable);
export const Font = SimpleButton(fa.faFont);
export const Ol = SimpleButton(fa.faListOl);
export const Ul = SimpleButton(fa.faListUl);
export const Indent = SimpleButton(fa.faIndent);
export const OutIndent = SimpleButton(fa.faOutdent);
export const Undo = SimpleButton(fa.faUndo);
export const Redo = SimpleButton(fa.faRedo);
export const Quote = SimpleButton(fa.faQuoteLeft);
export const Strike = SimpleButton(fa.faStrikethrough);
export const Sub = SimpleButton(fa.faSubscript);
export const Sup = SimpleButton(fa.faSuperscript);
export const UnderLine = SimpleButton(fa.faUnderline);
export const Link = SimpleButton(fa.faLink);
export const Trash = SimpleButton(fa.faTrashAlt);
export const Italic = SimpleButton(fa.faItalic);
export const Search = SimpleButton(fa.faSearch);
export const Color = SimpleButton(fa.faEyeDropper);
export const Image = SimpleButton(fa.faImage);