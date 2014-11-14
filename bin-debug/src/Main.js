//class TestClass
//{
//    func(){}
//}
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
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
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        ResLoadManager.GetInstance().GameLoading(this, this.preLoadOK, this);
    };
    Main.prototype.preLoadOK = function (callbackThis) {
        GameManager.Instance.GameRoot = callbackThis;
        var menuRoot = new egret.DisplayObjectContainer();
        callbackThis.addChild(menuRoot);
        GameManager.Instance.MenuRoot = menuRoot;
        var dialogueRoot = new egret.DisplayObjectContainer();
        callbackThis.addChild(dialogueRoot);
        GameManager.Instance.DialogueRoot = dialogueRoot;
        MenuManager.Instance.Push(MenuManager.Instance.GameBeginMenu);
    };
    return Main;
})(egret.DisplayObjectContainer);
//# sourceMappingURL=Main.js.map