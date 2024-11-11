
module.exports = {} 

module.exports['setAttributes'] = function setAttributes(on, attributes) {
    Object.keys(attributes).forEach(function(key){
        on.setAttribute(key, attributes[key])
    })
}
