let n=document.querySelectorAll(".num");
let s=document.querySelector(".screen");
let clr=document.querySelector(".clear");
let del=document.querySelector(".del");
let res=document.querySelector(".result");
let h=document.querySelector(".history");
let cal=document.querySelector(".cal");
let cose=document.querySelector(".cls");
let hisdata=document.querySelector(".hdata");
let historyClear=document.querySelector(".hisclear");
historyClear.addEventListener("click",()=>{
    hisdata.innerText="";
    history=[];
});
cose.addEventListener("click",()=>{
    cal.style.zIndex="2";
});
h.addEventListener("click",()=>{
    cal.style.zIndex="0";
    let histring="";
    let ind=1;
    history.forEach((l)=>{
        histring+=`${ind}) ${l}`;
        histring+="\n-------------------------------------\n";
        ind++;
    });
    hisdata.innerText=histring;
});
let data=[];
let sfinal=[];
let final=[];
let history=[];
let x=0;
function finish(){
    sfinal=[];
    x=0;
    for(let i=0;i<data.length;i++){
        if(data[i]!="+"&&data[i]!="-"&&data[i]!="x"&&data[i]!="/"&&data[i]!="%"){
            if(sfinal[x]==undefined)
            sfinal[x]=data[i];
            else
            sfinal[x]+=data[i];
        }else{
            x++;
            sfinal[x]=data[i];
            x++;
        }
    }
    final=[];
    for(let i=0;i<sfinal.length;i++){
        if(sfinal[i]!="+"&&sfinal[i]!="-"&&sfinal[i]!="x"&&sfinal[i]!="/"&&sfinal[i]!="%")
        final[i]=parseFloat(sfinal[i]);
        else
        final[i]=sfinal[i];
    }
}
let r;
function rlt(){
    if(final.length==0){
        s.innerText="";
        return ;
    }
    let i=0;
    while(i<final.length){
        if(final[i]=="/"){
            let answer=final[i-1]/final[i+1];
            final[i-1]=answer;
            final.splice(i,2);
        }else if(final[i]=="x"){
            let answer=final[i-1]*final[i+1];
            final[i-1]=answer;
            final.splice(i,2);
        }else if(final[i]=="%"){
            let answer=final[i-1]*final[i+1];
            answer/=100;
            final[i-1]=answer;
            final.splice(i,2);
        }else{
            i++;
        }
    }
    i=0;
    while(i<final.length){
        if(final[i]=="+"){
            let answer=final[i-1]+final[i+1];
            final[i-1]=answer;
            final.splice(i,2);
        }else if(final[i]=="-"){
            let answer=final[i-1]-final[i+1];
            final[i-1]=answer;
            final.splice(i,2);
        }else{
            i++;
        }
    }
    r=final[0];
}
res.addEventListener("click",()=>{
    if(!(s.innerText.includes('='))){
        finish();
        rlt();
        if(s.innerText.length!=0)
        s.innerText+="="+r;
        history.push(s.innerText);
    }
});
s.innerText="";
let str="";
del.addEventListener("click",function(){
    if(!(s.innerText.includes("="))){
        str=s.innerText;
        str=str.slice(0,str.length-1);
        s.innerText=str;
        data.pop();
    }
});
function clearing(){
    s.innerText="";
    data=[];
    sfinal=[];
    final=[];
}
clr.addEventListener("click",clearing);
function f(){
    if(this.getAttribute("class")=="op keys num divi"){
        data.push("/");
        s.innerText+="/";
    }else{
        data.push(this.innerText);
        s.innerText+=this.innerText;
    }
}
n.forEach((l)=>{
    l.addEventListener("click",f);
});