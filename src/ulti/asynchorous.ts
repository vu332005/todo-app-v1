export function debounce(callBack:(arg: any)=>void  ,time: number){
    let id: number;
    const a =  function(..._arg: any){
        clearTimeout(id)
        id = setTimeout(()=>{
            callBack(_arg)
        },time)
    }
    a.clear = function(){
        clearTimeout(id)
    }
    return a
}