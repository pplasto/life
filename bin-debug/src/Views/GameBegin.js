var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameBegin = (function (_super) {
    __extends(GameBegin, _super);
    function GameBegin() {
        var _this = this;
        _super.call(this);
        this._tempText = "你的人生开始了...";
        this.name = "GameBegin";
        this.Parent = GameManager.Instance.MenuRoot;
        this.OnCreateHandle = this.createContent;
        this.OnOpenBeginHandle = function () {
            _this._touchHintLabel.alpha = 0;
            _this._beginTypedLabel.text = "LIFE";
        };
        this.OnOpenEndHandle = function () {
            _this._currTime = 0;
            _this._typeTextNum = 0;
            _this._currTypeTime = 0;
            _this._isTypeFlash = false;
            egret.Tween.get(_this).wait(1000).call(function () {
                _this._beginTypedLabel.text = "";
                egret.Ticker.getInstance().register(_this.update, _this);
            });
        };
        this.OnCloseBeginHandle = function () {
            egret.Ticker.getInstance().unregister(_this.update, _this);
        };
    }
    GameBegin.prototype.update = function (frameTime) {
        this._currTypeTime += frameTime;
        if (this._currTypeTime > GameBegin.TypeFlashDelta) {
            this._currTypeTime = 0;
            this._isTypeFlash = !this._isTypeFlash;
            this.toggleTextEnd(this._isTypeFlash);
        }
        this._currTime += frameTime;
        if (this._currTime > GameBegin.TypeDelta) {
            this._currTime = 0;
            this.typeText();
        }
    };
    GameBegin.prototype.createContent = function () {
        var _this = this;
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        //      BackGround
        //        var bgr:egret.Shape = new egret.Shape();
        //        bgr.graphics.beginFill(0x888888);
        //        bgr.graphics.drawRect(0,0,stageW,stageH);
        //        bgr.graphics.endFill();
        //        bgr.name = "Color BackGround";
        //        this.addChild(bgr);
        //        console.log("CreateContent");
        this._beginTypedLabel = Utils.CreateLabel("LIFE", stageW / 2, stageH / 2, 20, egret.HorizontalAlign.CENTER, 0xffffff, true);
        this._beginTypedLabel.name = "LIFE Label";
        this.addChild(this._beginTypedLabel);
        //this._beginTypedLabel.touchEnabled = true;
        this._touchHintLabel = Utils.CreateLabel("点击继续", stageW / 2, stageH / 2 + 50, 16, egret.HorizontalAlign.CENTER, 0xffffff, true);
        this._touchHintLabel.alpha = 0;
        this._touchHintLabel.name = "点击继续 Label";
        this.addChild(this._touchHintLabel);
        // transition
        var beginTextTransition = Transition.FastCreateTranslateTween(this._beginTypedLabel, 0.2, new egret.Point(stageW / 2, stageH / 2), new egret.Point(stageW / 2, -20));
        beginTextTransition.SnapHide();
        this._localTransitions.push(beginTextTransition);
        // 触摸事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            console.log("GameBegin touched: " + e.target.name + " currTarget: " + e.currentTarget.name);
            _this.touchEnabled = false;
            egret.Tween.get(_this._touchHintLabel).to({ "alpha": 0 }, 500);
            MenuManager.Instance.Push(MenuManager.Instance.SelectGenderMenu);
        }, this);
    };
    GameBegin.prototype.typeText = function () {
        if (this._typeTextNum < this._tempText.length) {
            this._typeTextNum++;
            this._beginTypedLabel.text = this._tempText.slice(0, this._typeTextNum) + (this._isTypeFlash ? "|" : " ");
            if (this._typeTextNum == this._tempText.length)
                egret.Tween.get(this).wait(2000).call(this.onTypeEnd);
        }
    };
    GameBegin.prototype.toggleTextEnd = function (flash) {
        var text = this._beginTypedLabel.text;
        text = text.slice(0, text.length - 1);
        if (flash)
            this._beginTypedLabel.text = text + "|";
        else
            this._beginTypedLabel.text = text + " ";
    };
    GameBegin.prototype.onTypeEnd = function () {
        var _this = this;
        console.log("GameBegin OnTypeEnd");
        egret.Tween.get(this._touchHintLabel).to({ "alpha": 1 }, 500).call(function () { return _this.touchEnabled = true; }, this);
    };
    GameBegin.TypeDelta = 300;
    GameBegin.TypeFlashDelta = 100;
    return GameBegin;
})(Menu);
//# sourceMappingURL=GameBegin.js.map