var Transition = (function () {
    function Transition() {
        this._tweenArray = new Array();
    }
    Transition.prototype.SnapShow = function () {
        this._tweenArray.forEach(function (tween) { return tween.SnapShow(); });
    };
    Transition.prototype.SnapHide = function () {
        this._tweenArray.forEach(function (tween) { return tween.SnapHide(); });
    };
    Transition.prototype.Show = function () {
        var maxTime = 0;
        this._tweenArray.forEach(function (tween) { return maxTime = Math.max(maxTime, tween.Show()); });
        return maxTime;
    };
    Transition.prototype.Hide = function () {
        var maxTime = 0;
        this._tweenArray.forEach(function (tween) { return maxTime = Math.max(maxTime, tween.Hide()); });
        return maxTime;
    };
    Transition.prototype.GetMaxTime = function () {
        var maxTime = 0;
        this._tweenArray.forEach(function (tween) { return maxTime = Math.max(maxTime, tween.GetTime()); });
        return maxTime;
    };
    Transition.prototype.AddItemTween = function (tween) {
        this._tweenArray.push(tween);
    };
    //TODO Remove Item Tween
    Transition.prototype.RemoveItemTween = function (pTween) {
        var index = this._tweenArray.indexOf(pTween);
        if (index > 0)
            this._tweenArray.splice(index, 1);
        this._tweenArray.length -= 1;
    };
    Transition.FastCreateTranslateTween = function (thisObj, initialDelay, showPos, hidePos) {
        var transition = new Transition();
        var translateTween = new TranslateTween(thisObj, initialDelay, showPos, hidePos);
        transition.AddItemTween(translateTween);
        return transition;
    };
    return Transition;
})();
//# sourceMappingURL=Transition.js.map