import * as React from "react";
import * as css from "./palette.scss";
import { autobind } from "core-decorators";

const Colors = [
    "#c0392b",
    "#e74c3c",
    "#d35400",
    "#e67e22",
    "#f39c12",
    "#f1c40f",
    "#2980b9",
    "#3498db",
    "#16a085",
    "#1abc9c",
    "#27ae60",
    "#2ecc71",
    "#8e44ad",
    "#9b59b6",
    "#24292e",
    "#2c3e50",
    "#34495e",
    "#ecf0f1",
    "#95a5a6",
    "#bdc3c7",
    "#7f8c8d",
];

interface IPalette {
    changed: (color: string) => void;
}

@autobind
class Palette extends React.Component<IPalette> {
    render() {
        return (
            <div className={ css.palette }>
                { Colors.map(x =>
                    <div className={ css.color }
                         key={ x }
                         style={ { backgroundColor: x } }
                         onClick={ this.props.changed.bind(this, x) }
                    />,
                ) }
            </div>
        );
    }
}

export default Palette;