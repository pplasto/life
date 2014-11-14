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
//        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent)=>console.log(e.stageX+" "+e.stageY),this);
    }

    private preLoadOK(callbackThis:any):void
    {
        var bgr:egret.Shape = new egret.Shape();
        bgr.graphics.beginFill(0x888888);
        bgr.graphics.drawRect(0,0,callbackThis.stage.stageWidth,callbackThis.stage.stageHeight);
        bgr.graphics.endFill();
        callbackThis.addChild(bgr);

        GameManager.Instance.GameRoot = callbackThis;

        var menuRoot:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        callbackThis.addChild(menuRoot);
        GameManager.Instance.MenuRoot = menuRoot;

        var dialogueRoot:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        callbackThis.addChild(dialogueRoot);
        GameManager.Instance.DialogueRoot = dialogueRoot;

//        var showInfo:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
//        callbackThis.addChild(showInfo);

        MenuManager.Instance.Push(MenuManager.Instance.GameBeginMenu);
//        MenuManager.Instance.Push(MenuManager.Instance.SelectGenderMenu);
    }
}


