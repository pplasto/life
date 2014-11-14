var MenuManager = (function () {
    function MenuManager() {
        if (MenuManager._instance != null)
            throw new Error("MenuManager can't be constructor.");
        this._menuStack = new MenuStack("Menu");
        this._dialogueStack = new MenuStack("Dialogue");
        this._mainMenu = new MainMenu();
        this._gameBegin = new GameBegin();
    }
    Object.defineProperty(MenuManager, "Instance", {
        get: function () {
            if (MenuManager._instance == null)
                MenuManager._instance = new MenuManager();
            return MenuManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuManager.prototype, "GameBeginMenu", {
        get: function () {
            return this._gameBegin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuManager.prototype, "SelectGenderMenu", {
        get: function () {
            return this._selectGender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuManager.prototype, "MainMenu", {
        get: function () {
            return this._mainMenu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuManager.prototype, "IsBlocked", {
        get: function () {
            return this._menuStack.IsBlocked || this._dialogueStack.IsBlocked;
        },
        enumerable: true,
        configurable: true
    });
    MenuManager.prototype.PopAndPush = function (menu, type) {
        if (type === void 0) { type = 1 /* Menu */; }
        var stack = (type == 1 /* Menu */ ? this._menuStack : this._dialogueStack);
        if (stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.PopAndPush(menu);
    };
    MenuManager.prototype.Push = function (menu, type) {
        if (type === void 0) { type = 1 /* Menu */; }
        var stack = (type == 1 /* Menu */ ? this._menuStack : this._dialogueStack);
        if (stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.Push(menu);
    };
    MenuManager.prototype.Pop = function (type) {
        if (type === void 0) { type = 1 /* Menu */; }
        var stack = (type == 1 /* Menu */ ? this._menuStack : this._dialogueStack);
        if (stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.Pop();
    };
    return MenuManager;
})();
var StackType;
(function (StackType) {
    StackType[StackType["Dialogue"] = 0] = "Dialogue";
    StackType[StackType["Menu"] = 1] = "Menu";
})(StackType || (StackType = {}));
;
var MenuStack = (function () {
    function MenuStack(name) {
        this._name = name;
        this._stack = new Array();
        this._transitionTimer = 0;
        //        this._menuOpenTime = 0;
        egret.Ticker.getInstance().register(this.Update, this);
    }
    Object.defineProperty(MenuStack.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuStack.prototype, "IsBlocked", {
        get: function () {
            return this._transitionTimer > 0;
        },
        enumerable: true,
        configurable: true
    });
    MenuStack.prototype.Update = function (delta) {
        if (this._transitionTimer > 0) {
            this._transitionTimer -= delta;
            if (this._transitionTimer <= 0)
                this.setTransitionFinished();
        }
    };
    MenuStack.prototype.setTransitionFinished = function () {
        if (this._transitionInMenu != null)
            this._transitionInMenu.SetAnimatingFinished(false);
        if (this._transitionOutMenu != null)
            this._transitionOutMenu.SetAnimatingFinished(true);
        this._transitionInMenu = null;
        this._transitionOutMenu = null;
        this._transitionTimer = 0;
        //        this._menuOpenTime = 0;
    };
    MenuStack.prototype.CurrentMenu = function () {
        return this._stack.length == 0 ? null : this._stack[this._stack.length - 1];
    };
    MenuStack.prototype.Pop = function () {
        if (!this.IsBlocked && this._stack.length > 0) {
            this._transitionOutMenu = this._stack.pop();
            this._transitionInMenu = this.CurrentMenu();
            this._transitionTimer = Menu.Transition(this._transitionOutMenu, this._transitionInMenu);
            if (this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    };
    MenuStack.prototype.PopAndPush = function (pushMenu) {
        if (!this.IsBlocked && this.StackContain(pushMenu)) {
            this._transitionOutMenu = this._stack.pop();
            this._transitionInMenu = pushMenu;
            this._stack.push(pushMenu);
            this._transitionTimer = Menu.Transition(this._transitionOutMenu, this._transitionInMenu);
            if (this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    };
    MenuStack.prototype.PopToAndPush = function (popToMenu, pushMenu) {
        if (!this.IsBlocked && this._stack.length > 0 && this.StackContain(popToMenu) && !this.StackContain(pushMenu)) {
            var fromMenu = this.CurrentMenu();
            while (this.CurrentMenu() != popToMenu) {
                this._stack.pop();
            }
            this._transitionOutMenu = fromMenu;
            this._transitionInMenu = pushMenu;
            this._transitionTimer = Menu.Transition(this._transitionOutMenu, this._transitionInMenu);
            if (this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    };
    MenuStack.prototype.PopTo = function (popTo) {
        if (!this.IsBlocked && this._stack.length > 0 && this.StackContain(popTo)) {
            if (this.CurrentMenu() != popTo) {
                var fromMenu = this._stack.pop();
                var toMenu = this.CurrentMenu();
                while (toMenu != popTo) {
                    this._stack.pop();
                    toMenu = this.CurrentMenu();
                }
                this._transitionOutMenu = fromMenu;
                this._transitionInMenu = toMenu;
                this._transitionTimer = Menu.Transition(this._transitionOutMenu, this._transitionInMenu);
                if (this._transitionTimer == 0)
                    this.setTransitionFinished();
                return true;
            }
        }
        return false;
    };
    MenuStack.prototype.Push = function (menu) {
        if (!this.IsBlocked) {
            if (menu != this.CurrentMenu()) {
                this._transitionOutMenu = this.CurrentMenu();
                this._transitionInMenu = menu;
                this._transitionTimer = Menu.Transition(this._transitionOutMenu, this._transitionInMenu);
                this._stack.push(menu);
                if (this._transitionTimer == 0)
                    this.setTransitionFinished();
                return true;
            }
        }
        return false;
    };
    //TODO Inject
    MenuStack.prototype.Inject = function (menu, index) {
        var stackSplice = this._stack.splice(index);
    };
    MenuStack.prototype.StackContain = function (menu) {
        for (var item in this._stack)
            if (item == menu)
                return true;
        return false;
    };
    return MenuStack;
})();
//# sourceMappingURL=MenuManager.js.map