class Transition
{
    private _deactivateOnHide:boolean;
    private _tweenArray:Array<IMenuTween>;

    constructor()
    {
        this._tweenArray = new Array<IMenuTween>();
    }

    public SnapShow():void
    {
        this._tweenArray.forEach(tween=>tween.SnapShow());
    }

    public SnapHide():void
    {
        this._tweenArray.forEach(tween=>tween.SnapHide());
    }

    public Show():number
    {
        var maxTime:number = 0;
        this._tweenArray.forEach(tween=>maxTime = Math.max(maxTime,tween.Show()));
        return maxTime;
    }

    public Hide():number
    {
        var maxTime:number = 0;
        this._tweenArray.forEach(tween=>maxTime = Math.max(maxTime,tween.Hide()));
        return maxTime;
    }

    public GetMaxTime():number
    {
        var maxTime:number = 0;
        this._tweenArray.forEach(tween=>maxTime = Math.max(maxTime,tween.GetTime()));
        return maxTime;
    }

    public AddItemTween(tween:IMenuTween):void
    {
        this._tweenArray.push(tween);
    }

    //TODO Remove Item Tween
    public RemoveItemTween(pTween:IMenuTween):void
    {
        var index:number = this._tweenArray.indexOf(pTween);
        if(index>0)this._tweenArray.splice(index,1);this._tweenArray.length -= 1;
    }

    public static FastCreateTranslateTween(
        thisObj:egret.DisplayObject,
        initialDelay:number,
        showPos:egret.Point,
        hidePos:egret.Point):Transition
    {
        var transition:Transition = new Transition();
        var translateTween:TranslateTween = new TranslateTween(thisObj,initialDelay,showPos,hidePos);
        transition.AddItemTween(translateTween);
        return transition;
    }
}
