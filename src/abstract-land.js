(function (){
    var root = this;

    var AbstractLand = root.AbstractLand = function(two) {
        var land = two.makeRectangle(two.width / 2.0, two.height / 2.0, two.width, two.height);
        land.fill = 'pink';
    }

    AbstractLand.prototype.update = function() {
    }

})();