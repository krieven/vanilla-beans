export function attrToObj(attributes) {
    var result = {}
    for (var i = 0; i < attributes.length; i++) {
        var item = attributes[i]
        result[item.name.toLowerCase()] = item.value
    }
    return result
}