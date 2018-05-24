var mongoose = require("mongoose");
var Employee = require('../mongoModels/employee');
module.exports = () => {
    var employee = {};
    
    employee.createEmp = (req, res) =>{
        console.log(req.body);
        var obj = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            address : req.body.address,
            contact : req.body.contact
        }
        console.log(obj);
        
        var emp = new Employee(obj);

        emp.save((err, result) => {
            if(err){
                res.json({success : false, message : "Error in saving data"})
            }
            else{
                res.json({success : true, message : "Employee created successfully", data : result})
            }
        })
    }

    employee.getAllEmpList = (req, res) =>{
        
        Employee.find().exec((err, empData) => {
            if(err){
                res.json({success : false, message : "Error in finding data"})
            }
            else{
                res.json({success : true, data : empData})
            }
        })
    }

    employee.getEmp = (req, res) =>{
        console.log("In get emp")
        console.log(req.body);
        Employee.find({_id:req.body.id}).exec((err, empData) => {
            if(err){
                res.json({success : false, message : "Error in finding data"})
            }
            else{
                res.json({success : true, data : empData})
            }
        })
    }

    employee.deleteEmp = (req, res) =>{
        Employee.remove({_id:req.query.id}).exec((err, empData) => {
            if(err){
                res.json({success : false, message : "Error in finding data"})
            }
            else{
                res.json({success : true, message : "employee deleted sucessfully"})
            }
        })
    }

    employee.updateEmp = (req, res) =>{
            var query = { $set: { firstName : req.body.firstName,lastName : req.body.lastName,address : req.body.address,contact : req.body.contact} };

        Employee.update({_id:req.body["_id"]},query).exec((err, empData) => {
            console.log(empData)
            console.log(err)
            if(err){
                res.json({success : false, message : "Error in finding data"})
            }
            else{
                res.json({success : true, message : "employee deleted sucessfully"})
            }
        })
    }    

    return employee;
}