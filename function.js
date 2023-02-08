
const readline = require('readline');
const { resolve } = require('path');
const fs = require('fs')
const validate = require('validator');
const { log } = require('console');

// memeriksan apakah folder ada atau tidak jika tidak maka buat
if (!fs.existsSync('data')){
    fs.mkdirSync('data')
    console.log("Folder Tidak DiTemukan, Menbuat Folder Baru")
  };
  // memeriksan apakah file ada atau tidak jika tidak maka buat
if(!fs.existsSync('data/contacts.json')){
fs.writeFileSync('data/contacts.json', JSON.stringify([]))
console.log("File Tidak DiTemukan, Menbuat File Baru")
 }
 
// funsi untuk menyimpan data
const savedate =  async(name, email, mobile) =>{
    //fungsi untuk mencek data didalam json
    var data = fs.readFileSync('data/contacts.json', 'utf8')
    //men parse data dalam json
    var obj =  JSON.parse(data)
   // untuk memeriksa apakah ada nama yang di input 
   //sudah ada pada database atai tidak
    for(let i=0 ; i<obj.length ;i++){
        
        
        if(obj[i].name.toLowerCase()== name.toLowerCase()){

            console.log('nama sudah ada pada data')
            process.exit(0)
        }
    }
    //melihat apakah data email yg false ada atau tidak
    // jika tidak ada maka tetap diinput ke json
    if(email == null ){
        obj.push({name, mobile})
    } else {
        obj.push({name, mobile, email})
    }
    // untuk mebuat data yg di input ke array
    json = JSON.stringify(obj)
    //untuk menulis data pada jsongit
    fs.writeFileSync('data/contacts.json', json)
    process.exit(0)
}

//funsi untuk memeriksa data json dan menparse
const loadContacts = function () {
    try {
        const data = fs.readFileSync('data/contacts.json');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

//fungsi untuk mecari data dan menamilkan detail data
const detaildate = function(name) {
    const date = loadContacts()
    console.log(name);
    const contactsToKeep = date.find((contact) => 
        contact.name.toLowerCase() === name.toLowerCase()
    )
    if(!contactsToKeep){
        console.log(`data ${name}, tidak ditemukan`)
        return false
    } 
    return contactsToKeep
    
   
    
    
}

// fungsi untul mengeluarkan list data ada json
const listcontact = function() {
        const contact = loadContacts()
        console.log("Your contacts..")
        contact.forEach((contact, index) => {
            console.log(index+1 ,contact.name ,'-', contact.mobile)
        });
    }

    // funsi untuk menghaus data dengan cara menima data lama denga data yang baru
const removedate = function(name) {
    const contacts = loadContacts()
    const contactsToKeep = contacts.filter(function(contact) {
        return contact.name.toLowerCase() !== name.toLowerCase()
    })
    if(contacts.length > contactsToKeep.length) {
        
        json = JSON.stringify(contactsToKeep)
        fs.writeFileSync('data/contacts.json', json)
    }
    else {
        console.log("No note Found")
    }
}

const updateDate = function(name,Newname, email, mobile) {
    const data = detaildate(name);
    const date =loadContacts()

    if(Newname == null){
        Newname = data.name
    }
    if(email==null){
        email= data.email
    }
    if(mobile == null){
        mobile = data.mobile
    }

    
    const contactsToKeep = date.filter((contact) => 
    contact.name.toLowerCase() !== Newname.toLowerCase()
     )
    console.log(contactsToKeep)
    if(contactsToKeep){
        console.log(`data ${name}, sudah ada`)
        return false
    } 
   
   
    removedate(name)
    savedate(Newname, email,mobile)
    
   

}

module.exports = { savedate, detaildate, listcontact , removedate, updateDate};
