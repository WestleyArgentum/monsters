(function() {
    var root = this;

    var Engine = root.Engine = {
        entities: [],
        namedEntities: {},
        levels: {},
        level: null
    }

    Engine.clear = function() {
        Engine.entities = [];
        Engine.namedEntities = {};
        Engine.level = null;
    }

    Engine.addEntity = function(entity, name) {
        Engine.entities.push(entity);
        if (name) {
            Engine.namedEntities[name] = entity;
        }
    }

    Engine.getEntity = function(name) {
        return Engine.namedEntities[name];
    }

    Engine.addLevel = function(name, fn) {
        Engine.levels[name] = fn;
    }

    Engine.loadLevel = function(two, name) {
        var level = Engine.levels[name];
        if (level != null) {
            Engine.clear();
            two.clear();

            Engine.level = new level(two);
        }
    }

})();
