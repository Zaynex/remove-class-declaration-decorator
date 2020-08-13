import babelPluginSyntaxDecorators from 'babel-plugin-syntax-decorators';


export default function () {
    return {
        inherits: babelPluginSyntaxDecorators,
        visitor: {
            ClassDeclaration: function (path, {opts}) {
                if(!opts.ignoreItems || (Array.isArray(opts.ignoreItems) && opts.ignoreItems.length === 0)) {
                    path.node.decorators = null;
                } else {
                    const ignoreItems = Array.isArray(opts.ignoreItems) ? opts.ignoreItems : [opts.ignoreItems];
                    if(Array.isArray(path.node.decorators)) {
                        const result = path.node.decorators.some(decorator => {
                            return ignoreItems.includes(decorator.expression.name)
                        });
                        if(!result) {
                            path.node.decorators = null
                        }
                    }
                }
            }
        }
    }
}
