class TranslateTween implements IMenuTween
{
    _tweenTime:number = 300;
    public get TweenTime():number{return this._tweenTime;}
    _initialDelay:number;
    private _showPos:egret.Point;
    private _hidePos:egret.Point;
    private _gameObject:egret.DisplayObject;

    constructor(gameObject:egret.DisplayObject,
                initialDelay:number,
                showPos:egret.Point,
                hidePos:egret.Point)
    {
        this._gameObject = gameObject;
        this._initialDelay = initialDelay;
        this._showPos = showPos;
        this._hidePos = hidePos;
    }

    Show():number
    {
        var target = this._gameObject;
        var tween:egret.Tween = egret.Tween.get(target);
        if(this._initialDelay>0)tween.wait(this._initialDelay);
        tween.to({"x":this._showPos.x,"y":this._showPos.y},this._tweenTime);
        return this.GetTime();
    }

    Hide(callback:Function = null):number
    {
        var target = this._gameObject;
        var tween:egret.Tween = egret.Tween.get(target);
        if(this._initialDelay>0)tween.wait(this._initialDelay);
        tween.to({"x":this._hidePos.x,"y":this._hidePos.y},this._tweenTime);
        return this.GetTime();
    }

    SnapShow():void
    {
        this._gameObject.x = this._showPos.x;
        this._gameObject.y = this._showPos.y;
    }

    SnapHide():void
    {
        this._gameObject.x = this._hidePos.x;
        this._gameObject.y = this._hidePos.y;
    }

    GetTime():number
    {
        return this._initialDelay + this._tweenTime;
    }

}