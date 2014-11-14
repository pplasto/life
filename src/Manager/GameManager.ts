enum GameState{ Idle, Pause, Playing }

class GameManager
{
    private static _instance:GameManager = null;
    public static get Instance():GameManager
    {
        if(GameManager._instance == null)
            GameManager._instance = new GameManager();
        return GameManager._instance;
    }

    ///
    private _root:egret.DisplayObjectContainer;// 总根节点
    public set GameRoot(root:egret.DisplayObjectContainer){this._root = root;}
    public get GameRoot():egret.DisplayObjectContainer{return this._root;}
    private _menuRoot:egret.DisplayObjectContainer;// 菜单根节点
    public set MenuRoot(root:egret.DisplayObjectContainer){this._menuRoot = root;}
    public get MenuRoot():egret.DisplayObjectContainer{return this._menuRoot;}
    private _dialogueRoot:egret.DisplayObjectContainer;// 对话弹出框根节点
    public set DialogueRoot(root:egret.DisplayObjectContainer){this._dialogueRoot = root;}
    public get DialogueRoot():egret.DisplayObjectContainer{return this._dialogueRoot;}
    //TODO 这个自动消失框应该在GameRoot里面?
    //private _toastRoot:egret.DisplayObjectContainer;
    //public set ToastRoot(root){this._toastRoot = root;}

    private currState:GameState = GameState.Idle;

    constructor()
    {
        if(GameManager._instance!=null)throw new Error("GameManager can't be constructor!");
    }

    public SetGameState(state:GameState)
    {
        //TODO 游戏状态改变
    }
}