var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SelectGender = (function (_super) {
    __extends(SelectGender, _super);
    function SelectGender() {
        var _this = this;
        _super.call(this);
        this.name = "SelectGender";
        this.Parent = GameManager.Instance.MenuRoot;
        this.OnCreateHandle = this.onCreate;
        this.OnOpenBeginHandle = function () {
            _this._localTransitions.forEach(function (transition) { return transition.SnapHide(); });
            _this._maleBtn.touchEnabled = false;
            _this._femaleBtn.touchEnabled = false;
        };
        this.OnOpenEndHandle = function () {
            _this._maleBtn.touchEnabled = true;
            _this._femaleBtn.touchEnabled = true;
        };
        this.OnCloseBeginHandle = function () {
            _this._maleBtn.touchEnabled = false;
            _this._femaleBtn.touchEnabled = false;
        };
    }
    SelectGender.prototype.onCreate = function () {
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        this._title = Utils.CreateLabel("请选择性别:", stageW / 2, stageH / 2 - 50, 20, egret.HorizontalAlign.CENTER, 0xffffff, true);
        this.addChild(this._title);
        this._maleBtn = Utils.CreateSimpleButton("男", 16, 40, 0x00ff00, 0xff0000);
        this._maleBtn.x = stageW / 2 - 30;
        this._maleBtn.y = stageH / 2 + 10;
        this.addChild(this._maleBtn);
        this._maleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            MenuManager.Instance.Pop();
        }, this);
        this._femaleBtn = Utils.CreateSimpleButton("女", 16, 40, 0x00ff00, 0xff0000);
        this._femaleBtn.x = stageW / 2 + 30;
        this._femaleBtn.y = stageH / 2 + 10;
        this.addChild(this._femaleBtn);
        // transitions
        var titleTrans = Transition.FastCreateTranslateTween(this._title, 0, new egret.Point(stageW / 2, stageH / 2 - 50), new egret.Point(stageW / 2, -20));
        var maleBtnTrans = Transition.FastCreateTranslateTween(this._maleBtn, 0, new egret.Point(stageW / 2 - 30, stageH / 2 + 10), new egret.Point(-30, stageH / 2 + 10));
        var femaleBtnTrans = Transition.FastCreateTranslateTween(this._femaleBtn, 0, new egret.Point(stageW / 2 + 30, stageH / 2 + 10), new egret.Point(stageW + 30, stageH / 2 + 10));
        this._localTransitions.push(titleTrans, maleBtnTrans, femaleBtnTrans);
    };
    return SelectGender;
})(Menu);
//# sourceMappingURL=SelectGender.js.map