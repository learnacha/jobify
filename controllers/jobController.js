
const createJob = async (req, res) => {
    res.send('createJob successful')
}

const deleteJob = async (req, res) => {
    res.send('deleteJob successful')
}

const getAllJobs = async (req, res) => {
    res.send('getAllJobs successful')
}

const updateJob = async (req, res) => {
    res.send('updateJob successful')
}

const showStats = async (req, res) => {
    res.send('showStats successful')
}



export {createJob, deleteJob, getAllJobs, updateJob, showStats};