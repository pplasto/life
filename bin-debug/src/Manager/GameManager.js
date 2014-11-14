var GameState;
(function (GameState) {
    GameState[GameState["Idle"] = 0] = "Idle";
    GameState[GameState["Pause"] = 1] = "Pause";
    GameState[GameState["Playing"] = 2] = "Playing";
})(GameState || (GameState = {}));
var GameManager = (function () {
    function GameManager() {
        //TODO 这个自动消失框应该在GameRoot里面?
        //private _toastRoot:egret.DisplayObjectContainer;
        //public set ToastRoot(root){this._toastRoot = root;}
        this.currState = 0 /* Idle */;
        if (GameManager._instance != null)
            throw new Error("GameManager can't be constructor!");
    }
    Object.defineProperty(GameManager, "Instance", {
        get: function () {
            if (GameManager._instance == null)
                GameManager._instance = new GameManager();
            return GameManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "GameRoot", {
        get: function () {
            return this._root;
        },
        set: function (root) {
            this._root = root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "MenuRoot", {
        get: function () {
            return this._menuRoot;
        },
        set: function (root) {
            this._menuRoot = root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "DialogueRoot", {
        get: function () {
            return this._dialogueRoot;
        },
        set: function (root) {
            this._dialogueRoot = root;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.SetGameState = function (state) {
        //TODO 游戏状态改变
    };
    GameManager._instance = null;
    return GameManager;
})();
//# sourceMappingURL=GameManager.js.map