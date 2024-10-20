export default {
    parseFromString: (source) => {
        var place = document.createElement('div')
        place.innerHTML = source
        return {
            documentElement: place.children[0]
        }
    }
}