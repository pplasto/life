var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    ////
    function Menu() {
        _super.call(this);
        ///
        this._deactivateOnHide = true; //应该叫 removeOnHide ?
        ///
        this.__parent = null;
        this._isStart = false;
        this._localTransitions = new Array();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveToStage, this);
    }
    Object.defineProperty(Menu.prototype, "OnCreateHandle", {
        set: function (handle) {
            this._onCreateHandle = handle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "OnOpenBeginHandle", {
        set: function (handle) {
            this._onOpenBeginHandle = handle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "OnOpenEndHandle", {
        set: function (handle) {
            this._onOpenEndHandle = handle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "OnCloseBeginHandle", {
        set: function (handle) {
            this._onCloseBeginHandle = handle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "Parent", {
        set: function (parent) {
            this.__parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "IsOpen", {
        /// get set 方法
        get: function () {
            return this._isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Menu.prototype.onAddToStage = function (event) {
        console.log(this.name + " onAddToStage");
        if (!this._isStart) {
            this._isStart = true;
            if (this._onCreateHandle != null)
                this._onCreateHandle();
        }
        this.onShow();
    };
    /// 做不了什么事情了...
    Menu.prototype.onRemoveToStage = function (event) {
        console.log(this.name + " onRemoveToStage");
    };
    Menu.prototype.OnBack = function () {
    };
    Menu.prototype.SetAnimatingFinished = function (hide) {
        if (this._deactivateOnHide && hide)
            this.__parent.removeChild(this);
        if (!hide && this._onOpenEndHandle != null)
            this._onOpenEndHandle();
    };
    Menu.prototype.Show = function () {
        if (this.stage == null)
            this.__parent.addChild(this);
        else
            this.onShow();
        return this.getTransitionMaxTime();
    };
    Menu.prototype.Hide = function () {
        this.onHide();
        return this.getTransitionMaxTime();
    };
    Menu.prototype.onShow = function () {
        if (this._pauseOnOpen)
            GameManager.Instance.SetGameState(1 /* Pause */);
        this._isOpen = true;
        if (this._onOpenBeginHandle != null)
            this._onOpenBeginHandle();
        /// transition
        this._localTransitions.forEach(function (transtion) { return transtion.Show(); });
    };
    Menu.prototype.onHide = function () {
        if (this._pauseOnOpen)
            GameManager.Instance.SetGameState(2 /* Playing */);
        this._isOpen = false;
        if (this._onCloseBeginHandle != null)
            this._onCloseBeginHandle();
        /// transition
        this._localTransitions.forEach(function (transtion) { return transtion.Hide(); });
    };
    Menu.prototype.getTransitionMaxTime = function () {
        var maxTime = 0;
        this._localTransitions.forEach(function (transtion) { return maxTime = Math.max(maxTime, transtion.Hide()); });
        return maxTime;
    };
    Menu.Transition = function (from, to) {
        var maxTweenTime = 0;
        if (from != null) {
            maxTweenTime = Math.max(maxTweenTime, from.Hide());
        }
        if (to != null) {
            maxTweenTime = Math.max(maxTweenTime, to.Show());
        }
        return maxTweenTime;
    };
    return Menu;
})(egret.DisplayObjectContainer);
//# sourceMappingURL=Menu.js.map