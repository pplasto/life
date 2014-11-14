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
        label.anchorX = label.anchorY = 0.5;

        var bgr:egret.Shape = new egret.Shape();
        bgr.name = "bgr";
        bgr.graphics.beginFill(upColor);
        bgr.graphics.drawRect( 0,0,w,textSize*1.5);
        bgr.graphics.endFill();
        bgr.width = w;
        bgr.height = textSize*1.5;
//        bgr.anchorX = bgr.anchorY = 0.5;

        btn.addChild(bgr);
        btn.addChild(label);

        btn.anchorX = btn.anchorY = 0.5;

        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent)=>{
            var bgr:egret.Shape = e.currentTarget.getChildByName("bgr");
            bgr.graphics.beginFill(pressColor);
            bgr.graphics.drawRect( 0,0,w,textSize*1.5);
            bgr.graphics.endFill();
            //console.log(e.currentTarget.width + " " + e.currentTarget.height);
        },btn);

        var touchEndEvent:Function = function (e:egret.TouchEvent):void {
            var _bgr:egret.Shape = <egret.Shape>e.currentTarget.getChildByName("bgr");
            _bgr.graphics.beginFill(upColor);
            _bgr.graphics.drawRect(0, 0, w, textSize * 1.5);
            _bgr.graphics.endFill();
        };
        btn.addEventListener(egret.TouchEvent.TOUCH_END,touchEndEvent,btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,touchEndEvent,btn);

        btn.touchEnabled = true;
        return btn;
    }
}