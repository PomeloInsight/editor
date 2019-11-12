import * as React from "react";
import { autobind } from "core-decorators";

import * as css from "./style.scss";
import { Buttons, Expand, Group, Spacer } from "./items";

import Eventer, { Events } from "../events";
import { Commands } from "../command";

interface IToolbarState {
    focusState: {
        [index: string]: boolean
    }
}

const defaultFocusState: { [index: string]: boolean } = {
    "Bold": false,
    "Italic": false,
    "UnderLine": false,
    "Strike": false,
};

@autobind
class Toolbar extends React.Component<any, IToolbarState> {
    state: IToolbarState = {
        focusState: Object.assign({}, defaultFocusState),
    };

    clicked(command: Commands) {
        Eventer.fire(Events.ButtonClicked, { "type": command });
    }

    componentDidMount() {
        Eventer.subscribe(Events.ButtonStateChange, ev => {
            const styles: string[] = (ev as any).detail;
            const newFocusState = Object.assign({}, defaultFocusState);
            styles.forEach(s => {
                newFocusState[s] = true;
            });
            this.setState({
                focusState: newFocusState,
            });
        });
    }

    render() {
        const { focusState } = this.state;
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

                    { Buttons.Bold(this.clicked.bind(this, Commands.Bold), focusState.Bold) }
                    { Buttons.Italic(this.clicked.bind(this, Commands.Italic), focusState.Italic) }
                    { Buttons.UnderLine(this.clicked.bind(this, Commands.UnderLine), focusState.UnderLine) }
                    { Buttons.Strike(this.clicked.bind(this, Commands.Strike), focusState.Strike) }
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
