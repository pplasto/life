var ResLoadManager = (function () {
    function ResLoadManager() {
    }
    ResLoadManager.GetInstance = function () {
        if (ResLoadManager.Instance == null)
            ResLoadManager.Instance = new ResLoadManager();
        return ResLoadManager.Instance;
    };
    ResLoadManager.prototype.GameLoading = function (root, callback, thisObject) {
        this._root = root;
        this._callbackThis = thisObject;
        this._callback = callback;
        if (this.loadingView == null)
            this.loadingView = new LoadingUI();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    ResLoadManager.prototype.onConfigComplete = function (event) {
        console.log("Config Complete.");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.LoadGroup("preload", this._callback, this._callbackThis);
    };
    ResLoadManager.prototype.onResourceProgress = function (event) {
        this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
    };
    ResLoadManager.prototype.onResourceLoadComplete = function (event) {
        this._root.stage.removeChild(this.loadingView);
        this._callback(this._callbackThis);
        this._callbackThis = null;
        this._callback = null;
        //        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        //        this.createGameScene();
    };
    ResLoadManager.prototype.LoadGroup = function (groupName, callback, thisObject) {
        this._callbackThis = thisObject;
        this._callback = callback;
        this._root.stage.addChild(this.loadingView);
        RES.loadGroup(groupName);
    };
    ResLoadManager.Instance = null;
    return ResLoadManager;
})();
//# sourceMappingURL=ResLoadManager.js.map