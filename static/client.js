const socket = io();
const form = document.getElementById('send_container')
const msginput= document.getElementById('message_send')
const msgcon= document.querySelector(".container")
var audio=new Audio("../notification.mp3")
const append=(msg,pos)=>
{
    const msgelmt=document.createElement('div')
    // msgelmt.innerText=msg
    msgelmt.innerHTML=msg
    // msgelmt.classList.add(msg)
    msgelmt.classList.add(pos)
    msgcon.append(msgelmt)
    if(pos=='left')
    {    
        audio.play()
    }
}

const nam=prompt("Enter your Name")
socket.emit('new_user_joined',nam)

socket.on('user_joined',data2=>
{
    console.log("user joined worked")
    // append(nam+" joined the chat",'left')
    append(data2.nam+" joined the chat",'left')
})
socket.on('receive',data=>
{
    console.log("receive working")
    append(data.nam+":"+data.message,'left')
})
socket.on('went',nam=>
{
    append(nam+" Left the chat",'left')
})

form.addEventListener('submit',(e)=>
{//prevent default prevents page from loading which happens normallhy when form is submitted
    e.preventDefault()
    const message=msginput.value
    append("You:"+message,'right')
    socket.emit('send',message)
    document.getElementById('send_container').reset()
})  