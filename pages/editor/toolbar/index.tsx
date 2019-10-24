import * as React from "react";

import * as css from "./style.scss";
import * as ToolbarItem from "./items";

class Toolbar extends React.Component {
    render() {
        return (
            <div className={ css.toolbar }>
                <ToolbarItem.Group>
                    { ToolbarItem.Buttons.PredefinedFormat }
                    { ToolbarItem.Buttons.FontList }
                    { ToolbarItem.Buttons.Bold }
                    { ToolbarItem.Buttons.Italic }
                    { ToolbarItem.Buttons.UnderLine }
                    { ToolbarItem.Buttons.Strike }
                    { ToolbarItem.Buttons.Color }
                    { ToolbarItem.Buttons.Link }
                    { ToolbarItem.Buttons.RemoveFormat }
                </ToolbarItem.Group>

                <ToolbarItem.Group>
                    <ToolbarItem.Expand>
                        { ToolbarItem.Buttons.AlignCenter }
                        { ToolbarItem.Buttons.AlignRight }
                        { ToolbarItem.Buttons.AlignLeft }
                        { ToolbarItem.Buttons.AlignJustify }
                    </ToolbarItem.Expand>
                </ToolbarItem.Group>

                <ToolbarItem.Group>
                    { ToolbarItem.Buttons.Indent }
                    { ToolbarItem.Buttons.OutIndent }
                </ToolbarItem.Group>

                <ToolbarItem.Group>
                    { ToolbarItem.Buttons.Ol }
                    { ToolbarItem.Buttons.Ul }
                </ToolbarItem.Group>

                <ToolbarItem.Group>
                    <ToolbarItem.Expand>
                        { ToolbarItem.Buttons.Quote }
                        { ToolbarItem.Buttons.Sub }
                        { ToolbarItem.Buttons.Sup }
                        { ToolbarItem.Buttons.Code }
                        { ToolbarItem.Buttons.Hr }
                        { ToolbarItem.Buttons.Table }
                        { ToolbarItem.Buttons.Image }
                        { ToolbarItem.Buttons.Column }
                        { ToolbarItem.Buttons.Toc }
                        { ToolbarItem.Buttons.Math }
                    </ToolbarItem.Expand>
                </ToolbarItem.Group>

                <ToolbarItem.Group>
                    { ToolbarItem.Buttons.Undo }
                    { ToolbarItem.Buttons.Redo }
                </ToolbarItem.Group>

                { ToolbarItem.Spacer }

                { ToolbarItem.Buttons.Search }
                { ToolbarItem.Buttons.Help }
            </div>
        );
    }
}

export default Toolbar;
