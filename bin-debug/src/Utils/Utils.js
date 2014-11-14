var Utils = (function () {
    function Utils() {
    }
    Utils.CreateLabel = function (text, x, y, size, align, color, anchorCenter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (size === void 0) { size = 20; }
        if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
        if (color === void 0) { color = 0xffffff; }
        if (anchorCenter === void 0) { anchorCenter = false; }
        //var label:egret.BitmapText = new egret.BitmapText();
        var label = new egret.TextField();
        if (anchorCenter)
            label.anchorX = label.anchorY = 0.5;
        label.textColor = color;
        label.x = x;
        label.y = y;
        label.textAlign = align;
        label.text = text;
        label.size = size;
        //        label.alpha = 0;
        return label;
    };
    Utils.CreateSimpleButton = function (text, textSize, w, upColor, pressColor) {
        var btn = new egret.Sprite();
        var label = new egret.TextField();
        label.text = text;
        label.x = w / 2;
        label.y = (textSize * 1.5) / 2;
        label.size = textSize;
        label.anchorX = 0.5;
        label.anchorY = 0.5;
        btn.anchorX = 0.5;
        btn.anchorY = 0.5;
        btn.graphics.beginFill(upColor);
        btn.graphics.drawRect(-w / 2, -textSize * 1.5 / 2, w, textSize);
        btn.graphics.endFill();
        btn.addChild(label);
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.target.graphics.beginFill(pressColor);
            e.target.graphics.drawRect(-w / 2, -textSize * 1.5 / 2, w, textSize);
            e.target.graphics.endFill();
        }, btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            e.target.graphics.beginFill(upColor);
            e.target.graphics.drawRect(-w / 2, -textSize * 1.5 / 2, w, textSize);
            e.target.graphics.endFill();
        }, btn);
        btn.touchEnabled = true;
        return btn;
    };
    return Utils;
})();
//# sourceMappingURL=Utils.js.map