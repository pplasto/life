var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResLoadManager = (function () {
    function ResLoadManager() {
    }
    ResLoadManager.GetInstance = function () {
        if (ResLoadManager.Instance == null)
            ResLoadManager.Instance = new ResLoadManager();
        return ResLoadManager.Instance;
    };
    ResLoadManager.prototype.GameLoading = function (root) {
        if (loadingView == null)
            loadingView = new LoadingUI();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    ResLoadManager.prototype.onConfigComplete = function (event) {
        console.log("Config Complete.");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    ResLoadManager.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    };
    ResLoadManager.prototype.onResourceProgress = function (event) {
    };
    ResLoadManager.Instance = null;
    return ResLoadManager;
})();
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = "游戏加载中..." + current + "/" + total;
    };
    return LoadingUI;
})(egret.Sprite);
//# sourceMappingURL=ResLoadManager.js.map