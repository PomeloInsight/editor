import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { autobind } from "core-decorators";

import * as css from "./items.scss";
import { cls } from "../../common/ts/utils";

interface IToolBarItem {
    clicked: (event: React.PointerEvent<HTMLDivElement>) => void
}

class ToolBarItem extends React.Component<IToolBarItem> {
    render() {
        const { clicked } = this.props;
        return (
            <div className={ css.item } onPointerDown={ clicked }>
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
        (clicked: (event: React.PointerEvent<HTMLDivElement>) => void) => (
            <ToolBarItem clicked={ clicked }>
                { isText ?
                    `${ content }` :
                    <FontAwesomeIcon icon={ content as IconDefinition }/>
                }
            </ToolBarItem>
        );

const PredefinedFormat = {
    body: SimpleButton("正文", true),
    h1: SimpleButton("一级标题", true),
    h2: SimpleButton("二级标题", true),
    h3: SimpleButton("三级标题", true),
    h4: SimpleButton("四级标题", true),
    h5: SimpleButton("五级标题", true),
    h6: SimpleButton("六级标题", true),
};

const FontList = {
    default: SimpleButton("Default", true),
    NotoSansSC: SimpleButton("Noto Sans SC", true),
    NotoSerifSC: SimpleButton("Noto Serif SC", true),
    Roboto: SimpleButton("Roboto", true),
    OpenSans: SimpleButton("Open Sans", true),
    NotoSans: SimpleButton("Noto Sans", true),
    Ubuntu: SimpleButton("Ubuntu", true),
    Slabo: SimpleButton("Slabo", true),
};

const Bold = SimpleButton(fa.faBold);
const AlignLeft = SimpleButton(fa.faAlignLeft);
const AlignCenter = SimpleButton(fa.faAlignCenter);
const AlignRight = SimpleButton(fa.faAlignRight);
const AlignJustify = SimpleButton(fa.faAlignJustify);
const Table = SimpleButton(fa.faTable);
const Ol = SimpleButton(fa.faListOl);
const Ul = SimpleButton(fa.faListUl);
const Indent = SimpleButton(fa.faIndent);
const OutIndent = SimpleButton(fa.faOutdent);
const Undo = SimpleButton(fa.faUndo);
const Redo = SimpleButton(fa.faRedo);
const Quote = SimpleButton(fa.faQuoteLeft);
const Strike = SimpleButton(fa.faStrikethrough);
const Sub = SimpleButton(fa.faSubscript);
const Sup = SimpleButton(fa.faSuperscript);
const UnderLine = SimpleButton(fa.faUnderline);
const Link = SimpleButton(fa.faLink);
const Italic = SimpleButton(fa.faItalic);
const Search = SimpleButton(fa.faSearch);
const Color = SimpleButton(fa.faEyeDropper);
const Image = SimpleButton(fa.faImage);
const Save = SimpleButton(fa.faSave);
const Code = SimpleButton(fa.faCode);
const Column = SimpleButton(fa.faColumns);
const Hr = SimpleButton(fa.faMinus);
const RemoveFormat = SimpleButton(fa.faRemoveFormat);
const Toc = SimpleButton(fa.faSitemap);
const Help = SimpleButton(fa.faQuestion);
const Math = SimpleButton(fa.faSquareRootAlt);

const Buttons = {
    Bold,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Table,
    Ol,
    Ul,
    Indent,
    OutIndent,
    Undo,
    Redo,
    Quote,
    Strike,
    Sub,
    Sup,
    UnderLine,
    Link,
    Italic,
    Search,
    Color,
    Image,
    Save,
    Code,
    Column,
    Hr,
    RemoveFormat,
    Toc,
    Help,
    PredefinedFormat,
    FontList,
    Math,
};

export { Buttons, Spacer, Expand, Group };
