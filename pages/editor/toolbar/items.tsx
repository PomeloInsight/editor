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
    className?: string;
}

@autobind
class ToolBarItem extends React.Component<IToolBarItem> {
    onClick(e: React.PointerEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        this.props.clicked(e);
        document.body.click();
    }

    render() {
        const { focus, className = "" } = this.props;
        return (
            <div className={ cls({ [css.item]: true, [css.itemFocus]: focus, [className]: true }) }
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
        const hasChildFocus = others.filter((x: any) => x && x.props && x.props.focus).length !== 0;
        return (
            <div
                className={ cls({
                    [css.expand]: true,
                    [css.expandShow]: showOthers,
                    [css.expandVertical]: this.props.vertical === true,
                    [css.expandGrid]: this.props.grid === true,
                    [css.expandHasChild]: hasChildFocus,
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
    (content: IconDefinition | String, isText = false, className = "") =>
        (clicked: (event: React.PointerEvent<HTMLDivElement>) => void, focus: boolean = false) => (
            <ToolBarItem clicked={ clicked } focus={ focus } className={ className }>
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
        body: SimpleButton("正文", true, css.btnBody),
        h1: SimpleButton("一级标题", true, css.btnH1),
        h2: SimpleButton("二级标题", true, css.btnH2),
        h3: SimpleButton("三级标题", true, css.btnH3),
        h4: SimpleButton("四级标题", true, css.btnH4),
        h5: SimpleButton("五级标题", true, css.btnH5),
        h6: SimpleButton("六级标题", true, css.btnH6),
    },
    FontList: {
        default: SimpleButton("Default", true, css.btnFontDefault),
        NotoSansSC: SimpleButton("Noto Sans SC", true, css.btnFontNotosanssc),
        NotoSerifSC: SimpleButton("Noto Serif SC", true, css.btnFontNotoserifsc),
        Ubuntu: SimpleButton("Ubuntu Mono", true, css.btnFontUbuntu),
        Slabo: SimpleButton("Slabo", true, css.btnFontSlabo),
    },
};

export { Buttons, Spacer, Expand, Group };
