import * as React from "react";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import { Buttons, Expand, Group, Spacer } from "./items";

import Eventer, { Commands, Events } from "../events";

@autobind
class Toolbar extends React.Component {
    clicked(command: Commands) {
        Eventer.fire(Events.ButtonClicked, { "type": command });
    }

    render() {
        return (
            <div className={ css.toolbar }>
                <Group>
                    <Expand vertical={ true }>
                        { Buttons.PredefinedFormat.body(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h1(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h2(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h3(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h4(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h5(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.PredefinedFormat.h6(this.clicked.bind(this, Commands.Bold)) }
                    </Expand>

                    <Expand vertical={ true }>
                        { Buttons.FontList.default(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.NotoSans(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.NotoSansSC(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.NotoSerifSC(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.OpenSans(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.Roboto(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.Slabo(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.FontList.Ubuntu(this.clicked.bind(this, Commands.Bold)) }
                    </Expand>

                    { Buttons.Bold(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.Italic(this.clicked.bind(this, Commands.Italic)) }
                    { Buttons.UnderLine(this.clicked.bind(this, Commands.UnderLine)) }
                    { Buttons.Strike(this.clicked.bind(this, Commands.Strike)) }
                    { Buttons.Color(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.Link(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.RemoveFormat(this.clicked.bind(this, Commands.Bold)) }
                </Group>

                <Group>
                    <Expand>
                        { Buttons.AlignCenter(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.AlignRight(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.AlignLeft(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.AlignJustify(this.clicked.bind(this, Commands.Bold)) }
                    </Expand>
                </Group>

                <Group>
                    { Buttons.Indent(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.OutIndent(this.clicked.bind(this, Commands.Bold)) }
                </Group>

                <Group>
                    { Buttons.Ol(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.Ul(this.clicked.bind(this, Commands.Bold)) }
                </Group>

                <Group>
                    <Expand>
                        { Buttons.Quote(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Sub(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Sup(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Code(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Hr(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Table(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Image(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Column(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Toc(this.clicked.bind(this, Commands.Bold)) }
                        { Buttons.Math(this.clicked.bind(this, Commands.Bold)) }
                    </Expand>
                </Group>

                <Group>
                    { Buttons.Undo(this.clicked.bind(this, Commands.Bold)) }
                    { Buttons.Redo(this.clicked.bind(this, Commands.Bold)) }
                </Group>

                { Spacer }

                { Buttons.Search(this.clicked.bind(this, Commands.Bold)) }
                { Buttons.Help(this.clicked.bind(this, Commands.Bold)) }
            </div>
        );
    }
}

export default Toolbar;
