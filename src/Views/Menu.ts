class Menu extends egret.DisplayObjectContainer
{
    ///
    private _deactivateOnHide:boolean = true;//应该叫 removeOnHide ?
    private _pauseOnOpen:boolean;// show时候是否暂停游戏
    private _isOpen:boolean;// 是否打开中,不可用stage==null,因为有可能不移除..

    /// 继承覆盖
    private _onCreateHandle:Function;
    private _onOpenBeginHandle:Function;
    private _onOpenEndHandle:Function;
    private _onCloseBeginHandle:Function;
    public set OnCreateHandle(handle:Function){this._onCreateHandle = handle;}
    public set OnOpenBeginHandle(handle:Function){this._onOpenBeginHandle = handle;}
    public set OnOpenEndHandle(handle:Function){this._onOpenEndHandle = handle;}
    public set OnCloseBeginHandle(handle:Function){this._onCloseBeginHandle = handle;}

    /// 所有动画
    _localTransitions:Array<Transition>;

    /// 调用onCreate方法的依据
    private _isStart;

    ///
    private __parent:egret.DisplayObjectContainer = null;
    public set Parent(parent:egret.DisplayObjectContainer){this.__parent = parent;}

    /// get set 方法
    public get IsOpen():boolean{return this._isOpen;}

    ////
    constructor()
    {
        super();
        this._isStart = false;
        this._localTransitions = new Array<Transition>();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveToStage,this);
    }

    private onAddToStage(event:egret.Event):void
    {
        console.log(this.name + " onAddToStage");
        if(!this._isStart) {
            this._isStart = true;
            if(this._onCreateHandle != null)this._onCreateHandle();
        }
        this.onShow();
    }

    /// 做不了什么事情了...
    private onRemoveToStage(event:egret.Event):void
    {
        console.log(this.name + " onRemoveToStage");
    }

    public OnBack():void
    {
    }

    public SetAnimatingFinished(hide:boolean):void
    {
        if (this._deactivateOnHide && hide)
            this.__parent.removeChild(this);

        if(!hide && this._onOpenEndHandle!=null)
            this._onOpenEndHandle();
    }

    public Show():number {
        if (this.stage == null)
            this.__parent.addChild(this);
        else
            this.onShow();
        return this.getTransitionMaxTime();
    }

    public Hide():number {
        this.onHide();
        return this.getTransitionMaxTime();
    }

    private onShow():void
    {
        if(this._pauseOnOpen)
            GameManager.Instance.SetGameState(GameState.Pause);
        this._isOpen = true;
        if(this._onOpenBeginHandle!=null)this._onOpenBeginHandle();

        /// transition
        this._localTransitions.forEach(transtion=>transtion.Show());
    }

    private onHide():void
    {
        if(this._pauseOnOpen)
            GameManager.Instance.SetGameState(GameState.Playing);
        this._isOpen = false;
        if(this._onCloseBeginHandle!=null)this._onCloseBeginHandle();

        /// transition
        this._localTransitions.forEach(transtion=>transtion.Hide());
    }

    private getTransitionMaxTime():number {
        var maxTime:number = 0;
        this._localTransitions.forEach(transtion=>maxTime = Math.max(maxTime,transtion.Hide()));
        return maxTime;
    }

    public static Transition(from:Menu,to:Menu):number
    {
        var maxTweenTime:number = 0;
        if (from != null){maxTweenTime = Math.max(maxTweenTime,from.Hide());}
        if (to != null){maxTweenTime = Math.max(maxTweenTime,to.Show());}
        return maxTweenTime;
    }
}
