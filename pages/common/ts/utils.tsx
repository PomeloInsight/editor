function cls(classMap: { [index: string]: boolean }) {
    return Object
        .entries(classMap)
        .filter(([_, show]) => show)
        .map(([className, _]) => className)
        .join(" ");
}

export { cls };