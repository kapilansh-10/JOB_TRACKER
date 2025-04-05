const pool = require("../config/db");

const getAllJobs = async () => {
    const { rows } = await pool.query("SELECT * FROM jobs ORDER BY id")
    return rows;
}

const getJobById = async (id) => {
    const { rows } = await pool.query("SELECT * FROM jobs WHERE id = $1", [id])
    return rows[0];
}

const createJob = async (company, position, status) => {
    const { rows } = await pool.query(
        "INSERT INTO jobs (company, position, status) VALUES ($1,$2,$3) RETURNING *",
        [company, position, status]
    );
    return rows[0]
};

const updateJob = async ( id, company, position, status ) => {
    // Get existing job first
    const { rows: existingRows } = await pool.query(
        "SELECT * FROM jobs WHERE id = $1",
        [id]
    )

    if (existingRows.length === 0) return null

    const existingJob = existingRows[0];

    // Use existing values if not provided
    const updatedCompany = company ?? existingJob.company;
    const updatedPosition = position ?? existingJob.position;
    const updatedStatus = status ?? existingJob.status;

    const { rows } = await pool.query(
        "UPDATE jobs SET company = $1, position = $2, status = $3 WHERE id = $4 RETURNING *",
        [updatedCompany, updatedPosition, updatedStatus, id]
    );

    return rows[0]
}

const deleteJob = async(id) => {
    const { rows } = await pool.query (
        "DELETE FROM jobs WHERE id = $1", [id]
    );
};

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob }