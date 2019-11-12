import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { autobind } from "core-decorators";

import * as css from "./items.scss";
import { cls } from "../../common/ts/utils";

interface IToolBarItem {
    clicked: (event: React.PointerEvent<HTMLDivElement>) => void;
    focus: boolean;
}

@autobind
class ToolBarItem extends React.Component<IToolBarItem> {
    onClick(e: React.PointerEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.clicked(e);
    }

    render() {
        const { focus } = this.props;
        return (
            <div className={ cls({ [css.item]: true, [css.itemFocus]: focus }) }
                 onPointerDown={ this.onClick }
            >
                { this.props.children }
            </div>
        );
    }
}

interface IExpand {
    vertical?: boolean;
    grid?: boolean;
}

@autobind
class Expand extends React.Component<IExpand> {
    state = {
        showOthers: false,
    };

    expandRoot = React.createRef<HTMLDivElement>();

    componentDidMount() {
        document.body.addEventListener("click", (e: any) => {
            const inPath = e.path.filter((x: any) => x === this.expandRoot.current).length === 1;
            if (!inPath) {
                this.setState({
                    showOthers: false,
                });
            }
        });
    }

    onClick() {
        this.setState({
            showOthers: !this.state.showOthers,
        });
    }

    render() {
        const [first, ...others] = React.Children.map(this.props.children, x => x);
        const { showOthers } = this.state;
        return (
            <div
                className={ cls({
                    [css.expand]: true,
                    [css.expandShow]: showOthers,
                    [css.expandVertical]: this.props.vertical === true,
                    [css.expandGrid]: this.props.grid === true,
                }) }
                ref={ this.expandRoot }
            >
                <div className={ css.first }>
                    { first }
                    <div className={ css.more } onClick={ this.onClick }>
                        <FontAwesomeIcon icon={ fa.faChevronDown } size="xs"/>
                    </div>
                </div>
                <div className={ css.others }>
                    { others }
                </div>
            </div>
        );
    }
}

class Group extends React.Component {
    render() {
        return (
            <div className={ css.group }>
                { this.props.children }
            </div>
        );
    }
}

const Spacer = <div className={ css.spacer }/>;

const SimpleButton =
    (content: IconDefinition | String, isText = false) =>
        (clicked: (event: React.PointerEvent<HTMLDivElement>) => void, focus: boolean = false) => (
            <ToolBarItem clicked={ clicked } focus={ focus }>
                { isText ?
                    `${ content }` :
                    <FontAwesomeIcon icon={ content as IconDefinition }/>
                }
            </ToolBarItem>
        );

const Buttons = {
    Bold: SimpleButton(fa.faBold),
    AlignLeft: SimpleButton(fa.faAlignLeft),
    AlignCenter: SimpleButton(fa.faAlignCenter),
    AlignRight: SimpleButton(fa.faAlignRight),
    AlignJustify: SimpleButton(fa.faAlignJustify),
    Table: SimpleButton(fa.faTable),
    Ol: SimpleButton(fa.faListOl),
    Ul: SimpleButton(fa.faListUl),
    Indent: SimpleButton(fa.faIndent),
    OutIndent: SimpleButton(fa.faOutdent),
    Undo: SimpleButton(fa.faUndo),
    Redo: SimpleButton(fa.faRedo),
    Quote: SimpleButton(fa.faQuoteLeft),
    Strike: SimpleButton(fa.faStrikethrough),
    Sub: SimpleButton(fa.faSubscript),
    Sup: SimpleButton(fa.faSuperscript),
    UnderLine: SimpleButton(fa.faUnderline),
    Link: SimpleButton(fa.faLink),
    Italic: SimpleButton(fa.faItalic),
    Search: SimpleButton(fa.faSearch),
    Color: SimpleButton(fa.faEyeDropper),
    Image: SimpleButton(fa.faImage),
    Save: SimpleButton(fa.faSave),
    Code: SimpleButton(fa.faCode),
    Column: SimpleButton(fa.faColumns),
    Hr: SimpleButton(fa.faMinus),
    RemoveFormat: SimpleButton(fa.faRemoveFormat),
    Toc: SimpleButton(fa.faSitemap),
    Help: SimpleButton(fa.faQuestion),
    Math: SimpleButton(fa.faSquareRootAlt),
    PredefinedFormat: {
        body: SimpleButton("正文", true),
        h1: SimpleButton("一级标题", true),
        h2: SimpleButton("二级标题", true),
        h3: SimpleButton("三级标题", true),
        h4: SimpleButton("四级标题", true),
        h5: SimpleButton("五级标题", true),
        h6: SimpleButton("六级标题", true),
    },
    FontList: {
        default: SimpleButton("Default", true),
        NotoSansSC: SimpleButton("Noto Sans SC", true),
        NotoSerifSC: SimpleButton("Noto Serif SC", true),
        Roboto: SimpleButton("Roboto", true),
        OpenSans: SimpleButton("Open Sans", true),
        NotoSans: SimpleButton("Noto Sans", true),
        Ubuntu: SimpleButton("Ubuntu", true),
        Slabo: SimpleButton("Slabo", true),
    },
};

export { Buttons, Spacer, Expand, Group };
