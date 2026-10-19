(function(){
var $=function(i){return document.getElementById(i)};
// Matrix heart rain
var c=$('rain'),x=c.getContext('2d'),W,H,fs=20,cols=[];
function size(){W=c.width=innerWidth;H=c.height=innerHeight;cols=[];for(var i=0;i<Math.ceil(W/fs);i++)cols.push(Math.floor(Math.random()*-30))}
function draw(){
x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.1)';x.fillRect(0,0,W,H);
x.globalCompositeOperation='source-over';x.font=fs+'px monospace';x.textAlign='center';
for(var i=0;i<cols.length;i++){var px=i*fs+fs/2,py=cols[i]*fs;
var r=Math.random(),cat=r<.12;x.fillStyle='rgba(255,70,150,.85)';x.fillText(cat?'😸':(r<.35?'♡':'♥'),px,py-fs);
x.fillStyle='#ffe3ef';x.shadowColor='#ff3d8b';x.shadowBlur=12;x.fillText(cat?'😸':'♥',px,py);x.shadowBlur=0;
if(py>H&&Math.random()>.97)cols[i]=0;else cols[i]++}}
addEventListener('resize',size);size();setInterval(draw,70);

// Music: phát file music.mp3 khi bấm nút bắt đầu
var MUSIC_FILE='music.mp3',bgm=null,muted=false;
function startMusic(){
$('mute').style.display='block';
if(!bgm){bgm=new Audio(MUSIC_FILE);bgm.loop=true;bgm.volume=.7}
if(!muted){var p=bgm.play();if(p&&p.catch)p.catch(function(e){console.log('Không phát được nhạc:',e)})}
}
$('mute').onclick=function(){
muted=!muted;
if(!bgm)return;
if(muted){bgm.pause();this.textContent='🔇'}
else{bgm.play();this.textContent='🔊'}
};

// 3-2-1 then wish
var NAME='Lanh',run=0;
function show(id,d){$(id).style.display=d}
function begin(){
startMusic();var id=++run,n=3;
show('start','none');show('wish','none');show('gallery','none');show('count','block');
(function step(){
if(id!==run)return;
if(n===0){show('count','none');wish(id);return}
var el=$('num');el.textContent=n;el.style.animation='none';void el.offsetWidth;el.style.animation='';
n--;setTimeout(step,1000)})()}
function wish(id){
var lines=['Chào em','20/10 này thì chắc em được chúc xinh đẹp và vui vẻ rồi','Thôi thì, anh chúc em thành\u00a0công\u00a0và\u00a0mạnh\u00a0khoẻ','Cũng như tìm được người làm em cười nhiều hơn mỗi ngày nhé','Và chúc em đỗ được nguyện vọng 1 vào trường mình yêu thích nha','Gửi '+NAME+' 😸'];
var p=$('wp'),k=0;show('wish','flex');
(function next(){
if(id!==run)return;
p.className='out';p.textContent=lines[k];void p.offsetWidth;p.className='';
if(k===lines.length-1){setTimeout(function(){if(id!==run)return;var w=$('wish');w.classList.add('fade');setTimeout(function(){if(id!==run)return;show('wish','none');w.classList.remove('fade');gallery(id)},1300)},3500);return}
k++;
setTimeout(function(){if(id!==run)return;p.className='out';setTimeout(next,450)},k===1?1500:4000)})()}
// Danh sach anh: them duong dan anh vao day, vi du ['photos/1.jpg','photos/2.jpg']
var PHOTOS=['photos/1.jpg', 'photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg', 'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg'];
function gallery(id){
if(!PHOTOS.length)return;
var ph=$('ph'),j=0;show('gallery','block');
(function nx(){if(id!==run)return;
ph.classList.remove('on');
setTimeout(function(){if(id!==run)return;ph.onload=function(){ph.classList.add('on')};ph.src=PHOTOS[j%PHOTOS.length];j++;if(ph.complete)ph.classList.add('on');setTimeout(nx,3000)},350)})()}
$('go').onclick=begin;
})();