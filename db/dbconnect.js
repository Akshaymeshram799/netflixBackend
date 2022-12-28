const mongoose = require('mongoose');

mongoose.set('strictQuery','true')



mongoose.connect('mongodb://localhost:27017/netflixUsers',{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`connected with database`);
    }
}
)


module.exports 
