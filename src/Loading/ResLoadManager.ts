class ResLoadManager
{
    private static Instance:ResLoadManager = null;
    public static GetInstance():ResLoadManager
    {
        if(ResLoadManager.Instance == null)
            ResLoadManager.Instance = new ResLoadManager();
        return ResLoadManager.Instance;
    }

    // 功能
    // 1. 加载资源配置文件 json
    // 2. 加载资源组
    // 3. 设置加载进度界面 提供接口(setProgress)

    private loadingView:LoadingUI;
    private _root:egret.DisplayObjectContainer;
    private _callbackThis:any;
    private _callback:Function;

    public GameLoading(root:egret.DisplayObjectContainer,callback:Function,thisObject:any):void
    {
        this._root = root;
        this._callbackThis = thisObject;
        this._callback = callback;
        if(this.loadingView == null) this.loadingView = new LoadingUI();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }

    private onConfigComplete(event:RES.ResourceEvent):void
    {
        console.log("Config Complete.");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        this.LoadGroup("preload",this._callback,this._callbackThis);
    }

    private onResourceProgress(event:RES.ResourceEvent):void
    {
        this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
    }

    private onResourceLoadComplete(event:RES.ResourceEvent):void
    {
        this._root.stage.removeChild(this.loadingView);
        this._callback(this._callbackThis);
        this._callbackThis = null;
        this._callback = null;
//        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
//        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
//        this.createGameScene();
    }

    public LoadGroup(groupName:string,callback:Function, thisObject:any):void
    {
        this._callbackThis = thisObject;
        this._callback = callback;
        this._root.stage.addChild(this.loadingView);
        RES.loadGroup(groupName);
    }
}

