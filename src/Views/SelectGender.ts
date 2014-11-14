class SelectGender extends Menu
{
    constructor ()
    {
        super();
        this.name = "SelectGender";
        this.Parent = GameManager.Instance.MenuRoot;
        this.OnCreateHandle = ()=>{};
        this.OnOpenBeginHandle = ()=>{};
        this.OnOpenEndHandle = ()=>{};
        this.OnCloseBeginHandle = ()=>{};
    }

    private onCreate():void{

    }
}