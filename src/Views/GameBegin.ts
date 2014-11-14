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

        this.OnOpenEndHandle = function() {
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

        this.OnCloseBeginHandle = function() {
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
        var bgr:egret.Shape = new egret.Shape();
        bgr.graphics.beginFill(0x888888);
        bgr.graphics.drawRect(0,0,stageW,stageH);
        bgr.graphics.endFill();
        this.addChild(bgr);

//        console.log("CreateContent");
        var beginText:egret.TextField = new egret.TextField();
        beginText.anchorX = beginText.anchorY = 0.5;
        beginText.textColor = 0xffffff;
        beginText.x = stageW/2;
        beginText.y = stageH/2;
        beginText.textAlign = egret.HorizontalAlign.CENTER;
        beginText.size = 20;
        beginText.text = "LIFE";
        this.addChild(beginText);

        var touchHint:egret.TextField = new egret.TextField();
        touchHint.anchorX = beginText.anchorY = 0.5;
        touchHint.textColor = 0xffffff;
        touchHint.x = stageW/2;
        touchHint.y = stageH/2 + 50;
        touchHint.textAlign = egret.HorizontalAlign.CENTER;
        touchHint.size = 16;
        touchHint.text = "点击继续";
        touchHint.alpha = 0;
        this.addChild(touchHint);

        // transition
        var beginTextTransition:Transition = Transition.FastCreateTranslateTween(
            beginText,0.2,
            new egret.Point(stageW/2,stageH/2),
            new egret.Point(stageW/2,-20)
        );
        beginTextTransition.SnapHide();
        this._localTransitions.push(beginTextTransition);

        // 保存指针
        this._beginTypedLabel = beginText;
        this._touchHintLabel = touchHint;

        // 触摸事件
        this.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
            console.log("GameBegin touched");
            this.touchEnabled = false;
            egret.Tween.get(this._touchHintLabel).to({"alpha":0},500);
            // MenuManager.Instance.PopAndPush(MenuManager.Instance.MainMenu);
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