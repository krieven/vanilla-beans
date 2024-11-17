/**
 * Parse string HTML source into Array<Node> 
 * 
 * @param {{parseFromString: (source:string)=>{documentElement:{childNodes: NodeList}}}} parser 
 * 
 * @returns {{parse: (source:string) => Array<Element>|string}} 
 */
export default function parser(parser) {
    return {
        parse: function (source) {
            try {
                var doc = parser.parseFromString('<beans>' + source + '</beans>', 'text/html')
                var list = (doc && doc.documentElement && doc.documentElement.childNodes) || []
                var result = []
                for (var i = 0; i < list.length; i++) {
                    if (list[i].nodeType === 1) result.push(list[i])
                }
                return result.length && result || source
            } catch (e) {
                return source
            }
        }
    }
}

