let n=document.querySelectorAll(".num");
let s=document.querySelector(".screen");
let clr=document.querySelector(".clear");
let del=document.querySelector(".del");
let res=document.querySelector(".result");
let h=document.querySelector(".history");
let cal=document.querySelector(".cal");
let cose=document.querySelector(".cls");
let hisdata=document.querySelector(".hdata");
cose.addEventListener("click",()=>{
    cal.style.zIndex="2";
});
h.addEventListener("click",()=>{
    cal.style.zIndex="0";
    let histring="";
    let ind=1;
    history.forEach((l)=>{
        histring+=`${ind}) ${l}`;
        histring+="\n";
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
    data=[];
    sfinal=[];
    final=[];
}
res.addEventListener("click",()=>{
    finish();
    rlt();
    console.log(r);
    if(s.innerText.length!=0)
    s.innerText+="="+r;
    history.push(s.innerText);
});
s.innerText="";
let str="";
del.addEventListener("click",function(){
    str=s.innerText;
    str=str.slice(0,str.length-1);
    s.innerText=str;
    data.pop();
});
clr.addEventListener("click",function(){
    s.innerText="";
    data=[];
    sfinal=[];
    final=[];
    r=0;
    console.log("history : ",history);
});
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