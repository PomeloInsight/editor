import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { autobind } from "core-decorators";

import Palette from "./palette";
import LinkInput from "./linkInput";
import * as css from "./items.scss";
import { cls } from "../../common/ts/utils";

interface IToolBarItem {
    clicked: (event: React.PointerEvent<HTMLDivElement>) => void;
    focus: boolean;
    className?: string;
    notPrevent?: boolean;
}

@autobind
class ToolBarItem extends React.Component<IToolBarItem> {
    onClick(e: React.PointerEvent<HTMLDivElement>) {
        if (this.props.notPrevent !== true) {
            e.preventDefault();
            e.stopPropagation();
        }
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

interface IColorButton {
    icon: IconDefinition;
    onChange: (color: string) => void;
    focus: boolean;
}

@autobind
class ColorButton extends React.Component<IColorButton> {
    state = {
        showPalette: false,
    };

    paletteRoot = React.createRef<HTMLDivElement>();
    paletteWrap = React.createRef<HTMLDivElement>();

    componentDidMount() {
        document.body.addEventListener("click", (e: any) => {
            if (!e.isTrusted) return;
            const inPath = e.path.filter((x: any) => x === this.paletteWrap.current).length === 1;
            if (!inPath) {
                this.setState({
                    showPalette: false,
                });
            }
        });
    }

    onClicked(e: any) {
        e.preventDefault();
        e.stopPropagation();
        const inPath = e.nativeEvent.path.filter((x: any) => x === this.paletteRoot.current).length === 1;
        if (inPath) return;
        this.setState({
            showPalette: !this.state.showPalette,
        });
    }

    render() {
        const { onChange, focus, icon } = this.props;
        const { showPalette } = this.state;
        return (
            <ToolBarItem clicked={ this.onClicked } focus={ focus }>
                <div ref={ this.paletteWrap }>
                    <FontAwesomeIcon icon={ icon }/>
                    <div className={ cls({
                        [css.palette]: true,
                        [css.paletteExpand]: showPalette,
                    }) } ref={ this.paletteRoot }>
                        <Palette changed={ onChange }/>
                    </div>
                </div>
            </ToolBarItem>
        );
    }
}

const createColorButton = (icon: IconDefinition) =>
    (changed: (color: string) => void, focus: boolean = false) => (
        <ColorButton icon={ icon } onChange={ changed } focus={ focus }/>
    );

interface ILinkButton {
    icon: IconDefinition;
    onChange: (text: string, href: string) => void;
    focus: boolean;
}

@autobind
class LinkButton extends React.Component<ILinkButton, any> {
    linkWrapperRef = React.createRef<HTMLDivElement>();
    inputWrapperRef = React.createRef<HTMLDivElement>();

    state = {
        showInput: false,
        left: 0,
        top: 0,
    };

    componentDidMount() {
        document.body.addEventListener("click", (e: any) => {
            if (!e.isTrusted) return;
            const inPath = e.path.filter((x: any) => x === this.linkWrapperRef.current).length === 1;
            if (!inPath) {
                this.setState({
                    showInput: false,
                });
            }
        });
    }

    onClicked(e: any) {
        const target = e.nativeEvent.target;
        if (this.inputWrapperRef.current && this.inputWrapperRef.current.contains(target)) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return;

        const rect = range.getBoundingClientRect();

        this.setState({
            showInput: true,
            left: rect.left,
            top: rect.top + 35,
        });
    }

    render() {
        const { focus, icon } = this.props;
        const { showInput, left, top } = this.state;
        return (
            <ToolBarItem clicked={ this.onClicked } focus={ focus } notPrevent={ true }>
                <div ref={ this.linkWrapperRef }>
                    <FontAwesomeIcon icon={ icon }/>
                    {
                        showInput ?
                            <div ref={ this.inputWrapperRef }>
                                <LinkInput left={ left } top={ top } onLinkUpdated={ this.props.onChange }/>
                            </div> :
                            null
                    }
                </div>
            </ToolBarItem>
        );
    }
}

const createLinkButton = (icon: IconDefinition) =>
    (changed: (text: string, href: string) => void, focus: boolean = false) => (
        <LinkButton icon={ icon } onChange={ changed } focus={ focus }/>
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
    Link: createLinkButton(fa.faLink),
    Italic: SimpleButton(fa.faItalic),
    Search: SimpleButton(fa.faSearch),
    TextColor: createColorButton(fa.faPaintBrush),
    BgColor: createColorButton(fa.faFill),
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
