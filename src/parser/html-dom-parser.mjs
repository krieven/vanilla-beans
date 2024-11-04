export default function (source) {
    var result = []
    var place = document.createElement('div')
    place.innerHTML = source
    place.childNodes && place.childNodes.forEach(function(i){
        if (i.nodeType === 1) result.push(i)
    })
    return result.length && result || source
}
