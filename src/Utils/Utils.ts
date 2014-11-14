class Utils
{
    public static CreateLabel(text:string,x:number = 0,y:number = 0,size:number = 20,align:string = egret.HorizontalAlign.LEFT,color:number = 0xffffff,anchorCenter:boolean = false):egret.TextField
    {
        //var label:egret.BitmapText = new egret.BitmapText();
        var label:egret.TextField = new egret.TextField();
        if(anchorCenter)label.anchorX = label.anchorY = 0.5;
        label.textColor = color;
        label.x = x;
        label.y = y;
        label.textAlign = align;
        label.text = text;
        label.size = size;
//        label.alpha = 0;
        return label;
    }

    public static CreateSimpleButton(text:string,textSize:number,w:number,upColor:number,pressColor:number):egret.Sprite
    {
        var btn:egret.Sprite = new egret.Sprite();
        var label:egret.TextField = new egret.TextField();
        label.text = text;
        label.x = w/2;
        label.y = (textSize*1.5)/2;
        label.size = textSize;
        label.anchorX = 0.5;
        label.anchorY = 0.5;

        btn.anchorX = 0.5;
        btn.anchorY = 0.5;
        btn.graphics.beginFill(upColor);
        btn.graphics.drawRect( -w/2,-textSize*1.5/2,w,textSize);
        btn.graphics.endFill();

        btn.addChild(label);

        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent)=>{
            e.target.graphics.beginFill(pressColor);
            e.target.graphics.drawRect( -w/2,-textSize*1.5/2,w,textSize);
            e.target.graphics.endFill();
        },btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_END,(e:egret.TouchEvent)=>{
            e.target.graphics.beginFill(upColor);
            e.target.graphics.drawRect( -w/2,-textSize*1.5/2,w,textSize);
            e.target.graphics.endFill();
        },btn);

        btn.touchEnabled = true;
        return btn;
    }
}