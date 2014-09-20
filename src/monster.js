(function () {
    var root = this;

    var MONSTER_MORPH_EPSILON = 0.02,
        MONSTER_MORPH_RATE = 0.0125;
        MONSTER_BASE_SIZE = 200,
        MONSTER_BASE_EYE_OUTER = 24,
        MONSTER_BASE_EYE_INNER = 13,
        MONSTER_EYE_WANDER_SPEED = 0.125,
        MONSTER_EYE_WANDER_RANGE = 7,
        MONSTER_EYE_WANDER_CHANCE = 0.009;

    var Monster = root.Monster = function(two, x, y) {
        this.blob = two.makeCircle(0, 0, MONSTER_BASE_SIZE);
        this.blob.fill = 'purple';
        this.blob.noStroke();
        randBodyDestinations(this.blob);

        this.rightEye = createEye(two, 30, 0);
        this.leftEye = createEye(two, -30, 0);

        this.whole = two.makeGroup(this.blob, this.rightEye, this.leftEye);
        this.whole.translation.set(x, y);

        this.rightEye.destination = new Two.Vector();
        this.leftEye.destination = new Two.Vector();
    }

    Monster.prototype.update = function(time) {
        for (var i = 0; i < this.blob.vertices.length; i++) {
            var v = this.blob.vertices[i];
            var d = v.destination;

            if (v.distanceTo(d) < MONSTER_MORPH_EPSILON) {
                v.destination = randBodyDestination(this.blob, i);
                continue;
            }

            v.x += (d.x - v.x) * MONSTER_MORPH_RATE;
            v.y += (d.y - v.y) * MONSTER_MORPH_RATE;
        }

        if (Math.random() < MONSTER_EYE_WANDER_CHANCE) {
            randEyeDestination(this);
        }

        updateEyes(this);
    }

    // *******

    function randEyeDestination(monster) {
        var dest = new Two.Vector(Math.random() * MONSTER_EYE_WANDER_RANGE, Math.random() * MONSTER_EYE_WANDER_RANGE);
        monster.rightEye.destination = dest;
        monster.leftEye.destination = dest;
    }

    function updateEyes(monster) {
        var eyePos = monster.rightEye.inner.translation,
            eyeDest = monster.rightEye.destination;

        monster.rightEye.inner.translation.x += (eyeDest.x - eyePos.x) * MONSTER_EYE_WANDER_SPEED;
        monster.rightEye.inner.translation.y += (eyeDest.y - eyePos.y) * MONSTER_EYE_WANDER_SPEED;

        eyePos = monster.leftEye.inner.translation;
        eyeDest = monster.leftEye.destination;

        monster.leftEye.inner.translation.x += (eyeDest.x - eyePos.x) * MONSTER_EYE_WANDER_SPEED;
        monster.leftEye.inner.translation.y += (eyeDest.y - eyePos.y) * MONSTER_EYE_WANDER_SPEED;
    }

    function createEye(two, x, y) {
        var eyeOuter = two.makeCircle(0, 0, MONSTER_BASE_EYE_OUTER);
        eyeOuter.fill = 'violet';
        eyeOuter.noStroke();

        var eyeInner = two.makeCircle(0, 0, MONSTER_BASE_EYE_INNER);
        eyeInner.fill = 'black';

        var eye = two.makeGroup(eyeOuter, eyeInner);
        eye.inner = eyeInner;
        eye.translation.set(x, y);

        return eye;
    }

    function scaleEye(eye, scaleOuter, scaleInner) {

    }

    function randBodyDestination(blob, i) {
        var pct = (i + 1) / blob.vertices.length;
        var theta = pct * Math.PI * 2;
        var radius = Math.max(Math.random(), 0.4) * MONSTER_BASE_SIZE;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        return new Two.Vector(x, y);
    }

    function randBodyDestinations(blob) {
        for (var i = 0; i < blob.vertices.length; i++) {
            var v = blob.vertices[i];
            v.destination = new randBodyDestination(blob, i);
        }
    }

})();
