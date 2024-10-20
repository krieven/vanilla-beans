export default {

    resolve: function (current, nextPart) {
        nextPart = nextPart || ''
        if (nextPart.substr(0) === '/') return this.normalize(nextPart)
        current = nextPart ? this.dirname(current) : current
        return this.normalize(current + nextPart)
    },

    dirname: function (path) {
        var res = path.split('?')[0].split('/');
        res[res.length - 1] = '';
        return res.join('/');
    },

    normalize: function (path) {
        var parts = path.split('/');
        var res = [parts[0]];
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            if (part == '.' || part === '') {
                continue;
            }
            if (part == '..') {
                parts[i - 1] = parts[i] = '.';
                res.pop();
                i -= 2;
                continue;
            }
            res.push(part);
        }
        return res.join('/');
    }
}

