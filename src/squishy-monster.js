(function () {
    var root = this;

    var MONSTER_MORPH_EPSILON = 0.02,
        MONSTER_MORPH_RATE = 0.0125,
        MONSTER_PFFF_RATE = 0.125,
        MONSTER_BASE_SIZE = 200,
        MONSTER_BASE_EYE_OUTER = 24,
        MONSTER_BASE_EYE_INNER = 13,
        MONSTER_EYE_WANDER_SPEED = 0.125,
        MONSTER_EYE_WANDER_RANGE = 7,
        MONSTER_EYE_WANDER_CHANCE = 0.009;

    var SquishyMonster = root.SquishyMonster = function(two, x, y) {
        this.blob = two.makeCircle(0, 0, MONSTER_BASE_SIZE);
        this.blob.fill = 'purple';
        this.blob.noStroke();

        this.rightEye = createEye(two, 30, 0);
        this.leftEye = createEye(two, -30, 0);

        this.whole = two.makeGroup(this.blob, this.rightEye, this.leftEye);
        this.whole.translation.set(x, y);

        this.rightEye.destination = new Two.Vector();
        this.leftEye.destination = new Two.Vector();

        this.animationTime = -1.0;
        this.animationFn = null;
    }

    SquishyMonster.prototype.update = function(time) {
        if (this.animationTime <= 0.0) {
            if (Math.random() < 0.1) {
                this.goPfff(this, time);
            } else {
                this.idleSquishy(this, time);
            }
        } else {
            this.animationTime -= time;
            this.animationFn(this, time);
        }
    }

    SquishyMonster.prototype.goPfff = function () {
        this.animationFn = updateGoPfff;
        this.animationTime = Math.random() * 6 + 4;

        var blob = this.blob;
        for (var i = 0; i < blob.vertices.length; i++) {
            var theta = (i + 1) / blob.vertices.length * Math.PI * 2,
                x = MONSTER_BASE_SIZE * Math.cos(theta),
                y = MONSTER_BASE_SIZE * Math.sin(theta);

            blob.vertices[i].destination = new Two.Vector(x, y);
        }

        this.rightEye.destination = new Two.Vector();
        this.leftEye.destination = new Two.Vector();
    }

    SquishyMonster.prototype.idleSquishy = function() {
        randBodyDestinations(this.blob);
        this.animationFn = updateIdleSquishy;
        this.animationTime = Math.random() * 10 + 4;
    }

    // *******

    function updateGoPfff(monster, time) {
        for (var i = 0; i < monster.blob.vertices.length; i++) {
            var v = monster.blob.vertices[i];
            var d = v.destination;

            v.x += (d.x - v.x) * MONSTER_PFFF_RATE;
            v.y += (d.y - v.y) * MONSTER_PFFF_RATE;
        }

        updateEyes(monster, time);
    }

    function updateIdleSquishy(monster, time) {
        for (var i = 0; i < monster.blob.vertices.length; i++) {
            var v = monster.blob.vertices[i];
            var d = v.destination;

            if (v.distanceTo(d) < MONSTER_MORPH_EPSILON) {
                v.destination = randBodyDestination(monster.blob, i);
                continue;
            }

            v.x += (d.x - v.x) * MONSTER_MORPH_RATE;
            v.y += (d.y - v.y) * MONSTER_MORPH_RATE;
        }

        if (Math.random() < MONSTER_EYE_WANDER_CHANCE) {
            randEyeDestination(this);
        }

        updateEyes(monster, time);
    }

    function randEyeDestination(monster) {
        var randX = Math.random() * (Math.random() > 0.5 ? 1 : -1);
        var randY = Math.random() * (Math.random() > 0.5 ? 1 : -1);
        var dest = new Two.Vector(randX * MONSTER_EYE_WANDER_RANGE, randY * MONSTER_EYE_WANDER_RANGE);

        monster.rightEye.destination = dest;
        monster.leftEye.destination = dest;
    }

    function updateEyes(monster, time) {
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
