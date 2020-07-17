const { age, date, grade } = require('../../lib/utils')
const Student = require ('../models/Student')
const Intl = require('intl')

module.exports = {

    index(req, res){

        let { filter , page, limit } = req.query

        page = page || 1
        limit = limit || 2

        let offset = limit * ( page - 1 )

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                
                return res.render('students/index', {students, pagination, filter})
            }
        }
        Student.paginate(params)
        
    },
    create(req, res){
        Student.teachersSelectOptions(function(options){
            return res.render('students/create', {teacherOptions: options})
        })

        
    },
    post(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if (req.body[key] == "" ){
                return res.send('Por favor, Preencha todos os campos!')
            } 
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
        
        
    },
    show(req, res){
       
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado")

            student.age = age(student.birth_date)
            student.birthDay = date(student.birth_date).birthDay
            student.grade = grade(student.education_level)
            
            return res.render('students/show', { student })
        })
    },
    edit(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if (req.body[key] == "" ){
                return res.send('Por favor, Preencha todos os campos!')
            } 
        }
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado")

            student.birth_date = date(student.birth_date).iso

            Student.teachersSelectOptions(function(options){
                return res.render('students/edit', {student, teacherOptions: options})
            })
   
        })
    },
    put(req, res){
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    },
}