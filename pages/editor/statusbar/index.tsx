import * as React from "react";

import Logo from "./logo";

import * as css from "./style.scss";

class StatusBar extends React.Component {
    render() {
        return (
            <div className={ css.statusBar }>
                { Logo }
            </div>
        );
    }
}

export default StatusBar;