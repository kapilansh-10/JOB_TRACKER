const pool = require("../config/db");

const getAllJobs = async () => {
    const { rows } = await pool.query("SELECT * FROM jobs")
    return rows;
}

const getJobById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM jobs WHERE id = $1", [id])
    return rows[0];
}

const createJob = async (company, position, status) => {
    const { rows } = await pool.query(
        "INSERT INTO jobs (company, position, status) ($1,$2,$3) RETURNING *",
        [company, position, status]);
    return rows[0]
};

const updateJob = async ( id, company, position, status ) => {
    const { rows } = await pool.query(
        "UPDATE jobs SET company = $1, postion = $2, status = $3 WHERE id = $4 RETURNING *",
        [company, position, status, id]
    );
    return rows[0];
}

const deleteJob = async(id) => {
    const { rows } = await pool.query (
        "DELETE FROM jobs WHERE id = $1", [id]
    );
};

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob }