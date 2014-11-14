//class TestClass
//{
//    func(){}
//}

class Main extends egret.DisplayObjectContainer
{
    private loadingView : LoadingUI;

    public constructor()
    {
        super();
//        var classes:Array<TestClass> = new Array<TestClass>();
//        var test1 = new TestClass();
//        var test2 = new TestClass();
//        var test3 = new TestClass();
//        classes.push(test1);
//        classes.push(test2);
//        classes.push(test3);
//        classes.push(null);
//        var index:number = classes.indexOf(test2);
//        classes.splice(index,1);
//        var length = classes.length;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event)
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        ResLoadManager.GetInstance().GameLoading(this,this.preLoadOK,this);
    }

    private preLoadOK(callbackThis:any):void
    {
        GameManager.Instance.GameRoot = callbackThis;

        var menuRoot:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        callbackThis.addChild(menuRoot);
        GameManager.Instance.MenuRoot = menuRoot;

        var dialogueRoot:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        callbackThis.addChild(dialogueRoot);
        GameManager.Instance.DialogueRoot = dialogueRoot;

        MenuManager.Instance.Push(MenuManager.Instance.GameBeginMenu);
    }
}


