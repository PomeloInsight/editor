module.exports = (ctx) => {
    return {
        plugins: {
            autoprefixer: {
                ...ctx.options.autoprefixer,
                flexbox: "no-2009",
                grid: "true",
            },
        },
    };
};