// app.post('/hello',async(req,res)=>{
//     let sender=[]
//      let receiver=[]
//      let interest=await Interest.find().populate("Sender","-Password").populate("Receiver","-Password").then((Sender)=>{
//          sender.push(Sender);
//      }).catch((err)=>{throw err})
//      console.log(sender[0])
//  })