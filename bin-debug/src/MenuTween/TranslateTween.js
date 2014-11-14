var TranslateTween = (function () {
    function TranslateTween(gameObject, initialDelay, showPos, hidePos) {
        this._tweenTime = 500;
        this._gameObject = gameObject;
        this._initialDelay = initialDelay;
        this._showPos = showPos;
        this._hidePos = hidePos;
    }
    Object.defineProperty(TranslateTween.prototype, "TweenTime", {
        get: function () {
            return this._tweenTime;
        },
        enumerable: true,
        configurable: true
    });
    TranslateTween.prototype.Show = function () {
        var target = this._gameObject;
        var tween = egret.Tween.get(target);
        if (this._initialDelay > 0)
            tween.wait(this._initialDelay);
        tween.to({ "x": this._showPos.x, "y": this._showPos.y }, this._tweenTime);
        return this.GetTime();
    };
    TranslateTween.prototype.Hide = function (callback) {
        if (callback === void 0) { callback = null; }
        var target = this._gameObject;
        var tween = egret.Tween.get(target);
        if (this._initialDelay > 0)
            tween.wait(this._initialDelay);
        tween.to({ "x": this._hidePos.x, "y": this._hidePos.y }, this._tweenTime);
        return this.GetTime();
    };
    TranslateTween.prototype.SnapShow = function () {
        this._gameObject.x = this._showPos.x;
        this._gameObject.y = this._showPos.y;
    };
    TranslateTween.prototype.SnapHide = function () {
        this._gameObject.x = this._hidePos.x;
        this._gameObject.y = this._hidePos.y;
    };
    TranslateTween.prototype.GetTime = function () {
        return this._initialDelay + this._tweenTime;
    };
    return TranslateTween;
})();
//# sourceMappingURL=TranslateTween.js.map