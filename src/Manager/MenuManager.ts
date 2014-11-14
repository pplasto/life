class MenuManager
{
    private static _instance:MenuManager;
    public static get Instance():MenuManager{
        if(MenuManager._instance == null) MenuManager._instance = new MenuManager();
        return MenuManager._instance;
    }

    /////////////////////////////////////////////////////
    private _menuStack:MenuStack;
    private _dialogueStack:MenuStack;

    private _mainMenu:MainMenu;
    private _gameBegin:GameBegin;
    private _selectGender:SelectGender;
    private _inGameHUD;
    private _pauseMenu;
    private _gameFinishMenu;
    private _rewardMenu;

    public get GameBeginMenu():GameBegin{return this._gameBegin;}
    public get SelectGenderMenu():SelectGender{return this._selectGender;}
    public get MainMenu():MainMenu{return this._mainMenu;}

    constructor()
    {
        if(MenuManager._instance != null)throw new Error("MenuManager can't be constructor.");

        this._menuStack = new MenuStack("Menu");
        this._dialogueStack = new MenuStack("Dialogue");

        this._mainMenu = new MainMenu();
        this._gameBegin = new GameBegin();
        this._selectGender = new SelectGender();
    }

    public get IsBlocked():boolean
    {
        return this._menuStack.IsBlocked || this._dialogueStack.IsBlocked;
    }

    public PopAndPush(menu:Menu,type:StackType = StackType.Menu):boolean
    {
        var stack:MenuStack = (type == StackType.Menu ? this._menuStack : this._dialogueStack);
        if(stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.PopAndPush(menu);
    }

    public Push(menu:Menu,type:StackType = StackType.Menu):boolean
    {
        var stack:MenuStack = (type == StackType.Menu ? this._menuStack : this._dialogueStack);
        if(stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.Push(menu);
    }

    public Pop(type:StackType = StackType.Menu):boolean
    {
        var stack:MenuStack = (type == StackType.Menu ? this._menuStack : this._dialogueStack);
        if(stack == this._menuStack && this._dialogueStack.CurrentMenu() != null)
            return false;
        return stack.Pop();
    }

}

enum StackType{Dialogue,Menu};

class MenuStack
{
    private _stack:Array<Menu>;
    private _transitionInMenu:Menu;
    private _transitionOutMenu:Menu;
    private _transitionTimer:number;
//    private _menuOpenTime:number;

    private _name:string;// Menu or Dialog
    public get Name():string{return this._name;}

    constructor(name:string)
    {
        this._name = name;
        this._stack = new Array<Menu>();

        this._transitionTimer = 0;
//        this._menuOpenTime = 0;

        egret.Ticker.getInstance().register(this.Update,this);
    }

    public get IsBlocked():boolean
    {
        return this._transitionTimer > 0;
    }

    public Update(delta:number)
    {
        if (this._transitionTimer > 0)
        {
            this._transitionTimer -= delta;
            if (this._transitionTimer <= 0)
                this.setTransitionFinished();
        }
    }

    private setTransitionFinished():void
    {
        if (this._transitionInMenu != null)
            this._transitionInMenu.SetAnimatingFinished(false);
        if (this._transitionOutMenu != null)
            this._transitionOutMenu.SetAnimatingFinished(true);
        this._transitionInMenu = null;
        this._transitionOutMenu = null;
        this._transitionTimer = 0;
//        this._menuOpenTime = 0;
    }

    public CurrentMenu():Menu
    {
        return this._stack.length == 0 ? null : this._stack[this._stack.length - 1];
    }

    public Pop():boolean
    {
        if(!this.IsBlocked && this._stack.length > 0)
        {
            this._transitionOutMenu = this._stack.pop();
            this._transitionInMenu = this.CurrentMenu();
            this._transitionTimer = Menu.Transition(this._transitionOutMenu,this._transitionInMenu);
            if(this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    }

    public PopAndPush(pushMenu:Menu):boolean
    {
        if(!this.IsBlocked && !this.StackContain(pushMenu))
        {
            this._transitionOutMenu = this._stack.pop();
            this._transitionInMenu = pushMenu;
            this._stack.push(pushMenu);
            this._transitionTimer = Menu.Transition(this._transitionOutMenu,this._transitionInMenu);
            if(this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    }

    public PopToAndPush( popToMenu:Menu,pushMenu:Menu):boolean
    {
        if (!this.IsBlocked
            && this._stack.length > 0
            && this.StackContain(popToMenu)
            && ! this.StackContain(pushMenu))
        {
            var fromMenu:Menu = this.CurrentMenu();
            while(this.CurrentMenu() != popToMenu)
            {
                this._stack.pop();
            }
            this._transitionOutMenu = fromMenu;
            this._transitionInMenu = pushMenu;
            this._transitionTimer = Menu.Transition(this._transitionOutMenu,this._transitionInMenu);
            if(this._transitionTimer == 0)
                this.setTransitionFinished();
            return true;
        }
        return false;
    }

    public PopTo(popTo:Menu):boolean
    {
        if (!this.IsBlocked && this._stack.length > 0 && this.StackContain(popTo))
        {
            if(this.CurrentMenu()!=popTo)
            {
                var fromMenu = this._stack.pop();
                var toMenu = this.CurrentMenu();
                while(toMenu != popTo)
                {
                    this._stack.pop();
                    toMenu = this.CurrentMenu();
                }
                this._transitionOutMenu = fromMenu;
                this._transitionInMenu = toMenu;
                this._transitionTimer = Menu.Transition(this._transitionOutMenu,this._transitionInMenu);
                if(this._transitionTimer == 0)
                    this.setTransitionFinished();
                return true;
            }
        }
        return false;
    }

    public Push(menu:Menu):boolean
    {
        if (!this.IsBlocked)
        {
            if(menu != this.CurrentMenu())
            {
                this._transitionOutMenu = this.CurrentMenu();
                this._transitionInMenu = menu;
                this._transitionTimer = Menu.Transition(this._transitionOutMenu,this._transitionInMenu);
                this._stack.push(menu);
                if(this._transitionTimer == 0)
                    this.setTransitionFinished();
                return true;
            }
        }
        return false;
    }

    //TODO Inject
    public Inject(menu:Menu,index:number):void
    {
        var stackSplice:Menu[] = this._stack.splice(index);
    }

    public StackContain(menu:Menu):boolean
    {
        for(var i = 0;i<this._stack.length;i++)
            if(this._stack[i] == menu)return true;
        return false;
    }
}