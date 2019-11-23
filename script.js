matr=[];
setInterval(ConvertInputs,5);

lastQ=""
lastEXYZ=""
lastEXZY=""
lastEYXZ=""
lastEYZX=""
lastEZXY=""
lastEZYX=""

function ConvertInputs(){
  let arrayConv=[
    ConvertQ,
    ConvertEXYZ,
    ConvertEXZY,
    ConvertEYXZ,
    ConvertEYZX,
    ConvertEZXY,
    ConvertEZYX
  ];

  arrayConv.forEach(function(converter){
    try{
      converter();
    }catch(e){
      console.log("Q error");
      console.log(e);
    }
  });
}

function normQ(q){
  let length=Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3])
  q[0]/=length;
  q[1]/=length;
  q[2]/=length;
  q[3]/=length;
}

function ConvertQ(){
  let qinput=$('#q1').val();
  if(lastQ==qinput)
    return;
  lastQ=qinput;

  let arr=qinput.split(',');
  arr=arr.map(Number);

  normQ(arr)

  let a=arr[3]
  let b=arr[0]
  let c=arr[1]
  let d=arr[2]

  

  let matrQ=[[],[],[]];

  matrQ[0]=[a*a+b*b-c*c-d*d,2*b*c-2*a*d,2*b*d+2*a*c];
  matrQ[1]=[2*b*c+2*a*d,a*a-b*b+c*c-d*d,2*c*d-2*a*b];
  matrQ[2]=[2*b*d-2*a*c,2*c*d+2*a*b,a*a-b*b-c*c+d*d];

  matr[6]=matrQ;
  $("#matr6").text(matrixToString(matr[6]));
  $("#msg").text(matrixToString(matrQ))
}

function GetRotX(a){
  let matrR=[
    [1,0,0],
    [0,Math.cos(a),-Math.sin(a)],
    [0,Math.sin(a),Math.cos(a)]];
  return matrR;
}

function GetRotY(a){
  let matrR=[
    [Math.cos(a),0,Math.sin(a)],
    [0,1,0],
    [-Math.sin(a),0,Math.cos(a)]];
  return matrR;
}

function GetRotZ(a){
  let matrR=[
    [Math.cos(a),-Math.sin(a),0],
    [Math.sin(a),Math.cos(a),0],
    [0,0,1]];
  return matrR;
}

function matrMul(m1,m2){
  let matrR=[
    [0,0,0],
    [0,0,0],
    [0,0,0]];
  for(let i=0;i<3;i++)
    for(let r=0;r<3;r++)
      for(let o=0;o<3;o++){
        matrR[i][r]+=m1[i][o]*m2[o][r];
      }
  return matrR;
}

function ConvertEXYZ(){
  let inputEXYZ=$('#exyz').val();
  if(lastEXYZ==inputEXYZ)
    return;
  lastEXYZ=inputEXYZ;

  let matrR=ConvertE(inputEXYZ,"xyz");
  matr[0]=matrR;
  $("#matr0").text(matrixToString(matr[0]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertEXZY(){
  let inputEXZY=$('#exzy').val();
  if(lastEXZY==inputEXZY)
    return;
  lastEXZY=inputEXZY;

  let matrR=ConvertE(inputEXZY,"xzy");
  matr[1]=matrR;
  $("#matr1").text(matrixToString(matr[1]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertEYXZ(){
  let inputEYXZ=$('#eyxz').val();
  if(lastEYXZ==inputEYXZ)
    return;
  lastEYXZ=inputEYXZ;

  let matrR=ConvertE(inputEYXZ,"yxz");
  matr[2]=matrR;
  $("#matr2").text(matrixToString(matr[2]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertEYZX(){
  let inputEYZX=$('#eyzx').val();
  if(lastEYZX==inputEYZX)
    return;
  lastEYZX=inputEYZX;

  let matrR=ConvertE(inputEYZX,"yzx");
  matr[3]=matrR;
  $("#matr3").text(matrixToString(matr[3]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertEZXY(){
  let inputEZXY=$('#ezxy').val();
  if(lastEZXY==inputEZXY)
    return;
  lastEZXY=inputEZXY;

  let matrR=ConvertE(inputEZXY,"zxy");
  matr[4]=matrR;
  $("#matr4").text(matrixToString(matr[4]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertEZYX(){
  let inputEZYX=$('#ezyx').val();
  if(lastEZYX==inputEZYX)
    return;
  lastEZYX=inputEZYX;

  let matrR=ConvertE(inputEZYX,"zyx");
  matr[5]=matrR;
  $("#matr5").text(matrixToString(matr[5]));
  $("#msg").text(matrixToString(matrR));
}

function ConvertE(input,rotateOrder){

  let arr=input.split(',');
  arr=arr.map(Number);
  arr=arr.map(function(num) {
    return num * Math.PI / 180; 
  });

  let rX=arr[0]
  let rY=arr[1]
  let rZ=arr[2]

  let matrX=GetRotX(rX);
  let matrY=GetRotY(rY);
  let matrZ=GetRotZ(rZ);
  let matrR;
  switch(rotateOrder){
    case "xyz":
      matrR=matrMul(matrMul(matrX,matrY),matrZ)
      return matrR;
    case "xzy":
      matrR=matrMul(matrMul(matrX,matrZ),matrY)
      return matrR;
    case "yxz":
      matrR=matrMul(matrMul(matrY,matrX),matrZ)
      return matrR;
    case "yzx":
      matrR=matrMul(matrMul(matrY,matrZ),matrX)
      return matrR;
    case "zxy":
      matrR=matrMul(matrMul(matrZ,matrX),matrY)
      return matrR;
    case "zyx":
      matrR=matrMul(matrMul(matrZ,matrY),matrX)
      return matrR;
  }
}

function matrixToString(m)
{
  if(typeof(m)!="object"){
    return "";
  }
  let s = 
     '[[' +toFixedWidth(m[0][0])+', '+toFixedWidth(m[0][1])+', '+toFixedWidth(m[0][2])+']\n'
    +' [' +toFixedWidth(m[1][0])+', '+toFixedWidth(m[1][1])+', '+toFixedWidth(m[1][2])+']\n'
    +' [' +toFixedWidth(m[2][0])+', '+toFixedWidth(m[2][1])+', '+toFixedWidth(m[2][2])+']]';    
  return s;
}

function toFixedWidth(x){
	let s = x.toFixed(7);
  if (x >= 0) s = ' ' + s;
  return s;
}