var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SelectGender = (function (_super) {
    __extends(SelectGender, _super);
    function SelectGender() {
        _super.call(this);
        this.name = "SelectGender";
        this.Parent = GameManager.Instance.MenuRoot;
        this.OnCreateHandle = function () {
        };
        this.OnOpenBeginHandle = function () {
        };
        this.OnOpenEndHandle = function () {
        };
        this.OnCloseBeginHandle = function () {
        };
    }
    SelectGender.prototype.onCreate = function () {
    };
    return SelectGender;
})(Menu);
//# sourceMappingURL=SelectGender.js.map