class SelectGender extends Menu
{
    _title:egret.TextField;
    _maleBtn:egret.Sprite;
    _femaleBtn:egret.Sprite;

    constructor ()
    {
        super();
        this.name = "SelectGender";
        this.Parent = GameManager.Instance.MenuRoot;
        this.OnCreateHandle = this.onCreate;
        this.OnOpenBeginHandle = ()=>{
            this._localTransitions.forEach((transition)=>transition.SnapHide());
            this._maleBtn.touchEnabled = false;
            this._femaleBtn.touchEnabled = false;
        };
        this.OnOpenEndHandle = ()=>{
            this._maleBtn.touchEnabled = true;
            this._femaleBtn.touchEnabled = true;
        };
        this.OnCloseBeginHandle = ()=>{
            this._maleBtn.touchEnabled = false;
            this._femaleBtn.touchEnabled = false;
        };
    }

    private onCreate():void{
        var stageW:number = egret.MainContext.instance.stage.stageWidth;
        var stageH:number = egret.MainContext.instance.stage.stageHeight;

        this._title = Utils.CreateLabel("请选择性别",stageW/2,stageH/2-50,20,egret.HorizontalAlign.CENTER,0xffffff,true);
        this.addChild(this._title);

        this._maleBtn = Utils.CreateSimpleButton("男",16,40,0x008800,0x880000);
        this._maleBtn.x = stageW/2 - 30;
        this._maleBtn.y = stageH/2 + 10;
        this.addChild(this._maleBtn);
        this._maleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.Event)=>{
            MenuManager.Instance.Pop();
        },this);

        this._femaleBtn = Utils.CreateSimpleButton("女",16,40,0x008800,0x880000);
        this._femaleBtn.x = stageW/2 + 30;
        this._femaleBtn.y = stageH/2 + 10;
        this.addChild(this._femaleBtn);

        console.log(this._maleBtn.width + " " + this._maleBtn.height);

        // transitions
        var titleTrans:Transition = Transition.FastCreateTranslateTween(this._title,0,
            new egret.Point(stageW/2, stageH/2 - 50),
//            new egret.Point(),
            new egret.Point(stageW/2, -20));
        var maleBtnTrans:Transition = Transition.FastCreateTranslateTween(this._maleBtn,0,
            new egret.Point(stageW/2 - 30, stageH/2 + 10),
//            new egret.Point(),
            new egret.Point(-30, stageH/2 + 10));
        var femaleBtnTrans:Transition = Transition.FastCreateTranslateTween(this._femaleBtn,0,
            new egret.Point(stageW/2 + 30, stageH/2 + 10),
            new egret.Point(stageW + 30, stageH/2 + 10));
        this._localTransitions.push(titleTrans,maleBtnTrans,femaleBtnTrans);
    }
}