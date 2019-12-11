import React, { ChangeEvent, Component } from "react";
import { autobind } from "core-decorators";

import css from "./linkInput.scss";

interface ILinkInput {
    left: number;
    top: number;
    onLinkUpdated: (text: string, href: string) => void;
}

@autobind
class LinkInput extends Component<ILinkInput> {
    state = {
        text: "",
        href: "",
    };

    onChanged(type: string, e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            [type]: e.target.value,
        }, () => {
            this.props.onLinkUpdated(this.state.text, this.state.href);
        });
    }

    render() {
        const { left, top } = this.props;
        return (
            <div style={ { left: `${ left }px`, top: `${ top }px` } } className={ css.linkInput }>
                <div className={ css.container }>
                    <div className={ css.inputArea }>
                        <input type="text" placeholder="文本" value={ this.state.text }
                               onChange={ this.onChanged.bind(this, "text") }/>
                        <input type="text" placeholder="链接" value={ this.state.href }
                               onChange={ this.onChanged.bind(this, "href") }/>
                    </div>
                    <button className={ css.confirm }>确定</button>
                </div>
            </div>
        );
    }
}

export default LinkInput;