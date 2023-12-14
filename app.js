const { Client } = require("pg")
const dotenv = require("dotenv")
const { program } = require('commander')
dotenv.config()
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432 || process.env.PORT
})
let res;
 
const connectDb = async () => {
    try {     
        await client.connect()  
    } catch (error) {
        console.log(error)
    }
}

const printAll = async () => {
    try {
        res = await client.query('SELECT * FROM todo;')
        console.log(res.rows)
    } catch (error) {
        console.log(error)
    }
}

const printPending = async () => {
    try {
        res = await client.query(`SELECT * FROM todo WHERE completed=false;`)
        console.log(res.rows)
    } catch (error) {
        console.log(error)
    }
}

const printDone = async () => {
    try {
        res = await client.query(`SELECT * FROM todo WHERE completed=true;`)
        console.log(res.rows)
    } catch (error) {
        console.log(error)
    }
}

const newTask = async (task_name) => {
    try {
        if (typeof(task_name)==="string")
        res = await client.query(`INSERT INTO todo (task_name) VALUES ('${task_name}');`)
    } catch (error) {
        console.log(error)
    }
}

const deleteTask = async (id) => {
    try {
        res = await client.query(`DELETE FROM todo WHERE id=${id};`)
    } catch (error) {
        console.log(error)
    }
}

const doneTask = async (id) => {
    try {
        res = await client.query(`UPDATE todo SET completed=true WHERE id=${id};`)       
    } catch (error) {
        console.log(error)
    }
}



program
    .option('--list [all|pending|done]', 'list current tasks')
    .option('--new <task_name>', 'creates a new task using a name')
    .option('--delete <id>', 'deletes a task using its id')
    .option('--done <id>', 'marks a task as complete using its id')
    .option('-h, --help', 'shows list of commands and explanations')

program.version('0.0.1', '--version', 'output the current version')
program.parse(process.argv)



const options = program.opts()

const run = (async () => {
    try {
        await connectDb()
        if (options.list=="all") await printAll()
        if (options.list=="pending") await printPending()
        if (options.list=="done") await printDone()
        if (options.new!=undefined) await newTask(options.new)
        if (options.delete!=undefined) await deleteTask(options.delete)
        if (options.done!=undefined) await doneTask(options.done)
        if (options.help) program.help()
        await client.end() 
    } catch (error) {
        console.log(error)
    }
    
})


run()