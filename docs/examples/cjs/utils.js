
module.exports = {setAttributes: function(on, attributes) {
    Object.keys(attributes).forEach(function(key){
        on.setAttribute(key, attributes[key])
    })
}}
