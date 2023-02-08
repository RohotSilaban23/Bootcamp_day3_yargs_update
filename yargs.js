const yargs = require("yargs");
const funtion = require('./function');
const validate = require('validator')


yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder:{
        name:{
            describe:'contact Name',
            demandOption: true,
            type:'string',
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type : 'string'
        },
        mobile:{
            describe: 'contact mobile phone number',
            demandOption: true,
            type : 'string',
        },
    },
    handler(argv){
            const name = argv.name;
            const email = argv.email;
            if(email == null){
                console.log("Email anda kosong, melanjutkan proses")
            } else if(!validate.isEmail(email)) {
                console.log("format email anda salah!!")
                process.exit(0)
            }
            const mobile = argv.mobile;
            if(mobile == null){
                console.log("masukkan nomer hp anda")
            } else if(!validate.isMobilePhone(mobile, 'id-ID')) {
                console.log("format nomor anda salah!!")
                process.exit(0)
            }
            
        funtion.savedate(name, email, mobile)
        
    }

})

yargs.command({
    command: 'remove',
    describe: 'renove a contact',
    builder:{
        name:{
            describe:'contact Name',
            demandOption: true,
            type:'string',
        }
    },
    handler(argv){

            funtion.removedate(argv.name);
            
        
        
    }

})

yargs.command({
    command: 'detail',
    describe: 'detail a contact',
    builder:{
        name:{
            describe:'contact Name',
            demandOption: true,
            type:'string',
        }
        
    },
    handler(argv){

            funtion.detaildate(argv.name);     
    }

})

yargs.command({
    command: 'list',
    describe: 'list a contact',
    handler(argv){

            funtion.listcontact()     
    }

})

yargs.command({
    command: 'update',
    describe: 'update a new contact',
    builder:{
        name:{
            describe:'contact Name',
            demandOption: true,
            type:'string',
        },
        Newname:{
            describe:'contact new Name',
            demandOption: false,
            type:'string',
        }, 

        email: {
            describe: 'contact email',
            demandOption: false,
            type : 'string'
        },
        mobile:{
            describe: 'contact mobile phone number',
            demandOption: false,
            type : 'string',
        },
        
      
    },
    handler(argv){
            
            
        funtion.updateDate(argv.name,argv.Newname,argv.email, argv.mobile)
        
    }

})

yargs.parse()
// console.log(yargs.argv)