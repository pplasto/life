class GameBegin extends Menu
{
    private static TypeDelta:number = 300;
    private static TypeFlashDelta:number = 100;

    private _tempText:string = "你的人生开始了...";
    private _beginTypedLabel:egret.TextField;
    private _touchHintLabel:egret.TextField;
    private _currTime:number;
    private _typeTextNum:number;

    private _currTypeTime:number;
    private _isTypeFlash:boolean;

    constructor()
    {
        super();
        this.name = "GameBegin";

        this.Parent = GameManager.Instance.MenuRoot;

        this.OnCreateHandle = this.createContent;

        this.OnOpenBeginHandle = ()=>{
            this._touchHintLabel.alpha = 0;
            this._beginTypedLabel.text = "LIFE";
        };

        this.OnOpenEndHandle = ()=> {
            this._currTime = 0;
            this._typeTextNum = 0;
            this._currTypeTime = 0;
            this._isTypeFlash = false;

            egret.Tween.get(this)
                .wait(1000)
                .call(()=>{
                    this._beginTypedLabel.text = "";
                    egret.Ticker.getInstance().register(this.update,this);
                });
        }

        this.OnCloseBeginHandle = ()=> {
            egret.Ticker.getInstance().unregister(this.update,this);
        }
    }

    private update(frameTime:number):void
    {
        this._currTypeTime += frameTime;
        if(this._currTypeTime > GameBegin.TypeFlashDelta)
        {
            this._currTypeTime = 0;
            this._isTypeFlash = !this._isTypeFlash;
            this.toggleTextEnd(this._isTypeFlash);
        }

        this._currTime += frameTime;
        if(this._currTime > GameBegin.TypeDelta)
        {
            this._currTime = 0;
            this.typeText();
        }
    }

    private createContent():void
    {
        var stageW:number = egret.MainContext.instance.stage.stageWidth;
        var stageH:number = egret.MainContext.instance.stage.stageHeight;

//      BackGround
//        var bgr:egret.Shape = new egret.Shape();
//        bgr.graphics.beginFill(0x888888);
//        bgr.graphics.drawRect(0,0,stageW,stageH);
//        bgr.graphics.endFill();
//        bgr.name = "Color BackGround";
//        this.addChild(bgr);

//        console.log("CreateContent");
        this._beginTypedLabel = Utils.CreateLabel("LIFE",stageW/2,stageH/2,20,egret.HorizontalAlign.CENTER,0xffffff,true);
        this._beginTypedLabel.name = "LIFE Label";
        this.addChild(this._beginTypedLabel);
        //this._beginTypedLabel.touchEnabled = true;

        this._touchHintLabel = Utils.CreateLabel("点击继续",stageW/2,stageH/2+50,16,egret.HorizontalAlign.CENTER,0xffffff,true);
        this._touchHintLabel.alpha = 0;
        this._touchHintLabel.name = "点击继续 Label";
        this.addChild(this._touchHintLabel);

        // transition
        var beginTextTransition:Transition = Transition.FastCreateTranslateTween(
            this._beginTypedLabel,0.2,
            new egret.Point(stageW/2,stageH/2),
            new egret.Point(stageW/2,-20)
        );
        beginTextTransition.SnapHide();
        this._localTransitions.push(beginTextTransition);

        // 触摸事件
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.Event)=>{
            console.log("GameBegin touched: "+e.target.name + " currTarget: "+ e.currentTarget.name);
            this.touchEnabled = false;
            egret.Tween.get(this._touchHintLabel).to({"alpha":0},500);
            MenuManager.Instance.Push(MenuManager.Instance.SelectGenderMenu);
        },this);
    }

    private typeText():void
    {
        if(this._typeTextNum < this._tempText.length) {
            this._typeTextNum++;
            this._beginTypedLabel.text = this._tempText.slice(0, this._typeTextNum)+(this._isTypeFlash?"|":" ");
            if(this._typeTextNum == this._tempText.length)
                egret.Tween.get(this).wait(2000).call(this.onTypeEnd);
        }
    }

    private toggleTextEnd(flash:boolean):void
    {
        var text:string = this._beginTypedLabel.text;
        text = text.slice(0,text.length-1);
        if(flash)
            this._beginTypedLabel.text = text + "|";
        else
            this._beginTypedLabel.text = text + " ";
    }

    private onTypeEnd():void
    {
        console.log("GameBegin OnTypeEnd");
        egret.Tween.get(this._touchHintLabel).to({"alpha":1},500).call(()=>this.touchEnabled = true,this);
    }
}