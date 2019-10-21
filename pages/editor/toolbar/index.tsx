import * as React from "react";

import * as css from "./style.scss";
import * as ToolbarItem from "./items";

class Toolbar extends React.Component {
    render() {
        return (
            <div className={ css.toolbar }>
                { ToolbarItem.AlignRight }
                { ToolbarItem.Link }
                { ToolbarItem.AlignCenter }
                { ToolbarItem.AlignLeft }
                { ToolbarItem.Bold }
                { ToolbarItem.Font }
                { ToolbarItem.Indent }
                { ToolbarItem.Italic }
                { ToolbarItem.Ol }
                { ToolbarItem.OutIndent }
                { ToolbarItem.Quote }
                { ToolbarItem.Redo }
                { ToolbarItem.Strike }
                { ToolbarItem.Sub }
                { ToolbarItem.Sup }
                { ToolbarItem.Table }
                { ToolbarItem.Ul }
                { ToolbarItem.Undo }
                { ToolbarItem.UnderLine }
                { ToolbarItem.Trash }
                { ToolbarItem.Search }
                { ToolbarItem.Color }
                { ToolbarItem.Image }
            </div>
        );
    }
}

export default Toolbar;
